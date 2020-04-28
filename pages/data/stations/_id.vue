<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <h2 v-if="station !== null">
      {{ station.name + ' - ' + station.woudc_id }}
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
      v-if="station !== null"
      id="stations-table"
      :headers="stationHeaders"
      :items="[station]"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.woudc_id="station">
        <nuxt-link :to="'/data/stations/' + station.item.woudc_id">
          {{ station.item.woudc_id }}
        </nuxt-link>
      </template>
      <template v-slot:item.gaw_id="station">
        <span v-id="station.item.gaw_id !== null">
          <a :href="station.item.gaw_url" target="_blank">
            {{ station.item.gaw_id }}
          </a>
        </span>
      </template>
      <template v-slot:item.country="station">
        {{ station.item.country_name[$i18n.locale] }}
      </template>
    </v-data-table>
    <v-data-table
      v-if="deployments.length > 0"
      id="deployments-table"
      :headers="deploymentHeaders"
      :items="deployments"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item="deployment">
        <tr>
          <td>
            <nuxt-link :to="'/contributors/' + deployment.item.contributor">
              {{ deployment.item.contributor }}
            </nuxt-link>
          </td>
          <td>{{ deployment.item.contributor_project }}</td>
          <td>
            <a :href="deployment.item.contributor_url" target="_blank">
              {{ deployment.item.contributor_name }}
            </a>
          </td>
          <td>{{ deployment.item.start_date }}</td>
          <td>{{ deployment.item.end_date }}</td>
        </tr>
      </template>
    </v-data-table>
    <v-data-table
      v-if="instruments.length > 0"
      id="instruments-table"
      :headers="instrumentHeaders"
      :items="instruments"
      class="elevation-1"
    >
      <template v-slot:item.waf_url="instrument">
        <a :href="instrument.item.waf_url" target="_blank">
          TODO
        </a>
      </template>
    </v-data-table>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Station List",
    "blurb": "The WOUDC data archive can be sorted by station. To find out the identifying number of a particular station, select the metadata link on the WOUDC website and then the region that you are interested in. All available stations and their numbers for that region will then be displayed.",
    "map-instructions-label": "How to Use: Interactive Map",
    "map-instructions": "Lorem Ipsum something something something",
    "table-instructions-label": "How to Use: Interactive Table",
    "table-instructions": "Lorem Ipsum something something something",
    "station-headers" : [
      {
        "text": "WOUDC Station ID",
        "value": "woudc_id"
      },
      {
        "text": "GAW ID",
        "value": "gaw_id"
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
        "text": "Station Name",
        "value": "name"
      },
      {
        "text": "Station Country",
        "value": "country"
      },
      {
        "text": "Revision Date",
        "value": "last_validated_datetime"
      },
      {
        "text": "Station Type",
        "value": "type"
      },
      {
        "text": "WMO Region",
        "value": "wmo_region_id"
      }
    ],
    "deployment-headers": [
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
        "text": "Date From",
        "value": "start_date"
      },
      {
        "text": "Date To",
        "value": "end_date"
      }
    ],
    "instrument-headers": [
      {
        "text": "Instrument Type",
        "value": "name"
      },
      {
        "text": "Instrument Model",
        "value": "model"
      },
      {
        "text": "Instrument Number",
        "value": "serial"
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
        "text": "Data Class",
        "value": "data_class"
      },
      {
        "text": "Data Category",
        "value": "dataset"
      },
      {
        "text": "Web Accessible Folder",
        "value": "waf_url"
      }
    ]
  },
  "fr": {
    "title": "Liste des stations",
    "blurb": "Les archives de données du WOUDC peuvent être classées par station. Pour connaître le numéro identificateur d’une station, sélectionner le lien des métadonnées sur le site Web du WOUDC, puis la région désirée. Vous pourrez ensuite consulter la liste des stations et leur numéro d’identification.",
    "map-instructions-label": "Guide d'utilisation : Carte interactive",
    "map-instructions": "Lorem Ipsum something something something",
    "table-instructions-label": "Guide d'utilisation : Tableau interactif",
    "table-instructions": "Lorem Ipsum something something something",
    "station-headers" : [
      {
        "text": "Identification de la station du WOUDC",
        "value": "woudc_id"
      },
      {
        "text": "Identifiant VAG",
        "value": "gaw_id"
      },
      {
        "text": "À partir de cette date",
        "value": "start_date"
      },
      {
        "text": "Jusqu’à cette date",
        "value": "end_date"
      },
      {
        "text": "Nom de la station",
        "value": "name"
      },
      {
        "text": "Pays de la station",
        "value": "country"
      },
      {
        "text": "Date de révision",
        "value": "last_validated_datetime"
      },
      {
        "text": "Type de station",
        "value": "type"
      },
      {
        "text": "Région de l'OMM",
        "value": "wmo_region_id"
      }
    ],
    "deployment-headers": [
      {
        "text": "Acronym in French",
        "value": "acronym"
      },
      {
        "text": "Project in French",
        "value": "project"
      },
      {
        "text": "Contributor Name in French",
        "value": "name"
      },
      {
        "text": "Date From in French",
        "value": "start_date"
      },
      {
        "text": "Date To in French",
        "value": "end_date"
      }
    ],
    "instrument-headers": [
      {
        "text": "Type d'instrument",
        "value": "name"
      },
      {
        "text": "Modèle de l'’'instrument",
        "value": "model"
      },
      {
        "text": "Numéro de l'instrument",
        "value": "serial"
      },
      {
        "text": "À partir de cette date",
        "value": "start_date"
      },
      {
        "text": "Jusqu’à cette date",
        "value": "end_date"
      },
      {
        "text": "Classe de données",
        "value": "data_class"
      },
      {
        "text": "Catégorie de données",
        "value": "dataset"
      },
      {
        "text": "Dossier accessible sur le web",
        "value": "waf_url"
      }
    ]
  }
}
</i18n>

