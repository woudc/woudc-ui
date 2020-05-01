<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.glossary.title') }}</h1>
    <p>{{ $t('about.glossary.blurb') }}</p>
    <div v-for="(entry, i) in terms" :key="i">
      <h4>{{ entry.term }}</h4>
      <woudc-blurb :items="entry.definition" />
    </div>
  </v-layout>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'

export default {
  components: {
    'woudc-blurb': WoudcBlurb
  },
  computed: {
    terms() {
      return this.$t('about.glossary.terms')
    }
  },
  nuxtI18n: {
    paths: {
      en: '/glossary',
      fr: '/glossaire'
    }
  }
}
</script>
