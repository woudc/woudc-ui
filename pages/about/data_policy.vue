<template>
  <v-container>
    <h1>{{ $t('about.policy.title') }}</h1>
    <i18n path="about.policy.blurb" tag="p">
      <template v-slot:wmo-policy>
        <a :href="wmoURL" target="_blank">
          {{ $t('about.policy.wmo-policy') }}
        </a>
      </template>
      <template v-slot:gaw-policy>
        <a :href="gawURL" target="_blank">
          {{ $t('about.policy.gaw-policy') }}
        </a>
      </template>
    </i18n>
    <v-row>
      <v-col>
        <h2>{{ $t('about.policy.wmo.title') }}</h2>
        <p>{{ $t('about.policy.wmo.blurb.body-intro') }}</p>
        <i18n path="about.policy.wmo.blurb.body-resolution40" tag="p">
          <template v-slot:link>
            <a :href="resolution40" target="_blank">
              {{ $t('about.policy.wmo.link') }}
            </a>
          </template>
        </i18n>
        <h2>{{ $t('about.policy.gaw.title') }}</h2>
        <p>{{ $t('about.policy.gaw.blurb') }}</p>
        <v-card>
          <v-card-title class="info">
            {{ $t('about.policy.gaw.note.title') }}
          </v-card-title>
          <v-card-text>
            {{ $t('about.policy.gaw.note.body') }}
          </v-card-text>
        </v-card>
        <h2>{{ $t('about.policy.doi.title') }}</h2>
        <i18n path="about.policy.doi.blurb" tag="p">
          <template v-slot:dois>
            <a :href="doisURL" target="_blank">
              {{ $t('about.policy.doi.dois') }}
            </a>
          </template>
        </i18n>
        <v-card>
          <v-card-title class="accent">
            {{ $t('about.policy.doi.note1.title') }}
          </v-card-title>
          <v-card-text>
            <ul>
              <li v-for="dataClass in classOrder" :key="dataClass">
                {{ $t('about.policy.doi.note1.items.' + dataClass) }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title class="accent">
            {{ $t('about.policy.doi.note2.title') }}
          </v-card-title>
          <v-card-text>
            <ul>
              <li v-for="dataset in datasetOrder" :key="dataset">
                {{ $t('about.policy.doi.note2.items.' + dataset) }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
        <h2>{{ $t('about.policy.publishing.title') }}</h2>
        <p>{{ $t('about.policy.publishing.blurb-citations') }}</p>
        <v-card>
          <v-card-title class="accent">
            {{ $t('about.policy.publishing.note1.title') }}
          </v-card-title>
          <v-card-text>
            {{ $t('about.policy.publishing.note1.body') }}
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title class="info">
            {{ $t('about.policy.publishing.note2.title') }}
          </v-card-title>
          <v-card-text>
            <ol>
              <li v-for="dataClass in classOrder" :key="dataClass">
                {{ $t('about.policy.publishing.note2.items.' + dataClass) }}
              </li>
            </ol>
          </v-card-text>
        </v-card>
        <i18n path="about.policy.publishing.blurb-contributors" tag="p">
          <template v-slot:contributors-page>
            <nuxt-link :to="localePath('contributors')">
              {{ $t('common.contributors-page') }}
            </nuxt-link>
          </template>
        </i18n>
        <h2>{{ $t('about.policy.products.title') }}</h2>
        <p>{{ $t('about.policy.products.blurb') }}</p>
        <v-card>
          <v-card-title class="info">
            {{ $t('about.policy.products.note.title') }}
          </v-card-title>
          <v-card-text>
            {{ $t('about.policy.products.note.body') }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      classOrder: [ 'ozone', 'uv' ],
      datasetOrder: [
        'totalozone', 'totalozoneobs', 'lidar', 'ozonesonde',
        'umkehr1', 'umkehr2', 'rocketsonde', 'broadband',
        'multiband', 'spectral', 'uv-index'
      ],
      doisURL: 'https://en.wikipedia.org/wiki/Digital_object_identifier',
      gawURL: 'https://gawsis.meteoswiss.ch/GAWSIS/index.html#/faq/',
      resolution40: 'https://www.wmo.int/pages/prog/hwrp/documents/wmo_827_enCG-XII-Res40.pdf',
      wmoURL: 'https://www.wmo.int/pages/about/exchangingdata_en.html'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/data-use-policy',
      fr: '/a-propos/politique-d\'utilisation-des-donnees'
    }
  }
}
</script>

<style scoped>
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
