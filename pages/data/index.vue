<template>
  <v-container>
    <h2>{{ $t('data.title') }}</h2>
    <ul>
      <li v-for="path in localLinks" :key="path">
        <nuxt-link :to="localePath('data-' + path)">
          {{ $t('data.links.' + path) }}
        </nuxt-link>
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      localLinks: [
        'explore', 'products', 'datasetinfo', 'stations', 'instruments'
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data',
      fr: '/donnees'
    }
  }
}
</script>
