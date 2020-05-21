<template>
  <v-layout justify-center column align-content-center>
    <h1 v-text="$t('about.formats.title')" />
    <i18n class="newlines" path="about.formats.blurb.template" tag="p">
      <template v-slot:extended>
        <b v-text="$t('about.formats.blurb.extended')" />
      </template>
      <template v-slot:access>
        <nuxt-link :to="localePath('about-dataaccess')" v-text="$t('about.formats.blurb.access')" />
      </template>
    </i18n>
    <v-card class="woudc-note" tile min-width="0px">
      <v-card-text v-text="$t('about.formats.note')" />
    </v-card>
    <h2 v-text="$t('about.formats.contributor-guide.title')" />
    <ul>
      <li>
        <a :href="contributorsURL" v-text="$t('about.formats.contributor-guide.link')" />
      </li>
    </ul>
    <h2 v-text="$t('about.formats.examples.title')" />
    <p v-text="$t('about.formats.examples.blurb')" />
    <h3 v-text="$t('about.formats.ozone.title')" />
    <ul>
      <li v-for="(link, i) in ozoneLinks" :key="i">
        <a :href="link.url" v-text="link.text" />
      </li>
    </ul>
    <h3 v-text="$t('about.formats.uv.title')" />
    <ul>
      <li v-for="(link, i) in uvLinks" :key="i">
        <a :href="link.url" v-text="link.text" />
      </li>
    </ul>
  </v-layout>
</template>

<script>
const ozoneURLs = [
  'https://woudc.org/archive/Documentation/Examples-extCSV/Lidar.csv',
  'https://woudc.org/archive/Documentation/Examples-extCSV/Ozonesonde.csv',
  'https://woudc.org/archive/Documentation/Examples-extCSV/TotalOzone-Brewer.csv',
  'https://woudc.org/archive/Documentation/Examples-extCSV/TotalOzoneObs.csv',
  'https://woudc.org/archive/Documentation/Examples-extCSV/Umkehr-N_values-Dobson.csv',
  'https://woudc.org/archive/Documentation/Examples-extCSV/Umkehr_UMK92Retrieval-Dobson.csv'
]
const uvURLs = [
  'https://woudc.org/archive/Documentation/Examples-extCSV/Broad-band.csv',
  'https://woudc.org/archive/Documentation/Examples-extCSV/Multi-band.csv',
  'https://woudc.org/archive/Documentation/Examples-extCSV/Spectral.csv'
]

export default {
  data() {
    return {
      contributorsURL: 'https://guide.woudc.org/en/'
    }
  },
  computed: {
    ozoneLinks() {
      return [...ozoneURLs.keys()].map((index) => {
        return {
          text: this.$t('about.formats.ozone.links[' + index + ']'),
          url: ozoneURLs[index]
        }
      })
    },
    uvLinks() {
      return [...uvURLs.keys()].map((index) => {
        return {
          text: this.$t('about.formats.uv.links[' + index + ']'),
          url: uvURLs[index]
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/formats',
      fr: '/formats'
    }
  }
}
</script>
