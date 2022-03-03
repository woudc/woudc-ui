<template>
  <v-container>
    <h1>{{ $t('data.instruments.title') }}</h1>
    <p>{{ $t('data.instruments.blurb') }}</p>
    <v-row>
      <v-col>
        <selectable-map
          :elements="instruments"
          :selected="selectedInstrument"
          :loading="loadingMap"
          :reset="resettingMap"
          @select="selectedInstrument = $event"
          @move="boundingBox = $event"
        >
          <template #popup="element">
            <strong>{{ $t('data.instruments.instrument-type') }}</strong>
            <span> {{ element.item.name }}</span>
            <br />
            <strong>{{ $t('data.instruments.instrument-model') }}</strong>
            <span> {{ element.item.model }}</span>
            <br />
            <strong>{{ $t('data.instruments.station-name') }}</strong>
            <nuxt-link :to="'/data/stations/' + element.item.station_id">
              {{ element.item.station_name }}
            </nuxt-link>
            <br />
            <strong>{{ $t('data.instruments.contributor-name') }}</strong>
            <span> {{ element.item.contributor_name }}</span>
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
            <v-col
              v-for="(field, key) in distinctInstrumentFields"
              :key="key"
              cols="6"
            >
              <v-autocomplete
                v-model="selectedFilters[field.value]"
                :loading="loadingInstrumentFields"
                :items="field.array"
                :label="field.text"
                auto-select-first
                eager
                chips
                deletable-chips
                multiple
                small-chips
                @change="oldSearchExists = true"
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
              <template #activator="{ onBadge }">
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
                    :disabled="!loadedInstrumentModels"
                    :loading="loadingInstruments"
                    @mouseover="onButton = true"
                    @mouseleave="onButton = false"
                    @click="refreshInstruments()"
                  >
                    {{ $t('common.filtering.apply') }}
                  </v-btn>
                </v-badge>
              </template>
              <v-card-title class="py-3">
                <v-icon class="mr-1"> mdi-alert </v-icon>
                {{ $t('common.old-search.title') }}
              </v-card-title>
              <i18n path="common.old-search.body" tag="v-card-text">
                <template #search>
                  <strong>{{ $t('common.filtering.apply') }}</strong>
                </template>
              </i18n>
            </v-tooltip>
            <v-btn
              class="btn-right"
              :disabled="loadingInstruments"
              @click="reset()"
            >
              {{ $t('common.reset') }}
            </v-btn>
          </div>
        </v-card>
        <selectable-table
          :headers="headers"
          :elements="displayedInstruments"
          :selected="selectedInstrument"
          :loading="loadingInstruments"
          @select="selectedInstrument = $event"
        >
          <template #row="row">
            <td>{{ row.item.name }}</td>
            <td>{{ row.item.model }}</td>
            <td>{{ row.item.dataset }}</td>
            <td>{{ row.item.start_date }}</td>
            <td>{{ row.item.end_date }}</td>
            <td>{{ row.item.data_class }}</td>
            <td>
              <nuxt-link
                :to="localePath('data-stations') + '/' + row.item.station_id"
              >
                {{ row.item.station_name }}
              </nuxt-link>
            </td>
            <td>
              <a :href="row.item.waf_url" target="_blank">
                <v-icon>mdi-file-download</v-icon>
              </a>
            </td>
          </template>
        </selectable-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import mapInstructions from '~/components/MapInstructions'
import tableInstructions from '~/components/TableInstructions'
import SelectableMap from '~/components/SelectableMap'
import SelectableTable from '~/components/SelectableTable'

