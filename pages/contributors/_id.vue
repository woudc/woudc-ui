<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.list.title') }}</h1>
    <h2 v-if="contributors.length > 0">
      {{ contributors[0].acronym + ' - ' + contributors[0].name }}
    </h2>
    <p>{{ $t('contributors.list.blurb') }}</p>
    <v-row>
      <v-col>
        <selectable-map
          :elements="contributors"
          :selected="selectedContributor"
          @select="selectedContributor = $event"
        >
          <template v-slot:popup="element">
            <strong>{{ $t('contributors.list.contributor-name') }}</strong>
            <nuxt-link :to="localePath('contributors') + '/' + element.item.acronym">
              {{ element.item.name }}
            </nuxt-link>
            <br>
            <strong>{{ $t('contributors.list.country-name') }}</strong>
            <span> {{ element.item.country_name[$i18n.locale] }}</span>
          </template>
        </selectable-map>
      </v-col>
      <v-col>
        <map-instructions id="map-instructions" />
        <table-instructions id="table-instructions" />
      </v-col>
    </v-row>
    <v-data-table
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
import { unpackageContributor, unpackageDeployment } from '~/plugins/unpackage'

import mapInstructions from '~/components/MapInstructions'
import tableInstructions from '~/components/TableInstructions'
import SelectableMap from '~/components/SelectableMap'

export default {
  components: {
    'map-instructions': mapInstructions,
    'selectable-map': SelectableMap,
    'table-instructions': tableInstructions
  },
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

    const contributorsList = contributorsResponse.data.features.map(unpackageContributor)

    queryParams = 'contributor=' + acronym + '&sortby=station_id:A'
    const deploymentsResponse = await axios.get(deploymentsURL + '?' + queryParams)

    const deploymentsList = deploymentsResponse.data.features.map(unpackageDeployment)

    return {
      contributors: contributorsList,
      deployments: deploymentsList,
      selectedContributor: contributorsList[0]
    }
  },
  data() {
    return {
      contributors: [],
      deployments: [],
      selectedContributor: null
    }
  },
  computed: {
    contributorHeaders() {
      const contributorKeys = [
        'acronym',
        'project',
        'name',
        'country',
        'start_date',
        'end_date',
        'wmo_region_id'
      ]

      return contributorKeys.map((key) => {
        return {
          text: this.$t('contributors.list.contributor-headers.' + key),
          value: key
        }
      })
    },
    deploymentHeaders() {
      const deploymentKeys = [
        'woudc_id',
        'name',
        'type',
        'country',
        'start_date',
        'end_date'
      ]

      return deploymentKeys.map((key) => {
        return {
          text: this.$t('contributors.list.deployment-headers.' + key),
          value: key
        }
      })
    }
  }
}
</script>
