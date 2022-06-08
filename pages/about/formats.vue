<template>
  <v-container>
    <h1>{{ $t('about.formats.title') }}</h1>
    <i18n path="about.formats.blurb.body-intro" tag="p">
      <template #extended>
        <strong>{{ $t('common.extended') }}</strong>
      </template>
    </i18n>
    <i18n path="about.formats.blurb.body-extcsv" tag="p">
      <template #extended>
        <strong>{{ $t('common.extended') }}</strong>
      </template>
      <template #access>
        <nuxt-link :to="localePath('about-data_access')">
          <span>{{ $t('common.access') }}</span>
        </nuxt-link>
      </template>
    </i18n>
    <v-row>
      <v-col>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-text>
            {{ $t('about.formats.note') }}
          </v-card-text>
        </v-card>
        <h2>{{ $t('about.formats.contributor-guide.title') }}</h2>
        <ul>
          <li>
            <a :href="contributorsURL" target="_blank">
              {{ $t('about.formats.contributor-guide.link') }}
              <v-icon x-small>mdi-open-in-new</v-icon>
            </a>
          </li>
        </ul>
        <h2>{{ $t('about.formats.examples.title') }}</h2>
        <p>{{ $t('about.formats.examples.blurb') }}</p>
        <h3>{{ $t('about.formats.examples.ozone') }}</h3>
        <ul>
          <li v-for="(link, i) in prepareLinks(ozoneDatasets)" :key="i">
            <a :href="link.url" target="_blank">
              {{ link.text }}
              <v-icon x-small>mdi-open-in-new</v-icon>
            </a>
          </li>
        </ul>
        <h3>{{ $t('about.formats.examples.uv') }}</h3>
        <ul>
          <li v-for="(link, index) in prepareLinks(uvDatasets)" :key="index">
            <a :href="link.url" target="_blank">
              {{ link.text }}
              <v-icon x-small>mdi-open-in-new</v-icon>
            </a>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      contributorsURL: 'https://guide.woudc.org/en/',
      exampleURLs: {
        broadband:
          this.$config.WOUDC_UI_WAF_URL +
          '/Documentation/Examples-extCSV/Broad-band.csv',
        lidar:
          this.$config.WOUDC_UI_WAF_URL +
          '/Documentation/Examples-extCSV/Lidar.csv',
        multiband:
          this.$config.WOUDC_UI_WAF_URL +
          '/Documentation/Examples-extCSV/Multi-band.csv',
        ozonesonde:
          this.$config.WOUDC_UI_WAF_URL +
          '/Documentation/Examples-extCSV/Ozonesonde.csv',
        spectral:
          this.$config.WOUDC_UI_WAF_URL +
          '/Documentation/Examples-extCSV/Spectral.csv',
        totalozone:
          this.$config.WOUDC_UI_WAF_URL +
          '/Documentation/Examples-extCSV/TotalOzone-Brewer.csv',
        totalozoneobs:
          this.$config.WOUDC_UI_WAF_URL +
          '/Documentation/Examples-extCSV/TotalOzoneObs.csv',
        umkehr1:
          this.$config.WOUDC_UI_WAF_URL +
          '/Documentation/Examples-extCSV/Umkehr-N_values-Dobson.csv',
        umkehr2:
          this.$config.WOUDC_UI_WAF_URL +
          '/Documentation/Examples-extCSV/Umkehr_UMK92Retrieval-Dobson.csv',
      },
      ozoneDatasets: [
        'lidar',
        'ozonesonde',
        'totalozone',
        'totalozoneobs',
        'umkehr1',
        'umkehr2',
      ],
      uvDatasets: ['broadband', 'multiband', 'spectral'],
    }
  },
  head() {
    return {
      title: this.$t('about.formats.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('about.formats.examples.blurb'),
        },
      ],
    }
  },
  methods: {
    prepareLinks(datasets) {
      return datasets.map((dataset) => {
        return {
          text: this.$t('about.formats.examples.links.' + dataset),
          url: this.exampleURLs[dataset],
        }
      })
    },
  },
  nuxtI18n: {
    paths: {
      en: '/about/formats',
      fr: '/a-propos/formats',
    },
  },
}
</script>
