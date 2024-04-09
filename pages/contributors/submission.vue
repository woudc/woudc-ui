<template>
  <v-container>
    <h1>{{ $t('contributors.submission.title') }}</h1>
    <p>{{ $t('contributors.submission.blurb-intro') }}</p>
    <v-row>
      <v-col>
        <v-alert class="mt-1 mb-4" color="info" outlined text border="left">
          <strong>{{ $t('common.note') }} (1)</strong>
          {{ $t('contributors.submission.note1') }}
        </v-alert>
        <h2>{{ $t('contributors.submission.subtitle') }}</h2>
        <ol>
          <li>
            <i18n path="contributors.submission.step1" tag="span">
              <template #formats>
                <nuxt-link :to="localePath('about-formats')">
                  <span>{{ $t('common.formats') }}</span>
                </nuxt-link>
              </template>
            </i18n>
          </li>
          <li>
            <i18n path="contributors.submission.step2" tag="span">
              <template #ftp>
                <a :href="ftpPath" target="_blank">
                  <span>
                    {{ $t('common.ftp') }}
                    <v-icon x-small>mdi-open-in-new</v-icon>
                  </span>
                </a>
              </template>
            </i18n>
          </li>
          <li>{{ $t('contributors.submission.step3') }}</li>
          <li>{{ $t('contributors.submission.step4') }}</li>
          <li>{{ $t('contributors.submission.step5') }}</li>
        </ol>
        <v-alert class="mt-1 mb-4" color="info" outlined text border="left">
          <strong>{{ $t('common.note') }} (2)</strong>
          {{ $t('contributors.submission.note2') }}
        </v-alert>
        <i18n path="contributors.submission.blurb-contact" tag="p">
          <template #contact-us>
            <nuxt-link :to="localePath('contact')">
              <span>{{ $t('common.contact-us') }}</span>
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
      ftpPath: 'ftp://ftp.woudc.org/',
    }
  },
  head() {
    return {
      title: this.$t('contributors.submission.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('contributors.submission.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('contributors.submission.keywords'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/contributors/data-submission',
      fr: '/contributeurs/soumission-de-donnees',
    },
  },
}
</script>
