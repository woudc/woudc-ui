<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.explore.title') }}</h1>
    <p>{{ $t('data.explore.blurb.body-datasets') }}</p>
    <p>{{ $t('data.explore.blurb.body-search') }}</p>
    <i18n path="data.explore.blurb.body-howto" tag="p">
      <template v-slot:how-to>
        <nuxt-link :to="localePath('about-dataaccess')">
          {{ $t('data.explore.how-to') }}
        </nuxt-link>
      </template>
    </i18n>
    <h3>{{ $t('data.explore.dataset.title') }}</h3>
    <v-select
      class="woudc-select"
      :value="selectedDataset"
      :items="datasetOptions"
      :label="$t('data.explore.dataset.placeholder')"
      item-text="name"
      item-value="value"
      solo
      @input="clearAll()"
    />
    <h3>{{ $t('data.explore.country.title') }}</h3>
    <v-autocomplete
      :value="selectedCountry"
      :items="countries"
      :label="$t('data.explore.country.placeholder')"
      :item-text="countryText"
      item-value="country_code"
      solo
      @input="clearStationAndInstrument()"
    />
    <h3>{{ $t('data.explore.station.title') }}</h3>
    <v-autocomplete
      :value="selectedStation"
      :items="stations"
      :label="$t('data.explore.station.placeholder')"
      :item-text="stationText"
      item-value="woudc_id"
      solo
      @input="clearInstrument()"
    />
    <h3>{{ $t('data.explore.instrument.title') }}</h3>
    <v-select
      :value="selectedInstrument"
      :items="instruments"
      :label="$t('data.explore.instrument.placeholder')"
      :item-text="instrumentText"
      item-value="name"
      solo
    />
    <v-range-slider
      v-model="selectedYearRange"
      :min="minSelectableYear"
      :max="maxSelectableYear"
    />
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
export default {
  data() {
    return {
      selectedDataset: null,
      selectedCountry: null,
      selectedStation: null,
      selectedInstrument: null,
      selectedYearRange: [null, null],
      minSelectableYear: 1924,
      countries: [
        { country_code: null },
        {
          country_name: { en: 'Canada', fr: 'Canada' },
          country_code: 'CAN'
        },
        {
          country_name: { en: 'Nepal', fr: 'Nepal' },
          country_code: 'NPL'
        },
        {
          country_name: { en: 'Mount Kilimanjaro', fr: 'Mount Kilimanjaro' },
          country_code: 'KMJ'
        }
      ],
      stations: [
        { woudc_id: null },
        { name: 'Alert', woudc_id: '018' },
        { name: 'Edmonton', woudc_id: '021' },
        { name: 'Moosonee', woudc_id: '023' },
        { name: 'Resolute', woudc_id: '024' },
        { name: 'Toronto', woudc_id: '065' },
        { name: 'Goose Bay', woudc_id: '076' },
        { name: 'Churchill', woudc_id: '077' },
        { name: 'Iqaluit', woudc_id: '303' },
        { name: 'Eureka', woudc_id: '315' },
        { name: 'Kelowna', woudc_id: '457' }
      ],
      instruments: [
        { name: null },
        { name: 'Brewer' },
        { name: 'Dobson' },
        { name: 'ECC' }
      ]
    }
  },
  computed: {
    datasetOptions() {
      const datasetSections = {
        totalozone: {
          daily: 'TotalOzone',
          hourly: 'TotalOzoneObs'
        },
        'vertical-ozone': {
          lidar: 'Lidar',
          ozonesonde: 'OzoneSonde',
          umkehr1: 'UmkehrN14_1.0',
          umkehr2: 'UmkehrN14_2.0',
          rocketsonde: 'RocketSonde'
        },
        'uv-irradiance': {
          broadband: 'Broad-band',
          multiband: 'Multi-band',
          spectral: 'Spectral',
          'uv-index': 'uv_index_hourly'
        },
        'data-centers': {
          totalozone: 'ndacc-total',
          'vertical-ozone': 'ndacc-vertical',
          'uv-irradiance': 'ndacc-uv'
        }
      }

      const datasetOptions = []
      datasetOptions.push({
        name: this.$t('data.explore.dataset.all'),
        value: 'All',
      })

      for (const [section, children] of Object.entries(datasetSections)) {
        datasetOptions.push({
          header: this.$t('data.explore.dataset.' + section + '.label')
        })
        for (const [subsection, id] of Object.entries(children)) {
          datasetOptions.push({
            name: this.$t('data.explore.dataset.' + section + '.' + subsection),
            value: id
          })
        }
      }

      return datasetOptions
    },
    maxSelectableYear() {
      return (new Date()).getFullYear()
    }
  },
  mounted() {
    this.selectedYearRange = [
      this.minSelectableYear, this.maxSelectableYear
    ]
  },
  methods: {
    countryText(country) {
      if (country.country_code === null) {
        return '...'
      } else {
        const name = country.country_name[this.$i18n.locale]
        return name + ' (' + country.country_code + ')'
      }
    },
    stationText(station) {
      if (station.woudc_id === null) {
        return '...'
      } else {
        return station.name + ' (' + station.woudc_id + ')'
      }
    },
    instrumentText(instrument) {
      if (instrument.name === null) {
        return '...'
      } else {
        return instrument.name
      }
    },
    clearAll() {
      this.selectedCountry = null
      this.selectedStation = null
      this.selectedInstrument = null
    },
    clearStationAndInstrument() {
      this.selectedStation = null
      this.selectedInstrument = null
    },
    clearInstrument() {
      this.selectedInstrument = null
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/explore',
      fr: '/donnees/rechercher'
    }
  }
}
</script>

<style scoped>
.v-select-list >>> .v-list {
  padding: 0px;
}

.v-select-list >>> .v-subheader {
  font-weight: bold;
  background-color: #e4e4e4;
  max-height: 40px;
  padding-left: 12px;
  margin-left: 0px;
}

.v-select >>> .v-input__slot {
  max-width: 60%;
}

.v-select-list >>> .v-list-item {
  padding-left: 24px;
}

.v-select-list >>> .v-list-item,
.v-select-list >>> .v-list-item__content {
  padding-top: 0px;
  padding-bottom: 0px;
  min-height: 32px;
}
</style>
