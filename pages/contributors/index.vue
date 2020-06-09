<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.list.title') }}</h1>
    <p>{{ $t('contributors.list.blurb') }}</p>
    <map-instructions id="map-instructions" />
    <table-instructions id="table-instructions" />
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
import mapInstructions from '~/components/MapInstructions'
import tableInstructions from '~/components/TableInstructions'

export default {
  components: {
    'map-instructions': mapInstructions,
    'table-instructions': tableInstructions
  },
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
      const contributorKeys = [
        'acronym',
        'project',
        'name',
        'country',
        'start_date',
        'end_date',
        'wmo_region_id'
      ]

      return contributorKeys.map((key) => {
        return {
          text: this.$t('contributors.list.contributor-headers.' + key),
          value: key
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
