<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.formats.title') }}</h1>
    <woudc-blurb :items="mainBlurb" />
    <woudc-note :body="$t('about.formats.note')" />
    <h2>{{ $t('about.formats.contributor-guide.title') }}</h2>
    <ul>
      <li v-for="(link, i) in contributorLinks" :key="i">
        <a :href="link.url">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('about.formats.examples.title') }}</h2>
    <p>{{ $t('about.formats.examples.blurb') }}</p>
    <h2>{{ $t('about.formats.ozone.title') }}</h2>
    <ul>
      <li v-for="(link, i) in ozoneLinks" :key="i">
        <a :href="link.url">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('about.formats.uv.title') }}</h2>
    <ul>
      <li v-for="(link, i) in uvLinks" :key="i">
        <a :href="link.url">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </v-layout>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'
import WoudcNote from '~/components/WoudcNote'

const contributorURLs = [
  'https://guide.woudc.org/en/'
]
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
  components: {
    'woudc-blurb': WoudcBlurb,
    'woudc-note': WoudcNote
  },
  data() {
    return {
      contributorLinks: [...contributorURLs.keys()].map((index) => {
        return {
          text: this.$t('about.formats.contributor-guide.links[' + index + ']'),
          url: contributorURLs[index]
        }
      }),
      mainBlurb: [
        { text: this.$t('about.formats.blurb[0]') },
        { bold: this.$t('about.formats.extended') },
        { text: this.$t('about.formats.blurb[1]') },
        { newlines: 2 },
        { text: this.$t('about.formats.blurb[2]') },
        { bold: this.$t('about.formats.extended') },
        { text: this.$t('about.formats.blurb[3]') },
        { link: { to: 'about-dataaccess', text: this.$t('about.formats.blurb[4]') } },
        { text: this.$t('about.formats.blurb[5]') }
      ],
      ozoneLinks: [...ozoneURLs.keys()].map((index) => {
        return {
          text: this.$t('about.formats.ozone.links[' + index + ']'),
          url: ozoneURLs[index]
        }
      }),
      uvLinks: [...uvURLs.keys()].map((index) => {
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
