<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.list.title') }}</h1>
    <h2 v-if="contributors.length > 0">
      {{ contributors[0].acronym + ' - ' + contributors[0].name }}
    </h2>
    <p>{{ $t('contributors.list.blurb') }}</p>
    <v-expansion-panels id="map-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('contributors.list.map-instructions.label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('contributors.list.map-instructions.text') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels id="table-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('contributors.list.table-instructions.label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('contributors.list.table-instructions.text') }}
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

<script>
import axios from '~/plugins/axios'

const contributorKeys = [
  'acronym',
  'project',
  'name',
  'country',
  'start_date',
  'end_date',
  'wmo_region_id'
]
const deploymentKeys = [
  'woudc_id',
  'name',
  'type',
  'country',
  'start_date',
  'end_date'
]

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
      return [...contributorKeys.keys()].map((index) => {
        return {
          text: this.$t('contributors.list.contributor-headers[' + index + ']'),
          value: contributorKeys[index]
        }
      })
    },
    deploymentHeaders() {
      return [...deploymentKeys.keys()].map((index) => {
        return {
          text: this.$t('contributors.list.deployment-headers[' + index + ']'),
          value: deploymentKeys[index]
        }
      })
    }
  }
}
</script>
