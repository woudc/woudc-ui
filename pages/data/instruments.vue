<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.instruments.title') }}</h1>
    <p>{{ $t('data.instruments.blurb') }}</p>
    <v-expansion-panels id="map-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('data.instruments.map-instructions.label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('data.instruments.map-instructions.text') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels id="table-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('data.instruments.table-instructions.label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('data.instruments.table-instructions.text') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-data-table
      id="instruments-table"
      :headers="headers"
      :items="instruments"
      class="elevation-1"
    >
      <template v-slot:item.station_name="instrument">
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
      return [...headerKeys.keys()].map((index) => {
        return {
          text: this.$t('data.instruments.headers[' + index + ']'),
          value: headerKeys[index]
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/instruments',
      fr: '/instruments'
    }
  }
}
</script>
