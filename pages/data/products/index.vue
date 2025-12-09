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
            <li>
              <nuxt-link :to="localePath('data-products-ozonesonde')">
                <span>
                  {{ $t('data.products.time-series.links.ozonesonde') }}
                </span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('data-products-totalozone')">
                <span>
                  {{ $t('data.products.time-series.links.totalozone') }}
                </span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('data-products-uvindex')">
                <span>
                  {{ $t('data.products.time-series.links.uv-index') }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div id="related-products">
          <h2>{{ $t('data.products.related.title') }}</h2>
          <ul>
            <li>
              <a
                :href="$config.WOUDC_UI_WAF_URL + '/Summaries/TotalOzone'"
                target="_blank"
              >
                {{ $t('data.products.related.links.totalozone-daily-monthly') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a
                :href="
                  $config.WOUDC_UI_WAF_URL +
                  '/Projects-Campaigns/Ground-Sat_Plots/'
                "
                target="_blank"
              >
                {{
                  $t('data.products.related.links.totalozone-satellite-ground')
                }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a
                :href="$config.WOUDC_UI_WAF_URL + '/Summaries/Umkehr'"
                target="_blank"
              >
                {{ $t('data.products.related.links.umkehr') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a
                :href="$config.WOUDC_UI_WAF_URL + '/Summaries/Spectral_UV'"
                target="_blank"
              >
                {{ $t('data.products.related.links.spectral') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a
                :href="
                  $config.WOUDC_UI_WAF_URL + '/Projects-Campaigns/ZonalMeans'
                "
                target="_blank"
              >
                {{ $t('data.products.related.links.ozone-zonal') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a
                :href="
                  $config.WOUDC_UI_WAF_URL +
                  '/products/ozone/vertical-ozone-profile/ozonesonde/1.0/tost'
                "
                target="_blank"
              >
                {{ $t('data.products.related.links.tost') }}
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
              <nuxt-link
                :to="`${localePath({
                  name: 'data-products-ozone_maps',
                  params: { type: 'global' },
                })}`"
              >
                <span>{{ $t('data.products.ozone_maps.titleGlobal') }}</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="`${localePath({
                  name: 'data-products-ozone_maps',
                  params: { type: 'northern' },
                })}`"
              >
                <span>{{ $t('data.products.ozone_maps.titleNorthern') }}</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="`${localePath({
                  name: 'data-products-ozone_maps',
                  params: { type: 'southern' },
                })}`"
              >
                <span>{{ $t('data.products.ozone_maps.titleSouthern') }}</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="`${localePath({
                  name: 'data-products-ozone_maps',
                  params: { type: 'forecast' },
                })}`"
              >
                <span>{{ $t('data.products.ozone_maps.titleForecast') }}</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="`${localePath({
                  name: 'data-products-ozone_maps',
                  params: { type: 'observed' },
                })}`"
              >
                <span>{{ $t('data.products.ozone_maps.titleObserved') }}</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="`${localePath({
                  name: 'data-products-ozone_maps',
                  params: { type: 'archive' },
                })}`"
              >
                <span>{{ $t('data.products.ozone_maps.titleArchived') }}</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="`${localePath('data-products-normal_ozone_maps')}`"
              >
                <span>{{ $t('data.products.normal-ozone-maps.title') }}</span>
              </nuxt-link>
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
            <li>
              <a
                href="https://community.wmo.int/activity-areas/gaw/science/stratospheric-ozone-and-uv-radiation"
                target="_blank"
              >
                {{ $t('data.products.summaries.links.polar-bulletins') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a href="https://community.wmo.int/gaw-reports" target="_blank">
                {{ $t('data.products.summaries.links.gaw-reports') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a
                href="https://community.wmo.int/wmo-global-ozone-research-and-monitoring-project-reports"
                target="_blank"
              >
                {{ $t('data.products.summaries.links.ozone-reports') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a
                href="https://ozonewatch.gsfc.nasa.gov/SH.html"
                target="_blank"
              >
                {{ $t('data.products.summaries.links.ozone-hole') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a href="https://sampo.fmi.fi/" target="_blank">
                {{ $t('data.products.summaries.links.sampo') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </li>
            <li>
              <a href="http://www.temis.nl/index.php" target="_blank">
                {{ $t('data.products.summaries.links.temis') }}
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
  nuxtI18n: {
    paths: {
      en: '/data/products',
      fr: '/donnees/produits',
    },
  },
}
</script>
