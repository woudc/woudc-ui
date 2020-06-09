<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.registration.title') }}</h1>
    <i18n
      class="newlines"
      path="contributors.registration.blurb1.template"
      tag="p"
    >
      <template v-slot:submission>
        <nuxt-link
          :to="localePath('contributors-submission')"
          v-text="$t('contributors.registration.blurb1.submission')"
        />
      </template>
    </i18n>
    <ol>
      <li>
        <i18n path="contributors.registration.step1.template" tag="span">
          <template v-slot:policy>
            <nuxt-link
              :to="localePath('about-datapolicy')"
              v-text="$t('contributors.registration.step1.policy')"
            />
          </template>
        </i18n>
      </li>
      <li>
        <i18n path="contributors.registration.step2.template" tag="span">
          <template v-slot:wmo>
            <a :href="gawHomeURL" target="_blank" v-text="$t('contributors.registration.step2.wmo')"></a>
          </template>
          <template v-slot:more>
            <a :href="wmoGAWUrl" target="_blank" v-text="$t('contributors.registration.step2.more')"></a>
          </template>
        </i18n>
      </li>
      <li>
        <i18n path="contributors.registration.step3.template" tag="span">
          <template v-slot:contact>
            <nuxt-link :to="localePath('contact')" v-text="$t('contributors.registration.step3.contact')" />
          </template>
          <template v-slot:register>
            <strong>{{ $t('contributors.registration.step3.register') }}</strong>
          </template>
        </i18n>
      </li>
      <li>
        {{ $t('contributors.registration.step4') }}
      </li>
    </ol>
    <p>{{ $t('contributors.registration.blurb2') }}</p>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      gawHomeURL: 'https://gawsis.meteoswiss.ch/',
      wmoGAWUrl: 'https://www.wmo.int/pages/prog/arep/gaw/gaw_home_en.html'
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
