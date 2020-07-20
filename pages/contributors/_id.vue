<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('contributors.list.title') }}</h1>
        <h2 v-if="contributors.length > 0">
          {{ contributors[0].acronym + ' - ' + contributors[0].name }}
        </h2>
        <p>{{ $t('contributors.list.blurb') }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <selectable-map
          :elements="contributors"
          :selected="selectedContributor"
          @select="selectedContributor = $event"
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
        <v-data-table
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '~/plugins/axios'
import { unpackageContributor, unpackageDeployment } from '~/plugins/unpackage'

import mapInstructions from '~/components/MapInstructions'
import tableInstructions from '~/components/TableInstructions'
import SelectableMap from '~/components/SelectableMap'

export default {
  components: {
    'map-instructions': mapInstructions,
    'selectable-map': SelectableMap,
    'table-instructions': tableInstructions
  },
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
  data() {
    return {
      contributors: [],
      deployments: [],
      selectedContributor: null
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
  },
  watch: {
    $route() {
      this.populate()
    }
  },
  async created() {
    await this.$store.dispatch('contributors/download')

    this.populate()
  },
  methods: {
    async populate() {
      const acronym = this.$route.params.id
      const contributorMapFunc = this.$store.getters['contributors/getWithAcronym']
      const contributors = contributorMapFunc(acronym).map(unpackageContributor)

      const deploymentsURL = '/collections/deployments/items'
      const queryParams = 'contributor=' + acronym + '&sortby=station_id:A'

      const deploymentsResponse = await axios.get(deploymentsURL + '?' + queryParams)

      this.deployments =  deploymentsResponse.data.features.map(unpackageDeployment)
      this.contributors = contributors
      this.selectedContributor = contributors[0]
    }
  }
}
</script>
