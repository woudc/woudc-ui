<template>
  <v-container>
    <h1>{{ $t('about.glossary.title') }}</h1>
    <p>{{ $t('about.glossary.blurb') }}</p>
    <v-row>
      <v-col>
        <div v-for="(item, index) in $t('about.glossary.terms')" :key="index">
          <h4>{{ item.term }}</h4>
          <i18n
            :path="'about.glossary.terms[' + index + '].definition'"
            tag="p"
          >
            <template #carcinogenesis>
              <a :href="carcinogensURL" target="_blank">
                <span>
                  {{ $t('about.glossary.carcinogenesis') }}
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </span>
              </a>
            </template>
            <template #registration-page>
              <nuxt-link :to="localePath('contributors-registration')">
                <span>{{ $t('common.registration-page') }}</span>
              </nuxt-link>
            </template>
            <template #w3>
              <a :href="w3URL" target="_blank">www.w3.org</a>
            </template>
            <template #waf>
              <a :href="WOUDC_UI_WAF_URL" target="_blank">
                <span>
                  {{ WOUDC_UI_WAF_URL }}
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </span>
              </a>
            </template>
          </i18n>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      carcinogensURL:
        'https://www.wmo.int/pages/prog/dra/etrp/documents/926E.pdf',
      w3URL: 'https://www.w3.org/',
      WOUDC_UI_WAF_URL: this.$config.WOUDC_UI_WAF_URL,
    }
  },
  head() {
    return {
      title: this.$t('about.glossary.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('about.glossary.blurb'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/glossary',
      fr: '/a-propos/glossaire',
    },
  },
}
</script>
