<template>
  <v-container>
    <h1>{{ $t('contributors.registration.title') }}</h1>
    <p>{{ $t('contributors.registration.blurb.body-accounts') }}</p>
    <i18n path="contributors.registration.blurb.body-submissions" tag="p">
      <template v-slot:submissions>
        <nuxt-link :to="localePath('contributors-submission')">
          {{ $tc('common.submission', 2) }}
        </nuxt-link>
      </template>
    </i18n>
    <v-row>
      <v-col>
        <ol>
          <li>
            <i18n path="contributors.registration.step1" tag="span">
              <template v-slot:policy>
                <nuxt-link :to="localePath('about-datapolicy')">
                  {{ $t('common.policy') }}
                </nuxt-link>
              </template>
            </i18n>
          </li>
          <li>
            <i18n path="contributors.registration.step2" tag="span">
              <template v-slot:wmo-gaw>
                <a :href="gawHomeURL" target="_blank">
                  {{ $t('contributors.registration.wmo-gaw') }}
                </a>
              </template>
              <template v-slot:more>
                <a :href="wmoGAWUrl" target="_blank">
                  {{ $t('contributors.registration.more') }}
                </a>
              </template>
            </i18n>
          </li>
          <li>
            <i18n path="contributors.registration.step3" tag="span">
              <template v-slot:contacting>
                <nuxt-link :to="localePath('contact')">
                  {{ $t('contributors.registration.contacting') }}
                </nuxt-link>
              </template>
              <template v-slot:register>
                <strong>{{ $t('contributors.registration.register') }}</strong>
              </template>
            </i18n>
          </li>
          <li>
            {{ $t('contributors.registration.step4') }}
          </li>
        </ol>
        <p>{{ $t('contributors.registration.thanks') }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      gawHomeURL: 'https://gawsis.meteoswiss.ch/',
      wmoGAWUrl: 'https://public.wmo.int/en/programmes/global-atmosphere-watch-programme'
    }
  },
  head() {
    return {
      title: this.$t('contributors.registration.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('contributors.registration.blurb.body-accounts')
        }
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/contributors/registration',
      fr: '/contributeurs/inscription'
    }
  }
}
</script>
