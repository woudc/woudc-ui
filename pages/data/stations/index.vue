<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.stations.title') }}</h1>
    <p>{{ $t('data.stations.blurb') }}</p>
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
    <v-data-table :headers="headers" :items="stations" class="elevation-1">
      <template v-slot:item.woudc_id="station">
        <nuxt-link :to="'/data/stations/' + station.item.woudc_id">
          {{ station.item.woudc_id }}
        </nuxt-link>
      </template>
      <template v-slot:item.gaw_id="station">
        <span v-if="station.item.gaw_id !== null">
          <a :href="station.item.gaw_url" target="_blank">
            {{ station.item.gaw_id }}
          </a>
        </span>
      </template>
      <template v-slot:item.country="station">
        {{ station.item.country[$i18n.locale] }}
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData() {
    const stationsURL = '/collections/stations/items'
    const queryParams = 'sortby=woudc_id:A'

    const stationsResponse = await axios.get(stationsURL + '?' + queryParams)

    return {
      stations: stationsResponse.data.features.map((station) => {
        station.properties.country = {
          en: station.properties.country_name_en,
          fr: station.properties.country_name_fr
        }
        station.properties.last_validated_datetime =
          station.properties.last_validated_datetime.substring(0, 10)

        return station.properties
      })
    }
  },
  data() {
    return {
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
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/stations',
      fr: '/donnees/stations'
    }
  }
}
</script>
