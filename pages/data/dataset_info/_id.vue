<template>
  <v-container>
    <h1>{{ $t('data.info.title') }} {{ title }}</h1>
    <v-row>
      <v-col>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.title') }}</strong
          >&nbsp;
          <span>{{ title }}</span>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.abstract') }}</strong
          >&nbsp;
          <span>{{ abstract }}</span>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.uri') }}</strong
          >&nbsp;
          <a :href="uriDatasetDef" target="_blank">{{ uriDatasetDef }}</a>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.doi') }}</strong
          >&nbsp;
          <a :href="doiURL" target="_blank">{{ doi }}</a>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.range') }}</strong
          >&nbsp;
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
          <strong>{{ $t('data.info.descriptors.category') }}</strong
          >&nbsp;
          <span>{{ category }}</span>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.keywords') }}</strong
          >&nbsp;
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
            <li v-if="wafDataset">
              <a :href="datasetWafURL" target="_blank">{{
                $t('data.info.links.waf')
              }}</a>
            </li>
            <li>
              <a :href="wfsURL" target="_blank">{{
                $t('data.info.links.wfs')
              }}</a>
            </li>
            <li>
              <a :href="wmsURL" target="_blank">{{
                $t('data.info.links.wms')
              }}</a>
            </li>
            <li>
              <nuxt-link
                :to="localePath('data-search') + '?dataset=' + dataset_id"
              >
                {{ $t('data.info.links.search-page') }}
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
        broadband: 'broad-band',
        multiband: 'multi-band',
        umkehrn14_1: 'umkehrn14_1.0',
        umkehrn14_2: 'umkehrn14_2.0',
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
      wafDataset: null,
    }
  },
  head() {
    return {
      title: this.$t('data.info.title') + ' ' + this.title,
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
    datasetWafURL() {
      const archivePath = this.$config.WOUDC_UI_WAF_URL + '/Archive-NewFormat'
      return `${archivePath}/${this.wafDataset}`
    },
    wfsURL() {
      return (
        this.$config.WOUDC_UI_OWS_URL +
        '/ows?service=WFS&version=1.1.0&request=GetCapabilities'
      )
    },
    wmsURL() {
      return (
        this.$config.WOUDC_UI_OWS_URL +
        '/ows?service=WMS&version=1.3.0&request=GetCapabilities'
      )
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
      this.uriDatasetDef = discoveryMetadataURL + '?identifier=' + this.dataset
      const response = await woudcClient.get(this.uriDatasetDef)
      this.collectionItem = response.data.features[0].properties

      this.dataset_id = this.collectionItem.identifier
      this.title = this.collectionItem[`title_${this.$i18n.locale}`]
      this.abstract = this.collectionItem[`abstract_${this.$i18n.locale}`]
      this.doi = this.collectionItem.doi
      this.dateFrom = this.collectionItem.temporal_begin
      this.dateTo = this.collectionItem.temporal_end
      this.category = this.collectionItem.topic_category
      this.keywords = this.collectionItem[`keywords_${this.$i18n.locale}`]
      if (this.dataset !== 'uv_index_hourly') {
        this.wafDataset = this.collectionItem.waf[`label_${this.$i18n.locale}`]
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
