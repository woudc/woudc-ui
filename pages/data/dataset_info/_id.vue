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
      requestUrl: null,
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
      this.dataset = this.$route.params.id
      this.setUri()
      await this.getDatasetInfo()
      this.title = this.datasetDoc.citation.CI_Citation.title
      this.abstract = this.datasetDoc.abstract
      if (this.$i18n.locale === 'en') {
        this.title = this.title.CharacterString.toString()
        this.abstract = this.abstract.CharacterString.toString()
        for (let i = 0; i < this.datasetDoc.descriptiveKeywords.length; i++) {
          if (
            !this.datasetDoc.descriptiveKeywords[i].MD_Keywords.keyword.length
          ) {
            this.keywords.push(
              this.datasetDoc.descriptiveKeywords[
                i
              ].MD_Keywords.keyword.CharacterString.toString()
            )
          }
          for (
            let j = 0;
            j <
            this.datasetDoc.descriptiveKeywords[i].MD_Keywords.keyword.length;
            j++
          ) {
            this.keywords.push(
              this.datasetDoc.descriptiveKeywords[i].MD_Keywords.keyword[
                j
              ].CharacterString.toString()
            )
          }
        }
      } else {
        this.title = this.title.PT_FreeText.textGroup.LocalisedCharacterString.toString()
        this.abstract = this.abstract.PT_FreeText.textGroup.LocalisedCharacterString.toString()
        for (let i = 0; i < this.datasetDoc.descriptiveKeywords.length; i++) {
          for (
            let j = 0;
            j <
            this.datasetDoc.descriptiveKeywords[i].MD_Keywords.keyword.length;
            j++
          ) {
            if (
              this.datasetDoc.descriptiveKeywords[i].MD_Keywords.keyword[j]
                .PT_FreeText
            ) {
              this.keywords.push(
                this.datasetDoc.descriptiveKeywords[i].MD_Keywords.keyword[
                  j
                ].PT_FreeText.textGroup.LocalisedCharacterString.toString()
              )
            }
          }
        }
      }
      this.keywords = new Set(this.keywords)
      this.doi = this.datasetDoc.resourceConstraints.MD_LegalConstraints.otherConstraints[2].CharacterString.toString().substr(
        4
      )
      this.dateFrom = this.datasetDoc.extent.EX_Extent.temporalElement.EX_TemporalExtent.extent.TimePeriod.beginPosition.toString()
      const endPosition = this.datasetDoc.extent.EX_Extent.temporalElement
        .EX_TemporalExtent.extent.TimePeriod.endPosition
      if (endPosition._indeterminatePosition) {
        this.dateTo = endPosition._indeterminatePosition
      } else {
        this.dateTo = endPosition.toString()
      }
      if (this.dataset === 'umkehr2') {
        this.level = 2
      } else {
        this.level = 1
      }
      this.category = this.datasetDoc.topicCategory.MD_TopicCategoryCode.toString()
    },
    setUri() {
      if (this.dataset === 'totalozone') {
        this.wafDataset = 'TotalOzone'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/ozone/total-column-ozone/totalozone'
      } else if (this.dataset === 'totalozoneobs') {
        this.wafDataset = 'TotalOzoneObs'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/ozone/total-column-ozone/totalozoneobs'
      } else if (this.dataset === 'ozonesonde') {
        this.wafDataset = 'OzoneSonde'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/ozonesonde'
      } else if (this.dataset === 'lidar') {
        this.wafDataset = 'Lidar'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/lidar'
      } else if (this.dataset === 'rocketsonde') {
        this.wafDataset = 'RocketSonde'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/rocketsonde'
      } else if (this.dataset === 'umkehr1') {
        this.wafDataset = 'UmkehrN14'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/umkehrn14-1'
      } else if (this.dataset === 'umkehr2') {
        this.wafDataset = 'UmkehrN14'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/umkehrn14-2'
      } else if (this.dataset === 'broadband') {
        this.wafDataset = 'Broad-band'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/broadband'
      } else if (this.dataset === 'multiband') {
        this.wafDataset = 'Multi-band'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/multiband'
      } else if (this.dataset === 'spectral') {
        this.wafDataset = 'Spectral'
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/spectral'
      } else if (this.dataset === 'uvindex') {
        this.wafDataset = null
        this.requestUrl =
          this.$config.WOUDC_UI_OWS_URL +
          '/csw?service=CSW&version=2.0.2&request=GetRepositoryItem&id=urn:x-wmo:md:int.wmo.wis::https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/uv_index_hourly'
      }
    },
    async getDatasetInfo() {
      const response = await woudcClient.get(this.requestUrl, {
        headers: {
          'Accept-Encoding': 'gzip'
        }
      })
      const converter = new x2js()
      const doc = converter.xml2js(response.data)
      this.uriDatasetDef = doc.MD_Metadata.dataSetURI.CharacterString.toString()
      this.datasetDoc = doc.MD_Metadata.identificationInfo.MD_DataIdentification
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
      title: this.$t('data.info.title') + this.dataset,
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
