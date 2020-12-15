<template>
  <v-container>
    <h1>{{ $t('data.stations.title') }}</h1>
    <h2 v-if="station !== null">
      {{ station.name + ' - ' + station.woudc_id }}
    </h2>
    <p>{{ $t('data.stations.blurb') }}</p>
    <v-row>
      <v-col>
        <selectable-map
          v-if="station !== null"
          :elements="[station]"
          :selected="selectedStation"
          :loading="loadingMap"
          @select="selectedStation = $event"
        >
          <template v-slot:popup="element">
            <strong>{{ $t('data.stations.gaw-id') }}</strong>
            <a :href="element.item.gaw_url" target="_blank">
              <span> {{ element.item.gaw_id }}</span>
            </a>
            <br>
            <strong>{{ $t('data.stations.station-id') }}</strong>
            <nuxt-link :to="'/data/stations/' + element.item.woudc_id">
              <span> {{ element.item.woudc_id }}</span>
            </nuxt-link>
            <br>
            <strong>{{ $t('data.stations.station-name') }}</strong>
            <span> {{ element.item.name }}</span>
            <br>
            <strong>{{ $t('data.stations.country-name') }}</strong>
            <span> {{ element.item.country_name[$i18n.locale] }}</span>
          </template>
        </selectable-map>
      </v-col>
      <v-col>
        <map-instructions id="map-instructions" />
        <table-instructions id="table-instructions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          v-if="station !== null"
          :headers="stationHeaders"
          :items="[station]"
          :loading="loadingTables"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.woudc_id="stn">
            <nuxt-link :to="'/data/stations/' + stn.item.woudc_id">
              {{ stn.item.woudc_id }}
            </nuxt-link>
          </template>
          <template v-slot:item.gaw_id="stn">
            <span v-if="stn.item.gaw_id !== null">
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
          :loading="loadingTables"
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
          :loading="loadingTables"
          class="elevation-1"
        >
          <template v-slot:item.waf_url="instrument">
            <a :href="instrument.item.waf_url" target="_blank">
              TODO
            </a>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import woudcClient from '~/plugins/woudcClient'
import { stripProperties, unpackageStation } from '~/plugins/unpackage'

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
    const woudcID = params.id
    const url = '/collections/stations/items'

    let found = true
    await woudcClient.get(url + '/' + woudcID).catch(() => {
      found = false
    })

    return found
  },
  data() {
    return {
      deployments: [],
      instruments: [],
      loadingMap: true,
      loadingTables: true,
      selectedStation: null,
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
  },
  watch: {
    $route() {
      this.populate()
    }
  },
  async mounted() {
    await this.$store.dispatch('stations/download')
    await this.populate()
    this.loadingMap = false
    this.loadingTables = false
  },
  methods: {
    async populate() {
      const woudcID = this.$route.params.id
      const stationMapFunc = this.$store.getters['stations/getWithID']
      const station = unpackageStation(stationMapFunc(woudcID))

      this.station = station
      this.selectedStation = station

      const instrumentsURL = '/collections/instruments/items'
      const deploymentsURL = '/collections/deployments/items'

      let queryParams = 'station_id=' + woudcID + '&sortby=contributor:A'
      const deploymentsResponse = await woudcClient.get(deploymentsURL + '?' + queryParams)

      this.deployments = deploymentsResponse.data.features.map(stripProperties)

      queryParams = 'station_id=' + woudcID + '&sortby=dataset:A,name:A,model:A,serial:A'
      const instrumentsResponse =
        await woudcClient.get(instrumentsURL + '?' + queryParams)

      this.instruments = instrumentsResponse.data.features.map(stripProperties)
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/stations/:id',
      fr: '/donnees/stations/:id'
    }
  }
}
</script>
