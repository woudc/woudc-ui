<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('data.products.title') }}</h1>
        <p>{{ $t('data.products.blurb') }}</p>
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
        'totalozone-daily-monthly': 'https://woudc.org/archive/Summaries/TotalOzone',
        'totalozone-satellite-ground': 'https://woudc.org/archive/Projects-Campaigns/Ground-Sat_Plots/',
        umkehr: 'https://woudc.org/archive/Summaries/Umkehr',
        spectral: 'https://woudc.org/archive/Summaries/Spectral_UV',
        'ozone-zonal': 'https://woudc.org/archive/Projects-Campaigns/ZonalMeans',
        tost: 'https://woudc.org/archive/products/ozone/vertical-ozone-profile/ozonesonde/1.0/tost'
      },
      summariesLinks: {
        'polar-bulletins': 'https://www.wmo.int/pages/prog/arep/gaw/ozone/index.html',
        'gaw-reports': 'https://www.wmo.int/pages/prog/arep/gaw/gaw-reports.html',
        'ozone-reports': 'https://www.wmo.int/pages/prog/arep/gaw/ozone_reports.html',
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
