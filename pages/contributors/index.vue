<template>
  <v-container>
    <h1>{{ $t('contributors.list.title') }}</h1>
    <p>{{ $t('contributors.list.blurb') }}</p>
    <v-row>
      <v-col>
        <selectable-map
          :elements="contributors"
          :selected="selectedContributor"
          :loading="loadingMap"
          @select="selectedContributor = $event"
          @move="boundingBox = $event"
        >
          <template v-slot:popup="element">
            <strong>{{ $t('contributors.list.contributor-name') }}</strong>
            <nuxt-link :to="localePath('contributors') + '/' + element.item.acronym">
              {{ element.item.name }}
            </nuxt-link>
            <br>
            <strong>{{ $t('contributors.list.country-name') }}</strong>
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
          :elements="visibleContributors"
          :headers="headers"
          :selected="selectedContributor"
          :loading="loadingTable"
          @select="selectedContributor = $event"
        >
          <template v-slot:row="row">
            <td>
              <nuxt-link :to="localePath('contributors') + '/' + row.item.acronym">
                {{ row.item.acronym }}
              </nuxt-link>
            </td>
            <td>{{ row.item.project }}</td>
            <td>
              <a :href="row.item.url" target="_blank">
                {{ row.item.name }}
              </a>
            </td>
            <td>{{ row.item.country_name[$i18n.locale] }}</td>
            <td>{{ row.item.start_date }}</td>
            <td>{{ row.item.end_date }}</td>
            <td>{{ row.item.wmo_region_id }}</td>
          </template>
        </selectable-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { unpackageContributor } from '~/plugins/unpackage'

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
      contributors: [],
      loadingMap: true,
      loadingTable: true,
      selectedContributor: null
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
    },
    visibleContributors() {
      if (this.boundingBox === null) {
        return this.contributors
      } else {
        return this.contributors.filter((contributor) => {
          const coords = this.$L.latLng(contributor.geometry.coordinates)
          return this.boundingBox.contains(coords)
        })
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('contributors/download')

    const contributors = this.$store.getters['contributors/all']
    this.contributors = contributors.map(unpackageContributor)
    this.loadingMap = false
    this.loadingTable = false
  },
  nuxtI18n: {
    paths: {
      en: '/contributors',
      fr: '/contributeurs'
    }
  }
}
</script>
