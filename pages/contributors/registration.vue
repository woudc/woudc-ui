<template>
  <v-container>
    <h1>{{ $t('contributors.registration.title') }}</h1>
    <p>{{ $t('contributors.registration.blurb.body-accounts') }}</p>
    <i18n path="contributors.registration.blurb.body-submissions" tag="p">
      <template #submissions>
        <nuxt-link :to="localePath('contributors-submission')">
          <span>{{ $tc('common.submission', 2) }}</span>
        </nuxt-link>
      </template>
    </i18n>
    <v-row>
      <v-col>
        <ol>
          <li>
            <i18n path="contributors.registration.step1" tag="span">
              <template #policy>
                <nuxt-link :to="localePath('data-data_policy')">
                  <span>{{ $t('common.policy') }}</span>
                </nuxt-link>
              </template>
            </i18n>
          </li>
          <li>
            <i18n path="contributors.registration.step2" tag="span">
              <template #wmo-gaw>
                <a :href="gawHomeURL" target="_blank">
                  <span>
                    {{ $t('contributors.registration.wmo-gaw') }}
                    <v-icon x-small>mdi-open-in-new</v-icon>
                  </span>
                </a>
              </template>
              <template #more>
                <a :href="wmoGAWUrl" target="_blank">
                  <span>
                    {{ $t('contributors.registration.more') }}
                    <v-icon x-small>mdi-open-in-new</v-icon>
                  </span>
                </a>
              </template>
            </i18n>
          </li>
          <li>
            <i18n path="contributors.registration.step3" tag="span">
              <template #contacting>
                <nuxt-link :to="localePath('contact')">
                  <span>{{ $t('contributors.registration.contacting') }}</span>
                </nuxt-link>
              </template>
              <template #register>
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
      wmoGAWUrl:
        'https://public.wmo.int/en/programmes/global-atmosphere-watch-programme',
    }
  },
  head() {
    return {
      title: this.$t('contributors.registration.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('contributors.registration.blurb.body-accounts'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/contributors/registration',
      fr: '/contributeurs/inscription',
    },
  },
}
</script>
