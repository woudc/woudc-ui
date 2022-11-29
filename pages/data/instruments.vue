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
            <span>{{ element.item.name }}</span>
            <br />
            <strong>{{ $t('data.instruments.instrument-model') }}</strong>
            <span>{{ element.item.model }}</span>
            <br />
            <strong>{{ $t('data.instruments.station-name') }}</strong>
            <nuxt-link :to="'/data/stations/' + element.item.station_id">
              <span>{{ element.item.station_name }}</span>
            </nuxt-link>
            <br />
            <strong>{{ $t('data.instruments.contributor-name') }}</strong>
            <span>{{ element.item.contributor_name }}</span>
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
          :distinctfields="distinctInstrumentFields"
          :enablebboxsearch="enableBboxSearch"
          :selectedfilters="selectedFilters"
          :loadingfields="loadingInstrumentFields"
          :oldsearchparams="oldSearchParams"
          :refresh="refreshInstruments"
          :reset="reset"
          :resettingfilters="resettingFilters"
        />
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
                <span>{{ row.item.station_name }}</span>
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
      resettingFilters: false,
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
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
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
        this.selectedFilters['data_class'].length == 0 &&
        this.selectedFilters['dataset'].length == 0 &&
        this.selectedFilters['model'].length == 0 &&
        this.selectedFilters['name'].length == 0 &&
        this.selectedFilters['station_name'].length == 0
      ) {
        this.displayedInstruments = this.enableBboxSearch
          ? this.visibleInstruments
          : this.instruments
      } else {
        this.displayedInstruments = this.visibleInstruments
        const filterInstruments = (instruments, filters) => {
          return instruments.filter(
            (ins) =>
              (filters['data_class'].includes(ins['data_class']) == true ||
                filters['data_class'].length == 0) &&
              (filters['dataset'].includes(ins['dataset']) == true ||
                filters['dataset'].length == 0) &&
              (filters['model'].includes(ins['model']) == true ||
                filters['model'].length == 0) &&
              (filters['name'].includes(ins['name']) == true ||
                filters['name'].length == 0) &&
              (filters['station_name'].includes(ins['station_name']) == true ||
                filters['station_name'].length == 0)
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
      this.loadingInstruments = false
    },
    async reset() {
      this.loadingInstruments = true
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
      await this.refreshInstruments()
      this.oldSearchParams['bbox'] = this.boundingBoxArray

      this.resettingFilters = false
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
