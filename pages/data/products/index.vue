<template>
  <v-container>
    <h1>{{ $t('data.products.title') }}</h1>
    <p>{{ $t('data.products.blurb') }}</p>
    <v-row>
      <v-col>
        <div id="time-series">
          <h2>{{ $t('data.products.time-series.title') }}</h2>
          <p>{{ $t('data.products.time-series.blurb') }}</p>
          <ul>
            <li v-for="(path, key) in timeSeriesLinks" :key="key">
              <nuxt-link :to="localePath(path)">
                <span>{{ $t('data.products.time-series.links.' + key) }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div id="related-products">
          <h2>{{ $t('data.products.related.title') }}</h2>
          <ul>
            <li v-for="(url, key) in relatedLinks" :key="key">
              <a :href="url" target="_blank">
                {{ $t('data.products.related.links.' + key) }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
          </ul>
        </div>
        <div id="ozone-maps">
          <h2>{{ $t('data.products.maps.title') }}</h2>
          <p>{{ $t('data.products.maps.blurb') }}</p>
          <ul>
            <li>
              <nuxt-link :to="localePath('data-products-ozone_maps')">
                <span>{{ $t('data.products.ozone_maps.title') }}</span>
              </nuxt-link>
            </li>
            <li v-for="(url, key) in mapsLinks" :key="key">
              <a :href="url" target="_blank">
                {{ $t('data.products.maps.links.' + key) }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
          </ul>
        </div>
        <div id="summaries">
          <h2>{{ $t('data.products.summaries.title') }}</h2>
          <ul>
            <li>
              <nuxt-link :to="localePath('data-products-josie_besos')">
                <span>{{ $t('data.products.josieBesos.title') }}</span>
              </nuxt-link>
            </li>
            <li v-for="(url, key) in summariesLinks" :key="key">
              <a :href="url" target="_blank">
                {{ $t('data.products.summaries.links.' + key) }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
          </ul>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      relatedLinks: {
        'totalozone-daily-monthly':
          this.$config.WOUDC_UI_WAF_URL + '/Summaries/TotalOzone',
        'totalozone-satellite-ground':
          this.$config.WOUDC_UI_WAF_URL +
          '/Projects-Campaigns/Ground-Sat_Plots/',
        umkehr: this.$config.WOUDC_UI_WAF_URL + '/Summaries/Umkehr',
        spectral: this.$config.WOUDC_UI_WAF_URL + '/Summaries/Spectral_UV',
        'ozone-zonal':
          this.$config.WOUDC_UI_WAF_URL + '/Projects-Campaigns/ZonalMeans',
        tost:
          this.$config.WOUDC_UI_WAF_URL +
          '/products/ozone/vertical-ozone-profile/ozonesonde/1.0/tost',
      },
      summariesLinks: {
        'polar-bulletins':
          'https://community.wmo.int/activity-areas/gaw/science/stratospheric-ozone-and-uv-radiation',
        'gaw-reports': 'https://community.wmo.int/gaw-reports',
        'ozone-reports':
          'https://community.wmo.int/wmo-global-ozone-research-and-monitoring-project-reports',
        'ozone-hole': 'https://ozonewatch.gsfc.nasa.gov/SH.html',
        sampo: 'https://sampo.fmi.fi/',
        temis: 'http://www.temis.nl/index.php',
      },
      timeSeriesLinks: {
        ozonesonde: 'data-products-ozonesonde',
        totalozone: 'data-products-totalozone',
        'uv-index': 'data-products-uvindex',
      },
    }
  },
  head() {
    return {
      title: this.$t('data.products.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.products.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('data.products.keywords'),
        },
      ],
    }
  },
  computed: {
    mapsLinks() {
      const lang = this.$i18n.locale[0] // get "e" or "f"
      return {
        // similar key:values as the original mapsLinks from data() placed here,
        // with the lang var that switches the e/f lang
        global: `https://exp-studies.tor.ec.gc.ca/clf2/${lang}/Curr_allmap_g.html`,
        north: `https://exp-studies.tor.ec.gc.ca/clf2/${lang}/Curr_allmap.html`,
        south: `https://exp-studies.tor.ec.gc.ca/clf2/${lang}/Curr_allmap_s.html`,
        archive: `https://exp-studies.tor.ec.gc.ca/cgi-bin/clf2/selectMap?lang=${lang}`,
        individual: `https://exp-studies.tor.ec.gc.ca/cgi-bin/clf2/dailyMaps?lang=${lang}`,
      }
    },
  },
  nuxtI18n: {
    paths: {
      en: '/data/products',
      fr: '/donnees/produits',
    },
  },
}
</script>
