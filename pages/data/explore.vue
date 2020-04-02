<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <woudc-blurb :items="$t('blurb')" />
    <h3>{{ $t('dataset') }}</h3>
    <woudc-select
      v-model="selectedDataset"
      :options="datasets"
      :placeholder="$t('default-dataset')"
      @input="clearAll()"
    />
    <h3>{{ $t('country') }}</h3>
    <woudc-select
      v-model="selectedCountry"
      :options="countries"
      :placeholder="$t('default-country')"
      :disabled="selectedDataset === ''"
      @input="clearStationAndInstrument()"
    />
    <h3>{{ $t('station') }}</h3>
    <woudc-select
      v-model="selectedStation"
      :options="stations"
      :placeholder="$t('default-station')"
      :disabled="selectedDataset === ''"
      @input="clearInstrument()"
    />
    <h3>{{ $t('instrument') }}</h3>
    <woudc-select
      v-model="selectedInstrument"
      :options="instruments"
      :placeholder="$t('default-instrument')"
      :disabled="instruments.length === 0"
    />
    <v-range-slider v-model="selectedYearRange" :min="minYear" :max="maxYear" />
    <div id="start-year">
      <h4>{{ $t('start') }}</h4>
      <input v-model="selectedYearRange[0]" type="text">
    </div>
    <div id="end-year">
      <h4>{{ $t('end') }}</h4>
      <input v-model="selectedYearRange[1]" type="text">
    </div>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Data Search / Download",
    "dataset": "Dataset",
    "country": "Country",
    "station": "Station",
    "instrument": "Instrument",
    "start": "Start",
    "end": "End",
    "default-dataset": "Select a Dataset",
    "default-country": "Select a Country",
    "default-station": "Select a Station",
    "default-instrument": "Select an Instrument",
    "blurb": [
      "The WOUDC data archive can be searched by data category: there are six ozone data categories and three ultraviolet (UV) radiation data categories. The ozone datasets for total column ozone include total ozone and total ozone observations and the vertical ozone profile includes lidar, ozonesonde, Umkehr N-value and C-Umkehr. The UV datasets for UV irradiance include broadband, multiband and spectral.",
      { "newlines": 2 },
      "To search and download data, select the dataset and observation time period. Optionally, draw your map extent of interest and then hit search. All available data for that time period will be displayed.",
      { "newlines": 2 },
      "For more details on how to use this page, please view the ",
      { "link": { "to": "about-dataaccess", "text": "How to Use" } },
      "guide."
    ]
  },
  "fr": {
    "title": "Rechercher des données / Télécharger",
    "dataset": "Jeu de Données",
    "country": "Pays",
    "station": "Station",
    "instrument": "Instrument",
    "start": "Début",
    "end": "Fin",
    "default-dataset": "Select a Dataset in French",
    "default-country": "Select a Country in French",
    "default-station": "Select a Station in French",
    "default-instrument": "Select an Instrument in French",
    "blurb": [
      "La recherche dans l’archive de données du WOUDC peut se faire par catégorie de données : il y a six catégories de données sur l’ozone et trois sur le rayonnement ultraviolet (UV). Les jeux de données pour la colonne d’ozone totale comprennent l’ozone total et les observations sur l’ozone total, et la courbe de répartition verticale de l’ozone comprend les valeurs obtenues à l’aide des techniques lidar et des sondages d’ozone, ainsi que les valeurs N obtenues à l’aide de la technique Umkehr et celles établies à l’aide de la technique C-Umkehr. Les jeux de données sur le rayonnement UV comprennent celles à large bande, multibandes, et spectrales.",
      { "newlines": 2 },
      "Pour chercher et télécharger des données, sélectionnez l’ensemble de données et la période d’observation. Vous pouvez également choisir l’étendue géographique de votre recherche et cliquer sur envoyer la requête. Toutes les données disponibles pour cette période seront affichées.",
      { "newlines": 2 },
      "Pour obtenir plus d’information à propos de l’utilisation de cette page, consultez le ",
      { "link": { "to": "about-dataaccess", "text": "Guide d’utilisation" } },
      "."
    ]
  }
}
</i18n>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'
import WoudcSelect from '~/components/WoudcSelect'

const now = new Date()

export default {
  components: {
    'woudc-blurb': WoudcBlurb,
    'woudc-select': WoudcSelect
  },
  data() {
    return {
      selectedDataset: '',
      selectedCountry: '',
      selectedStation: '',
      selectedInstrument: '',
      minYear: 1924,
      maxYear: now.getFullYear(),
      selectedYearRange: [1924, now.getFullYear()],
      datasets: [
        { text: 'All WOUDC Datasets', key: 'All' },
        {
          category: 'Total Column Ozone',
          children: [
            { text: 'Total Ozone - Daily Observations', key: 'TotalOzone' },
            { text: 'Total Ozone - Hourly Observations', key: 'TotalOzoneObs' }
          ]
        },
        {
          category: 'Vertical Ozone Profile',
          children: [
            { text: 'Lidar', value: 'Lidar' },
            { text: 'OzoneSonde', value: 'OzoneSonde' },
            { text: 'UmkehrN14 (Level 1.0)', value: 'UmkehrN14_1.0' },
            { text: 'UmkehrN14 (Level 2.0)', value: 'UmkehrN14_2.0' },
            { text: 'RocketSonde', value: 'RocketSonde' }
          ]
        },
        {
          category: 'UV Irradiance',
          children: [
            { text: 'Broadband', key: 'Broad-band' },
            { text: 'Multiband', key: 'Multi-band' },
            { text: 'Spectral', key: 'Spectral' },
            { text: 'UV Index', key: 'uv_index_hourly' }
          ]
        },
        {
          category: 'Related Data Centers',
          children: [
            { text: 'NDACC: Total Column Ozone' },
            { text: 'NDACC: Vertical Ozone Profile' },
            { text: 'NDACC: UV Irradiance' }
          ]
        }
      ],
      countries: [
        { text: 'Canada', key: 'CAN' },
        { text: 'Nepal', key: 'NPL' },
        { text: 'Mount Kilimanjaro', key: 'KMJ' }
      ],
      stations: [
        { text: 'Alert (018)', key: '018' },
        { text: 'Edmonton (021)', key: '021' },
        { text: 'Moosonee (023)', key: '023' },
        { text: 'Resolute (024)', key: '024' },
        { text: 'Toronto (065)', key: '065' },
        { text: 'Goose Bay (076)', key: '076' },
        { text: 'Churchill (077)', key: '077' },
        { text: 'Iqaluit (303)', key: '303' },
        { text: 'Eureka (315)', key: '315' },
        { text: 'Kelowna (457)', key: '457' }
      ],
      instruments: [
        { text: 'Some Brewer', key: 'brewer' },
        { text: 'Some Dobson', key: 'dobson' },
        { text: 'Another Brewer', key: 'also brewer' }
      ]
    }
  },
  methods: {
    clearAll() {
      this.selectedCountry = ''
      this.selectedStation = ''
      this.selectedInstrument = ''
    },
    clearStationAndInstrument() {
      this.selectedStation = ''
      this.selectedInstrument = ''
    },
    clearInstrument() {
      this.selectedInstrument = ''
    }
  },
  nuxtI18n: {
    paths: {
      en: '/explore',
      fr: '/explore-fr'
    }
  }
}
</script>
