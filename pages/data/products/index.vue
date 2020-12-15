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
                {{ $t('data.products.time-series.links.' + key) }}
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
              </a>
            </li>
          </ul>
        </div>
        <div id="ozone-maps">
          <h2>{{ $t('data.products.maps.title') }}</h2>
          <p>{{ $t('data.products.maps.blurb') }}</p>
          <ul>
            <li v-for="(url, key) in mapsLinks" :key="key">
              <a :href="url" target="_blank">
                {{ $t('data.products.maps.links.' + key) }}
              </a>
            </li>
          </ul>
        </div>
        <div id="summaries">
          <h2>{{ $t('data.products.summaries.title') }}</h2>
          <ul>
            <li v-for="(url, key) in summariesLinks" :key="key">
              <a :href="url" target="_blank">
                {{ $t('data.products.summaries.links.' + key) }}
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
      mapsLinks: {
        global: 'http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap_g.htm',
        north: 'http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap.htm',
        south: 'http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap_s.htm',
        archive: 'http://exp-studies.tor.ec.gc.ca/cgi-bin/selectMap',
        individual: 'http://exp-studies.tor.ec.gc.ca/cgi-bin/dailyMaps'
      },
      relatedLinks: {
        'totalozone-daily-monthly': process.env.WAF_URL + '/Summaries/TotalOzone',
        'totalozone-satellite-ground': process.env.WAF_URL + '/Projects-Campaigns/Ground-Sat_Plots/',
        umkehr: process.env.WAF_URL + '/Summaries/Umkehr',
        spectral: process.env.WAF_URL + '/Summaries/Spectral_UV',
        'ozone-zonal': process.env.WAF_URL + '/Projects-Campaigns/ZonalMeans',
        tost: process.env.WAF_URL + '/products/ozone/vertical-ozone-profile/ozonesonde/1.0/tost'
      },
      summariesLinks: {
        'polar-bulletins': 'https://community.wmo.int/activity-areas/gaw/science/stratospheric-ozone-and-uv-radiation',
        'gaw-reports': 'https://community.wmo.int/gaw-reports',
        'ozone-reports': 'https://community.wmo.int/wmo-global-ozone-research-and-monitoring-project-reports',
        'ozone-hole': 'https://ozonewatch.gsfc.nasa.gov/SH.html',
        sampo: 'https://sampo.fmi.fi/',
        temis: 'http://www.temis.nl/index.php'
      },
      timeSeriesLinks: {
        ozonesonde: 'data-products-ozonesonde',
        totalozone: 'data-products-totalozone',
        'uv-index': 'data-products-uvindex'
      }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/products',
      fr: '/donnees/produits'
    }
  }
}
</script>
