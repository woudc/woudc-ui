<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.instruments.title') }}</h1>
    <p>{{ $t('data.instruments.blurb') }}</p>
    <v-row>
      <v-col>
        <selectable-map
          :elements="instruments"
          :selected="selectedInstrument"
          @select="selectedInstrument = $event"
          @move="boundingBox = $event"
        >
          <template v-slot:popup="element">
            <strong>{{ $t('data.instruments.instrument-type') }}</strong>
            <span> {{ element.item.name }}</span>
            <br>
            <strong>{{ $t('data.instruments.station-name') }}</strong>
            <nuxt-link :to="'/data/stations/' + element.item.station_id">
              {{ element.item.station_name }}
            </nuxt-link>
            <br>
            <strong>{{ $t('data.instruments.contributor-name') }}</strong>
            <span> TODO</span>
          </template>
        </selectable-map>
      </v-col>
      <v-col>
        <map-instructions id="map-instructions" />
        <table-instructions id="table-instructions" />
      </v-col>
    </v-row>
    <selectable-table
      :headers="headers"
      :elements="visibleInstruments"
      :selected="selectedInstrument"
      @select="selectedInstrument = $event"
    >
      <template v-slot:row="row">
        <td>{{ row.item.name }}</td>
        <td>{{ row.item.model }}</td>
        <td>{{ row.item.start_date }}</td>
        <td>{{ row.item.end_date }}</td>
        <td>{{ row.item.data_class }}</td>
        <td>{{ row.item.dataset }}</td>
        <td>
          <nuxt-link
            :to="'/data/station/' + row.item.station_id"
            v-text="row.item.station_name"
          />
        </td>
        <td>
          <a :href="row.item.waf_url" target="_blank">TODO</a>
        </td>
      </template>
    </selectable-table>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'
import { unpackageInstrument } from '~/plugins/unpackage'

import mapInstructions from '~/components/MapInstructions'
import tableInstructions from '~/components/TableInstructions'
import SelectableMap from '~/components/SelectableMap'
import SelectableTable from '~/components/SelectableTable'

export default {
  components: {
    'map-instructions': mapInstructions,
    'selectable-map': SelectableMap,
    'selectable-table': SelectableTable,
    'table-instructions': tableInstructions
  },
  async asyncData({ params }) {
    const instrumentsURL = '/collections/instruments/items'
    const queryParams = 'sortby=dataset:A,station_id:A,name:A,model:A'

    const instrumentsResponse = await axios.get(instrumentsURL + '?' + queryParams)

    return {
      instruments: instrumentsResponse.data.features.map(unpackageInstrument)
    }
  },
  data() {
    return {
      boundingBox: null,
      instruments: [],
      selectedInstrument: null
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
    },
    visibleInstruments() {
      if (this.boundingBox === null) {
        return this.instruments
      } else {
        return this.instrument.filter((instrument) => {
          const coords = this.$L.latLng(instrument.geometry.coordinates)
          return this.boundingBox.contains(coords)
        })
      }
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
