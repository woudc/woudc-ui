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
          <template v-slot:popup="element">
            <strong>{{ $t('data.stations.gaw-id') }}</strong>
            <a :href="element.item.gaw_url" target="_blank">
              <span> {{ element.item.gaw_id }}</span>
            </a>
            <br />
            <strong>{{ $t('data.stations.station-id') }}</strong>
            <nuxt-link :to="'/data/stations/' + element.item.woudc_id">
              <span> {{ element.item.woudc_id }}</span>
            </nuxt-link>
            <br />
            <strong>{{ $t('data.stations.station-name') }}</strong>
            <span> {{ element.item.name }}</span>
            <br />
            <strong>{{ $t('data.stations.country-name') }}</strong>
            <span> {{ element.item.country_name[$i18n.locale] }}</span>
          </template>
        </selectable-map>
        <v-switch
          v-model="enableBboxSearch"
          class="mr-4 float-left"
          :label="$t('common.bbox.switch')"
        ></v-switch>
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
        <v-card class="mb-5">
          <v-card-title class="mx-2 pb-0">
            {{ $t('common.filtering.title') }}
          </v-card-title>
          <v-col class="mr-2 pt-0 d-flex align-content-start flex-wrap">
            <v-col v-for="field in distinctStationFields" :key="field" cols="6">
              <v-autocomplete
                v-model="selectedFilters[field.value]"
                :loading="loadingStationFields"
                :items="field.array"
                :label="field.text"
                auto-select-first
                eager
                chips
                deletable-chips
                multiple
                small-chips
                @change="changeFilters($event, field.value)"
              >
              </v-autocomplete>
            </v-col>
          </v-col>
          <div class="pb-5 px-3">
            <v-tooltip
              v-model="toolTipOn"
              class="mt-1 mb-4 align-content-start"
              bottom
            >
              <template v-slot:activator="{ onBadge }">
                <v-badge
                  :value="searchOutOfDate"
                  class="mx-2"
                  icon="mdi-refresh"
                  color="green"
                  bordered
                  overlap
                  v-on="onBadge"
                >
                  <v-btn
                    class="btn-left"
                    color="primary"
                    :disabled="loadingStationFields"
                    :loading="loadingStations"
                    @mouseover="onButton = true"
                    @mouseleave="onButton = false"
                    @click="refreshStations()"
                  >
                    {{ $t('common.filtering.apply') }}
                  </v-btn>
                </v-badge>
              </template>
              <v-card-title class="py-3">
                <v-icon class="mr-1">
                  mdi-alert
                </v-icon>
                {{ $t('common.old-search.title') }}
              </v-card-title>
              <i18n path="common.old-search.body" tag="v-card-text">
                <template v-slot:search>
                  <strong>{{ $t('common.filtering.apply') }}</strong>
                </template>
              </i18n>
            </v-tooltip>
            <v-btn
              class="btn-right"
              :disabled="loadingStations"
              @click="reset()"
            >
              {{ $t('common.reset') }}
            </v-btn>
          </div>
        </v-card>
        <selectable-table
          :headers="headers"
          :elements="displayedStations"
          :selected="selectedStation"
          :loading="loadingTable"
          @select="selectedStation = $event"
        >
          <template v-slot:row="row">
            <td>
              <nuxt-link
                :to="localePath('data-stations') + '/' + row.item.woudc_id"
              >
                {{ row.item.woudc_id }}
              </nuxt-link>
            </td>
            <td>
              <span v-if="row.item.gaw_id !== null">
                <a :href="row.item.gaw_url" target="_blank">
                  {{ row.item.gaw_id }}
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

import mapInstructions from '~/components/MapInstructions'
import tableInstructions from '~/components/TableInstructions'
import SelectableMap from '~/components/SelectableMap'
import SelectableTable from '~/components/SelectableTable'

