<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.explore.title') }}</h1>
    <woudc-blurb :items="blurb" />
    <h3>{{ $t('data.explore.dataset') }}</h3>
    <woudc-select
      v-model="selectedDataset"
      :options="datasets"
      :placeholder="$t('data.explore.placeholders.dataset')"
      @input="clearAll()"
    />
    <h3>{{ $t('data.explore.country') }}</h3>
    <woudc-select
      v-model="selectedCountry"
      :options="countries"
      :placeholder="$t('data.explore.placeholders.country')"
      :disabled="selectedDataset === ''"
      @input="clearStationAndInstrument()"
    />
    <h3>{{ $t('data.explore.station') }}</h3>
    <woudc-select
      v-model="selectedStation"
      :options="stations"
      :placeholder="$t('data.explore.placeholders.station')"
      :disabled="selectedDataset === ''"
      @input="clearInstrument()"
    />
    <h3>{{ $t('data.explore.instrument') }}</h3>
    <woudc-select
      v-model="selectedInstrument"
      :options="instruments"
      :placeholder="$t('data.explore.placeholders.instrument')"
      :disabled="instruments.length === 0"
    />
    <v-range-slider v-model="selectedYearRange" :min="minYear" :max="maxYear" />
    <div id="start-year">
      <h4>{{ $t('data.explore.start') }}</h4>
      <input v-model="selectedYearRange[0]" type="text">
    </div>
    <div id="end-year">
      <h4>{{ $t('data.explore.end') }}</h4>
      <input v-model="selectedYearRange[1]" type="text">
    </div>
  </v-layout>
</template>

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
      blurb: [
        { text: this.$t('data.explore.blurb[0]') },
        { newlines: 2 },
        { text: this.$t('data.explore.blurb[1]') },
        { newlines: 2 },
        { text: this.$t('data.explore.blurb[2]') },
        { link: { to: 'about-dataaccess', text: this.$t('data.explore.blurb[3]') } },
        { text: this.$t('data.explore.blurb[4]') }
      ],
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
