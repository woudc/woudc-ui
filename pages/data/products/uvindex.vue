<template>
  <products-page :title="$t('title')" dataset="uv_index_hourly" />
</template>

<i18n>
{
  "en": {
    "title": "UV Index Plots"
  },
  "fr": {
    "title": "Graphiques de l'indice UV"
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
      en: '/uvindex',
      fr: '/indiceuv'
    }
  }
}
</script>
