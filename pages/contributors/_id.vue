<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.list.title') }}</h1>
    <h2 v-if="contributors.length > 0">
      {{ contributors[0].acronym + ' - ' + contributors[0].name }}
    </h2>
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
      id="contributor-table"
      :headers="contributorHeaders"
      :items="contributors"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.acronym="contributor">
        <nuxt-link :to="'/contributors/' + contributor.item.acronym">
          {{ contributor.item.acronym }}
        </nuxt-link>
      </template>
      <template v-slot:item.name="contributor">
        <a :href="contributor.item.url">
          {{ contributor.item.name }}
        </a>
      </template>
      <template v-slot:item.country="contributor">
        {{ contributor.item.country_name[$i18n.locale] }}
      </template>
    </v-data-table>
    <v-data-table
      id="deployments-table"
      :headers="deploymentHeaders"
      :items="deployments"
      class="elevation-1"
    >
      <template v-slot:item="deployment">
        <tr>
          <td>
            <nuxt-link :to="'/data/stations/' + deployment.item.station_id">
              {{ deployment.item.station_id }}
            </nuxt-link>
          </td>
          <td>{{ deployment.item.station_name }}</td>
          <td>{{ deployment.item.station_type }}</td>
          <td>{{ deployment.item.country_name[$i18n.locale] }}</td>
          <td>{{ deployment.item.start_date }}</td>
          <td>{{ deployment.item.end_date }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  async validate({ params }) {
    const acronym = params.id
    const url = '/collections/contributors/items'

    const queryParams = 'acronym=' + acronym
    let found = true
    await axios.get(url + '?' + queryParams).catch(() => {
      found = false
    })

    return found
  },
  async asyncData({ params }) {
    const acronym = params.id
    let queryParams

    const contributorsURL = '/collections/contributors/items'
    const deploymentsURL = '/collections/deployments/items'

    queryParams = 'acronym=' + acronym + '&sortby=acronym:A,project:D'
    const contributorsResponse = await axios.get(contributorsURL + '?' + queryParams)

    const contributorsList = contributorsResponse.data.features.map((contributor) => {
      contributor.properties.country_name = {
        en: contributor.properties.country_name_en,
        fr: contributor.properties.country_name_fr
      }
      return contributor.properties
    })

    queryParams = 'contributor=' + acronym + '&sortby=station_id:A'
    const deploymentsResponse = await axios.get(deploymentsURL + '?' + queryParams)

    const deploymentsList = deploymentsResponse.data.features.map((deployment) => {
      deployment.properties.country_name = {
        en: deployment.properties.station_country_en,
        fr: deployment.properties.station_country_fr
      }
      return deployment.properties
    })

    return {
      contributors: contributorsList,
      deployments: deploymentsList
    }
  },
  data() {
    return {
      contributors: [],
      deployments: []
    }
  },
  computed: {
    contributorHeaders() {
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
    deploymentHeaders() {
      const deploymentKeys = [
        'woudc_id',
        'name',
        'type',
        'country',
        'start_date',
        'end_date'
      ]

      return deploymentKeys.map((key) => {
        return {
          text: this.$t('contributors.list.deployment-headers.' + key),
          value: key
        }
      })
    }
  }
}
</script>
