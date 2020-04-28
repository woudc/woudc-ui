<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb') }}</p>
    <v-expansion-panels id="map-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('map-instructions-label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('map-instructions') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-expansion-panels id="table-instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('table-instructions-label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('table-instructions') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-data-table
      id="instruments-table"
      :headers="headers"
      :items="instruments"
      class="elevation-1"
    >
      <template v-slot:item.station_name="instrument">
        <nuxt-link :to="'/data/stations/' + instrument.item.station_id">
          {{ instrument.item.station_name }}
        </nuxt-link>
      </template>
      <template v-slot:item.waf_url="instrument">
        <a :href="instrument.item.waf_url" target="_blank">
          TODO
        </a>
      </template>
    </v-data-table>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Instrument List",
    "blurb": "The WOUDC data archive can be sorted by instrument. The instrument list includes the instrument type, name and model.",
    "map-instructions-label": "How to Use: Interactive Map",
    "map-instructions": "Lorem Ipsum something something something",
    "table-instructions-label": "How to Use: Interactive Table",
    "table-instructions": "Lorem Ipsum something something something",
    "headers": [
      {
        "text": "Instrument Type",
        "value": "name"
      },
      {
        "text": "Instrument Model",
        "value": "model"
      },
      {
        "text": "Date From",
        "value": "start_date"
      },
      {
        "text": "Date To",
        "value": "end_date"
      },
      {
        "text": "Data Class",
        "value": "data_class"
      },
      {
        "text": "Data Category",
        "value": "dataset"
      },
      {
        "text": "Station Name",
        "value": "station_name"
      },
      {
        "text": "Web Accessible Folder",
        "value": "waf_url"
      }
    ]
  },
  "fr": {
    "title": "Liste des instruments",
    "blurb": "Les archives de données du WOUDC peuvent être classées par instrument. La liste d’instruments comprend le type d’instrument, le nom et le modèle.",
    "map-instructions-label": "Guide d'utilisation : Carte interactive",
    "map-instructions": "Lorem Ipsum something something something",
    "table-instructions-label": "Guide d'utilisation : Tableau interactif",
    "table-instructions": "Lorem Ipsum something something something",
    "headers": [
      {
        "text": "Type d'instrument",
        "value": "name"
      },
      {
        "text": "Modèle de l’instrument",
        "value": "model"
      },
      {
        "text": "À partir de cette date",
        "value": "start_date"
      },
      {
        "text": "Jusqu’à cette date",
        "value": "end_date"
      },
      {
        "text": "Classe de données",
        "value": "data_class"
      },
      {
        "text": "Catégorie de données",
        "value": "dataset"
      },
      {
        "text": "Nom de la station",
        "value": "station"
      },
      {
        "text": "Dossier accessible sur le web",
        "value": "waf_url"
      }
    ]
  }
}
</i18n>

<script>
import axios from '~/plugins/axios'

export default {
  async asyncData({ params }) {
    const instrumentsURL = '/collections/instruments/items'
    const queryParams = 'sortby=dataset:A,station_id:A,name:A,model:A'

    const instrumentsResponse = await axios.get(instrumentsURL + '?' + queryParams)

    return {
      instruments: instrumentsResponse.data.features.map((instrument) => {
        return instrument.properties
      })
    }
  },
  data() {
    return {
      instruments: []
    }
  },
  computed: {
    headers() {
      return this.$i18nToArray(this.$t('headers')).map((definition) => {
        return {
          text: definition.text,
          align: 'left',
          sortable: false,
          value: definition.value
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/instruments',
      fr: '/instruments'
    }
  }
}
</script>
