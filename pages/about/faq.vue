<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.faq.title') }}</h1>
    <p>{{ $t('about.faq.blurb') }}</p>
    <div v-for="(question, index) in $t('about.faq.questions')" :key="index">
      <h4>{{ question.text }}</h4>
      <i18n :path="'about.faq.questions[' + index + '].answer'" tag="p">
        <template v-slot:policy>
          <nuxt-link :to="localePath('about-datapolicy')" v-text="$t('about.faq.substitutions.policy')" />
        </template>
        <template v-slot:submission>
          <nuxt-link :to="localePath('contributors-submission')" v-text="$t('about.faq.substitutions.submission')" />
        </template>
        <template v-slot:registration>
          <nuxt-link :to="localePath('contributors-registration')" v-text="$t('about.faq.substitutions.registration')" />
        </template>
        <template v-slot:access>
          <nuxt-link :to="localePath('about-dataaccess')" v-text="$t('about.faq.substitutions.access')" />
        </template>
        <template v-slot:search>
          <nuxt-link :to="localePath('data-explore')" v-text="$t('about.faq.substitutions.search')" />
        </template>
        <template v-slot:products>
          <nuxt-link :to="localePath('data-products')" v-text="$t('about.faq.substitutions.products')" />
        </template>
        <template v-slot:contributors>
          <nuxt-link :to="localePath('contributors')" v-text="$t('about.faq.substitutions.contributors')" />
        </template>
        <template v-slot:accessibility>
          <a :href="accessibilityURL" target="_blank">{{ $t('about.faq.substitutions.accessibility') }}</a>
        </template>
        <template v-slot:usability>
          <a :href="usabilityURL" target="_blank">{{ $t('about.faq.substitutions.usability') }}</a>
        </template>
        <template v-slot:w3c>
          <a :href="w3cURL" target="_blank">{{ $t('about.faq.substitutions.w3c') }}</a>
        </template>
      </i18n>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      accessibilityURL: 'https://www.tbs-sct.gc.ca/ws-nw/wa-aw/index-eng.asp',
      usabilityURL: 'https://www.tbs-sct.gc.ca/ws-nw/wu-fe/index-eng.asp',
      w3cURL: 'https://www.w3.org/WAI/intro/wcag'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/faq',
      fr: '/a-propos/faq'
    }
  }
}
</script>
