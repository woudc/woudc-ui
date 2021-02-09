<template>
  <v-container>
    <h1>{{ $t('data.products.ozonesonde.title') }}</h1>
    <h2>{{ $t('data.products.common.search') }}</h2>
    <v-row>
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <strong>{{ $t('common.instructions') }}</strong>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <i18n path="data.products.ozonesonde.instructions.body-selections" tag="p">
                <template v-slot:station>
                  <strong>{{ $t('data.products.common.station') }}</strong>
                </template>
                <template v-slot:years>
                  <strong>{{ $t('data.products.common.years') }}</strong>
                </template>
              </i18n>
              <p>{{ $t('data.products.ozonesonde.instructions.body-searching') }}</p>
              <ul>
                <i18n path="data.products.ozonesonde.instructions.body-pressure" tag="li">
                  <template v-slot:pressure-plots>
                    <strong>{{ $t('data.products.ozonesonde.instructions.pressure-plots') }}</strong>
                  </template>
                </i18n>
                <i18n path="data.products.ozonesonde.instructions.body-temperature" tag="li">
                  <template v-slot:temperature-plots>
                    <strong>{{ $t('data.products.ozonesonde.instructions.temperature-plots') }}</strong>
                  </template>
                </i18n>
                <i18n path="data.products.ozonesonde.instructions.body-flights" tag="li">
                  <template v-slot:flight-plots>
                    <strong>{{ $t('data.products.ozonesonde.instructions.flight-plots') }}</strong>
                  </template>
                </i18n>
              </ul>
              <br>
              <p>{{ $t('data.products.ozonesonde.instructions.body-grouping') }}</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col cols="12" md="6" xl="9">
            <div class="requiredHead mb-2">
              <h3>{{ $t('data.products.common.Station') }}</h3>
              <v-chip small label class="ml-2 mt-1" color="primary">
                {{ $t('data.products.common.required') }}
              </v-chip>
            </div>
            <v-select
              :value="selectedStationID"
              :items="stationOptions"
              :loading="loadingStations"
              :disabled="stations.length === 0 || loadingStations"
              item-text="text"
              menu-props="auto"
              placeholder="..."
              return-object
              @input="changeStation"
            >
            </v-select>
          </v-col>
          <v-col class="mt-1" align-self="center">
            <span class="pt-0">{{ $t('common.sort-by') }}</span>
            <v-radio-group v-model="stationOrder" class="mt-1 pt-0">
              <v-radio :label="$t('common.station-id')" value="orderByID" />
              <v-radio :label="$t('common.station-name')" value="orderByName" />
            </v-radio-group>
          </v-col>
        </v-row>
        <h3>{{ $t('data.products.common.year') }}</h3>
        <v-select
          v-model="selectedYear"
          :items="yearOptions"
          :loading="loadingYears"
          :disabled="selectedStation === null || loadingYears"
        >
        </v-select>
      </v-col>
      <v-col>
        <selectable-map
          :elements="stations.orderByID"
          :selected="selectedStation"
          :loading="loadingMap"
          @select="changeStation"
          @move="boundingBox = $event"
        >
          <template v-slot:popup="station">
            {{ station.item.name }} ({{ station.item.woudc_id }})
          </template>
        </selectable-map>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div>
          <v-btn
            class="btn-left"
            color="primary"
            :disabled="selectedStation === null"
            @click="getGraphs"
          >
            {{ $t('common.submit') }}
          </v-btn>
          <v-btn
            class="btn-right"
            :disabled="loadingStations || loadingYears || loadingMap"
            @click="reset()"
          >
            {{ $t('common.reset') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>{{ $t('common.results') }}</h2>
        <div v-for="(graphs, year) in graphURLs" :key="year">
          <h3>{{ $t('data.products.common.year') }}: {{ year }}</h3>
          <graph-carousel :graphs="graphs">
            <template v-slot:preview-caption="graph">
              {{ imagePreviewCaption(graph.item, year) }}
            </template>
          </graph-carousel>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import woudcClient from '~/plugins/woudcClient'
import { unpackageStation } from '~/plugins/unpackage'

import GraphCarousel from '~/components/GraphCarousel'
import SelectableMap from '~/components/SelectableMap'

export default {
  components: {
    'graph-carousel': GraphCarousel,
    'selectable-map': SelectableMap
  },
  data() {
    return {
      boundingBox: null,
      graphURLs: {},
      loadingMap: true,
      loadingStations: true,
      loadingYears: false,
      observationDates: {},
      selectedStation: null,
      selectedStationID: null,
      selectedYear: null,
      stations: {
        orderByID: [],
        orderByName: []
      },
      stationOrder: 'orderByName',
      years: []
    }
  },
  computed: {
    stationOptions() {
      const orderedStations = this.stations[this.stationOrder]

      if (this.boundingBox === null) {
        return orderedStations.map(this.stationToSelectOption)
      } else {
        const visibleOptions = orderedStations.filter((station) => {
          const selected = station.identifier === this.selectedStationID
          const coords = this.$L.latLng(station.geometry.coordinates)
          const visible = this.boundingBox.contains(coords)

          return selected || visible
        })

        return visibleOptions.map(this.stationToSelectOption)
      }
    },
    yearOptions() {
      const nullOption = {
        text: this.$t('common.all'),
        value: null
      }

      const yearOptions = this.years.map(this.yearToSelectOption)
      return [ nullOption ].concat(yearOptions)
    }
  },
  async mounted() {
    await this.$store.dispatch('stations/download')

    const stationsRaw = this.$store.getters['stations/ozonesonde']
    this.stations = {
      orderByID: stationsRaw.orderByID.map(unpackageStation),
      orderByName: stationsRaw.orderByName.map(unpackageStation)
    }
    this.loadingStations = false
    this.loadingMap = false
  },
  methods: {
    changeStation(station) {
      if (station === null || station.value === null) {
        this.selectedStation = null
        this.selectedStationID = null
        this.selectedYear = null
      } else if (station.element !== undefined) {
        this.selectedStation = station.element
        this.selectedStationID = station.value
        this.refreshYears()
      } else {
        this.selectedStation = station
        this.selectedStationID = station.identifier
        this.refreshYears()
      }
    },
    getGraphs() {
      let yearsInRange
      if (this.selectedYear === null) {
        yearsInRange = this.years
      } else {
        yearsInRange = [ this.selectedYear ]
      }

      const rootURL = process.env.WAF_URL + '/products/ozone/vertical-ozone-profile/ozonesonde/1.0/'

      const stationID = this.selectedStationID
      const stationKey = this.selectedStation.name + ' (' + stationID + ')'

      const pressureCaption = this.$t('data.products.ozonesonde.image-captions.pressure')
      const temperatureCaption = this.$t('data.products.ozonesonde.image-captions.temperature')

      this.graphURLs = {}
      for (const year of yearsInRange) {
        const annualPlotName = 'ytdo3sonde-' + stationID + '-' + year
        const pressurePlot = rootURL + 'annual/stn' + stationID + '/' + annualPlotName + '-o3pp.png'
        const temperaturePlot = rootURL + 'annual/stn' + stationID + '/' + annualPlotName + '-temp.png'

        this.graphURLs[year] = []
        this.graphURLs[year].push({
          url: pressurePlot,
          caption: pressureCaption,
          station: stationKey
        })
        this.graphURLs[year].push({
          url: temperaturePlot,
          caption: temperatureCaption,
          station: stationKey
        })

        for (const date of this.observationDates[year]) {
          const plotURL = rootURL + 'flights/stn' + stationID + '/' + stationID + '-' + date + '-0.png'
          const flightCaption = this.$t('data.products.ozonesonde.image-captions.flights') + ' ' + date

          this.graphURLs[year].push({
            url: plotURL,
            caption: flightCaption,
            station: stationKey
          })
        }
      }
    },
    async getObservationDates() {
      const dataRecordsURL = '/collections/data_records/items'
      let queryParams = 'sortby=timestamp_date&content_category=OzoneSonde'
      queryParams += '&platform_id=' + this.selectedStationID

      const dataRecordsResponse = await woudcClient.get(dataRecordsURL + '?' + queryParams)

      const observationDates = {}
      for (const feature of dataRecordsResponse.data.features) {
        const timestamp = feature.properties.timestamp_date
        const datestamp = timestamp.substring(0, 10)
        const year = timestamp.substring(0, 4)

        if (!(year in observationDates)) {
          observationDates[year] = []
        }
        observationDates[year].push(datestamp)
      }

      return observationDates
    },
    imagePreviewCaption(graph, key) {
      const colon = this.$t('common.colon-style')
      const graphWord = this.$t('data.products.common.graph')

      const stationName = this.$t('common.station-name') + colon + ' ' + graph.station
      const year = this.$t('data.products.common.year') + colon + ' ' + key

      return `${graphWord} - ${graph.caption} - ${stationName}. ${year}`
    },
    reset() {
      this.selectedStation = null
      this.selectedStationID = null
      this.selectedYear = null

      this.graphURLs = {}
    },
    async refreshYears() {
      this.loadingYears = true
      const dates = await this.getObservationDates()
      const years = Object.keys(dates).sort()

      this.years = years
      this.observationDates = dates
      this.loadingYears = false

      if (!this.years.includes(this.selectedYear)) {
        this.selectedYear = null
      }
    },
    stationToSelectOption(station) {
      const stationName = station.name
      const stationID = station.woudc_id

      return {
        text: stationName + ' (' + stationID + ')',
        value: stationID,
        element: station
      }
    },
    yearToSelectOption(year) {
      return {
        text: year,
        value: year
      }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/products/ozonesonde',
      fr: '/donnees/produits/sondeozone'
    }
  }
}
</script>

<style>
.requiredHead {
  display: flex;
}

#stationOrderContainer span {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.btn-left {
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}

.btn-right {
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
}
</style>
