<template>
  <v-container>
    <h1>{{ $t('data.stations.title') }}</h1>
    <p>{{ $t('data.stations.blurb') }}</p>
    <v-row>
      <v-col>
        <selectable-map
          :elements="stations"
          :selected="selectedStation"
          :loading="loadingMap"
          :reset="resettingMap"
          @select="selectedStation = $event"
          @move="boundingBox = $event"
        >
          <template #popup="element">
            <strong>{{ $t('data.stations.gaw-id') }}</strong>
            <a :href="element.item.gaw_url" target="_blank">
              <span>
                {{ element.item.gaw_id }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
            <br />
            <strong>{{ $t('data.stations.station-id') }}</strong>
            <nuxt-link :to="'/data/stations/' + element.item.woudc_id">
              <span>{{ element.item.woudc_id }}</span>
            </nuxt-link>
            <br />
            <strong>{{ $t('data.stations.station-name') }}</strong>
            <span>{{ element.item.name }}</span>
            <br />
            <strong>{{ $t('data.stations.country-name') }}</strong>
            <span>{{ element.item.country_name[$i18n.locale] }}</span>
          </template>
        </selectable-map>
        <v-switch
          v-model="enableBboxSearch"
          class="mr-4 float-left"
          :label="$t('common.bbox.switch')"
        />
        <v-chip v-if="boundingBoxArray !== null" label small class="my-5">
          {{ $t('common.bbox.title') }}{{ $t('common.colon-style') }}
          {{ boundingBoxArrayText(boundingBoxArray) }}
        </v-chip>
      </v-col>
      <v-col>
        <map-instructions id="map-instructions" />
        <table-instructions id="table-instructions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <autocomplete-card
          :bboxarray="boundingBoxArray"
          :distinctfields="distinctStationFields"
          :selectedfilters="selectedFilters"
          :enablebboxsearch="enableBboxSearch"
          :loadingfields="loadingStationFields"
          :oldsearchparams="oldSearchParams"
          :refresh="refreshStations"
          :reset="reset"
          :resettingfilters="resettingFilters"
          :downloadurls="returnDownloadLinks"
        />
        <selectable-table
          :headers="headers"
          :elements="displayedStations"
          :selected="selectedStation"
          :loading="loadingTable"
          @select="selectedStation = $event"
        >
          <template #row="row">
            <td>
              <nuxt-link
                :to="localePath('data-stations') + '/' + row.item.woudc_id"
              >
                <span>{{ row.item.woudc_id }}</span>
              </nuxt-link>
            </td>
            <td>
              <span v-if="row.item.gaw_id !== null">
                <a :href="row.item.gaw_url" target="_blank">
                  <span>
                    {{ row.item.gaw_id }}
                    <v-icon x-small>mdi-open-in-new</v-icon>
                  </span>
                </a>
              </span>
            </td>
            <td>{{ row.item.start_date }}</td>
            <td>{{ row.item.end_date }}</td>
            <td>{{ row.item.name }}</td>
            <td>{{ row.item.country_name[$i18n.locale] }}</td>
            <td>{{ row.item.last_validated_datetime }}</td>
            <td>{{ row.item.type }}</td>
            <td>{{ row.item.wmo_region_id }}</td>
          </template>
        </selectable-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { unpackageStation } from '~/plugins/woudcJsonUtil.js'
import woudcClient from '~/plugins/woudcClient.js'

import mapInstructions from '~/components/MapInstructions'
import tableInstructions from '~/components/TableInstructions'
import SelectableMap from '~/components/SelectableMap'
import SelectableTable from '~/components/SelectableTable'
import AutocompleteCard from '~/components/AutocompleteCard'

export default {
  components: {
    'autocomplete-card': AutocompleteCard,
    'map-instructions': mapInstructions,
    'selectable-map': SelectableMap,
    'selectable-table': SelectableTable,
    'table-instructions': tableInstructions,
  },
  data() {
    return {
      boundingBox: null,
      displayedStations: [],
      distinctStationFields: {},
      enableBboxSearch: true,
      loadingMap: true,
      loadingStationFields: true,
      loadingTable: true,
      oldSearchParams: {
        bbox: [-180, -90, 180, 90],
        enableBboxSearch: true,
        woudc_id: [],
        gaw_id: [],
        name: [],
        country_name: [],
        type: [],
        wmo_region_id: [],
      },
      resettingMap: false,
      resettingFilters: false,
      selectedStation: null,
      selectedFilters: {
        woudc_id: [],
        gaw_id: [],
        name: [],
        country_name: [],
        type: [],
        wmo_region_id: [],
      },
      stations: [],
      download_urls: {},
      loadingDownloadLinks: false,
    }
  },
  head() {
    return {
      title: this.$t('data.stations.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.stations.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('data.stations.keywords'),
        },
      ],
    }
  },
  computed: {
    boundingBoxArray() {
      if (this.boundingBox !== null) {
        return [
          Math.max(-180, this.boundingBox.getWest()),
          Math.max(-90, this.boundingBox.getSouth()),
          Math.min(180, this.boundingBox.getEast()),
          Math.min(90, this.boundingBox.getNorth()),
        ]
      } else {
        return [-180, -90, 180, 90]
      }
    },
    headers() {
      const headerKeys = [
        {
          value: 'woudc_id',
          text: this.$t('data.stations.station-headers.woudc_id'),
        },
        {
          value: 'gaw_id',
          text: this.$t('data.stations.station-headers.gaw_id'),
        },
        {
          value: 'start_date',
          text: this.$t('data.stations.station-headers.start_date'),
        },
        {
          value: 'end_date',
          text: this.$t('data.stations.station-headers.end_date'),
        },
        {
          value: 'name',
          text: this.$t('data.stations.station-headers.name'),
        },
        {
          value: `country_name_${this.$i18n.locale}`,
          text: this.$t('data.stations.station-headers.country_name'),
        },
        {
          value: 'last_validated_datetime',
          text: this.$t(
            'data.stations.station-headers.last_validated_datetime'
          ),
        },
        {
          value: 'type',
          text: this.$t('data.stations.station-headers.type'),
        },
        {
          value: 'wmo_region_id',
          text: this.$t('data.stations.station-headers.wmo_region_id'),
        },
      ]

      return headerKeys
    },
    visibleStations() {
      if (this.boundingBox === null) {
        return this.stations
      } else {
        return this.stations.filter((station) => {
          const coords = this.$L.latLng(station.geometry.coordinates)
          return this.boundingBox.contains(coords)
        })
      }
    },
    returnDownloadLinks() {
      if (this.loadingDownloadLinks == false) {
        this.generateDownloadLinks()
      }
      return this.download_urls
    },
  },
  watch: {
    selectedFilters: {
      handler() {
        this.refreshStations()
      },
      deep: true,
    },
  }, // load data
  mounted() {
    Promise.all([
      this.$store.dispatch('stations/downloadStations'),
      this.$store.dispatch('stations/downloadDistinctFields'),
    ]).then(() => {
      const stations = this.$store.getters['stations/all']
      this.stations = stations.map(unpackageStation)

      this.distinctStationFields =
        this.$store.getters['stations/distinctFieldResolution']
      for (const field in this.distinctStationFields) {
        for (const header of this.headers) {
          if (field == header['value']) {
            this.selectedFilters[field] = []
            this.distinctStationFields[field]['text'] = header['text']
          }
        }
      }
      this.displayedStations = this.visibleStations
      this.loadingMap = false
      this.loadingStationFields = false
      this.loadingTable = false
    })
  },
  methods: {
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
    async generateDownloadLinks() {
      this.loadingDownloadLinks = true
      await this.generateQueryURL()
      await this.getQueryHits()
      const limitValue =
        this.numberMatched == 0
          ? ''
          : `limit=${this.$config.WOUDC_UI_API_MAX_LIMIT}`
      const separator =
        limitValue == '' ? '' : this.query.includes('?') ? '&' : '?'
      const csv = `${this.query}${separator}${limitValue}&f=csv`
      const geojson = `${this.query}${separator}${limitValue}&f=json`
      const item = {
        record_name: 'stations',
        csv: csv,
        geojson: geojson,
      }
      this.download_urls = item
    },
    async getQueryHits() {
      if (this.queryLast !== null && this.query === this.queryLast) {
        return // avoid making the same query
      }
      let responseHits = await woudcClient.get(`${this.query}`)
      this.numberMatched = responseHits.data.numberMatched
      this.queryLast = this.query
    },
    async generateQueryURL() {
      this.query = null
      const stationsURL =
        this.$config.WOUDC_UI_API_URL + '/collections/stations/items'

      let queryParams = ''
      let sortByParams = ''
      this.idQuery = '' // for station names -> id
      let selected = {}
      this.woudcIds = []

      if (
        this.selectedFilters['woudc_id'].length == 0 &&
        this.selectedFilters['gaw_id'].length == 0 &&
        this.selectedFilters['name'].length == 0 &&
        this.selectedFilters['country_name'].length == 0 &&
        this.selectedFilters['type'].length == 0 &&
        this.selectedFilters['wmo_region_id'].length == 0
      ) {
        this.query = `${stationsURL}`
      } else {
        for (const filter of Object.keys(this.selectedFilters)) {
          if (this.selectedFilters[filter].length !== 0) {
            if (filter == 'country_name') {
              let country_name = `country_name_${this.$i18n.locale}`
              selected[country_name] = this.selectedFilters.country_name
            } else {
              selected[filter] = this.selectedFilters[filter]
            }
          }
        }
        // generate query params based on selected dropdown options
        for (const [field, value] of Object.entries(selected)) {
          if (value !== null) {
            // remove null values from query
            let filter = value
            if (value.length > 1) {
              // want to use an OR operator
              filter = value.join('|')
            }
            let separator = queryParams == '' ? '?' : '&'
            queryParams += separator + field + '=' + filter
          }
        }
      }
      let separator = queryParams == '' ? '?' : '&'
      sortByParams = queryParams += `${separator}sortby=-woudc_id`
      this.query = `${stationsURL}${sortByParams}`

      // bbox handling
      if (
        this.selectedFilters.country_name === null &&
        this.selectedStation === null &&
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
    },
    async refreshStations() {
      this.loadingTable = true
      if (
        this.selectedFilters['woudc_id'].length == 0 &&
        this.selectedFilters['gaw_id'].length == 0 &&
        this.selectedFilters['name'].length == 0 &&
        this.selectedFilters['country_name'].length == 0 &&
        this.selectedFilters['type'].length == 0 &&
        this.selectedFilters['wmo_region_id'].length == 0
      ) {
        this.displayedStations = this.enableBboxSearch
          ? this.visibleStations
          : this.stations
      } else {
        this.displayedStations = this.visibleStations
        const filterStations = (stations, filters) => {
          return stations.filter(
            (stn) =>
              (filters['woudc_id'].includes(stn['woudc_id']) == true ||
                filters['woudc_id'].length == 0) &&
              (filters['gaw_id'].includes(stn['gaw_id']) == true ||
                filters['gaw_id'].length == 0) &&
              (filters['name'].includes(stn['name']) == true ||
                filters['name'].length == 0) &&
              (filters['country_name'].includes(
                stn[`country_name_${this.$i18n.locale}`]
              ) == true ||
                filters['country_name'].length == 0) &&
              (filters['type'].includes(stn['type']) == true ||
                filters['type'].length == 0) &&
              (filters['wmo_region_id'].includes(stn['wmo_region_id']) ==
                true ||
                filters['wmo_region_id'].length == 0)
          )
        }
        this.displayedStations = this.enableBboxSearch
          ? filterStations(this.visibleStations, this.selectedFilters)
          : filterStations(this.stations, this.selectedFilters)
      }
      for (const field in this.selectedFilters) {
        this.oldSearchParams[field] = this.selectedFilters[field]
      }
      this.oldSearchParams['bbox'] = this.boundingBoxArray
      this.oldSearchParams['enableBboxSearch'] = this.enableBboxSearch
      this.loadingTable = false
      await this.generateDownloadLinks()
    },
    async reset() {
      this.loadingTable = true
      this.loadingMap = true
      this.resettingMap = true
      this.resettingFilters = true

      this.boundingBox = null
      this.enableBboxSearch = true
      for (const field in this.selectedFilters) {
        this.selectedFilters[field] = []
        this.oldSearchParams[field] = []
      }
      this.oldSearchParams['enableBboxSearch'] = true
      await this.refreshStations()
      this.oldSearchParams['bbox'] = this.boundingBoxArray

      this.resettingFilters = false
      this.resettingMap = false
      this.loadingMap = false
      this.loadingTable = false
      await this.generateDownloadLinks()
    },
  },
  nuxtI18n: {
    paths: {
      en: '/data/stations',
      fr: '/donnees/stations',
    },
  },
}
</script>
