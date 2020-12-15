<template>
  <v-container>
    <h1>{{ $t('data.instruments.title') }}</h1>
    <p>{{ $t('data.instruments.blurb') }}</p>
    <v-row>
      <v-col>
        <selectable-map
          :elements="instruments"
          :selected="selectedInstrument"
          :loading="loadingMap"
          @select="selectedInstrument = $event"
          @move="boundingBox = $event"
        >
          <template v-slot:popup="element">
            <strong>{{ $t('data.instruments.instrument-type') }}</strong>
            <span> {{ element.item.name }}</span>
            <br>
            <strong>{{ $t('data.instruments.instrument-model') }}</strong>
            <span> {{ element.item.model }}</span>
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
    <v-row>
      <v-col>
        <selectable-table
          :headers="headers"
          :elements="visibleInstruments"
          :selected="selectedInstrument"
          :loading="loadingTable"
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
              <a :href="row.item.waf_url" target="_blank">
                <v-icon>mdi-file-download</v-icon>
              </a>
            </td>
          </template>
        </selectable-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
  data() {
    return {
      boundingBox: null,
      instruments: [],
      loadingMap: true,
      loadingTable: true,
      selectedInstrument: null
    }
  },
  computed: {
    headers() {
      const headerKeys = [
        'name',
        'model',
        'dataset',
        'start_date',
        'end_date',
        'data_class',
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
        return this.instruments.filter((instrument) => {
          const coords = this.$L.latLng(instrument.geometry.coordinates)
          return this.boundingBox.contains(coords)
        })
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('instruments/download')

    const instruments = this.$store.getters['instruments/modelResolution']
    this.instruments = instruments.map(unpackageInstrument)
    this.loadingMap = false
    this.loadingTable = false
  },
  nuxtI18n: {
    paths: {
      en: '/data/instruments',
      fr: '/donnees/instruments'
    }
  }
}
</script>
