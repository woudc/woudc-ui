<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.policy.title') }}</h1>
    <woudc-blurb :items="mainBlurb" />
    <h2>{{ $t('about.policy.wmo.title') }}</h2>
    <woudc-blurb :items="wmoBlurb" />
    <h2>{{ $t('about.policy.gaw.title') }}</h2>
    <p>{{ gawBlurb }}</p>
    <woudc-note
      :title="$t('about.policy.gaw.note.title')"
      :body="$t('about.policy.gaw.note.body')"
    />
    <h2>{{ $t('about.policy.doi.title') }}</h2>
    <woudc-blurb :items="doiBlurb" />
    <v-card>
      <v-card-title class="card">
        {{ $t('about.policy.doi.note1.title') }}
      </v-card-title>
      <v-card-text>
        <ul>
          <li v-for="text in $t('about.policy.doi.note1.items')" :key="text">
            {{ text }}
          </li>
        </ul>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title class="card">
        {{ $t('about.policy.doi.note2.title') }}
      </v-card-title>
      <v-card-text>
        <ul>
          <li v-for="text in $t('about.policy.doi.note2.items')" :key="text">
            {{ text }}
          </li>
        </ul>
      </v-card-text>
    </v-card>
    <h2>{{ $t('about.policy.publishing.title') }}</h2>
    <p>{{ publishingBlurb1 }}</p>
    <v-card>
      <v-card-title class="card">
        {{ $t('about.policy.publishing.note1.title') }}
      </v-card-title>
      <v-card-text>
        {{ $t('about.policy.publishing.note1.body') }}
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title class="card">
        {{ $t('about.policy.publishing.note2.title') }}
      </v-card-title>
      <v-card-text>
        <ol>
          <li v-for="text in $t('about.policy.publishing.note2.items')" :key="text">
            {{ text }}
          </li>
        </ol>
      </v-card-text>
    </v-card>
    <woudc-blurb :items="publishingBlurb2" />
    <h2>{{ $t('about.policy.products.title') }}</h2>
    <p>{{ productsBlurb }}</p>
    <v-card>
      <v-card-title class="card">
        {{ $t('about.policy.products.note.title') }}
      </v-card-title>
      <v-card-text>
        {{ $t('about.policy.products.note.body') }}
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'
import WoudcNote from '~/components/WoudcNote'

export default {
  components: {
    'woudc-blurb': WoudcBlurb,
    'woudc-note': WoudcNote
  },
  data() {
    return {
      mainBlurb: [
        { text: this.$t('about.policy.blurb[0]') },
        { link: { to: 'https://www.wmo.int/pages/about/exchangingdata_en.html', type: 'external', text: this.$t('about.policy.blurb[1]') } },
        { text: this.$t('about.policy.blurb[2]') },
        { link: { to: 'https://gawsis.meteoswiss.ch/GAWSIS/index.html#/faq', type: 'external', text: this.$t('about.policy.blurb[3]') } },
        { text: '.' }
      ],
      doiBlurb: [
        { text: this.$t('about.policy.doi.blurb[0]') },
        { link: { to: 'https://en.wikipedia.org/wiki/Digital_object_identifier', type: 'external', text: this.$t('about.policy.doi.blurb[1]') } },
        { text: this.$t('about.policy.doi.blurb[2]') }
      ],
      gawBlurb: this.$t('about.policy.gaw.blurb'),
      productsBlurb: this.$t('about.policy.products.blurb'),
      publishingBlurb1: this.$t('about.policy.publishing.blurb1'),
      publishingBlurb2: [
        { text: this.$t('about.policy.publishing.blurb2[0]') },
        { link: { to: 'contributors', text: this.$t('about.policy.publishing.blurb2[1]') } },
        { text: '.' }
      ],
      wmoBlurb: [
        { text: this.$t('about.policy.wmo.blurb[0]') },
        { newlines: 2 },
        { link: { to: 'https://www.wmo.int/pages/about/Resolution40_en.html', type: 'external', text: this.$t('about.policy.wmo.blurb[1]') } },
        { text: this.$t('about.policy.wmo.blurb[0]') }
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data-policy',
      fr: '/politique-donnees'
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #cef;
  color: steelblue;
}

ol {
  counter-reset: list;
  padding-left: 0;
}

ol > li {
  list-style: none;
}

ol > li:before {
  content: counter(list, lower-alpha) ') ';
  counter-increment: list;
}
</style>
