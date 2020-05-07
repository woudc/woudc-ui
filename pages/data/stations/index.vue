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

<i18n>
{
  "en": {
    "title": "Station List",
    "blurb": "The WOUDC data archive can be sorted by station. To find out the identifying number of a particular station, select the metadata link on the WOUDC website and then the region that you are interested in. All available stations and their numbers for that region will then be displayed.",
    "map-instructions-label": "How to Use: Interactive Map",
    "map-instructions": "Lorem Ipsum something something something",
    "table-instructions-label": "How to Use: Interactive Table",
    "table-instructions": "Lorem Ipsum something something something",
    "headers" : [
      {
        "text": "WOUDC Station ID",
        "value": "woudc_id"
      },
      {
        "text": "GAW ID",
        "value": "gaw_id"
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
        "text": "Station Name",
        "value": "name"
      },
      {
        "text": "Station Country",
        "value": "country"
      },
      {
        "text": "Revision Date",
        "value": "last_validated_datetime"
      },
      {
        "text": "Station Type",
        "value": "type"
      },
      {
        "text": "WMO Region",
        "value": "wmo_region_id"
      }
    ]
  },
  "fr": {
    "title": "Liste des stations",
    "blurb": "Les archives de données du WOUDC peuvent être classées par station. Pour connaître le numéro identificateur d’une station, sélectionner le lien des métadonnées sur le site Web du WOUDC, puis la région désirée. Vous pourrez ensuite consulter la liste des stations et leur numéro d’identification.",
    "map-instructions-label": "Guide d'utilisation : Carte interactive",
    "map-instructions": "Lorem Ipsum something something something",
    "table-instructions-label": "Guide d'utilisation : Tableau interactif",
    "table-instructions": "Lorem Ipsum something something something",
    "headers" : [
      {
        "text": "Identification de la station du WOUDC",
        "value": "woudc_id"
      },
      {
        "text": "Identifiant VAG",
        "value": "gaw_id"
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
        "text": "Nom de la station",
        "value": "name"
      },
      {
        "text": "Pays de la station",
        "value": "country"
      },
      {
        "text": "Date de révision",
        "value": "last_validated_datetime"
      },
      {
        "text": "Type de station",
        "value": "type"
      },
      {
        "text": "Région de l'OMM",
        "value": "wmo_region_id"
      }
    ]
  }
}
</i18n>

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
      en: '/stations',
      fr: '/stations'
    }
  }
}
</script>
