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
import xpath from 'xpath'
import xmldom from 'xmldom'
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
      dataset_id_to_chunk: {
        ozonesonde: 'ozone/vertical-ozone-profile/ozonesonde',
        totalozone: 'ozone/total-column-ozone/totalozone',
        totalozoneobs: 'ozone/total-column-ozone/totalozoneobs',
        lidar: 'ozone/vertical-ozone-profile/lidar',
        'umkehrn14-1': 'ozone/vertical-ozone-profile/umkehrn14/1.0',
        'umkehrn14-2': 'ozone/vertical-ozone-profile/umkehrn14/2.0',
        broadband: 'uv-radiation/uv-irradiance/broadband',
        multiband: 'uv-radiation/uv-irradiance/multiband',
        spectral: 'uv-radiation/uv-irradiance/spectral',
        uv_index_hourly: 'uv-radiation/uv-irradiance/uv_index_hourly',
        rocketsonde: 'ozone/vertical-ozone-profile/rocketsonde'
      },
      dateFrom: null,
      dateTo: null,
      doi: null,
      downloadContent: '',
      infoContent: '',
      keywords: [],
      lay_err: 0,
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
      if (
        this.dataset === '' ||
        this.dataset === null ||
        !this.array_key_exists()
      ) {
        this.getDatasetInfo()
        this.lay_err++
      } else {
        const parsed_response = this.getDatasetInfo()
        this.keywords = ''
        const datasetCSWUrl = parsed_response['csw_url']
        this.uriDatasetDef = parsed_response['uri'][0]
        this.title = parsed_response['title'][0]
        const datasetTitleLink = this.title + datasetCSWUrl
        console.log(datasetTitleLink)
        this.abstract = parsed_response['abstract'][0]
        let kw = ''
        for (kw in parsed_response['keywords']) {
          this.keywords.push(kw)
        }
        this.doi = parsed_response['doi_id'][0]
        const datasetDOIURL = parsed_response['doi_url'][0]
        console.log(datasetDOIURL)
        this.dateFrom = parsed_response['temporal_begin'][0]
        this.category = parsed_response['topic_category'][0]
        this.level = 1
        this.dateTo = parsed_response['temporal_end'][0]
      }
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
      console.log('q')
      const response = await woudcClient.get(this.uriDatasetDef, {
        headers: {
          'Accept-Encoding': 'gzip'
        }
      })
      console.log(response)
      const r = []
      const doc = new xmldom().parseFromString(response)
      r['doi_id'] = xpath.select('//gmd:MD_Identifier//gmx:Anchor', doc)
      console.log(r)
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
