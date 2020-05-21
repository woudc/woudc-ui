<template>
  <v-layout justify-center column align-content-center>
    <h1 v-text="$t('about.glossary.title')" />
    <p v-text="$t('about.glossary.blurb')" />
    <div v-for="(_, index) in $t('about.glossary.terms').length" :key="index">
      <h4 v-text="$t('about.glossary.terms[' + index + '].term')" />
      <i18n :path="'about.glossary.terms[' + index + '].definition'" tag="p">
        <template v-slot:carcinogenesis>
          <a :href="carcinogensURL" target="_blank" v-text="$t('about.glossary.substitutions.carcinogenesis')" />
        </template>
        <template v-slot:registration>
          <nuxt-link :to="localePath('contributors-registration')" v-text="$t('about.glossary.substitutions.registration')" />
        </template>
        <template v-slot:w3>
          <a :href="w3URL" target="_blank">www.w3.org</a>
        </template>
        <template v-slot:waf>
          <a :href="wafURL" target="_blank" v-text="wafURL" />
        </template>
      </i18n>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      carcinogensURL: 'https://www.wmo.int/pages/prog/dra/etrp/documents/926E.pdf',
      w3URL: 'https://www.w3.org/',
      wafURL: "https://woudc.org/archive"
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