export default {
  components: {
    'map-instructions': mapInstructions,
    'selectable-map': SelectableMap,
    'selectable-table': SelectableTable,
    'table-instructions': tableInstructions
  },
  data() {
    return {
      boundingBox: null,
      displayedStations: [],
      distinctStationFields: {},
      enableBboxSearch: true,
      loadingMap: true,
      loadingStations: true,
      loadingStationFields: true,
      loadingTable: true,
      oldSearchExists: false,
      oldSearchParams: {
        bbox: [-180, -90, 180, 90],
        enableBboxSearch: true,
        woudc_id: [],
        gaw_id: [],
        name: [],
        country_name: [],
        type: [],
        wmo_region_id: []
      },
      onButton: false,
      resettingMap: false,
      selectedStation: null,
      selectedFilters: {
        woudc_id: [],
        gaw_id: [],
        name: [],
        country_name: [],
        type: [],
        wmo_region_id: []
      },
      stations: []
    }
  },
  computed: {
    boundingBoxArray() {
      if (this.boundingBox !== null) {
        return [
          Math.max(-180, this.boundingBox.getWest()),
          Math.max(-90, this.boundingBox.getSouth()),
          Math.min(180, this.boundingBox.getEast()),
          Math.min(90, this.boundingBox.getNorth())
        ]
      } else {
        return [-180, -90, 180, 90]
      }
    },
    headers() {
      const headerKeys = [
        'woudc_id',
        'gaw_id',
        'start_date',
        'end_date',
        'name',
        `country_name_${this.$i18n.locale}`,
        'last_validated_datetime',
        'type',
        'wmo_region_id'
      ]

      return headerKeys.map((key) => {
        return {
          text: this.$t('data.stations.station-headers.' + key),
          value: key
        }
      })
    },
    searchOutOfDate() {
      if (this.oldSearchExists === false) {
        return false
      } else {
        const woudcIDOk =
          this.oldSearchParams['woudc_id'] == this.selectedFilters['woudc_id']
        const gawIDOk =
          this.oldSearchParams['gaw_id'] == this.selectedFilters['gaw_id']
        const nameOk =
          this.oldSearchParams['name'] == this.selectedFilters['name']
        const countryNameOk =
          this.oldSearchParams['country_name'] ==
          this.selectedFilters['country_name']
        const typeOk =
          this.oldSearchParams['type'] == this.selectedFilters['type']
        const wmoRegionIDOk =
          this.oldSearchParams['wmo_region_id'] ==
          this.selectedFilters['wmo_region_id']
        const bboxOk =
          (this.oldSearchParams['bbox'] === this.boundingBoxArray &&
            this.oldSearchParams['enableBboxSearch'] == true &&
            this.enableBboxSearch === true) ||
          (this.enableBboxSearch === false &&
            this.oldSearchParams['enableBboxSearch'] == false)
        return !(
          bboxOk &&
          woudcIDOk &&
          gawIDOk &&
          nameOk &&
          countryNameOk &&
          typeOk &&
          wmoRegionIDOk
        )
      }
    },
    toolTipOn() {
      return this.searchOutOfDate && this.onButton
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
    }
  },
  watch: {
    boundingBoxArray: {
      async handler() {
        if (this.enableBboxSearch == true) {
          this.oldSearchExists = true
        }
      }
    }
  },
  mounted() {
    Promise.all([
      this.$store.dispatch('stations/downloadStations'),
      this.$store.dispatch('stations/downloadDistinctFields')
    ]).then(() => {
      const stations = this.$store.getters['stations/all']
      this.stations = stations.map(unpackageStation)

      this.distinctStationFields = this.$store.getters[
        'stations/distinctFieldResolution'
      ]
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
      this.loadingStations = false
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
    async changeFilters(filters, field) {
      this.selectedFilters[field] = filters
      if (field === `country_name_${this.$i18n.locale}`) {
        this.selectedFilters['country_name'] = filters
      }
      this.oldSearchExists = true
    },
    async refreshStations() {
      this.loadingTable = true
      if (
        this.selectedFilters['woudc_id'].length === 0 &&
        this.selectedFilters['gaw_id'].length === 0 &&
        this.selectedFilters['name'].length === 0 &&
        this.selectedFilters['country_name'].length === 0 &&
        this.selectedFilters['type'].length === 0 &&
        this.selectedFilters['wmo_region_id'].length === 0
      ) {
        this.displayedStations = this.enableBboxSearch
          ? this.visibleStations
          : this.stations
      } else {
        this.displayedStations = this.visibleStations
        const filterStations = (stations, filters) => {
          return stations.filter(
            (stn) =>
              (filters['woudc_id'].includes(stn['woudc_id']) === true ||
                filters['woudc_id'].length === 0) &&
              (filters['gaw_id'].includes(stn['gaw_id']) === true ||
                filters['gaw_id'].length === 0) &&
              (filters['name'].includes(stn['name']) === true ||
                filters['name'].length === 0) &&
              (filters['country_name'].includes(
                stn[`country_name_${this.$i18n.locale}`]
              ) === true ||
                filters['country_name'].length === 0) &&
              (filters['type'].includes(stn['type']) === true ||
                filters['type'].length === 0) &&
              (filters['wmo_region_id'].includes(stn['wmo_region_id']) ===
                true ||
                filters['wmo_region_id'].length === 0)
          )
        }
        this.displayedStations = this.enableBboxSearch
          ? filterStations(this.displayedStations, this.selectedFilters)
          : filterStations(this.stations, this.selectedFilters)
      }
      for (const field in this.selectedFilters) {
        this.oldSearchParams[field] = this.selectedFilters[field]
      }
      this.oldSearchParams['bbox'] = this.boundingBoxArray
      this.oldSearchParams['enableBboxSearch'] = this.enableBboxSearch
      this.oldSearchExists = true
      this.loadingTable = false
    },
    async reset() {
      this.loadingStations = true
      this.loadingTable = true
      this.loadingMap = true
      this.resettingMap = true

      this.boundingBox = null
      this.enableBboxSearch = true
      this.onButton = false
      for (const field in this.selectedFilters) {
        this.selectedFilters[field] = []
        this.oldSearchParams[field] = []
      }
      await this.refreshStations()
      this.oldSearchExists = false

      this.resettingMap = false
      this.loadingMap = false
      this.loadingTable = false
      this.loadingStations = false
    }
  },
  head() {
    return {
      title: this.$t('data.stations.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.stations.blurb')
        }
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/stations',
      fr: '/donnees/stations'
    }
  }
}
</script>
