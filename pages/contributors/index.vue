<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.list.title') }}</h1>
    <p>{{ $t('contributors.list.blurb') }}</p>
    <v-expansion-panels id="map-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('contributors.list.map-instructions.label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('contributors.list.map-instructions.text') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels id="table-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('contributors.list.table-instructions.label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('contributors.list.table-instructions.text') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-data-table
      id="contributors-table"
      :headers="headers"
      :items="contributors"
      class="elevation-1"
    >
      <template v-slot:item.acronym="contributor">
        <nuxt-link :to="'/contributors/' + contributor.item.acronym">
          {{ contributor.item.acronym }}
        </nuxt-link>
      </template>
      <template v-slot:item.name="contributor">
        <a :href="contributor.item.url" target="_blank">
          {{ contributor.item.name }}
        </a>
      </template>
      <template v-slot:item.country="contributor">
        {{ contributor.item.country_name[$i18n.locale] }}
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'

const contributorKeys = [
  'acronym',
  'project',
  'name',
  'country',
  'start_date',
  'end_date',
  'wmo_region_id'
]

export default {
  async asyncData({ params }) {
    const contributorsURL = '/collections/contributors/items'
    const queryParams = 'sortby=acronym:A,project:D'

    const contributorsResponse = await axios.get(contributorsURL + '?' + queryParams)

    return {
      contributors: contributorsResponse.data.features.map((contributor) => {
        contributor.properties.country_name = {
          en: contributor.properties.country_name_en,
          fr: contributor.properties.country_name_fr
        }
        return contributor.properties
      })
    }
  },
  data() {
    return {
      contributors: []
    }
  },
  computed: {
    headers() {
      return [...contributorKeys.keys()].map((index) => {
        return {
          text: this.$t('contributors.list.contributor-headers[' + index + ']'),
          value: contributorKeys[index]
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/contributors',
      fr: '/contributeurs'
    }
  }
}
</script>
