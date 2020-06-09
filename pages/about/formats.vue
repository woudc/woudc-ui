<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.formats.title') }}</h1>
    <i18n class="newlines" path="about.formats.blurb.template" tag="p">
      <template v-slot:extended>
        <b>{{ $t('about.formats.blurb.extended') }}</b>
      </template>
      <template v-slot:access>
        <nuxt-link :to="localePath('about-dataaccess')" v-text="$t('about.formats.blurb.access')" />
      </template>
    </i18n>
    <v-card class="mt-1 mb-4" color="info">
      <v-card-text>{{ $t('about.formats.note') }}</v-card-text>
    </v-card>
    <h2> {{ $t('about.formats.contributor-guide.title') }}</h2>
    <ul>
      <li>
        <a :href="contributorsURL" target="_blank">{{ $t('about.formats.contributor-guide.link') }}</a>
      </li>
    </ul>
    <h2>{{ $t('about.formats.examples.title') }}</h2>
    <p>{{ $t('about.formats.examples.blurb') }}</p>
    <h3>{{ $t('about.formats.ozone.title') }}</h3>
    <ul>
      <li v-for="(link, i) in ozoneLinks" :key="i">
        <a :href="link.url" target="_blank">{{ link.text }}</a>
      </li>
    </ul>
    <h3>{{ $t('about.formats.uv.title') }}</h3>
    <ul>
      <li v-for="(link, index) in uvLinks" :key="index">
        <a :href="link.url" target="_blank">{{ link.text }}</a>
      </li>
    </ul>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      contributorsURL: 'https://guide.woudc.org/en/',
      ozoneURLs: [
        'https://woudc.org/archive/Documentation/Examples-extCSV/Lidar.csv',
        'https://woudc.org/archive/Documentation/Examples-extCSV/Ozonesonde.csv',
        'https://woudc.org/archive/Documentation/Examples-extCSV/TotalOzone-Brewer.csv',
        'https://woudc.org/archive/Documentation/Examples-extCSV/TotalOzoneObs.csv',
        'https://woudc.org/archive/Documentation/Examples-extCSV/Umkehr-N_values-Dobson.csv',
        'https://woudc.org/archive/Documentation/Examples-extCSV/Umkehr_UMK92Retrieval-Dobson.csv'
      ],
      uvURLs: [
        'https://woudc.org/archive/Documentation/Examples-extCSV/Broad-band.csv',
        'https://woudc.org/archive/Documentation/Examples-extCSV/Multi-band.csv',
        'https://woudc.org/archive/Documentation/Examples-extCSV/Spectral.csv'
      ]
    }
  },
  computed: {
    ozoneLinks() {
      return [...this.ozoneURLs.keys()].map((index) => {
        return {
          text: this.$t('about.formats.ozone.links[' + index + ']'),
          url: this.ozoneURLs[index]
        }
      })
    },
    uvLinks() {
      return [...this.uvURLs.keys()].map((index) => {
        return {
          text: this.$t('about.formats.uv.links[' + index + ']'),
          url: this.uvURLs[index]
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/formats',
      fr: '/a-propos/formats'
    }
  }
}
</script>
