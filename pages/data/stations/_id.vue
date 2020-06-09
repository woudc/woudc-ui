<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.stations.title') }}</h1>
    <h2 v-if="station !== null">
      {{ station.name + ' - ' + station.woudc_id }}
    </h2>
    <p>{{ $t('data.stations.blurb') }}</p>
    <map-instructions id="map-instructions" />
    <table-instructions id="table-instructions" />
    <v-data-table
      v-if="station !== null"
      id="stations-table"
      :headers="stationHeaders"
      :items="[station]"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.woudc_id="stn">
        <nuxt-link :to="'/data/stations/' + stn.item.woudc_id">
          {{ stn.item.woudc_id }}
        </nuxt-link>
      </template>
      <template v-slot:item.gaw_id="stn">
        <span v-id="stn.item.gaw_id !== null">
          <a :href="stn.item.gaw_url" target="_blank">
            {{ stn.item.gaw_id }}
          </a>
        </span>
      </template>
      <template v-slot:item.country="stn">
        {{ stn.item.country_name[$i18n.locale] }}
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

<script>
import axios from '~/plugins/axios'
import mapInstructions from '~/components/MapInstructions'
import tableInstructions from '~/components/TableInstructions'

export default {
  components: {
    'map-instructions': mapInstructions,
    'table-instructions': tableInstructions
  },
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
      deployments: [],
      instruments: [],
      station: null
    }
  },
  computed: {
    deploymentHeaders() {
      const deploymentKeys = [
        'acronym',
        'project',
        'name',
        'start_date',
        'end_date'
      ]

      return deploymentKeys.map((key) => {
        return {
          text: this.$t('data.stations.deployment-headers.' + key),
          value: key
        }
      })
    },
    instrumentHeaders() {
      const instrumentKeys = [
        'name',
        'model',
        'serial',
        'start_date',
        'end_date',
        'data_class',
        'dataset',
        'waf_url'
      ]

      return instrumentKeys.map((key) => {
        return {
          text: this.$t('data.stations.instrument-headers.' + key),
          value: key
        }
      })
    },
    stationHeaders() {
      const stationKeys = [
        'woudc_id',
        'gaw_id',
        'start_date',
        'end_date',
        'name',
        'country',
        'last_validated_datetime',
        'type',
        'wmo_region_id'
      ]

      return stationKeys.map((key) => {
        return {
          text: this.$t('data.stations.station-headers.' + key),
          value: key
        }
      })
    }
  }
}
</script>
