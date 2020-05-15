<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.info.title') }}</h1>
    <p>{{ $t('data.info.blurb') }}</p>
    <h2>{{ $t('data.info.subtitle') }}</h2>
    <ul>
      <li id="totalozone-section">
        <span>{{ $t('data.info.sections.totalozone.title') }}</span>
        <ul>
          <li v-for="(path, key) in totalozoneLinks" :key="key">
            <nuxt-link :to="localePath(path)">
              {{ $t('data.info.sections.totalozone.' + key) }}
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li id="ozone-section">
        <span>{{ $t('data.info.sections.vertical-ozone.title') }}</span>
        <ul>
          <li v-for="(path, key) in ozoneLinks" :key="key">
            <nuxt-link :to="localePath(path)">
              {{ $t('data.info.sections.vertical-ozone.' + key) }}
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li id="uv-section">
        <span>{{ $t('data.info.sections.uv-irradiance.title') }}</span>
        <ul>
          <li v-for="(path, key) in uvLinks" :key="key">
            <nuxt-link :to="localePath(path)">
              {{ $t('data.info.sections.uv-irradiance.' + key) }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      ozoneLinks: {
        lidar: 'data-datasetinfo-lidar',
        ozonesonde: 'data-datasetinfo-ozonesonde',
        rocketsonde: 'data-datasetinfo-rocketsonde',
        umkehr1: 'data-datasetinfo-umkehrn14-1',
        umkehr2: 'data-datasetinfo-umkehrn14-2'
      },
      totalozoneLinks: {
        daily: 'data-datasetinfo-totalozone',
        hourly: 'data-datasetinfo-totalozoneobs'
      },
      uvLinks: {
        broadband: 'data-datasetinfo-broadband',
        multiband: 'data-datasetinfo-multiband',
        spectral: 'data-datasetinfo-spectral',
        'uv-index': 'data-datasetinfo-uvindex'
      }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/info',
      fr: '/donnees/information'
    }
  }
}
</script>
