<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ title }}</h1>
    <hr>
    <h2>{{ $t('search') }}</h2>
    <v-expansion-panels v-if="instructions !== undefined">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('instructions') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <woudc-blurb :items="instructions" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <h4>{{ $t('station') }}</h4>
    <woudc-select
      v-model="selectedStation"
      :options="fetchStations(dataset)"
      :disabled="disableStationSelect"
      @input="resetInstrumentsAndYears(selectedStation, $event)"
    />
    <div v-if="!hideInstruments" class="instrument-selector">
      <h4>{{ $t('instrument') }}</h4>
      <woudc-select
        v-model="selectedInstrument"
        :options="instruments"
        :disabled="disableInstrumentSelect"
        @input="resetYears($event)"
      />
    </div>
    <h4>{{ $t('year') }}</h4>
    <woudc-select
      v-model="selectedYear"
      :options="years"
      :disabled="disableYearSelect"
    />
    <h2>{{ $t('results') }}</h2>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "search": "Search",
    "instructions": "Instructions",
    "station": "Station",
    "required": "Required",
    "instrument": "Instrument",
    "year": "Year",
    "all": "All",
    "submit": "Submit",
    "reset": "Reset",
    "results": "Results"
  },
  "fr": {
    "search": "Recherche",
    "instructions": "Instructions",
    "station": "Station",
    "required": "Requis",
    "instrument": "Instrument",
    "year": "Année",
    "all": "Tous",
    "submit": "Soumettre",
    "reset": "Réinitialisation",
    "results": "Résultats"
  }
}
</i18n>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'
import WoudcSelect from '~/components/WoudcSelect'

export default {
  name: 'ProductsPage',
  components: {
    'woudc-blurb': WoudcBlurb,
    'woudc-select': WoudcSelect
  },
  props: {
    title: { type: String, required: true },
    instructions: { type: [String, Object], required: true },
    dataset: { type: String, required: true },
    hideInstruments: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      selectedStation: '',
      selectedYear: 'all',
      selectedInstrument: '',
      years: [
        {
          text: this.$t('all'),
          key: 'all'
        },
        {
          text: '2016',
          key: '2016'
        },
        {
          text: '2017',
          key: '2017'
        },
        {
          text: '2018',
          key: '2018'
        },
        {
          text: '2019',
          key: '2019'
        }
      ],
      instruments: [
        {
          text: '...',
          key: ''
        },
        {
          text: 'Some Brewer',
          key: 'brewer'
        },
        {
          text: 'Maybe a Dobson',
          key: 'dobson'
        },
        {
          text: 'Another Dobson',
          key: 'alsodobson'
        }
      ]
    }
  },
  computed: {
    disableStationSelect() {
      return false
    },
    disableInstrumentSelect() {
      return this.selectedStation === ''
    },
    disableYearSelect() {
      return (
        this.selectedStation === '' ||
        (!this.hideInstruments && this.selectedInstrument === '')
      )
    }
  },
  methods: {
    fetchStations(dataset) {
      return [
        {
          text: '...',
          key: ''
        },
        {
          text: 'Moosonee (023)',
          key: '023'
        },
        {
          text: 'Churchill (077)',
          key: '077'
        },
        {
          text: 'Eureka (315)',
          key: '315'
        }
      ]
    },
    resetInstrumentsAndYears(station) {
      this.selectedInstrument = ''
      this.selectedYear = 'all'
    },
    resetYears(station, instrument) {
      this.selectedYear = 'all'
    }
  }
}
</script>
