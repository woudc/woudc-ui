<template>
  <v-container>
    <h1>{{ $t('data.info.title') }}</h1>
    <v-row>
      <v-col>
        <p>{{ $t('data.info.blurb') }}</p>
        <h2>{{ $t('data.info.subtitle') }}</h2>
        <ul>
          <li v-for="section in sectionOrder" :key="section">
            <span>{{ $t('data.info.sections.' + section) }}</span>
            <ul>
              <li v-for="dataset in links[section]" :key="dataset">
                <nuxt-link :to="localePath('data-datasetinfo') + '/' + dataset">
                  {{ $t('data.info.links.' + dataset) }}
                </nuxt-link>
              </li>
            </ul>
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
      links: {
        totalozone: [
          'totalozone',
          'totalozoneobs'
        ],
        'uv-irradiance': [
          'broadband',
          'multiband',
          'spectral',
          'uvindex'
        ],
        'vertical-ozone': [
          'lidar',
          'ozonesonde',
          'rocketsonde',
          'umkehr1',
          'umkehr2'
        ]
      },
      sectionOrder: [ 'totalozone', 'vertical-ozone', 'uv-irradiance' ]
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