<script>
import axios from '~/plugins/axios'

export default {
  async validate({ params }) {
    const woudcID = params.id
    const url = '/collections/stations/items'

    let found = true
    await axios.get(url + '/' + woudcID).catch(() => {
      found = false
    })

    return found
  },
  async asyncData({ params }) {
    const woudcID = params.id
    let queryParams

    const stationsURL = '/collections/stations/items'
    const instrumentsURL = '/collections/instruments/items'
    const deploymentsURL = '/collections/deployments/items'

    const stationsResponse = await axios.get(stationsURL + '/' + woudcID)
    const stationFeature = stationsResponse.data.properties

    stationFeature.country_name = {
      en: stationFeature.country_name_en,
      fr: stationFeature.country_name_fr
    }
    stationFeature.last_validated_datetime =
      stationFeature.last_validated_datetime.substring(0, 10)

    queryParams = 'station_id=' + woudcID + '&sortby=contributor:A'
    const deploymentsResponse = await axios.get(deploymentsURL + '?' + queryParams)

    const deploymentsList = deploymentsResponse.data.features.map((deployment) => {
      return deployment.properties
    })

    queryParams = 'station_id=' + woudcID + '&sortby=dataset:A,name:A,model:A,serial:A'
    const instrumentsResponse =
      await axios.get(instrumentsURL + '?' + queryParams)

    const instrumentsList = instrumentsResponse.data.features.map((instrument) => {
      return instrument.properties
    })

    return {
      station: stationFeature,
      deployments: deploymentsList,
      instruments: instrumentsList
    }
  },
  data() {
    return {
      station: null,
      deployments: [],
      instruments: []
    }
  },
  computed: {
    stationHeaders() {
      return this.$i18nToArray(this.$t('station-headers')).map((definition) => {
        return {
          text: definition.text,
          align: 'left',
          sortable: false,
          value: definition.value
        }
      })
    },
    deploymentHeaders() {
      const headers = this.$i18nToArray(this.$t('deployment-headers'))
      return headers.map((definition) => {
        return {
          text: definition.text,
          align: 'left',
          sortable: false,
          value: definition.value
        }
      })
    },
    instrumentHeaders() {
      const headers = this.$i18nToArray(this.$t('instrument-headers'))
      return headers.map((definition) => {
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
