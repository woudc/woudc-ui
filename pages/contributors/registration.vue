<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.registration.title') }}</h1>
    <woudc-blurb :items="blurb1" />
    <ol>
      <li v-for="(blurb, i) in steps" :key="i">
        <woudc-blurb :items="blurb" />
      </li>
    </ol>
    <p>{{ blurb2 }}</p>
  </v-layout>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'

export default {
  components: {
    'woudc-blurb': WoudcBlurb
  },
  data() {
    return {
      blurb1: [
        { text: this.$t('contributors.registration.blurb1[0]') },
        { newlines: 2 },
        { text: this.$t('contributors.registration.blurb1[1]') },
        { link: { to: 'contributors-submission', text: this.$t('contributors.registration.blurb1[2]') } },
        { text: this.$t('contributors.registration.blurb1[3]') }
      ],
      blurb2: this.$t('contributors.registration.blurb2[0]'),
      steps: [
        [
          { text: this.$t('contributors.registration.step1[0]') },
          { link: { to: 'about-datapolicy', text: this.$t('contributors.registration.step1[1]') } },
          { text: ';' }
        ],
        [
          { text: this.$t('contributors.registration.step2[0]') },
          { link: { to: 'https://gawsis.meteoswiss.ch/', type: 'external', text: this.$t('contributors.registration.step2[1]') } },
          { text: ' (' },
          { link: { to: 'https://www.wmo.int/pages/prog/arep/gaw/gaw_home_en.html', type: 'external', text: this.$t('contributors.registration.step2[2]') } },
          ');'
        ],
        [
          { text: this.$t('contributors.registration.step3[0]') },
          { link: { to: 'contact', text: this.$t('contributors.registration.step3[1]') } },
          { text: this.$t('contributors.registration.step3[2]') },
          { bold: this.$t('contributors.registration.step3[3]') },
          { text: this.$t('contributors.registration.step3[4]') },
        ],
        [
          { text: this.$t('contributors.registration.step4[0]') }
        ]
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/registration',
      fr: '/registration-in-fr'
    }
  }
}
</script>
