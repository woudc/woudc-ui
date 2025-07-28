<template>
  <v-container>
    <h1>{{ $t('data.info.title') }} {{ title }}</h1>
    <v-row>
      <v-col>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.title') }}</strong>
          &nbsp;
          <span>{{ title }}</span>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.abstract') }}</strong>
          &nbsp;
          <span>{{ abstract }}</span>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.uri') }}</strong>
          &nbsp;
          <a :href="uriDatasetDef" target="_blank">
            {{ uriDatasetDef }}
            <v-icon x-small>mdi-open-in-new</v-icon>
          </a>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.doi') }}</strong>
          &nbsp;
          <a :href="doiURL" target="_blank">
            {{ doi }}
            <v-icon x-small>mdi-open-in-new</v-icon>
          </a>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.range') }}</strong>
          &nbsp;
          <i18n path="data.info.descriptors.range-template" tag="span">
            <template #start>
              {{ dateFrom }}
            </template>
            <template #end>
              {{ dateTo }}
            </template>
          </i18n>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.keywords') }}</strong>
          &nbsp;
          <v-chip
            v-for="word in keywords"
            :key="word"
            label
            small
            class="mr-1 mb-1"
          >
            {{ word }}
          </v-chip>
        </div>
        <div>
          <strong>{{ $t('data.info.descriptors.links') }}</strong>
          <ul>
            <li>
              <a :href="firstwafURL" target="_blank">
                {{ $t('data.info.links.waf') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li v-if="hasSecondWAF">
              <a :href="secondwafURL" target="_blank">
                {{ $t('data.info.links.waf') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a :href="$config.WOUDC_UI_API_URL" target="_blank">
                {{ $t('data.access.ogcapi.abbr') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <nuxt-link
                :to="localePath('data-search') + '?dataset=' + dataset_id"
              >
                <span>{{ $t('data.info.links.search-page') }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </v-col>
      <v-col>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.map') }}</strong>
        </div>
        <map-instructions />
        <selectable-map :elements="stations" :loading="loadingMap">
          <template #popup="element">
            <nuxt-link :to="'/data/stations/' + element.item.woudc_id">
              <span>{{ stationText(element.item) }}</span>
            </nuxt-link>
          </template>
        </selectable-map>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import woudcClient from '~/plugins/woudcClient'
import { unpackageStation } from '~/plugins/woudcJsonUtil.js'

import MapInstructions from '~/components/MapInstructions'
import SelectableMap from '~/components/SelectableMap'

export default {
  components: {
    'map-instructions': MapInstructions,
    'selectable-map': SelectableMap,
  },
  data() {
    return {
      abstract: null,
      aliases: {
        broadband: 'Broad-band',
        multiband: 'Multi-band',
        umkehrn14_1: 'UmkehrN14_1.0',
        umkehrn14_2: 'UmkehrN14_2.0',
        totalozone: 'TotalOzone',
        totalozoneobs: 'TotalOzoneObs',
        lidar: 'Lidar',
        ozonesonde: 'OzoneSonde',
        rocketsonde: 'RocketSonde',
        spectral: 'Spectral',
      },
      category: null,
      collectionItem: null,
      dataset: null,
      dataset_id: null,
      dateFrom: null,
      dateTo: null,
      doi: null,
      keywords: [],
      level: null,
      loadingMap: true,
      requestUrl: null,
      stations: [],
      title: null,
      uriDatasetDef: null,
      // wafDataset: null,
      wafURL: [],
    }
  },
  head() {
    return {
      title: this.$t('data.info.title') + ' ' + this.title,
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.info.blurb'),
        },
      ],
    }
  },
  computed: {
    doiURL() {
      return `http://dx.doi.org/${this.doi}`
    },
    firstwafURL() {
      return this.wafURL[0]
    },
    secondwafURL() {
      return this.wafURL[1]
    },
    datasetWafURL() {
      const archivePath = this.$config.WOUDC_UI_WAF_URL + '/Archive-NewFormat'
      return `${archivePath}/${this.wafDataset}`
    },
    hasSecondWAF: function () {
      return this.wafURL.length > 1
    },
  },
  mounted() {
    this.init()
    this.$store.dispatch('stations/downloadStationsByDataset').then(() => {
      const stations = this.$store.getters[`stations/${this.$route.params.id}`]
      this.stations = stations.map(unpackageStation)
      this.loadingMap = false
    })
  },
  methods: {
    async init() {
      if (this.$route.params.id in this.aliases) {
        this.dataset = this.aliases[this.$route.params.id]
      } else {
        this.dataset = this.$route.params.id
      }

      const discoveryMetadataURL =
        this.$config.WOUDC_UI_API_URL + '/collections/discovery_metadata/items'

      this.uriDatasetDef = `${discoveryMetadataURL}/${this.dataset}?f=json`

      const response = await woudcClient.get(this.uriDatasetDef)
      this.collectionItem = response

      this.dataset_id = this.collectionItem.data.id
      this.title = this.collectionItem.data.properties.title
      this.abstract = this.collectionItem.data.properties.description
      this.doi = this.collectionItem.data.properties.externalIds[0].value
      this.dateFrom = this.collectionItem.data.time.interval[0]
      this.dateTo = this.collectionItem.data.time.interval[1]
      this.keywords = this.collectionItem.data.properties.keywords
      for (const item of this.collectionItem.data.links) {
        if (item.title == 'Web Accessible Folder (WAF)') {
          this.wafURL.push(item.href)
        }
      }
    },
    stationText(station) {
      if (station.gaw_id === null) {
        return station.name
      } else {
        return station.name + ' (' + station.gaw_id + ')'
      }
    },
  },
  nuxtI18n: {
    paths: {
      en: '/data/dataset-information/:id',
      fr: '/donnees/information-sur-les-jeux-de-donnees/:id',
    },
  },
}
</script>
