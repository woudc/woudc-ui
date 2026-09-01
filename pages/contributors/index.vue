<template>
  <v-container>
    <h1>{{ $t('contributors.list.title') }}</h1>
    <p>{{ $t('contributors.list.blurb') }}</p>
    <v-row>
      <v-col>
        <selectable-map
          :elements="contributors"
          :selected="selectedContributor"
          :loading="loadingMap"
          :reset="resettingMap"
          @select="selectedContributor = $event"
          @move="boundingBox = $event"
        >
          <template #popup="element">
            <strong>{{ $t('contributors.list.contributor-name') }}</strong>
            <nuxt-link
              :to="localePath('contributors') + '/' + element.item.acronym"
            >
              {{ element.item.name }}
            </nuxt-link>
            <br />
            <strong>{{ $t('contributors.list.country-name') }}</strong>
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
          :distinctfields="distinctContributorFields"
          :enablebboxsearch="enableBboxSearch"
          :selectedfilters="selectedFilters"
          :loadingfields="loadingContributorFields"
          :oldsearchparams="oldSearchParams"
          :refresh="refreshContributors"
          :reset="reset"
          :resettingfilters="resettingFilters"
          :downloadurls="returnDownloadLinks"
        />
        <selectable-table
          :elements="displayedContributors"
          :headers="headers"
          :selected="selectedContributor"
          :loading="loadingTable"
          @select="selectedContributor = $event"
        >
          <template #row="row">
            <td>
              <nuxt-link
                :to="localePath('contributors') + '/' + row.item.acronym"
              >
                {{ row.item.acronym }}
              </nuxt-link>
            </td>
            <td>{{ row.item.project }}</td>
            <td>
              <a :href="row.item.url" target="_blank">
                <span>
                  {{ row.item.name }}
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </span>
              </a>
            </td>
            <td>{{ row.item.country_name[$i18n.locale] }}</td>
            <td>{{ row.item.start_date }}</td>
            <td>{{ row.item.end_date }}</td>
            <td>{{ row.item.wmo_region_id }}</td>
          </template>
        </selectable-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { unpackageContributor } from '~/plugins/woudcJsonUtil.js'
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
      contributors: [],
      contributorsTable: [],
      displayedContributors: [],
      distinctContributorFields: {},
      enableBboxSearch: true,
      loadingContributorFields: true,
      loadingMap: true,
      loadingTable: true,
      oldSearchParams: {
        bbox: [-180, -90, 180, 90],
        enableBboxSearch: true,
        acronym: [],
        project: [],
        name: [],
        country_name: [],
        wmo_region_id: [],
      },
      resettingFilters: false,
      resettingMap: false,
      selectedFilters: {
        acronym: [],
        project: [],
        name: [],
        country_name: [],
        wmo_region_id: [],
      },
      selectedContributor: null,
      download_urls: {},
      loadingDownloadLinks: false,
    }
  },
  head() {
    return {
      title: this.$t('contributors.list.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('contributors.list.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('contributors.list.keywords'),
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
      return [
        {
          text: this.$t('contributors.list.contributor-headers.acronym'),
          value: 'acronym',
        },
        {
          text: this.$t('contributors.list.contributor-headers.project'),
          value: 'project',
        },
        {
          text: this.$t('contributors.list.contributor-headers.name'),
          value: 'name',
        },
        {
          text: this.$t('contributors.list.contributor-headers.country_name'),
          value: `country_name_${this.$i18n.locale}`,
        },
        {
          text: this.$t('contributors.list.contributor-headers.start_date'),
          value: 'start_date',
        },
        {
          text: this.$t('contributors.list.contributor-headers.end_date'),
          value: 'end_date',
        },
        {
          text: this.$t('contributors.list.contributor-headers.wmo_region_id'),
          value: 'wmo_region_id',
        },
      ]
    },
    visibleContributors() {
      if (this.boundingBox === null) {
        return this.contributorsTable
      } else {
        return this.contributorsTable.filter((contributor) => {
          const coords = this.$L.latLng(contributor.geometry.coordinates)
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
        this.refreshContributors()
      },
      deep: true,
    },
  },
  async mounted() {
    Promise.all([
      this.$store.dispatch('contributors/download'),
      this.$store.dispatch('contributors/downloadDistinctFields'),
    ]).then(() => {
      const contributors = this.$store.getters['contributors/all']
      this.contributors = contributors.map(unpackageContributor)
      this.contributorsTable = contributors.map(unpackageContributor)
      for (const index in this.contributorsTable) {
        for (const key in this.contributorsTable[index]) {
          let lower = ''
          let stringKey = ''
          if (this.contributorsTable[index][key]) {
            stringKey = this.contributorsTable[index][key].toString()
            lower = stringKey.toLowerCase()
          }
          if (lower === 'unknown') {
            delete this.contributorsTable[index]
            break
          }
        }
      }
      this.distinctContributorFields =
        this.$store.getters['contributors/distinctFieldResolution']
      for (const field in this.distinctContributorFields) {
        for (const header of this.headers) {
          if (field == header['value']) {
            this.selectedFilters[field] = []
            this.distinctContributorFields[field]['text'] = header['text']
          }
        }
      }
      this.displayedContributors = this.visibleContributors
      this.loadingContributorFields = false
      this.loadingMap = false
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
    async refreshContributors() {
      this.loadingTable = true
      if (
        this.selectedFilters['acronym'].length == 0 &&
        this.selectedFilters['project'].length == 0 &&
        this.selectedFilters['name'].length == 0 &&
        this.selectedFilters['country_name'].length == 0 &&
        this.selectedFilters['wmo_region_id'].length == 0
      ) {
        this.displayedContributors = this.enableBboxSearch
          ? this.visibleContributors
          : this.contributorsTable
      } else {
        this.displayedContributors = this.visibleContributors
        const filterContributors = (contributors, filters) => {
          return contributors.filter(
            (ctb) =>
              (filters['acronym'].includes(ctb['acronym']) == true ||
                filters['acronym'].length == 0) &&
              (filters['project'].includes(ctb['project']) == true ||
                filters['project'].length == 0) &&
              (filters['name'].includes(ctb['name']) == true ||
                filters['name'].length == 0) &&
              (filters['country_name'].includes(
                ctb[`country_name_${this.$i18n.locale}`]
              ) == true ||
                filters['country_name'].length == 0) &&
              (filters['wmo_region_id'].includes(ctb['wmo_region_id']) ==
                true ||
                filters['wmo_region_id'].length == 0)
          )
        }
        this.displayedContributors = this.enableBboxSearch
          ? filterContributors(this.visibleContributors, this.selectedFilters)
          : filterContributors(this.contributorsTable, this.selectedFilters)
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
      await this.refreshContributors()
      this.oldSearchParams['bbox'] = this.boundingBoxArray

      this.resettingFilters = false
      this.resettingMap = false
      this.loadingMap = false
      this.loadingTable = false
      await this.generateDownloadLinks()
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
        record_name: 'contributors',
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
      const contributorsURL =
        this.$config.WOUDC_UI_API_URL + '/collections/contributors/items'

      let queryParams = ''
      this.idQuery = '' // for contributor names -> id
      let selected = {}
      this.ids = []

      if (
        this.selectedFilters['acronym'].length == 0 &&
        this.selectedFilters['project'].length == 0 &&
        this.selectedFilters['name'].length == 0 &&
        this.selectedFilters['country_name'].length == 0 &&
        this.selectedFilters['wmo_region_id'].length == 0
      ) {
        this.query = `${contributorsURL}`
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
      this.query = `${contributorsURL}${queryParams}`
    },
  },
  nuxtI18n: {
    paths: {
      en: '/contributors',
      fr: '/contributeurs',
    },
  },
}
</script>
