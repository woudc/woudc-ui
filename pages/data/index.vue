<template>
  <v-container>
    <h2>{{ $t('data.title') }}</h2>
    <ul>
      <li>
        <nuxt-link :to="localePath('data-search')">
          {{ $t('data.links.search') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath('data-products')">
          {{ $t('data.links.products') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath('data-dataset_info')">
          {{ $t('data.links.dataset_info') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath('data-stations')">
          {{ $t('data.links.stations') }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="localePath('data-instruments')">
          {{ $t('data.links.instruments') }}
        </nuxt-link>
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
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
