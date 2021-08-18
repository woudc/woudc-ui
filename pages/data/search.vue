<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('data.explore.title') }}</h1>
        <p>{{ $t('data.explore.blurb.body-datasets') }}</p>
        <p>{{ $t('data.explore.blurb.body-search') }}</p>
        <i18n path="data.explore.blurb.body-howto" tag="p">
          <template v-slot:how-to>
            <nuxt-link :to="localePath('data-data_access')">
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
              <v-radio
                class="mb-0"
                :label="$t('data.explore.country.id')"
                value="country_id"
              />
              <v-radio
                :label="$t('data.explore.country.name')"
                :value="`country_name_${$i18n.locale}`"
              />
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
              <v-radio
                class="mb-0"
                :label="$t('common.station-id')"
                value="woudc_id"
              />
              <v-radio :label="$t('common.station-name')" value="name" />
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
          :elements="stations"
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
            {{ $t('data.explore.instrument.title')
            }}{{ $t('common.colon-style') }}
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
          :disabled="
            loadingStations ||
              loadingCountries ||
              loadingInstruments ||
              loadingMap ||
              loadingDataRecords
          "
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
            :options.sync="options"
            :server-items-length="numberMatched"
            :loading="loadingDataRecords"
            @pagination="refreshDataRecordsPage"
          >
            <template v-slot:item.observation_date="row">
              <p v-if="row.item.observation_date">
                {{ row.item.observation_date.substring(0, 10) }}
              </p>
            </template>
            <template v-slot:item.platform_id="row">
              <nuxt-link
                v-if="
                  selectedDatasetID === 'uv_index_hourly' ||
                    selectedDatasetID === 'TotalOzone'
                "
                :to="localePath('data-stations') + '/' + row.item.station_id"
              >
                {{ row.item.station_id }}
              </nuxt-link>
              <nuxt-link
                v-else
                :to="localePath('data-stations') + '/' + row.item.platform_id"
              >
                {{ row.item.platform_id }}
              </nuxt-link>
            </template>
            <template v-slot:item.station_gaw_id="row">
              <a :href="row.item.station_gaw_url" target="_blank">
                {{ row.item.station_gaw_id }}
              </a>
            </template>
            <template v-slot:item.contributor_acronym="row">
              <a :href="row.item.contributor_url" target="_blank">
                {{ row.item.contributor_acronym }}
              </a>
            </template>
            <template v-slot:item.observation_time="row">
              <p v-if="row.item.observation_time">
                {{ row.item.observation_time.substring(11, 13) }}
              </p>
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
import { getExplore, getMetrics } from '~/plugins/api/wdr.api.processes'
import {
  stripProperties,
  unpackageBareStation,
  compareOnKey
} from '~/plugins/unpackage'

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
      countries: [],
      countryOrder: `country_name_${this.$i18n.locale}`,
      numberMatched: 0,
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
      stations: [],
      stationsWithMetadata: [],
      stationOrder: 'name',
      options: {
        page: 1,
        itemsPerPage: 10
      }
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
        // All countries option
        text: this.$t('common.all'),
        value: null,
        element: null
      }

      const orderedCountries = this.countries

      const countryOptions = orderedCountries
        .sort(compareOnKey(this.countryOrder))
        .map(this.countryToSelectOption)
      return [nullOption].concat(countryOptions)
    },
    dataRecordHeaders() {
      let headerKeys = []
      if (this.selectedDatasetID === 'uv_index_hourly') {
        headerKeys = [
          'observation_date',
          'contributor_acronym',
          'platform_id',
          'station_gaw_id',
          this.countryOrder,
          'observation_time',
          'station_name',
          'instrument_name',
          'instrument_model',
          'instrument_serial',
          'uv_index',
          'uv_daily_max',
          'actions'
        ]
      } else if (this.selectedDatasetID === 'TotalOzone') {
        headerKeys = [
          'observation_date',
          'contributor_acronym',
          'platform_id',
          'station_gaw_id',
          this.countryOrder,
          'monthly_date',
          'monthly_npts',
          'daily_date',
          'daily_utc_begin',
          'daily_utc_end',
          'daily_nobs',
          'actions'
        ]
      } else {
        headerKeys = [
          'timestamp_utc',
          'content_category',
          'platform_type',
          'platform_id',
          'instrument_name',
          'processed_datetime',
          'actions'
        ]
      }

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
        } /*, // disabled until support for station/metric integration
        'data-centers': {
          totalozone: 'ndacc-total',
          'vertical-ozone': 'ndacc-vertical',
          'uv-irradiance': 'ndacc-uv',
          eubrewnet: 'peer_data_records'
        }*/
      }

      const datasetOptions = []
      datasetOptions.push({
        text: this.$t('common.all'),
        value: null
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

      const instrumentOptions = this.instruments.map(
        this.instrumentToSelectOption
      )
      return [nullOption].concat(instrumentOptions)
    },
    maxSelectableYear() {
      return new Date().getFullYear()
    },
    stationOptions() {
      const nullOption = {
        text: this.$t('common.all'),
        value: null,
        element: null
      }

      const orderedStations = this.stations

      if (this.mapBoundingBox === null) {
        const stationOptions = orderedStations
          .sort(compareOnKey(this.stationOrder))
          .map(this.stationToSelectOption)
        return [nullOption].concat(stationOptions)
      } else {
        const visibleOptions = orderedStations.filter((station) => {
          const selected = station.identifier === this.selectedStationID
          const coords = this.$L.latLng(station.geometry.coordinates)
          const visible = this.mapBoundingBox.contains(coords)

          return selected || visible
        })

        const stationOptions = visibleOptions
          .sort(compareOnKey(this.stationOrder))
          .map(this.stationToSelectOption)
        this.refreshMetrics()
        return [nullOption].concat(stationOptions)
      }
    },
    searchOutOfDate() {
      const datasetOk = this.oldSearchParams.dataset === this.selectedDatasetID
      const countryOk = this.oldSearchParams.country === this.selectedCountryID
      const stationOk = this.oldSearchParams.station === this.selectedStationID
      const instrumentOk =
        this.oldSearchParams.instrument === this.selectedInstrumentID

      const startYearOk =
        this.oldSearchParams['start-year'] === this.selectedYearRange[0]
      const endYearOk =
        this.oldSearchParams['end-year'] === this.selectedYearRange[1]

      return !(
        datasetOk &&
        countryOk &&
        stationOk &&
        instrumentOk &&
        startYearOk &&
        endYearOk
      )
    }
  },
  mounted() {
    Promise.all([
      this.$store.dispatch('countries/downloadCountries'),
      this.$store.dispatch('countries/downloadBounds'),
      this.$store.dispatch('stations/downloadStationsByDataset'),
      this.$store.dispatch('instruments/download')
    ]).then(() => {
      const countries = this.$store.getters['countries/all']
      const stations = this.$store.getters['stations/all']
      const instruments = this.$store.getters['instruments/nameResolution']

      this.countries = countries.map(stripProperties)
      this.stations = stations.map(unpackageBareStation)
      this.stationsWithMetadata = stations.map(unpackageBareStation)
      this.instruments = instruments.map(stripProperties)

      this.loadingCountries = false
      this.loadingStations = false
      this.loadingInstruments = false
      this.loadingMap = false

      this.selectedDataset = this.$t('common.all')
      this.selectedYearRange = [this.minSelectableYear, this.maxSelectableYear]

      this.refreshMetrics()
    })
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

      const {
        countries,
        stations,
        instruments
      } = await this.sendDropdownRequest(dataset.value, null, null)

      const dependencies = [
        { field: 'selectedCountryID', key: 'country_id', elements: countries },
        { field: 'selectedStationID', key: 'station_id', elements: stations },
        {
          field: 'selectedInstrumentID',
          key: 'instrument_name',
          elements: instruments
        }
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

      this.selectedCountry = country.element
      this.selectedCountryID = country.value
      const { stations, instruments } = await this.sendDropdownRequest(
        this.selectedDatasetID,
        country.value,
        null
      )

      const dependencies = [
        { field: 'selectedStationID', key: 'station_id', elements: stations },
        {
          field: 'selectedInstrumentID',
          key: 'instrument_name',
          elements: instruments
        }
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
      if (station === null) {
        this.refreshMetrics()
      } else {
        const countryNameProp = `country_name_${this.$i18n.locale}`
        const stationName =
          station['name'] === undefined
            ? station['station_name']
            : station['name']
        const countryName = this.stationsWithMetadata[
          this.stationsWithMetadata.findIndex((s) => s['name'] === stationName)
        ][countryNameProp]
        const countryOptionsElems = this.countryOptions.slice(1)
        const country =
          countryOptionsElems[
            countryOptionsElems.findIndex(
              (c) => c['element'][countryNameProp] === countryName
            )
          ]
        this.changeCountry(country)
      }
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

      if (this.countryOrder === 'country_id') {
        return '(' + countryID + ') ' + countryName[this.$i18n.locale]
      } else {
        // country name
        return countryName[this.$i18n.locale] + ' (' + countryID + ')'
      }
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

      if (this.stationOrder === 'woudc_id') {
        return '(' + stationID + ') ' + stationName
      } else {
        // name
        return stationName + ' (' + stationID + ')'
      }
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

      this.selectedYearRange = [this.minSelectableYear, this.maxSelectableYear]

      this.dataRecords = []
      this.oldSearchExists = false
      this.oldSearchParams = {}
      this.numberMatched = 0

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

      const dataRecordsURL =
        this.$config.WOUDC_UI_API + '/collections/data_records/items'
      const UVIndexURL =
        this.$config.WOUDC_UI_API + '/collections/uv_index_hourly/items'
      const totalOzoneURL =
        this.$config.WOUDC_UI_API + '/collections/totalozone/items'
      let queryParams = ''
      let selected = ''
      if (this.selectedDatasetID === 'uv_index_hourly') {
        selected = {
          country_id: this.selectedCountryID,
          station_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
        queryParams = 'sortby=-observation_date,station_id,dataset_id'
      } else if (this.selectedDatasetID === 'TotalOzone') {
        selected = {
          country_id: this.selectedCountryID,
          station_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
        queryParams = 'sortby=-daily_date,station_id'
      } else {
        selected = {
          content_category: this.selectedDatasetID,
          platform_country: this.selectedCountryID,
          platform_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
        queryParams = 'sortby=-timestamp_date,platform_id,content_category'
      }

      if (this.selectedCountry === null && this.selectedStationID === null) {
        // Select only countries and stations visible on the map
        let stationIDs = ''
        for (const station of this.stationOptions) {
          stationIDs = stationIDs + station['value'] + '|'
        }
        if (
          this.selectedDatasetID === 'uv_index_hourly' ||
          this.selectedDatasetID === 'TotalOzone'
        ) {
          selected['station_id'] = stationIDs
        } else {
          selected['platform_id'] = stationIDs
        }
      }

      for (const [field, value] of Object.entries(selected)) {
        if (value !== null) {
          queryParams += '&' + field + '=' + value
        }
      }
      if (
        this.selectedYearRange[0] != this.minSelectableYear ||
        this.selectedYearRange[1] != this.maxSelectableYear
      ) {
        let datetimeParams =
          'datetime=' +
          this.selectedYearRange[0] +
          '-01-01T00:00:00Z/' +
          this.selectedYearRange[1] +
          '-12-31T23:59:59Z'
        queryParams = queryParams + '&' + datetimeParams
      }

      let response = ''
      if (this.selectedDatasetID === 'uv_index_hourly') {
        response = await woudcClient.get(UVIndexURL + '?' + queryParams)
      } else if (this.selectedDatasetID === 'TotalOzone') {
        response = await woudcClient.get(totalOzoneURL + '?' + queryParams)
      } else {
        response = await woudcClient.get(dataRecordsURL + '?' + queryParams)
      }
      this.numberMatched = response.data.numberMatched
      this.oldSearchParams = {
        country: this.selectedCountryID,
        dataset: this.selectedDatasetID,
        instrument: this.selectedInstrumentID,
        station: this.selectedStationID,
        'start-year': this.selectedYearRange[0],
        'end-year': this.selectedYearRange[1]
      }
      this.oldSearchExists = true
    },
    async refreshDataRecordsPage(pagination) {
      const { itemsPerPage: results, page } = pagination
      this.pagination = pagination
      this.loadingDataRecords = true

      const dataRecordsURL =
        this.$config.WOUDC_UI_API + '/collections/data_records/items'
      const UVIndexURL =
        this.$config.WOUDC_UI_API + '/collections/uv_index_hourly/items'

      let queryParams = ''
      let selected = ''
      if (this.selectedDatasetID === 'uv_index_hourly') {
        selected = {
          country_id: this.selectedCountryID,
          station_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
        queryParams = 'sortby=-observation_date,station_id,dataset_id'
      } else {
        selected = {
          content_category: this.selectedDatasetID,
          platform_country: this.selectedCountryID,
          platform_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
        queryParams = 'sortby=-timestamp_date,platform_id,content_category'
      }
      if (this.selectedCountry === null && this.selectedStationID === null) {
        // Select only countries and stations visible on the map
        let stationIDs = ''
        for (const station of this.stationOptions) {
          stationIDs = stationIDs + station['value'] + '|'
        }
        if (
          this.selectedDatasetID === 'uv_index_hourly' ||
          this.selectedDatasetID === 'TotalOzone'
        ) {
          selected['station_id'] = stationIDs
        } else {
          selected['platform_id'] = stationIDs
        }
      }

      for (const [field, value] of Object.entries(selected)) {
        if (value !== null) {
          queryParams += '&' + field + '=' + value
        }
      }

      try {
        const currStartIndex = page * results - results
        const Limit = results
        if (this.selectedDatasetID === 'uv_index_hourly') {
          let response = await woudcClient.get(
            UVIndexURL +
              '?startindex=' +
              currStartIndex +
              '&limit=' +
              Limit +
              '&' +
              queryParams
          )
          this.dataRecords = response.data.features.map(stripProperties)
        } else {
          let response = await woudcClient.get(
            dataRecordsURL +
              '?startindex=' +
              currStartIndex +
              '&limit=' +
              Limit +
              '&' +
              queryParams
          )
          this.dataRecords = response.data.features.map(stripProperties)
        }
        this.loadingDataRecords = false
      } catch (error) {
        this.loadingDataRecords = false
      }
      this.loadingDataRecords = false
    },
    async refreshDropdowns() {
      const {
        countries,
        stations,
        instruments
      } = await this.sendDropdownRequest(
        this.selectedDatasetID,
        this.selectedCountryID,
        this.selectedStationID
      )

      this.countries = countries.map(stripProperties)
      this.stations = stations.map(unpackageBareStation)
      this.instruments = instruments.map(stripProperties)
    },
    async refreshMetrics() {
      const inputs = {
        domain: 'contributor',
        timescale: 'year'
      }

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
      for (const currParam of Object.entries(paramNames)) {
        const paramValue = currParam[1]
        if (paramValue === 'uv_index_hourly') {
          // Use spectral for graph until multi dataset metrics are available
          inputs.dataset = 'Spectral'
        } else if (paramValue !== null) {
          inputs[currParam[0]] = paramValue
        }
      }

      const queryParams = { inputs }
      const response = await getMetrics(this.$config.WOUDC_UI_API, queryParams)

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
      const inputs = {}

      const selections = { dataset, country, station }
      for (const currSelection of Object.entries(selections)) {
        const selected = currSelection[1]
        if (selected === 'uv_index_hourly') {
          inputs.domain = 'Broad-band,Spectral'
        } else if (selected !== null) {
          inputs[currSelection[0]] = selected
        }
      }

      const queryParams = { inputs }
      const response = await getExplore(this.$config.WOUDC_UI_API, queryParams)

      const countries = response.data.outputs.countries.sortby_country_id
      const stations = response.data.outputs.stations.sortby_station_id
      const instruments =
        response.data.outputs.instruments.sortby_instrument_name

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
      this.selectedYearRange = [oldStartYear, tempEndYear]
      this.$nextTick(() => {
        // Set the actual intended value for the end year.
        this.selectedYearRange = [oldStartYear, newEndYear]
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
      this.selectedYearRange = [tempStartYear, oldEndYear]
      this.$nextTick(() => {
        // Set the actual intended value for the start year.
        this.selectedYearRange = [newStartYear, oldEndYear]
      })
    }
  },
  head() {
    return {
      title: this.$t('data.explore.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.explore.blurb.body-datasets')
        }
      ]
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
input[type='number'] {
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
