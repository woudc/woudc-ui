<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.instruments.title') }}</h1>
    <p>{{ $t('data.instruments.blurb') }}</p>
    <v-expansion-panels id="map-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('map-instructions.label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <i18n class="newlines" path="map-instructions.template" tag="p">
            <template v-slot:panning>
              <b>{{ $t('map-instructions.panning') }}</b>
            </template>
            <template v-slot:zooming>
              <b>{{ $t('map-instructions.zooming') }}</b>
            </template>
            <template v-slot:tab>
              <kbd>{{ $t('map-instructions.tab') }}</kbd>
            </template>
            <template v-slot:plus>
              <kbd>+</kbd>
            </template>
            <template v-slot:minus>
              <kbd>-</kbd>
            </template>
          </i18n>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels id="table-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('table-instructions.label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <i18n class="newlines" path="table-instructions.template" tag="p">
            <template v-slot:filtering>
              <b>{{ $t('table-instructions.filtering') }}</b>
            </template>
            <template v-slot:sorting>
              <b>{{ $t('table-instructions.sorting') }}</b>
            </template>
            <template v-slot:paging>
              <b>{{ $t('table-instructions.paging') }}</b>
            </template>
          </i18n>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-data-table
      id="instruments-table"
      :headers="headers"
      :items="instruments"
      class="elevation-1"
    >
      <template v-slot:item.station="instrument">
        <nuxt-link :to="'/data/stations/' + instrument.item.station_id">
          {{ instrument.item.station_name }}
        </nuxt-link>
      </template>
      <template v-slot:item.waf_url="instrument">
        <a :href="instrument.item.waf_url" target="_blank">
          TODO
        </a>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData({ params }) {
    const instrumentsURL = '/collections/instruments/items'
    const queryParams = 'sortby=dataset:A,station_id:A,name:A,model:A'

    const instrumentsResponse = await axios.get(instrumentsURL + '?' + queryParams)

    return {
      instruments: instrumentsResponse.data.features.map((instrument) => {
        return instrument.properties
      })
    }
  },
  data() {
    return {
      instruments: []
    }
  },
  computed: {
    headers() {
      const headerKeys = [
        'name',
        'model',
        'start_date',
        'end_date',
        'data_class',
        'dataset',
        'station',
        'waf_url'
      ]

      return headerKeys.map((key) => {
        return {
          text: this.$t('data.instruments.headers.' + key),
          value: key
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/instruments',
      fr: '/donnees/instruments'
    }
  }
}
</script>
