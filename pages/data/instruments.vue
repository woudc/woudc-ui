<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.instruments.title') }}</h1>
    <p>{{ $t('data.instruments.blurb') }}</p>
    <map-instructions id="map-instructions" />
    <table-instructions id="table-instructions" />
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
import mapInstructions from '~/components/MapInstructions'
import tableInstructions from '~/components/TableInstructions'

export default {
  components: {
    'map-instructions': mapInstructions,
    'table-instructions': tableInstructions
  },
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
