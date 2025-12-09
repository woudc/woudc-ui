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
        <v-alert class="mt-1 mb-4" color="info" outlined text border="left">
          <div>
            {{ $t('about.formats.note') }}
          </div>
        </v-alert>
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
          <li v-for="(dataset, key) in ozoneDatasets" :key="key">
            <a :href="dataset.url" target="_blank">
              {{ dataset.text }}
              <v-icon x-small>mdi-open-in-new</v-icon>
            </a>
          </li>
        </ul>
        <h3>{{ $t('about.formats.examples.uv') }}</h3>
        <ul>
          <li v-for="(dataset, key) in uvDatasets" :key="key">
            <a :href="dataset.url" target="_blank">
              {{ dataset.text }}
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
    }
  },
  head() {
    return {
      title: this.$t('about.formats.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('about.formats.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('about.formats.keywords'),
        },
      ],
    }
  },
  computed: {
    ozoneDatasets() {
      return {
        lidar: {
          text: this.$t('about.formats.examples.links.lidar'),
          url:
            this.$config.WOUDC_UI_WAF_URL +
            '/Documentation/Examples-extCSV/Lidar.csv',
        },
        ozonesonde: {
          text: this.$t('about.formats.examples.links.ozonesonde'),
          url:
            this.$config.WOUDC_UI_WAF_URL +
            '/Documentation/Examples-extCSV/Ozonesonde.csv',
        },
        totalozone: {
          text: this.$t('about.formats.examples.links.totalozone'),
          url:
            this.$config.WOUDC_UI_WAF_URL +
            '/Documentation/Examples-extCSV/TotalOzone-Brewer.csv',
        },
        totalozoneobs: {
          text: this.$t('about.formats.examples.links.totalozoneobs'),
          url:
            this.$config.WOUDC_UI_WAF_URL +
            '/Documentation/Examples-extCSV/TotalOzoneObs.csv',
        },
        umkehr1: {
          text: this.$t('about.formats.examples.links.umkehr1'),
          url:
            this.$config.WOUDC_UI_WAF_URL +
            '/Documentation/Examples-extCSV/Umkehr-N_values-Dobson.csv',
        },
        umkehr2: {
          text: this.$t('about.formats.examples.links.umkehr2'),
          url:
            this.$config.WOUDC_UI_WAF_URL +
            '/Documentation/Examples-extCSV/Umkehr_UMK92Retrieval-Dobson.csv',
        },
      }
    },
    uvDatasets() {
      return {
        broadband: {
          text: this.$t('about.formats.examples.links.broadband'),
          url:
            this.$config.WOUDC_UI_WAF_URL +
            '/Documentation/Examples-extCSV/Broad-band.csv',
        },
        multiband: {
          text: this.$t('about.formats.examples.links.multiband'),
          url:
            this.$config.WOUDC_UI_WAF_URL +
            '/Documentation/Examples-extCSV/Multi-band.csv',
        },
        spectral: {
          text: this.$t('about.formats.examples.links.spectral'),
          url:
            this.$config.WOUDC_UI_WAF_URL +
            '/Documentation/Examples-extCSV/Spectral.csv',
        },
      }
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
