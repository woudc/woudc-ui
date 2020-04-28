<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <h2 v-if="contributors.length > 0">
      {{ contributors[0].acronym + ' - ' + contributors[0].name }}
    </h2>
    <p>{{ $t('blurb') }}</p>
    <v-expansion-panels id="map-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('map-instructions-label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('map-instructions') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels id="table-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('table-instructions-label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('table-instructions') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-data-table
      id="contributor-table"
      :headers="contributorHeaders"
      :items="contributors"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.acronym="contributor">
        <nuxt-link :to="'/contributors/' + contributor.item.acronym">
          {{ contributor.item.acronym }}
        </nuxt-link>
      </template>
      <template v-slot:item.name="contributor">
        <a :href="contributor.item.url">
          {{ contributor.item.name }}
        </a>
      </template>
      <template v-slot:item.country="contributor">
        {{ contributor.item.country_name[$i18n.locale] }}
      </template>
    </v-data-table>
    <v-data-table
      id="deployments-table"
      :headers="deploymentHeaders"
      :items="deployments"
      class="elevation-1"
    >
      <template v-slot:item="deployment">
        <tr>
          <td>
            <nuxt-link :to="'/data/stations/' + deployment.item.station_id">
              {{ deployment.item.station_id }}
            </nuxt-link>
          </td>
          <td>{{ deployment.item.station_name }}</td>
          <td>{{ deployment.item.station_type }}</td>
          <td>{{ deployment.item.country_name[$i18n.locale] }}</td>
          <td>{{ deployment.item.start_date }}</td>
          <td>{{ deployment.item.end_date }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Contributor List",
    "blurb": "The contributor list provides the institute or organization name and abbreviation, address, contact information and local file information.",
    "map-instructions-label": "How to Use: Interactive Map",
    "map-instructions": "Lorem Ipsum something something something",
    "table-instructions-label": "How to Use: Interactive Table",
    "table-instructions": "Lorem Ipsum something something something",
    "contributor-headers" : [
      {
        "text": "Acronym",
        "value": "acronym"
      },
      {
        "text": "Project",
        "value": "project"
      },
      {
        "text": "Contributor Name",
        "value": "name"
      },
      {
        "text": "Country",
        "value": "country"
      },
      {
        "text": "Date From",
        "value": "start_date"
      },
      {
        "text": "Date To",
        "value": "end_date"
      },
      {
        "text": "WMO Region",
        "value": "wmo_region_id"
      }
    ],
    "deployment-headers": [
      {
        "text": "Station ID",
        "value": "woudc_id"
      },
      {
        "text": "Station Name",
        "value": "name"
      },
      {
        "text": "Station Type",
        "value": "type"
      },
      {
        "text": "Station Country",
        "value": "country"
      },
      {
        "text": "Date From",
        "value": "start_date"
      },
      {
        "text": "Date To",
        "value": "end_date"
      }
    ]
  },
  "fr": {
    "title": "Liste des contributeurs",
    "blurb": "La liste des contributeurs contient le nom et l’abréviation de l’institut ou de l’organisation,l’adresse, les coordonnées et l’information sur le fichier local.",
    "map-instructions-label": "Guide d'utilisation : Carte interactive",
    "map-instructions": "Lorem Ipsum something something something",
    "table-instructions-label": "Guide d'utilisation : Tableau interactif",
    "table-instructions": "Lorem Ipsum something something something",
    "contributorHeaders" : [
      {
        "text": "Acronyme",
        "value": "acronym"
      },
      {
        "text": "Project title in French",
        "value": "project"
      },
      {
        "text": "Nom du contributeur",
        "value": "name"
      },
      {
        "text": "À partir de cette date",
        "value": "start_date"
      },
      {
        "text": "Pays",
        "value": "country"
      },
      {
        "text": "Jusqu’à cette date",
        "value": "end_date"
      },
      {
        "text": "Région de l'OMM",
        "value": "wmo_region_id"
      }
    ]
  }
}
</i18n>

<script>
import axios from '~/plugins/axios'

export default {
  async validate({ params }) {
    const acronym = params.id
    const url = '/collections/contributors/items'

    const queryParams = 'acronym=' + acronym
    let found = true
    await axios.get(url + '?' + queryParams).catch(() => {
      found = false
    })

    return found
  },
  async asyncData({ params }) {
    const acronym = params.id
    let queryParams

    const contributorsURL = '/collections/contributors/items'
    const deploymentsURL = '/collections/deployments/items'

    queryParams = 'acronym=' + acronym + '&sortby=acronym:A,project:D'
    const contributorsResponse = await axios.get(contributorsURL + '?' + queryParams)

    const contributorsList = contributorsResponse.data.features.map((contributor) => {
      contributor.properties.country_name = {
        en: contributor.properties.country_name_en,
        fr: contributor.properties.country_name_fr
      }
      return contributor.properties
    })

    queryParams = 'contributor=' + acronym + '&sortby=station_id:A'
    const deploymentsResponse = await axios.get(deploymentsURL + '?' + queryParams)

    const deploymentsList = deploymentsResponse.data.features.map((deployment) => {
      deployment.properties.country_name = {
        en: deployment.properties.station_country_en,
        fr: deployment.properties.station_country_fr
      }
      return deployment.properties
    })

    return {
      contributors: contributorsList,
      deployments: deploymentsList
    }
  },
  data() {
    return {
      contributors: [],
      deployments: []
    }
  },
  computed: {
    contributorHeaders() {
      return this.$i18nToArray(this.$t('contributor-headers')).map((definition) => {
        return {
          text: definition.text,
          align: 'left',
          sortable: false,
          value: definition.value
        }
      })
    },
    deploymentHeaders() {
      return this.$i18nToArray(this.$t('deployment-headers')).map((definition) => {
        return {
          text: definition.text,
          align: 'left',
          sortable: false,
          value: definition.value
        }
      })
    }
  }
}
</script>
