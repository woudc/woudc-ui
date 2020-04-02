<template>
  <products-page :title="$t('title')" dataset="TotalOzone" />
</template>

<i18n>
{
  "en": {
    "title": "Total Ozone Plots"
  },
  "fr": {
    "title": "Schémas d’ozone total"
  }
}
</i18n>

<script>
import ProductsPage from '~/components/Products'

export default {
  components: {
    'products-page': ProductsPage
  },
  nuxtI18n: {
    paths: {
      en: '/totalozone',
      fr: '/ozonetotal'
    }
  }
}
</script>
