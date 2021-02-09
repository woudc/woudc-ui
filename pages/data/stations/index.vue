<template>
  <v-container>
    <h1>{{ $t('data.stations.title') }}</h1>
    <p>{{ $t('data.stations.blurb') }}</p>
    <v-row>
      <v-col>
        <selectable-map
          :elements="stations"
          :selected="selectedStation"
          :loading="loadingMap"
          @select="selectedStation = $event"
          @move="boundingBox = $event"
        >
          <template v-slot:popup="element">
            <strong>{{ $t('data.stations.gaw-id') }}</strong>
            <a :href="element.item.gaw_url" target="_blank">
              <span> {{ element.item.gaw_id }}</span>
            </a>
            <br>
            <strong>{{ $t('data.stations.station-id') }}</strong>
            <nuxt-link :to="'/data/stations/' + element.item.woudc_id">
              <span> {{ element.item.woudc_id }}</span>
            </nuxt-link>
            <br>
            <strong>{{ $t('data.stations.station-name') }}</strong>
            <span> {{ element.item.name }}</span>
            <br>
            <strong>{{ $t('data.stations.country-name') }}</strong>
            <span> {{ element.item.country_name[$i18n.locale] }}</span>
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
          :elements="visibleStations"
          :selected="selectedStation"
          :loading="loadingTable"
          @select="selectedStation = $event"
        >
          <template v-slot:row="row">
            <td>
              <nuxt-link :to="localePath('data-stations') + '/' + row.item.woudc_id">
                {{ row.item.woudc_id }}
              </nuxt-link>
            </td>
            <td>
              <span v-if="row.item.gaw_id !== null">
                <a :href="row.item.gaw_url" target="_blank">
                  {{ row.item.gaw_id }}
                </a>
              </span>
            </td>
            <td>{{ row.item.start_date }}</td>
            <td>{{ row.item.end_date }}</td>
            <td>{{ row.item.name }}</td>
            <td>{{ row.item.country_name[$i18n.locale] }}</td>
            <td>{{ row.item.last_validated_datetime }}</td>
            <td>{{ row.item.type }}</td>
            <td>{{ row.item.wmo_region_id }}</td>
          </template>
        </selectable-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { unpackageStation } from '~/plugins/unpackage'

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
      loadingMap: true,
      loadingTable: true,
      selectedStation: null,
      stations: []
    }
  },
  computed: {
    headers() {
      const headerKeys = [
        'woudc_id',
        'gaw_id',
        'start_date',
        'end_date',
        'name',
        'country',
        'last_validated_datetime',
        'type',
        'wmo_region_id'
      ]

      return headerKeys.map((key) => {
        return {
          text: this.$t('data.stations.station-headers.' + key),
          value: key
        }
      })
    },
    visibleStations() {
      if (this.boundingBox === null) {
        return this.stations
      } else {
        return this.stations.filter((station) => {
          const coords = this.$L.latLng(station.geometry.coordinates)
          return this.boundingBox.contains(coords)
        })
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('stations/download')

    const stations = this.$store.getters['stations/all'].orderByID
    this.stations = stations.map(unpackageStation)
    this.loadingMap = false
    this.loadingTable = false
  },
  nuxtI18n: {
    paths: {
      en: '/data/stations',
      fr: '/donnees/stations'
    }
  }
}
</script>
