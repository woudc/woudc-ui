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
        'search',
        'products',
        'dataset_info',
        'stations',
        'instruments',
      ],
    }
  },
  head() {
    return {
      title: this.$t('data.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('data.keywords'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data',
      fr: '/donnees',
    },
  },
}
</script>