export default {
  components: {
    'map-instructions': mapInstructions,
    'selectable-map': SelectableMap,
    'selectable-table': SelectableTable,
    'table-instructions': tableInstructions,
  },
  data() {
    return {
      boundingBox: null,
      displayedInstruments: [],
      distinctInstrumentFields: {},
      enableBboxSearch: true,
      loadingInstruments: true,
      loadingMap: true,
      oldSearchExists: false,
      oldSearchParams: {
        bbox: [-180, -90, 180, 90],
        data_class: [],
        dataset: [],
        enableBboxSearch: true,
        model: [],
        name: [],
        station_name: [],
      },
      onButton: false,
      resettingMap: false,
      selectedInstrument: null,
      selectedFilters: {
        data_class: [],
        dataset: [],
        model: [],
        name: [],
        station_name: [],
      },
    }
  },
  head() {
    return {
      title: this.$t('data.instruments.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.instruments.blurb'),
        },
      ],
    }
  },
  computed: {
    ...mapState('instruments', ['loadingInstrumentFields']),
    ...mapState('instruments', ['loadedInstrumentModels']),
    ...mapGetters('instruments', {
      instruments: 'modelResolution',
    }),
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
        'name',
        'model',
        'dataset',
        'start_date',
        'end_date',
        'data_class',
        'station_name',
        'waf_url',
      ]

      return headerKeys.map((key) => {
        return {
          text: this.$t('data.instruments.headers.' + key),
          value: key,
        }
      })
    },
    searchOutOfDate() {
      if (this.oldSearchExists === false) {
        return false
      } else {
        const dataclassOk =
          this.oldSearchParams['data_class'] ==
          this.selectedFilters['data_class']
        const datasetOk =
          this.oldSearchParams['dataset'] == this.selectedFilters['dataset']
        const modelOk =
          this.oldSearchParams['model'] == this.selectedFilters['model']
        const nameOk =
          this.oldSearchParams['name'] == this.selectedFilters['name']
        const stationnameOk =
          this.oldSearchParams['station_name'] ==
          this.selectedFilters['station_name']
        const bboxOk =
          (this.oldSearchParams['bbox'] === this.boundingBoxArray &&
            this.oldSearchParams['enableBboxSearch'] == true &&
            this.enableBboxSearch === true) ||
          (this.enableBboxSearch === false &&
            this.oldSearchParams['enableBboxSearch'] == false)
        return !(
          bboxOk &&
          dataclassOk &&
          datasetOk &&
          modelOk &&
          nameOk &&
          stationnameOk
        )
      }
    },
    toolTipOn() {
      return this.searchOutOfDate && this.onButton
    },
    visibleInstruments() {
      if (this.boundingBox === null) {
        return this.instruments
      } else {
        return this.instruments.filter((instrument) => {
          const coords = this.$L.latLng(instrument.geometry.coordinates)
          return this.boundingBox.contains(coords)
        })
      }
    },
  },
  watch: {
    boundingBoxArray: {
      async handler() {
        if (this.enableBboxSearch == true) {
          this.oldSearchExists = true
        }
      },
    },
  },
  mounted() {
    Promise.all([
      this.$store.dispatch('instruments/downloadDistinctModels'),
      this.$store.dispatch('instruments/downloadDistinctFields'),
    ]).then(() => {
      this.distinctInstrumentFields =
        this.$store.getters['instruments/distinctFieldResolution']
      for (const field in this.distinctInstrumentFields) {
        for (const header of this.headers) {
          if (field == header['value']) {
            this.distinctInstrumentFields[`${field}`]['text'] = header['text']
          }
        }
      }
      this.displayedInstruments = this.visibleInstruments
      this.loadingInstruments = false
      this.loadingMap = false
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
    async refreshInstruments() {
      this.loadingInstruments = true
      if (
        this.selectedFilters['data_class'].length === 0 &&
        this.selectedFilters['dataset'].length === 0 &&
        this.selectedFilters['model'].length === 0 &&
        this.selectedFilters['name'].length === 0 &&
        this.selectedFilters['station_name'].length === 0
      ) {
        this.displayedInstruments = this.enableBboxSearch
          ? this.visibleInstruments
          : this.instruments
      } else {
        this.displayedInstruments = this.visibleInstruments
        const filterInstruments = (instruments, filters) => {
          return instruments.filter(
            (ins) =>
              (filters['data_class'].includes(ins['data_class']) === true ||
                filters['data_class'].length === 0) &&
              (filters['dataset'].includes(ins['dataset']) === true ||
                filters['dataset'].length === 0) &&
              (filters['model'].includes(ins['model']) === true ||
                filters['model'].length === 0) &&
              (filters['name'].includes(ins['name']) === true ||
                filters['name'].length === 0) &&
              (filters['station_name'].includes(ins['station_name']) === true ||
                filters['station_name'].length === 0)
          )
        }
        this.displayedInstruments = this.enableBboxSearch
          ? filterInstruments(this.visibleInstruments, this.selectedFilters)
          : filterInstruments(this.instruments, this.selectedFilters)
      }
      for (const field in this.selectedFilters) {
        this.oldSearchParams[field] = this.selectedFilters[field]
      }
      this.oldSearchParams['bbox'] = this.boundingBoxArray
      this.oldSearchParams['enableBboxSearch'] = this.enableBboxSearch
      this.oldSearchExists = true
      this.loadingInstruments = false
    },
    async reset() {
      this.loadingInstruments = true
      this.loadingMap = true
      this.resettingMap = true

      this.boundingBox = null
      this.enableBboxSearch = true
      this.onButton = false
      for (const field in this.selectedFilters) {
        this.selectedFilters[field] = []
        this.oldSearchParams[field] = []
      }
      await this.refreshInstruments()
      this.oldSearchExists = false

      this.resettingMap = false
      this.loadingMap = false
      this.loadingInstruments = false
    },
  },
  nuxtI18n: {
    paths: {
      en: '/data/instruments',
      fr: '/donnees/instruments',
    },
  },
}
</script>
