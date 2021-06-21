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
            <template v-slot:start>
              {{ dateFrom }}
            </template>
            <template v-slot:end>
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
              <nuxt-link :to="localePath('data-search')">
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
          <template v-slot:popup="element">
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
import x2js from 'x2js'
import woudcClient from '~/plugins/woudcClient'
import { unpackageStation } from '~/plugins/unpackage'

import MapInstructions from '~/components/MapInstructions'
import SelectableMap from '~/components/SelectableMap'

export default {
  components: {
    'map-instructions': MapInstructions,
    'selectable-map': SelectableMap
  },
  data() {
    return {
      abstract: null,
      category: null,
      dataset: null,
      datasetDoc: null,
      dateFrom: null,
      dateTo: null,
      doi: null,
      keywords: [],
      level: null,
      loadingMap: true,
      stations: [],
      title: null,
      uriDatasetDef: null,
      wafDataset: null
    }
  },
  computed: {
    doiURL() {
      return `http://dx.doi.org/${this.doi}`
    },
    datasetWafURL() {
      const archivePath = this.$config.WOUDC_UI_WAF_URL + '/Archive-NewFormat'
      return `${archivePath}/${this.wafDataset}_${this.level}.0_1`
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
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$store.dispatch('stations/downloadStationsByDataset').then(() => {
      const stations = this.$store.getters[`stations/${this.$route.params.id}`]
      this.stations = stations.map(unpackageStation)
      this.loadingMap = false
    })
  },
  methods: {
    async init() {
      this.dataset = this.$route.params.id
      this.setUri()
      this.getDatasetInfo().then(() => {
        if (this.$i18n.locale === 'en') {
          this.title = this.datasetDoc.label[0].toString()
          this.abstract = this.datasetDoc.comment[0].toString()
          for (let i = 0; i < this.datasetDoc.subject.length; i = i + 2) {
            this.keywords.push(this.datasetDoc.subject[i].toString())
          }
        } else {
          this.title = this.datasetDoc.label[1].toString()
          this.abstract = this.datasetDoc.comment[1].toString()
          for (let i = 1; i < this.datasetDoc.subject.length; i = i + 2) {
            this.keywords.push(this.datasetDoc.subject[i].toString())
          }
        }
        this.level = 1
        this.category = 'climatologyMeteorologyAtmosphere'
        this.dateFrom = '1924-08-18'
        this.dateTo = 'now'
      })
    },
    setUri() {
      if (this.dataset === 'totalozone') {
        this.wafDataset = 'TotalOzone'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/ozone/total-column-ozone/totalozone'
      } else if (this.dataset === 'totalozoneobs') {
        this.wafDataset = 'TotalOzoneObs'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/ozone/total-column-ozone/totalozoneobs'
      } else if (this.dataset === 'ozonesonde') {
        this.wafDataset = 'OzoneSonde'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/ozone/vertical-ozone-profile/ozonesonde'
      } else if (this.dataset === 'lidar') {
        this.wafDataset = 'Lidar'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/ozone/vertical-ozone-profile/lidar'
      } else if (this.dataset === 'rocketsonde') {
        this.wafDataset = 'RocketSonde'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/ozone/vertical-ozone-profile/rocketsonde'
      } else if (this.dataset === 'umkehr1') {
        this.wafDataset = 'UmkehrN14'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/ozone/vertical-ozone-profile/umkehrn14'
      } else if (this.dataset === 'umkehr2') {
        this.wafDataset = 'UmkehrN14'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/ozone/vertical-ozone-profile/umkehrn14'
      } else if (this.dataset === 'broadband') {
        this.wafDataset = 'Broad-band'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/uv-radiation/uv-irradiance/broadband'
      } else if (this.dataset === 'multiband') {
        this.wafDataset = 'Multi-band'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/uv-radiation/uv-irradiance/multiband'
      } else if (this.dataset === 'spectral') {
        this.wafDataset = 'Spectral'
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/uv-radiation/uv-irradiance/spectral'
      } else if (this.dataset === 'uvindex') {
        this.wafDataset = null
        this.uriDatasetDef =
          this.$config.WOUDC_UI_OWS_URL +
          '/def/data/uv-radiation/uv-irradiance/uv_index_hourly'
      }
    },
    async getDatasetInfo() {
      const response = await woudcClient.get(this.uriDatasetDef, {
        headers: {
          'Accept-Encoding': 'gzip'
        }
      })
      const converter = new x2js()
      const doc = converter.xml2js(response.data)
      this.datasetDoc = doc.RDF.Page.primaryTopic.Description.sameAs.Description
      this.doi = doc.RDF.Page.primaryTopic.Description['_rdf:resource'].substr(
        18
      )
    },
    stationText(station) {
      if (station.gaw_id === null) {
        return station.name
      } else {
        return station.name + ' (' + station.gaw_id + ')'
      }
    }
  },
  head() {
    return {
      title: this.$t('data.info.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.info.blurb')
        }
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/dataset-information/:id',
      fr: '/donnees/information-sur-les-jeux-de-donnees/:id'
    }
  }
}
</script>
