<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.products.ozonesonde.title') }}</h1>
    <v-spacer />
    <h2>{{ $t('data.products.common.search') }}</h2>
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
    <v-row>
      <v-col>
        <div class="requiredHead mb-2">
          <h3>{{ $t('data.products.common.Station') }}</h3>
          <v-chip small label class="ml-2 mt-1" color="warning">
            {{ $t('data.products.common.required') }}
          </v-chip>
        </div>
        <v-select
          :value="selectedStationID"
          :items="stationOptions"
          :disabled="stations.length === 0"
          item-text="text"
          menu-props="auto"
          placeholder="..."
          return-object
          solo
          dense
          @input="changeStation"
        >
          <template v-slot:selection="selection">
            <div class="my-3">
              {{ selection.item.text }}
            </div>
          </template>
          <template v-slot:item="element">
            <div>
              {{ element.item.text }}
            </div>
          </template>
        </v-select>
        <div id="stationOrderContainer">
          <span class="mt-1 mr-4 float-left">{{ $t('common.sort-by') }}</span>
          <v-switch
            v-model="stationOrderByID"
            :label="stationSwitchText"
            @change="reorderStations"
          />
        </div>
        <h3>{{ $t('data.products.common.year') }}</h3>
        <v-select
          v-model="selectedYear"
          :items="yearOptions"
          :disabled="selectedStation === null"
          solo
          dense
        >
          <template v-slot:selection="selection">
            <div class="my-3" color="auto">
              {{ selection.item.text }}
            </div>
          </template>
          <template v-slot:item="element">
            <div>
              {{ element.item.text }}
            </div>
          </template>
        </v-select>
      </v-col>
      <v-col>
        <selectable-map
          :elements="stations"
          :selected="selectedStation"
          @select="changeStation"
          @move="boundingBox = $event"
        >
          <template v-slot:popup="station">
            {{ station.item.name }} ({{ station.item.woudc_id }})
          </template>
        </selectable-map>
      </v-col>
    </v-row>
    <div>
      <v-btn
        class="btn-left"
        color="primary"
        :disabled="selectedStation === null"
        @click="getGraphs"
      >
        {{ $t('data.products.common.submit') }}
      </v-btn>
      <v-btn class="btn-right" @click="reset()">
        {{ $t('data.products.common.reset') }}
      </v-btn>
    </div>
    <h2>{{ $t('data.products.common.results') }}</h2>
    <div v-for="(graphs, year) in graphURLs" :key="year">
      <h3>{{ $t('data.products.common.year') }}: {{ year }}</h3>
      <graph-carousel :graphs="graphs">
        <template v-slot:preview-caption="graph">
          {{ imagePreviewCaption(graph.item, year) }}
        </template>
      </graph-carousel>
    </div>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'
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
      observationDates: {},
      selectedStation: null,
      selectedStationID: null,
      selectedYear: null,
      stations: [],
      stationOrderByID: false,
      years: []
    }
  },
  computed: {
    stationOptions() {
      if (this.boundingBox === null) {
        return this.stations.map(this.stationToSelectOption)
      } else {
        const visibleOptions = this.stations.filter((station) => {
          const selected = station.identifier === this.selectedStationID
          const coords = this.$L.latLng(station.geometry.coordinates)
          const visible = this.boundingBox.contains(coords)

          return selected || visible
        })

        return visibleOptions.map(this.stationToSelectOption)
      }
    },
    stationSwitchText() {
      if (this.stationOrderByID) {
        return this.$t('common.station-id')
      } else {
        return this.$t('common.station-name')
      }
    },
    yearOptions() {
      const nullOption = {
        text: this.$t('data.products.common.all'),
        value: null
      }

      const yearOptions = this.years.map(this.yearToSelectOption)
      return [ nullOption ].concat(yearOptions)
    }
  },
  async mounted() {
    await this.$store.dispatch('stations/download')

    const stationsRaw = this.$store.getters['stations/ozonesonde'].name
    this.stations = stationsRaw.map(unpackageStation)
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

      const rootURL = 'https://woudc.org/archive/products/ozone/vertical-ozone-profile/ozonesonde/1.0/'

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

      const dataRecordsResponse = await axios.get(dataRecordsURL + '?' + queryParams)

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
    reorderStations() {
      let stationsRaw
      if (this.stationOrderByID) {
        stationsRaw = this.$store.getters['stations/ozonesonde'].id
      } else {
        stationsRaw = this.$store.getters['stations/ozonesonde'].name
      }

      this.stations = stationsRaw.map(unpackageStation)
    },
    reset() {
      this.selectedStation = null
      this.selectedStationID = null
      this.selectedYear = null

      this.graphURLs = {}
    },
    async refreshYears() {
      const dates = await this.getObservationDates()
      const years = Object.keys(dates).sort()

      this.years = years
      this.observationDates = dates

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
