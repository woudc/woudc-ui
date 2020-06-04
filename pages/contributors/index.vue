<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.list.title') }}</h1>
    <p>{{ $t('contributors.list.blurb') }}</p>
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
