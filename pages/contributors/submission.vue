<template>
  <v-container>
    <h1>{{ $t('contributors.submission.title') }}</h1>
    <p>{{ $t('contributors.submission.blurb-intro') }}</p>
    <v-row>
      <v-col>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-text>
            <strong>{{ $t('common.note') }} (1)</strong>
            {{ $t('contributors.submission.note1') }}
          </v-card-text>
        </v-card>
        <h2>{{ $t('contributors.submission.subtitle') }}</h2>
        <ol>
          <li>
            <i18n path="contributors.submission.step1" tag="span">
              <template v-slot:formats>
                <nuxt-link :to="localePath('about-formats')">
                  {{ $t('common.formats') }}
                </nuxt-link>
              </template>
            </i18n>
          </li>
          <li>
            <i18n path="contributors.submission.step2" tag="span">
              <template v-slot:ftp>
                <a :href="ftpPath" target="_blank">
                  {{ $t('common.ftp') }}
                </a>
              </template>
            </i18n>
          </li>
          <li>{{ $t('contributors.submission.step3') }}</li>
          <li>{{ $t('contributors.submission.step4') }}</li>
          <li>{{ $t('contributors.submission.step5') }}</li>
        </ol>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-text>
            <strong>{{ $t('common.note') }} (2)</strong>
            {{ $t('contributors.submission.note2') }}
          </v-card-text>
        </v-card>
        <i18n path="contributors.submission.blurb-contact" tag="p">
          <template v-slot:contact-us>
            <nuxt-link :to="localePath('contact')">
              {{ $t('common.contact-us') }}
            </nuxt-link>
          </template>
        </i18n>
      </v-col>
    </v-row>
  </v-container>
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
      en: '/contributors/data-submission',
      fr: '/contributeurs/soumission-de-donnees'
    }
  }
}
</script>
