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
          :reset="resettingMap"
          @select="changeStation"
          @move="mapBoundingBox = $event"
        >
          <template v-slot:popup="element">
            {{ element.item.name || element.item.station_name }}
            ({{ element.item.woudc_id || element.item.station_id }})
          </template>
        </selectable-map>
        <v-switch
          v-model="enableBboxSearch"
          class="float-right"
          :label="$t('data.explore.bbox.switch')"
        ></v-switch>
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
          <v-chip
            v-if="boundingBoxArray !== null && enableBboxSearch == true"
            label
            small
            class="ml-1"
          >
            {{ $t('data.explore.bbox.title') }}{{ $t('common.colon-style') }}
            {{ boundingBoxArrayText(boundingBoxArray) }}
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
            :footer-props="{
              'items-per-page-options': [10, 25, 50, 100, 500]
            }"
            :loading="loadingDataRecords"
          >
            <template v-slot:item.observation_date="row">
              <p
                v-if="
                  (oldSearchParams['dataset'] === 'peer_data_records' ||
                    oldSearchParams['dataset'] === 'ndacc_total' ||
                    oldSearchParams['dataset'] === 'ndacc_uv' ||
                    oldSearchParams['dataset'] === 'ndacc_vertical') &
                    (oldSearchParams['dataset'] === setTable)
                "
              >
                {{ row.item.start_datetime.substring(0, 10) }}
              </p>
              <p v-else-if="row.item.observation_date">
                {{ row.item.observation_date.substring(0, 10) }}
              </p>
            </template>
            <template
              v-if="
                oldSearchParams['dataset'] === 'uv_index_hourly' ||
                  oldSearchParams['dataset'] === 'TotalOzone' ||
                  oldSearchParams['dataset'] === 'OzoneSonde' ||
                  oldSearchParams['dataset'] === 'peer_data_records' ||
                  oldSearchParams['dataset'] === 'ndacc_total' ||
                  oldSearchParams['dataset'] === 'ndacc_uv' ||
                  oldSearchParams['dataset'] === 'ndacc_vertical'
              "
              v-slot:item.station_id="row"
            >
              <nuxt-link
                :to="localePath('data-stations') + '/' + row.item.station_id"
              >
                {{ row.item.station_id }}
              </nuxt-link>
            </template>
            <template v-else v-slot:item.platform_id="row">
              <nuxt-link
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
            <template v-slot:item.gaw_id="row">
              <a :href="row.item.gaw_url" target="_blank">
                {{ row.item.gaw_id }}
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
            <template v-slot:item.timestamp_utc="row">
              <p v-if="row.item.timestamp_utc">
                {{ row.item.timestamp_utc.substring(0, 10) }}
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
      enableBboxSearch: true,
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
      oldDataRecordHeadersExists: false,
      oldSearchExists: false,
      oldSearchParams: {},
      options: {
        page: 1,
        itemsPerPage: 10,
        sortDesc: [],
        sortBy: []
      },
      resettingMap: false,
      selectedCountry: null,
      selectedCountryID: null,
      selectedDataset: null,
      selectedDatasetID: null,
      selectedInstrument: null,
      selectedInstrumentID: null,
      selectedStation: null,
      selectedStationID: null,
      selectedYearRange: [null, null],
      setTable: null,
      stations: [],
      stationsWithMetadata: [],
      stationOrder: 'name'
    }
  },
  computed: {
    boundingBoxArray() {
      if (this.mapBoundingBox !== null) {
        return [
          Math.max(-180, this.mapBoundingBox.getWest()),
          Math.max(-90, this.mapBoundingBox.getSouth()),
          Math.min(180, this.mapBoundingBox.getEast()),
          Math.min(90, this.mapBoundingBox.getNorth())
        ]
      } else {
        return null
      }
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
    newDataRecordHeaders() {
      let headerKeys = []
      if (this.selectedDatasetID === 'uv_index_hourly') {
        headerKeys = [
          'observation_date',
          'contributor_acronym',
          'station_id',
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
          'station_id',
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
      } else if (
        this.selectedDatasetID === 'peer_data_records' ||
        this.selectedDatasetID === 'ndacc_total' ||
        this.selectedDatasetID === 'ndacc_vertical' ||
        this.selectedDatasetID === 'ndacc_uv'
      ) {
        headerKeys = [
          'observation_date',
          'contributor_acronym',
          'station_id',
          'gaw_id',
          'measurement',
          'instrument_type',
          'start_datetime',
          'end_datetime',
          'actions'
        ]
      } else if (this.selectedDatasetID === 'OzoneSonde') {
        headerKeys = [
          'timestamp_date',
          'contributor_acronym',
          'station_id',
          'station_gaw_id',
          this.countryOrder,
          'o3partialpressure',
          'pressure',
          'temperature',
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
        },
        'data-centers': {
          totalozone: 'ndacc_total',
          'vertical-ozone': 'ndacc_vertical',
          'uv-irradiance': 'ndacc_uv',
          eubrewnet: 'peer_data_records'
        }
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
        return [nullOption].concat(stationOptions)
      }
    },
    searchOutOfDate() {
      const datasetOk = this.oldSearchParams.dataset === this.selectedDatasetID
      const countryOk = this.oldSearchParams.country === this.selectedCountryID
      const stationOk = this.oldSearchParams.station === this.selectedStationID
      const instrumentOk =
        this.oldSearchParams.instrument === this.selectedInstrumentID
      const bboxOk =
        (this.oldSearchParams.bbox === this.boundingBoxArray &&
          this.enableBboxSearch === true) ||
        (this.oldSearchParams.bbox === undefined &&
          this.enableBboxSearch === false)

      const startYearOk =
        this.oldSearchParams['start-year'] === this.selectedYearRange[0]
      const endYearOk =
        this.oldSearchParams['end-year'] === this.selectedYearRange[1]

      return !(
        bboxOk &&
        datasetOk &&
        countryOk &&
        stationOk &&
        instrumentOk &&
        startYearOk &&
        endYearOk
      )
    }
  },
  watch: {
    boundingBoxArray: {
      async handler() {
        if (this.enableBboxSearch == true) {
          this.refreshMetrics()
        }
      },
      deep: true
    },
    enableBboxSearch: {
      async handler() {
        this.refreshMetrics()
      }
    },
    options: {
      async handler() {
        this.refreshDataRecordsPage()
      },
      deep: true
    }
  },
  mounted() {
    Promise.all([
      this.$store.dispatch('countries/downloadCountries'),
      this.$store.dispatch('countries/downloadBounds'),
      this.$store.dispatch('stations/downloadStationsByDataset'),
      this.$store.dispatch('instruments/downloadDistinctNames')
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
        if (elements !== undefined) {
          retain[field] = elements.some((element) => {
            return element.properties[key] === this[field]
          })
        }
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
    boundingBoxArrayText(boundingBoxArray) {
      return (
        '[ ' +
        parseFloat(boundingBoxArray[0]).toFixed(2) +
        ', ' +
        parseFloat(boundingBoxArray[1]).toFixed(2) +
        ', ' +
        parseFloat(boundingBoxArray[2]).toFixed(2) +
        ', ' +
        parseFloat(boundingBoxArray[3]).toFixed(2) +
        ' ]'
      )
    },
    async changeCountry(country) {
      this.loadingStations = true
      this.loadingInstruments = true
      this.loadingMap = true

      this.selectedCountry = country.element
      this.selectedCountryID = country.value

      if (country.text !== 'All') {
        this.enableBboxSearch = false
      }

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

      if (
        this.selectedDatasetID !== 'peer_data_records' &&
        this.selectedDatasetID !== 'ndacc_total' &&
        this.selectedDatasetID !== 'ndacc_uv' &&
        this.selectedDatasetID !== 'ndacc_vertical'
      ) {
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
        this.enableBboxSearch = false
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
      if (
        station === null ||
        this.selectedDatasetID == 'peer_data_records' ||
        this.selectedDatasetID == 'ndacc_total' ||
        this.selectedDatasetID == 'ndacc_uv' ||
        this.selectedDatasetID == 'ndacc_vertical'
      ) {
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
      this.loadingMap = true
      this.enableBboxSearch = true
      this.resettingMap = true

      this.selectedDataset = this.$t('common.all')
      this.selectedDatasetID = null
      this.selectedStation = null
      this.selectedStationID = null
      this.selectedInstrument = null
      this.selectedInstrumentID = null
      this.selectedCountryID = null
      this.selectedCountry = null

      this.selectedYearRange = [this.minSelectableYear, this.maxSelectableYear]

      this.dataRecords = []
      this.oldDataRecordHeadersExists = false
      this.oldSearchExists = false
      this.oldSearchParams = {}
      this.options = {
        page: 1,
        itemsPerPage: 10,
        sortDesc: [],
        sortBy: []
      }
      this.numberMatched = 0

      this.loadingCountries = true
      this.loadingStations = true
      this.loadingInstruments = true
      this.loadingMap = true
      await this.refreshDropdowns()
      this.loadingCountries = false
      this.loadingStations = false
      this.loadingInstruments = false
      this.resettingMap = false
      this.loadingMap = false
      this.setTable = null

      this.refreshMetrics()
    },
    async refreshDataRecords() {
      this.loadingDataRecords = true
      this.dataRecordHeaders = this.newDataRecordHeaders

      const dataRecordsURL =
        this.$config.WOUDC_UI_API + '/collections/data_records/items'
      const ozoneSondeURL =
        this.$config.WOUDC_UI_API + '/collections/ozonesonde/items'
      const peerDataRecordsURL =
        this.$config.WOUDC_UI_API + '/collections/peer_data_records/items'
      const totalOzoneURL =
        this.$config.WOUDC_UI_API + '/collections/totalozone/items'
      const UVIndexURL =
        this.$config.WOUDC_UI_API + '/collections/uv_index_hourly/items'
      const ndacc_datasets = {
        ndacc_total: 'TOTALCOL',
        ndacc_uv: 'UV',
        ndacc_vertical: 'OZONE'
      }

      let queryParams = ''
      if (this.options['sortBy'].length === 0) {
        const sortByParams = {
          uv_index_hourly: 'observation_date,station_id,dataset_id',
          TotalOzone: 'daily_date,station_id',
          peer_data_records: 'start_datetime,station_id,measurement',
          ndacc_total: 'start_datetime,station_id,measurement',
          ndacc_vertical: 'start_datetime,station_id,measurement',
          ndacc_uv: 'start_datetime,station_id,measurement',
          OzoneSonde: 'timestamp_date,station_id',
          data_records: 'timestamp_date,platform_id,content_category'
        }
        if (sortByParams[this.selectedDatasetID] !== undefined) {
          queryParams = 'sortby=-' + sortByParams[this.selectedDatasetID]
        } else {
          queryParams = 'sortby=-' + sortByParams['data_records']
        }
      } else {
        queryParams =
          this.options['sortDesc'][0] == true
            ? 'sortby=-' + this.options['sortBy']
            : 'sortby=' + this.options['sortBy']
      }

      let selected = {}
      if (this.selectedDatasetID === 'uv_index_hourly') {
        selected = {
          country_id: this.selectedCountryID,
          station_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
      } else if (this.selectedDatasetID === 'TotalOzone') {
        selected = {
          country_id: this.selectedCountryID,
          station_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
      } else if (this.selectedDatasetID === 'peer_data_records') {
        selected = {
          source: 'eubrewnet',
          country_id: this.selectedCountryID,
          station_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
      } else if (
        this.selectedDatasetID === 'ndacc_total' ||
        this.selectedDatasetID === 'ndacc_vertical' ||
        this.selectedDatasetID === 'ndacc_uv'
      ) {
        selected = {
          source: 'ndacc',
          measurement: ndacc_datasets[this.selectedDatasetID],
          country_id: this.selectedCountryID,
          station_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
      } else if (this.selectedDatasetID === 'OzoneSonde') {
        selected = {
          country_id: this.selectedCountryID,
          station_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
      } else {
        selected = {
          content_category: this.selectedDatasetID,
          platform_country: this.selectedCountryID,
          platform_id: this.selectedStationID,
          instrument_name: this.selectedInstrumentID
        }
      }

      if (
        this.selectedCountry === null &&
        this.selectedStationID === null &&
        this.enableBboxSearch == true &&
        this.mapBoundingBox !== null
      ) {
        // Select only countries and stations visible on the map
        let bboxParams = ''
        for (const coord of this.boundingBoxArray) {
          bboxParams = bboxParams + ',' + coord
        }
        selected['bbox'] = bboxParams.substring(1)
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
      } else if (
        this.selectedDatasetID === 'peer_data_records' ||
        this.selectedDatasetID === 'ndacc_total' ||
        this.selectedDatasetID === 'ndacc_vertical' ||
        this.selectedDatasetID === 'ndacc_uv'
      ) {
        response = await woudcClient.get(peerDataRecordsURL + '?' + queryParams)
      } else if (this.selectedDatasetID === 'OzoneSonde') {
        response = await woudcClient.get(
          ozoneSondeURL + '?' + queryParams + '&limit=1'
        )
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
      if (this.enableBboxSearch == true) {
        this.oldSearchParams['bbox'] = this.boundingBoxArray
      }

      this.oldSearchExists = true
      this.oldDataRecordHeadersExists = true
      this.loadingDataRecords = false
      this.refreshDataRecordsPage()
    },
    async refreshDataRecordsPage() {
      let itemsPerPage = this.options['itemsPerPage']
      let page = this.options['page']
      this.loadingDataRecords = true
      const ndacc_datasets = {
        ndacc_total: 'TOTALCOL',
        ndacc_uv: 'UV',
        ndacc_vertical: 'OZONE'
      }
      const dataRecordsURL =
        this.$config.WOUDC_UI_API + '/collections/data_records/items'
      const ozoneSondeURL =
        this.$config.WOUDC_UI_API + '/collections/ozonesonde/items'
      const UVIndexURL =
        this.$config.WOUDC_UI_API + '/collections/uv_index_hourly/items'
      const totalOzoneURL =
        this.$config.WOUDC_UI_API + '/collections/totalozone/items'
      const peerDataRecordsURL =
        this.$config.WOUDC_UI_API + '/collections/peer_data_records/items'

      let queryParams = ''
      if (this.options['sortBy'].length === 0) {
        const sortByParams = {
          uv_index_hourly: 'observation_date,station_id,dataset_id',
          TotalOzone: 'daily_date,station_id',
          peer_data_records: 'start_datetime,station_id,measurement',
          ndacc_total: 'start_datetime,station_id,measurement',
          ndacc_vertical: 'start_datetime,station_id,measurement',
          ndacc_uv: 'start_datetime,station_id,measurement',
          OzoneSonde: 'timestamp_date,station_id',
          data_records: 'timestamp_date,platform_id,content_category'
        }
        if (sortByParams[this.oldSearchParams['dataset']] !== undefined) {
          queryParams =
            'sortby=-' + sortByParams[this.oldSearchParams['dataset']]
        } else {
          queryParams = 'sortby=-' + sortByParams['data_records']
        }
      } else {
        queryParams =
          this.options['sortDesc'][0] == true
            ? 'sortby=-' + this.options['sortBy']
            : 'sortby=' + this.options['sortBy']
      }

      let selected = ''
      if (this.oldSearchParams['dataset'] === 'uv_index_hourly') {
        selected = {
          country_id: this.oldSearchParams['country'],
          station_id: this.oldSearchParams['station'],
          instrument_name: this.oldSearchParams['instrument']
        }
      } else if (this.oldSearchParams['dataset'] === 'TotalOzone') {
        selected = {
          country_id: this.oldSearchParams['country'],
          station_id: this.oldSearchParams['station'],
          instrument_name: this.oldSearchParams['instrument']
        }
      } else if (this.oldSearchParams['dataset'] === 'OzoneSonde') {
        selected = {
          country_id: this.oldSearchParams['country'],
          station_id: this.oldSearchParams['station'],
          instrument_name: this.oldSearchParams['instrument']
        }
      } else if (this.oldSearchParams['dataset'] === 'peer_data_records') {
        selected = {
          source: 'eubrewnet',
          country_id: this.oldSearchParams['country'],
          station_id: this.oldSearchParams['station'],
          instrument_name: this.oldSearchParams['instrument']
        }
      } else if (
        this.oldSearchParams['dataset'] === 'ndacc_total' ||
        this.oldSearchParams['dataset'] === 'ndacc_vertical' ||
        this.oldSearchParams['dataset'] === 'ndacc_uv'
      ) {
        selected = {
          source: 'ndacc',
          measurement: ndacc_datasets[this.oldSearchParams['dataset']],
          country_id: this.oldSearchParams['country'],
          station_id: this.oldSearchParams['station'],
          instrument_name: this.oldSearchParams['instrument']
        }
      } else {
        selected = {
          content_category: this.oldSearchParams['dataset'],
          platform_country: this.oldSearchParams['country'],
          platform_id: this.oldSearchParams['station'],
          instrument_name: this.oldSearchParams['instrument']
        }
      }
      if (
        this.oldSearchParams['country'] === null &&
        this.oldSearchParams['station'] === null &&
        this.enableBboxSearch == true &&
        this.mapBoundingBox !== null
      ) {
        // Select only countries and stations visible on the map
        let bboxParams = ''
        for (const coord of this.boundingBoxArray) {
          bboxParams = bboxParams + ',' + coord
        }
        selected['bbox'] = bboxParams.substring(1)
      }

      for (const [field, value] of Object.entries(selected)) {
        if (value !== null) {
          queryParams += '&' + field + '=' + value
        }
      }

      try {
        const startIndex = page * itemsPerPage - itemsPerPage
        const Limit = itemsPerPage

        if (this.oldSearchParams['dataset'] === 'uv_index_hourly') {
          let response = await woudcClient.get(
            UVIndexURL +
              '?startindex=' +
              startIndex +
              '&limit=' +
              Limit +
              '&' +
              queryParams
          )
          this.dataRecords = response.data.features.map(stripProperties)
        } else if (this.oldSearchParams['dataset'] === 'TotalOzone') {
          let response = await woudcClient.get(
            totalOzoneURL +
              '?startindex=' +
              startIndex +
              '&limit=' +
              Limit +
              '&' +
              queryParams
          )
          this.dataRecords = response.data.features.map(stripProperties)
        } else if (
          (this.oldSearchParams['dataset'] === 'peer_data_records') |
          (this.oldSearchParams['dataset'] === 'ndacc_total') |
          (this.oldSearchParams['dataset'] === 'ndacc_uv') |
          (this.oldSearchParams['dataset'] === 'ndacc_vertical')
        ) {
          let response = await woudcClient.get(
            peerDataRecordsURL +
              '?startindex=' +
              startIndex +
              '&limit=' +
              Limit +
              '&' +
              queryParams
          )
          this.dataRecords = response.data.features.map(stripProperties)
        } else if (this.oldSearchParams['dataset'] === 'OzoneSonde') {
          let response = await woudcClient.get(
            ozoneSondeURL +
              '?startindex=' +
              page +
              '&limit=1' +
              '&' +
              queryParams
          )
          this.numberMatched =
            response.data.numberMatched * this.options.itemsPerPage
          let r = []
          let totalLength = 0
          // results are first few entries of every file
          for (let i = 0; i < response.data.features.length; i++) {
            const length = response.data.features[i].properties.pressure.length
            for (let j = 0; j < length; j++) {
              const index = totalLength + j
              if (index < this.options.itemsPerPage) {
                r[index] = JSON.parse(JSON.stringify(response.data.features[i]))
                r[index].properties.o3partialpressure =
                  response.data.features[i].properties.o3partialpressure[j]
                r[index].properties.pressure =
                  response.data.features[i].properties.pressure[j]
                r[index].properties.temperature =
                  response.data.features[i].properties.temperature[j]
              }
            }
            totalLength += length
          }
          this.dataRecords = r.map(stripProperties)
        } else {
          let response = await woudcClient.get(
            dataRecordsURL +
              '?startindex=' +
              startIndex +
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
      this.setTable = this.oldSearchParams['dataset']
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
      if (
        (this.selectedDatasetID === 'peer_data_records') |
        (this.selectedDatasetID === 'ndacc_total') |
        (this.selectedDatasetID === 'ndacc_uv') |
        (this.selectedDatasetID === 'ndacc_vertical')
      ) {
        this.countries = []
        this.instruments = []
      } else {
        this.countries = countries.map(stripProperties)
        this.instruments = instruments.map(stripProperties)
      }
      if (this.selectedStationID === null) {
        this.stations = stations.map(unpackageBareStation)
      } else {
        const dropdowns = await this.sendDropdownRequest(
          this.selectedDatasetID,
          this.selectedCountryID,
          null
        )
        this.stations = dropdowns['stations'].map(unpackageBareStation)
      }
    },
    async refreshMetrics() {
      const inputs = {
        domain: 'contributor',
        timescale: 'year'
      }

      let paramNames = {
        dataset: this.selectedDatasetID,
        country: this.selectedCountryID,
        station: this.selectedStationID,
        network: this.selectedInstrumentID
      }
      if (this.enableBboxSearch == true) {
        paramNames['bbox'] = this.boundingBoxArray
      }
      if (
        this.selectedDatasetID === 'ndacc_total' ||
        this.selectedDatasetID === 'ndacc_uv' ||
        this.selectedDatasetID === 'ndacc_vertical'
      ) {
        paramNames['source'] = 'ndacc'
      }
      if (this.selectedDatasetID === 'peer_data_records') {
        paramNames['source'] = 'eubrewnet'
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
      response.data.metrics.forEach((metric) => {
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
          if (selected === 'peer_data_records') {
            inputs.source = 'eubrewnet'
          }
          if (
            selected === 'ndacc_total' ||
            selected === 'ndacc_uv' ||
            selected === 'ndacc_vertical'
          ) {
            inputs.source = 'ndacc'
          }
        }
      }

      const queryParams = { inputs }
      const response = await getExplore(this.$config.WOUDC_UI_API, queryParams)

      const countries = response.data.countries.sortby_country_id
      const stations = response.data.stations.sortby_station_id
      const instruments = response.data.instruments.sortby_instrument_name

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
