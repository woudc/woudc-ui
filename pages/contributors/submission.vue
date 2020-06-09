<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.submission.title') }}</h1>
    <p>{{ $t('contributors.submission.blurb1') }}</p>
    <v-card class="woudc-note mt-1 mb-4">
      <v-card-text>
        <b>{{ $t('note') }} (1)</b> {{ $t('contributors.submission.note1') }}
      </v-card-text>
    </v-card>
    <h2>{{ $t('contributors.submission.subtitle') }}</h2>
    <ol>
      <li>
        <i18n path="contributors.submission.step1.template" tag="span">
          <template v-slot:formats>
            <nuxt-link
              :to="localePath('about-formats')"
              v-text="$t('contributors.submission.step1.formats')"
            />
          </template>
        </i18n>
      </li>
      <li>
        <i18n path="contributors.submission.step2.template" tag="span">
          <template v-slot:ftp>
            <a :href="ftpPath" target="_blank">
              {{ $t('contributors.submission.step2.ftp') }}
            </a>
          </template>
        </i18n>
      </li>
      <li>{{ $t('contributors.submission.step3') }}</li>
      <li>{{ $t('contributors.submission.step4') }}</li>
      <li>{{ $t('contributors.submission.step5') }}</li>
    </ol>
    <v-card class="woudc-note mt-1 mb-4">
      <v-card-text>
        <b>{{ $t('note') }} (2)</b> {{ $t('contributors.submission.note2') }}
      </v-card-text>
    </v-card>
    <i18n path="contributors.submission.blurb2.template" tag="p">
      <template v-slot:contact>
        <nuxt-link
          :to="localePath('contact')"
          v-text="$t('contributors.submission.blurb2.contact')"
        />
      </template>
    </i18n>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      ftpPath: 'ftp://ftp.woudc.org/'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/contributors/submission',
      fr: '/contributeurs/soumission'
    }
  }
}
</script>
