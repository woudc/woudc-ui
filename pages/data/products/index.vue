<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.products.title') }}</h1>
    <p>{{ $t('data.products.blurb') }}</p>
    <h2>{{ $t('data.products.time-series.title') }}</h2>
    <p v-if="$t('data.products.time-series.blurb').length > 0">
      {{ $t('data.products.time-series.blurb') }}
    </p>
    <ul>
      <li v-for="(link, i) in timeSeriesLinks" :key="i">
        <nuxt-link :to="localePath(link.to)">
          {{ link.text }}
        </nuxt-link>
      </li>
    </ul>
    <h2>{{ $t('data.products.related.title') }}</h2>
    <p v-if="$t('data.products.related.blurb') !== EMPTY_CHAR">
      {{ $t('data.products.related.blurb') }}
    </p>
    <ul>
      <li v-for="(link, i) in relatedLinks" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('data.products.maps.title') }}</h2>
    <p v-if="$t('data.products.maps.blurb') !== EMPTY_CHAR">
      {{ $t('data.products.maps.blurb') }}
    </p>
    <ul>
      <li v-for="(link, i) in mapsLinks" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('data.products.summaries.title') }}</h2>
    <p v-if="$t('data.products.summaries.blurb') !== EMPTY_CHAR">
      {{ $t('data.products.summaries.blurb') }}
    </p>
    <ul>
      <li v-for="(link, i) in summariesLinks" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      EMPTY_CHAR: '_',
      mapsLinks: [
        {
          text: this.$t('data.products.maps.links[0]'),
          to: 'http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap_g.htm'
        },
        {
          text: this.$t('data.products.maps.links[1]'),
          to: 'http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap.htm'
        },
        {
          text: this.$t('data.products.maps.links[2]'),
          to: 'http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap_s.htm'
        },
        {
          text: this.$t('data.products.maps.links[3]'),
          to: 'http://exp-studies.tor.ec.gc.ca/cgi-bin/selectMap'
        },
        {
          text: this.$t('data.products.maps.links[4]'),
          to: 'http://exp-studies.tor.ec.gc.ca/cgi-bin/dailyMaps'
        }
      ],
      relatedLinks: [
        {
          text: this.$t('data.products.related.links[0]'),
          to: 'https://woudc.org/archive/Summaries/TotalOzone'
        },
        {
          text: this.$t('data.products.related.links[1]'),
          to: 'https://woudc.org/archive/Projects-Campaigns/Ground-Sat_Plots/'
        },
        {
          text: this.$t('data.products.related.links[2]'),
          to: 'https://woudc.org/archive/Summaries/Umkehr'
        },
        {
          text: this.$t('data.products.related.links[3]'),
          to: 'https://woudc.org/archive/Summaries/Spectral_UV'
        },
        {
          text: this.$t('data.products.related.links[4]'),
          to: 'https://woudc.org/archive/Projects-Campaigns/ZonalMeans'
        },
        {
          text: this.$t('data.products.related.links[5]'),
          to: 'https://woudc.org/archive/products/ozone/vertical-ozone-profile/ozonesonde/1.0/tost'
        }
      ],
      summariesLinks: [
        {
          text: this.$t('data.products.summaries.links[0]'),
          to: 'https://www.wmo.int/pages/prog/arep/gaw/ozone/index.html'
        },
        {
          text: this.$t('data.products.summaries.links[1]'),
          to: 'https://www.wmo.int/pages/prog/arep/gaw/gaw-reports.html'
        },
        {
          text: this.$t('data.products.summaries.links[2]'),
          to: 'https://www.wmo.int/pages/prog/arep/gaw/ozone_reports.html'
        },
        {
          text: this.$t('data.products.summaries.links[3]'),
          to: 'https://ozonewatch.gsfc.nasa.gov/SH.html'
        },
        {
          text: this.$t('data.products.summaries.links[4]'),
          to: 'https://sampo.fmi.fi/'
        },
        {
          text: this.$t('data.products.summaries.links[5]'),
          to: 'http://www.temis.nl/index.php'
        }
      ],
      timeSeriesLinks: [
        {
          text: this.$t('data.products.time-series.links[0]'),
          to: '/data/products/ozonesonde'
        },
        {
          text: this.$t('data.products.time-series.links[1]'),
          to: '/data/products/totalozone'
        },
        {
          text: this.$t('data.products.time-series.links[2]'),
          to: '/data/products/uv-index'
        }
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/products',
      fr: '/produits'
    }
  }
}
</script>
