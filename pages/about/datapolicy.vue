<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.policy.title') }}</h1>
    <i18n path="about.policy.blurb.template" tag="p">
      <template v-slot:wmo>
        <a :href="wmoURL" target="_blank">{{ $t('about.policy.blurb.wmo') }}</a>
      </template>
      <template v-slot:gaw>
        <a :href="gawURL" target="_blank">{{ $t('about.policy.blurb.gaw') }}</a>
      </template>
    </i18n>
    <h2>{{ $t('about.policy.wmo.title') }}</h2>
    <i18n class="newlines" path="about.policy.wmo.blurb.template" tag="p">
      <template v-slot:link>
        <a :href="resolution40" target="_blank">{{ $t('about.policy.wmo.blurb.link') }}</a>
      </template>
    </i18n>
    <h2>{{ $t('about.policy.gaw.title') }}</h2>
    <p>{{ $t('about.policy.gaw.blurb') }}</p>
    <v-card class="mt-1 mb-4" color="info">
      <v-card-title class="pt-3 pb-0">
        {{ $t('about.policy.gaw.note.title') }}
      </v-card-title>
      <v-card-text>
        {{ $t('about.policy.gaw.note.body') }}
      </v-card-text>
    </v-card>
    <h2>{{ $t('about.policy.doi.title') }}</h2>
    <i18n path="about.policy.doi.blurb.template" tag="p">
      <template v-slot:dois>
        <a :href="doisURL" target="_blank">{{ $t('about.policy.doi.blurb.dois') }}</a>
      </template>
    </i18n>
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
    <p>{{ $t('about.policy.publishing.blurb1') }}</p>
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
    <i18n path="about.policy.publishing.blurb2.template" tag="p">
      <template v-slot:contributors>
        <nuxt-link :to="localePath('contributors')" v-text="$t('about.policy.publishing.blurb2.contributors')" />
      </template>
    </i18n>
    <h2>{{ $t('about.policy.products.title') }}</h2>
    <p>{{ $t('about.policy.products.blurb') }}</p>
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
export default {
  data() {
    return {
      doisURL: 'https://en.wikipedia.org/wiki/Digital_object_identifier',
      gawURL: 'https://gawsis.meteoswiss.ch/GAWSIS/index.html#/faq',
      resolution40: 'https://www.wmo.int/pages/about/Resolution40_en.html',
      wmoURL: 'https://www.wmo.int/pages/about/exchangingdata_en.html'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/data-policy',
      fr: '/a-propos/politique-donnees'
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
