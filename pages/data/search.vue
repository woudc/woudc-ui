<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('data.explore.title') }}</h1>
        <p>{{ $t('data.explore.blurb.body-datasets') }}</p>
        <p>{{ $t('data.explore.blurb.body-search') }}</p>
        <i18n path="data.explore.blurb.body-howto" tag="p">
          <template v-slot:how-to>
            <nuxt-link :to="localePath('about-dataaccess')">
              {{ $t('data.explore.how-to') }}
            </nuxt-link>
          </template>
        </i18n>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>{{ $t('data.explore.dataset.title') }}</h3>
        <v-select
          v-model="selectedDatasetID"
          :items="datasetOptions"
          menu-props="auto"
          return-object
          solo
          dense
          @input="changeDataset"
        >
          <template v-slot:selection="selection">
            <div class="my-3">
              {{ selection.item.text }}
            </div>
          </template>
        </v-select>
        <v-row>
          <v-col cols="12" md="6" xl="9">
            <h3>{{ $t('data.explore.country.title') }}</h3>
            <v-select
              v-model="selectedCountryID"
              :items="countryOptions"
              :disabled="loadingCountries"
              :loading="loadingCountries"
              menu-props="auto"
              return-object
              solo
              dense
              @input="changeCountry"
            >
              <template v-slot:selection="selection">
                <div class="my-3">
                  {{ selection.item.text }}
                </div>
              </template>
            </v-select>
          </v-col>
          <v-col align-self="center">
            <span class="pt-0">{{ $t('common.sort-by') }}</span>
            <v-radio-group v-model="countryOrder" class="mt-1 pt-0">
              <v-radio class="mb-0" :label="$t('data.explore.country.id')" value="orderByCode" />
              <v-radio :label="$t('data.explore.country.name')" value="orderByName" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" xl="9">
            <h3>{{ $t('data.explore.station.title') }}</h3>
            <v-select
              :value="selectedStationID"
              :items="stationOptions"
              :disabled="loadingStations"
              :loading="loadingStations"
              menu-props="auto"
              return-object
              solo
              dense
              @input="changeStation($event.element)"
            >
              <template v-slot:selection="selection">
                <div class="my-3">
                  {{ selection.item.text }}
                </div>
              </template>
            </v-select>
          </v-col>
          <v-col align-self="center">
            <span class="pt-0">{{ $t('common.sort-by') }}</span>
            <v-radio-group v-model="stationOrder" class="mt-1 pt-0">
              <v-radio class="mb-0" :label="$t('common.station-id')" value="orderByID" />
              <v-radio :label="$t('common.station-name')" value="orderByName" />
            </v-radio-group>
          </v-col>
        </v-row>
        <h3>{{ $t('data.explore.instrument.title') }}</h3>
        <v-select
          v-model="selectedInstrumentID"
          :items="instrumentOptions"
          :disabled="loadingInstruments"
          :loading="loadingInstruments"
          menu-props="auto"
          return-object
          solo
          dense
          @input="changeInstrument($event)"
        >
          <template v-slot:selection="selection">
            <div class="my-3">
              {{ selection.item.text }}
            </div>
          </template>
        </v-select>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              type="number"
              :value="selectedYearRange[0]"
              :label="$t('data.explore.start')"
              @keyup.enter="setStartYear($event.target.value)"
              @keyup.up="setStartYear(parseInt($event.target.value))"
              @keyup.down="setStartYear(parseInt($event.target.value))"
            >
              <template v-slot:append>
                <div class="mt-2">
                  <v-btn icon small @click="addToStartYear(-1)">
                    <v-icon>mdi-minus-circle-outline</v-icon>
                  </v-btn>
                  <v-btn icon small @click="addToStartYear(1)">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="number"
              :value="selectedYearRange[1]"
              :label="$t('data.explore.end')"
              @keyup.enter="setEndYear($event.target.value)"
              @keyup.up="setEndYear(parseInt($event.target.value))"
              @keyup.down="setEndYear(parseInt($event.target.value))"
            >
              <template v-slot:append>
                <div class="mt-2">
                  <v-btn icon small @click="addToEndYear(-1)">
                    <v-icon>mdi-minus-circle-outline</v-icon>
                  </v-btn>
                  <v-btn icon small @click="addToEndYear(1)">
                    <v-icon>mdi-plus-circle-outline</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-range-slider
          v-model="selectedYearRange"
          :min="minSelectableYear"
          :max="maxSelectableYear"
        />
      </v-col>
      <v-col>
        <map-instructions />
        <selectable-map
          :elements="stations.orderByID"
          :selected="selectedStation"
          :country="mapFocusCountry"
          :loading="loadingMap"
          @select="changeStation"
          @move="mapBoundingBox = $event"
        >
          <template v-slot:popup="element">
            {{ element.item.name || element.item.station_name }}
            ({{ element.item.woudc_id || element.item.station_id }})
          </template>
        </selectable-map>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div
          v-if="Object.keys(metricsByYear).length !== 0"
          id="metrics-container"
          class="mb-2"
        >
          <span>{{ $t('data.explore.distribution-for') }} </span>
          <v-chip label small class="ml-1">
            {{ selectedDataset }}
          </v-chip>
          <v-chip v-if="selectedCountry !== null" label small class="ml-1">
            {{ $t('data.explore.country.title') }}{{ $t('common.colon-style') }}
            {{ countryText(selectedCountry) }}
          </v-chip>
          <v-chip v-if="selectedStation !== null" label small class="ml-1">
            {{ $t('data.explore.station.title') }}{{ $t('common.colon-style') }}
            {{ stationText(selectedStation) }}
          </v-chip>
          <v-chip v-if="selectedInstrument !== null" label small class="ml-1">
            {{ $t('data.explore.instrument.title') }}{{ $t('common.colon-style') }}
            {{ instrumentText(selectedInstrument) }}
          </v-chip>
          <metrics-chart
            :startdate="selectedYearRange[0]"
            :enddate="selectedYearRange[1]"
            :metrics="metricsByYear"
            :style="{ 'max-height': '240px', 'min-height': '160px' }"
          />
          <span>{{ $t('data.explore.file-count') }} {{ filesInRange }}</span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          class="btn-left"
          color="primary"
          :loading="loadingDataRecords"
          @click="refreshDataRecords()"
        >
          {{ $t('common.submit') }}
        </v-btn>
        <v-btn
          class="btn-right"
          :disabled="loadingStations || loadingCountries || loadingInstruments || loadingMap || loadingDataRecords"
          @click="reset()"
        >
          {{ $t('common.reset') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>{{ $t('data.explore.search-results') }}</h2>
        <span v-if="!oldSearchExists" class="red--text">
          {{ $t('data.explore.no-results') }}
        </span>
        <div v-else>
          <v-card v-if="searchOutOfDate" class="mt-1 mb-4" color="warning">
            <v-card-title class="pt-3 pb-0">
              <v-icon class="mr-1">
                mdi-alert
              </v-icon>
              {{ $t('data.explore.old-search.title') }}
            </v-card-title>
            <i18n path="data.explore.old-search.body" tag="v-card-text">
              <template v-slot:search>
                <strong>{{ $t('common.submit') }}</strong>
              </template>
            </i18n>
          </v-card>
          <v-data-table
            class="elevation-1"
            :headers="dataRecordHeaders"
            :items="dataRecords"
          >
            <template v-slot:item.platform_id="row">
              <nuxt-link :to="localePath('data-stations') + '/' + row.item.platform_id">
                {{ row.item.platform_id }}
              </nuxt-link>
            </template>
            <template v-slot:item.actions="row">
              <a :href="row.item.url" target="_blank">
                <v-icon>mdi-file-download</v-icon>
              </a>
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import woudcClient from '~/plugins/woudcClient'
import { stripProperties, unpackageBareStation } from '~/plugins/unpackage'

import MapInstructions from '~/components/MapInstructions'
import MetricsChart from '~/components/MetricsChart'
import SelectableMap from '~/components/SelectableMap'

export default {
  components: {
    'map-instructions': MapInstructions,
    'metrics-chart': MetricsChart,
    'selectable-map': SelectableMap
  },
  data() {
    return {
      countries: { orderByID: [], orderByName: [] },
      countryOrder: 'orderByName',
      dataRecords: [],
      instruments: [],
      loadingCountries: true,
      loadingDataRecords: false,
      loadingInstruments: true,
      loadingMap: true,
      loadingStations: true,
      mapBoundingBox: null,
      mapFocusCountry: null,
      metricsByYear: {},
      minSelectableYear: 1924,
      oldSearchExists: false,
      oldSearchParams: {},
      selectedCountry: null,
      selectedCountryID: null,
      selectedDataset: null,
      selectedDatasetID: null,
      selectedInstrument: null,
      selectedInstrumentID: null,
      selectedStation: null,
      selectedStationID: null,
      selectedYearRange: [null, null],
      stations: { orderByID: [], orderByName: [] },
      stationOrder: 'orderByName'
    }
  },
  computed: {
    boundingBoxArray() {
      return [
        Math.max(-180, this.mapBoundingBox.getWest()),
        Math.max(-90, this.mapBoundingBox.getSouth()),
        Math.min(180, this.mapBoundingBox.getEast()),
        Math.min(90, this.mapBoundingBox.getNorth())
      ]
    },
    countryOptions() {
      const nullOption = {
        text: this.$t('common.all'),
        value: null,
        element: null
      }

      const orderedCountries = this.countries[this.countryOrder]

      if (this.mapBoundingBox === null) {
        const countryOptions = orderedCountries.map(this.countryToSelectOption)
        return [ nullOption ].concat(countryOptions)
      } else {
        const boundaries = this.$store.getters['countries/boundaries']
        const visibleOptions = orderedCountries.filter((country) => {
          const selected = country.country_id === this.selectedCountryID
          const countryBoundingBox = boundaries[country.country_id]

          let visible
          if (countryBoundingBox === null) {
            visible = this.mapBoundingBox.contains(country.geometry.coordinates)
          } else {
            visible = this.mapBoundingBox.intersects(countryBoundingBox)
          }

          return selected || visible
        })

        const countryOptions = visibleOptions.map(this.countryToSelectOption)
        return [ nullOption ].concat(countryOptions)
      }
    },
    dataRecordHeaders() {
      const headerKeys = [
        'timestamp_date',
        'content_category',
        'platform_type',
        'platform_id',
        'instrument_name',
        'processed_datetime',
        'actions'
      ]

      return headerKeys.map((key) => {
        return {
          text: this.$t('data.explore.table-headers.' + key.replace('_', '-')),
          value: key
        }
      })
    },
    datasetOptions() {
      const datasetSections = {
        totalozone: {
          daily: 'TotalOzone',
          hourly: 'TotalOzoneObs'
        },
        'vertical-ozone': {
          lidar: 'Lidar',
          ozonesonde: 'OzoneSonde',
          umkehr1: 'UmkehrN14_1.0',
          umkehr2: 'UmkehrN14_2.0',
          rocketsonde: 'RocketSonde'
        },
        'uv-irradiance': {
          broadband: 'Broad-band',
          multiband: 'Multi-band',
          spectral: 'Spectral',
          'uv-index': 'uv_index_hourly'
        },
        'data-centers': {
          totalozone: 'ndacc-total',
          'vertical-ozone': 'ndacc-vertical',
          'uv-irradiance': 'ndacc-uv'
        }
      }

      const datasetOptions = []
      datasetOptions.push({
        text: this.$t('common.all'),
        value: null,
      })

      for (const [section, children] of Object.entries(datasetSections)) {
        datasetOptions.push({
          header: this.$t('data.explore.dataset.' + section + '.label')
        })
        for (const [subsection, id] of Object.entries(children)) {
          datasetOptions.push({
            text: this.$t('data.explore.dataset.' + section + '.' + subsection),
            value: id
          })
        }
      }

      return datasetOptions
    },
    filesInRange() {
      const startYear = this.selectedYearRange[0]
      const endYear = this.selectedYearRange[1]

      let fileCount = 0
      for (let year = startYear; year <= endYear; year++) {
        if (year in this.metricsByYear) {
          fileCount += this.metricsByYear[year].totalFiles
        }
      }

      return fileCount
    },
    instrumentOptions() {
      const nullOption = {
        text: this.$t('common.all'),
        value: null,
        element: null
      }

      const instrumentOptions = this.instruments.map(this.instrumentToSelectOption)
      return [ nullOption ].concat(instrumentOptions)
    },
    maxSelectableYear() {
      return (new Date()).getFullYear()
    },
    stationOptions() {
      const nullOption = {
        text: this.$t('common.all'),
        value: null,
        element: null
      }

      const orderedStations = this.stations[this.stationOrder]

      if (this.mapBoundingBox === null) {
        const stationOptions = orderedStations.map(this.stationToSelectOption)
        return [ nullOption ].concat(stationOptions)
      } else {
        const visibleOptions = orderedStations.filter((station) => {
          const selected = station.identifier === this.selectedStationID
          const coords = this.$L.latLng(station.geometry.coordinates)
          const visible = this.mapBoundingBox.contains(coords)

          return selected || visible
        })

        const stationOptions = visibleOptions.map(this.stationToSelectOption)
        return [ nullOption ].concat(stationOptions)
      }
    },
    searchOutOfDate() {
      const datasetOk = this.oldSearchParams.dataset === this.selectedDatasetID
      const countryOk = this.oldSearchParams.country === this.selectedCountryID
      const stationOk = this.oldSearchParams.station === this.selectedStationID
      const instrumentOk = this.oldSearchParams.instrument === this.selectedInstrumentID

      const startYearOk = this.oldSearchParams['start-year'] === this.selectedYearRange[0]
      const endYearOk = this.oldSearchParams['end-year'] === this.selectedYearRange[1]

      return !(datasetOk && countryOk && stationOk && instrumentOk && startYearOk && endYearOk)
    },
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch('countries/download'),
      this.$store.dispatch('stations/download'),
      this.$store.dispatch('instruments/download')
    ])

    const countries = this.$store.getters['countries/all']
    const stations = this.$store.getters['stations/all']
    const instruments = this.$store.getters['instruments/nameResolution']

    this.countries = {
      orderByCode: countries.orderByCode.map(stripProperties),
      orderByName: countries.orderByName.map(stripProperties)
    }
    this.stations = {
      orderByID: stations.orderByID.map(unpackageBareStation),
      orderByName: stations.orderByName.map(unpackageBareStation)
    }
    this.instruments = instruments.map(stripProperties)

    this.loadingCountries = false
    this.loadingStations = false
    this.loadingInstruments = false
    this.loadingMap = false

    this.selectedDataset = this.$t('common.all')
    this.selectedYearRange = [
      this.minSelectableYear, this.maxSelectableYear
    ]

    this.refreshMetrics()
  },
  methods: {
    addToStartYear(amount) {
      const newStartYear = this.selectedYearRange[0] + amount
      this.setStartYear(newStartYear)
    },
    addToEndYear(amount) {
      const newEndYear = this.selectedYearRange[1] + amount
      this.setEndYear(newEndYear)
    },
    async changeDataset(dataset) {
      this.loadingCountries = true
      this.loadingStations = true
      this.loadingInstruments = true
      this.loadingMap = true

      const { countries, stations, instruments } =
        await this.sendDropdownRequest(dataset.value, null, null)

      const dependencies = [
        { field: 'selectedCountryID', key: 'country_id', elements: countries.orderByName },
        { field: 'selectedStationID', key: 'station_id', elements: stations.orderByID },
        { field: 'selectedInstrumentID', key: 'instrument_name', elements: instruments }
      ]

      const retain = {}
      for (const { field, key, elements } of dependencies) {
        retain[field] = elements.some((element) => {
          return element.properties[key] === this[field]
        })
      }

      if (!retain.selectedCountryID) {
        this.selectedCountry = null
        this.selectedCountryID = null
        this.mapFocusCountry = null
      }
      if (!retain.selectedStationID) {
        this.selectedStation = null
        this.selectedStationID = null
      }
      if (!retain.selectedInstrumentID) {
        this.selectedInstrument = null
        this.selectedInstrumentID = null
      }

      this.selectedDataset = dataset.text
      this.selectedDatasetID = dataset.value

      this.refreshDropdowns()
      this.loadingCountries = false
      this.loadingStations = false
      this.loadingInstruments = false
      this.loadingMap = false

      this.refreshMetrics()
    },
    async changeCountry(country) {
      this.loadingStations = true
      this.loadingInstruments = true
      this.loadingMap = true

      const { stations, instruments } =
        await this.sendDropdownRequest(this.selectedDatasetID, country.value, null)

      const dependencies = [
        { field: 'selectedStationID', key: 'station_id', elements: stations.orderByID },
        { field: 'selectedInstrumentID', key: 'instrument_name', elements: instruments }
      ]

      const retain = {}
      for (const { field, key, elements } of dependencies) {
        retain[field] = elements.some((element) => {
          return element.properties[key] === this[field]
        })
      }

      if (!retain.selectedStationID) {
        this.selectedStation = null
        this.selectedStationID = null
      }
      if (!retain.selectedInstrumentID) {
        this.selectedInstrument = null
        this.selectedInstrumentID = null
      }

      this.selectedCountry = country.element
      this.selectedCountryID = country.value

      await this.refreshDropdowns()
      this.loadingStations = false
      this.loadingInstruments = false
      this.loadingMap = false

      this.mapFocusCountry = country.value
      this.refreshMetrics()
    },
    async changeStation(station) {
      if (station === null) {
        this.selectedStation = null
        this.selectedStationID = null
      } else {
        this.selectedStation = station
        this.selectedStationID = station.woudc_id || station.station_id
      }

      this.loadingInstruments = true
      await this.refreshDropdowns()
      this.loadingInstruments = false

      const instrumentRetained = this.instruments.some((instrument) => {
        return instrument.instrument_name === this.selectedInstrumentID
      })
      if (!instrumentRetained) {
        this.selectedInstrument = null
        this.selectedInstrumentID = null
      }
      this.refreshMetrics()
    },
    changeInstrument(instrument) {
      this.selectedInstrument = instrument.element
      this.selectedInstrumentID = instrument.value

      this.refreshMetrics()
    },
    countryText(country) {
      const countryID = country.country_id || country.country_code
      const countryName = {
        en: country.country_name_en,
        fr: country.country_name_fr
      }

      return countryName[this.$i18n.locale] + ' (' + countryID + ')'
    },
    countryToSelectOption(country) {
      return {
        text: this.countryText(country),
        value: country.country_id || country.country_code,
        element: country
      }
    },
    instrumentText(instrument) {
      return instrument.name || instrument.instrument_name
    },
    instrumentToSelectOption(instrument) {
      return {
        text: this.instrumentText(instrument),
        value: instrument.name || instrument.instrument_name,
        element: instrument
      }
    },
    stationText(station) {
      const stationID = station.woudc_id || station.station_id
      const stationName = station.name || station.station_name

      return stationName + ' (' + stationID + ')'
    },
    stationToSelectOption(station) {
      return {
        text: this.stationText(station),
        value: station.woudc_id || station.station_id,
        element: station
      }
    },
    async reset() {
      this.selectedDataset = this.$t('common.all')
      this.selectedDatasetID = null
      this.selectedCountry = null
      this.selectedCountryID = null
      this.selectedStation = null
      this.selectedStationID = null
      this.selectedInstrument = null
      this.selectedInstrumentID = null

      this.selectedYearRange = [
        this.minSelectableYear,
        this.maxSelectableYear
      ]

      this.dataRecords = []
      this.oldSearchExists = false
      this.oldSearchParams = {}

      this.loadingCountries = true
      this.loadingStations = true
      this.loadingInstruments = true
      this.loadingMap = true
      await this.refreshDropdowns()
      this.loadingCountries = false
      this.loadingStations = false
      this.loadingInstruments = false
      this.loadingMap = false

      this.refreshMetrics()
    },
    async refreshDataRecords() {
      this.loadingDataRecords = true

      const dataRecordsURL = '/collections/data_records/items'
      let queryParams = 'sortby=timestamp_date:D,platform_id:A,content_category:A'

      const selected = {
        'content_category': this.selectedDatasetID,
        'platform_country': this.selectedCountryID,
        'platform_id': this.selectedStationID,
        'instrument_name': this.selectedInstrumentID
      }

      for (const [field, value] of Object.entries(selected)) {
        if (value !== null) {
          queryParams += '&' + field + '=' + value
        }
      }

      const response = await woudcClient.get(dataRecordsURL + '?' + queryParams)

      this.dataRecords = response.data.features.map(stripProperties)
      this.oldSearchParams = {
        country: this.selectedCountryID,
        dataset: this.selectedDatasetID,
        instrument: this.selectedInstrumentID,
        station: this.selectedStationID,
        'start-year': this.selectedYearRange[0],
        'end-year': this.selectedYearRange[1]
      }
      this.oldSearchExists = true
      this.loadingDataRecords = false
    },
    async refreshDropdowns() {
      const { countries, stations, instruments } = await this.sendDropdownRequest(
        this.selectedDatasetID, this.selectedCountryID, this.selectedStationID
      )

      this.countries = {
        orderByCode: countries.orderByCode.map(stripProperties),
        orderByName: countries.orderByName.map(stripProperties)
      }
      this.stations = {
        orderByID: stations.orderByID.map(unpackageBareStation),
        orderByName: stations.orderByName.map(unpackageBareStation)
      }
      this.instruments = instruments.map(stripProperties)

    },
    async refreshMetrics() {
      const inputs = [
        {
          id: 'domain',
          type: 'text/plain',
          value: 'contributor'
        },
        {
          id: 'timescale',
          type: 'text/plain',
          value: 'year'
        }
      ]

      const paramNames = {
        dataset: this.selectedDatasetID,
        country: this.selectedCountryID,
        station: this.selectedStationID,
        network: this.selectedInstrumentID
      }

      if (this.mapBoundingBox !== null) {
        const components = [
          Math.max(-180, this.mapBoundingBox.getWest()),
          Math.max(-90, this.mapBoundingBox.getSouth()),
          Math.min(180, this.mapBoundingBox.getEast()),
          Math.min(90, this.mapBoundingBox.getNorth())
        ]
        paramNames.bbox = components.join(',')
      }

      for (const [ name, paramValue ] of Object.entries(paramNames)) {
        if (paramValue !== null) {
          inputs.push({
            id: name,
            type: 'text/plain',
            value: paramValue
          })
        }
      }

      const metricsURL = 'processes/woudc-data-registry-metrics/jobs'
      const queryParams = { inputs }

      const response = await woudcClient.post(metricsURL, queryParams)

      const newMetrics = {}
      response.data.outputs.metrics.forEach((metric) => {
        newMetrics[metric.year] = {
          totalFiles: metric.total_files,
          totalObs: metric.total_obs
        }
      })

      this.metricsByYear = newMetrics
    },
    async sendDropdownRequest(dataset, country, station) {
      const dropdownsURL = '/processes/woudc-data-registry-explore/jobs'
      const inputs = []

      const selections = { dataset, country, station }
      for (const [domain, selected] of Object.entries(selections)) {
        if (selected === 'uv_index_hourly') {
          inputs.push({
            id: domain,
            type: 'application/json',
            value: [ 'Broad-band', 'Spectral' ]
          })
        } else if (selected !== null) {
          inputs.push({
            id: domain,
            type: 'text/plain',
            value: selected
          })
        }
      }

      const queryParams = { inputs }
      const response = await woudcClient.post(dropdownsURL, queryParams)

      const countries = {
        orderByCode: response.data.outputs.countries.sortby_country_id,
        orderByName: response.data.outputs.countries.sortby_country_name_en
      }
      const stations = {
        orderByID: response.data.outputs.stations.sortby_station_id,
        orderByName: response.data.outputs.stations.sortby_station_name
      }
      const instruments = response.data.outputs.instruments.sortby_instrument_name

      return { countries, stations, instruments }
    },
    setEndYear(newEndYear) {
      const oldStartYear = this.selectedYearRange[0]
      let tempEndYear = this.maxSelectableYear

      if (newEndYear >= this.maxSelectableYear) {
        newEndYear = this.maxSelectableYear
        tempEndYear = oldStartYear
      } else if (newEndYear < oldStartYear) {
        newEndYear = oldStartYear
      }

      // Set a temporary value, different from the current value, to force
      // certain components to update.
      this.selectedYearRange = [ oldStartYear, tempEndYear ]
      this.$nextTick(() => {
        // Set the actual intended value for the end year.
        this.selectedYearRange = [ oldStartYear, newEndYear ]
      })
    },
    setStartYear(newStartYear) {
      const oldEndYear = this.selectedYearRange[1]
      let tempStartYear = this.minSelectableYear

      if (newStartYear <= this.minSelectableYear) {
        newStartYear = this.minSelectableYear
        tempStartYear = oldEndYear
      } else if (newStartYear > oldEndYear) {
        newStartYear = oldEndYear
      }

      // Set a temporary value, different from the current value, to force
      // certain components to update.
      this.selectedYearRange = [ tempStartYear, oldEndYear ]
      this.$nextTick(() => {
        // Set the actual intended value for the start year.
        this.selectedYearRange = [ newStartYear, oldEndYear ]
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/data-search-and-download',
      fr: '/donnees/rechercher-et-telecharger-de-donnees'
    }
  }
}
</script>

<style>
.v-select-list .v-subheader {
  font-weight: bold;
  background-color: #e4e4e4;
  padding-left: 12px;
}

/* Hide "spinner" buttons on numeric inputs */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
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
