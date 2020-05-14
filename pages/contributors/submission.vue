<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contributors.submission.title') }}</h1>
    <woudc-blurb :items="blurb1" />
    <span class="note">
      <p>
        <b>{{ $t('note') }} (1)</b>
        {{ $t('contributors.submission.note1') }}
      </p>
    </span>
    <h2>{{ $t('contributors.submission.subtitle') }}</h2>
    <ol>
      <li v-for="(blurb, i) in steps" :key="i">
        <woudc-blurb :items="blurb" />
      </li>
    </ol>
    <span class="note">
      <p>
        <b>{{ $t('note') }} (2)</b>
        {{ $t('contributors.submission.note2') }}
      </p>
    </span>
    <woudc-blurb :items="blurb2" />
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
      blurb1: [ { text: this.$t('contributors.submission.blurb1[0]') } ],
      blurb2: [
        { text: this.$t('contributors.submission.blurb2[0]') },
        { link: { to: 'contact', text: this.$t('contributors.submission.blurb2[1]') } },
        { text: this.$t('contributors.submission.blurb2[2]') }
      ],
      steps: [
        [
          { text: this.$t('contributors.submission.step1[0]') },
          { link: { to: 'about-formats', text: this.$t('contributors.submission.step1[1]') } },
          { text: this.$t('contributors.submission.step1[2]') }
        ],
        [
          { text: this.$t('contributors.submission.step2[0]') },
          { link: { to: 'ftp://ftp.woudc.org/', type: 'external', text: this.$t('contributors.submission.step2[1]') } }
        ],
        this.$t('contributors.submission.step3[0]'),
        this.$t('contributors.submission.step4[0]'),
        this.$t('contributors.submission.step5[0]')
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/submission',
      fr: '/submission-in-fr'
    }
  }
}
</script>
