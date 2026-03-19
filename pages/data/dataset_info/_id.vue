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
          <strong>{{ $t('data.info.descriptors.description') }}</strong>
          &nbsp;
          <span>{{ description }}</span>
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
              <v-chip label small>{{ dateFrom }}</v-chip>
            </template>
            <template #end>
              <v-chip label small>{{ dateTo }}</v-chip>
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
            <li v-for="(wafItem, i) in wafURL" :key="i">
              <a :href="wafItem.href" target="_blank">
                {{ wafItem.title }}
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
              <a :href="OGCAPIinJson" target="_blank">
                {{ $t('data.info.links.api_json') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a :href="discoveryMetadataItemsURL" target="_blank">
                {{ $t('data.info.links.metadata') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li v-if="linkCollection">
              <a :href="linkCollection.href" target="_blank">
                {{
                  $t('data.info.links.dataset', {
                    dataset_name: linkCollection.title,
                  })
                }}
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
            <li v-if="linkMqtts">
              <strong>
                {{ $t('data.info.links.dataNotification') }}
              </strong>
              <ul>
                <li>
                  <strong>{{ $t('data.info.links.mqtt_broker') }}</strong>
                  <code>{{ linkMqtts.href }}</code>
                </li>
                <li>
                  <strong>{{ $t('data.info.links.topic') }}</strong>
                  <code>{{ linkMqtts.channel }}</code>
                </li>
              </ul>
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
      description: null,
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
      collectionItemJson: {},
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
    linkMqtts() {
      const link = this.collectionItemJson?.links?.filter((link) =>
        link.href.toLowerCase().includes('mqtts')
      )?.[0]

      return link || false
    },
    linkCollection() {
      const link = this.collectionItemJson?.links?.filter(
        (link) => link.title.toLowerCase() == this.title.toLowerCase()
      )?.[0]

      return link || false
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

      this.uriDatasetDef = `${discoveryMetadataURL}/${this.dataset}?f=json&lang=${this.$i18n.locale}`
      this.discoveryMetadataItemsURL = discoveryMetadataURL
      this.OGCAPIinJson = this.$config.WOUDC_UI_API_URL + '?f=json'

      const response = await woudcClient.get(this.uriDatasetDef)
      this.collectionItemJson = response.data
      this.dataset_id = this.collectionItemJson.id.split(':').pop()
      if (
        !this.dataset_id.includes('_1.0') ||
        !this.dataset_id.includes('_2.0')
      ) {
        this.dataset_id += '_1.0' // default to 1.0
      }
      this.title = this.collectionItemJson.properties.title
      this.description = this.collectionItemJson.properties.description
      this.doi = this.collectionItemJson.properties.externalIds[0].value
      this.dateFrom = this.collectionItemJson.time.interval[0]
      this.dateTo = this.collectionItemJson.time.interval[1]
      this.keywords = this.collectionItemJson.properties.keywords
      this.wafURL = this.collectionItemJson.links
        .filter((link) => link.title.toLowerCase().includes('(waf)'))
        .sort((a, b) => a.title.localeCompare(b.title))
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
