<template>
  <v-container>
    <h1>{{ $t('data.info.title') }} {{ title }}</h1>
    <v-row>
      <v-col>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.title') }}</strong>&nbsp;
          <span>{{ title }}</span>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.abstract') }}</strong>&nbsp;
          <span>{{ abstract }}</span>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.uri') }}</strong>&nbsp;
          <a :href="uri" target="_blank">{{ uri }}</a>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.doi') }}</strong>&nbsp;
          <a :href="doiURL" target="_blank">{{ doi }}</a>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.range') }}</strong>&nbsp;
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
          <strong>{{ $t('data.info.descriptors.category') }}</strong>&nbsp;
          <span>{{ category }}</span>
        </div>
        <div class="mb-3">
          <strong>{{ $t('data.info.descriptors.keywords') }}</strong>&nbsp;
          <v-chip v-for="word in keywords" :key="word" label small class="mr-1 mb-1">
            {{ word }}
          </v-chip>
        </div>
        <div>
          <strong>{{ $t('data.info.descriptors.links') }}</strong>
          <ul>
            <li>
              <a :href="wafURL" target="_blank">{{ $t('data.info.links.waf') }}</a>
            </li>
            <li>
              <a :href="wfsURL" target="_blank">{{ $t('data.info.links.wfs') }}</a>
            </li>
            <li>
              <a :href="wmsURL" target="_blank">{{ $t('data.info.links.wms') }}</a>
            </li>
            <li>
              <nuxt-link :to="localePath('data-explore')">
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
        <selectable-map
          :elements="stations"
          :loading="loadingMap"
        >
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
      dateFrom: null,
      dateTo: null,
      doi: null,
      keywords: [],
      level: null,
      loadingMap: true,
      stations: [],
      title: null,
      uri: null
    }
  },
  computed: {
    doiURL() {
      return `http://dx.doi.org/${this.doi}`
    },
    wafURL() {
      const baseURL = 'https://woudc.org/archive/Archive-NewFormat'
      return `${baseURL}/${this.dataset}_${this.level}.0_1`
    },
    wfsURL() {
      return 'TODO'
    },
    wmsURL() {
      return 'TODO'
    },
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      // Future: make an HTTP call to gather dataset info.
      // For now, add some dummy information as an example of the format.
      this.dataset = 'TotalOzone'
      this.level = 1

      this.title = 'TotalOzone - Daily Observations'
      this.abstract = 'A measurement of the total amount of atmospheric ozone in a given column from the surface to the edge of the atmosphere. Ground based instruments such as spectrophotometers and ozonemeters are used to measure results daily.'
      this.uri = 'https://geo.woudc.org/def/data/ozone/total-column-ozone/totalozone'
      this.doi = '10.14287/10000004'

      this.category = 'climatologyMeteorologyAtmosphere'
      this.keywords = [
        'total', 'ozone', 'level 1.0', 'level 2.0', 'column',
        'dobson', 'brewer', 'saoz', 'vassey', 'pion', 'microtops', 'spectral',
        'hoelper', 'filter', 'atmosphericComposition', 'pollution',
        'observationPlatform', 'rocketSounding'
      ]

      this.dateFrom = '1924-08-18'
      this.dateTo = 'now'

      await this.$store.dispatch('stations/download')

      const getterName = `stations/${this.$route.params.id}`
      const stations = this.$store.getters[getterName].orderByID

      this.stations = stations.map(unpackageStation)
      this.loadingMap = false
    },
    stationText(station) {
      if (station.gaw_id === null) {
        return station.name
      } else {
        return station.name + ' (' + station.gaw_id + ')'
      }
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
