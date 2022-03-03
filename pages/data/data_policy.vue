<template>
  <v-container>
    <h1>{{ $t('data.policy.title') }}</h1>
    <i18n path="data.policy.blurb" tag="p">
      <template #wmo-policy>
        <a :href="wmoURL" target="_blank">
          {{ $t('data.policy.wmo-policy') }}
        </a>
      </template>
      <template #gaw-policy>
        <a :href="gawURL" target="_blank">
          {{ $t('data.policy.gaw-policy') }}
        </a>
      </template>
    </i18n>
    <v-row>
      <v-col>
        <h2>{{ $t('data.policy.wmo.title') }}</h2>
        <p>{{ $t('data.policy.wmo.blurb.body-intro') }}</p>
        <i18n path="data.policy.wmo.blurb.body-resolution40" tag="p">
          <template #link>
            <a :href="resolution40" target="_blank">
              {{ $t('data.policy.wmo.link') }}
            </a>
          </template>
        </i18n>
        <h2>{{ $t('data.policy.gaw.title') }}</h2>
        <p>{{ $t('data.policy.gaw.blurb') }}</p>
        <v-card color="info">
          <v-card-title>
            {{ $t('data.policy.gaw.note.title') }}
          </v-card-title>
          <v-card-text>
            {{ $t('data.policy.gaw.note.body') }}
          </v-card-text>
        </v-card>
        <h2>{{ $t('data.policy.doi.title') }}</h2>
        <i18n path="data.policy.doi.blurb" tag="p">
          <template #dois>
            <a :href="doisURL" target="_blank">
              {{ $t('data.policy.doi.dois') }}
            </a>
          </template>
        </i18n>
        <v-card color="info" class="mb-4">
          <v-card-title>
            {{ $t('data.policy.doi.note1.title') }}
          </v-card-title>
          <v-card-text>
            <ul>
              <li v-for="dataClass in classOrder" :key="dataClass">
                {{ $t('data.policy.doi.note1.items.' + dataClass) }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
        <v-card color="info">
          <v-card-title class="info">
            {{ $t('data.policy.doi.note2.title') }}
          </v-card-title>
          <v-card-text>
            <ul>
              <li v-for="dataset in datasetOrder" :key="dataset">
                {{ $t('data.policy.doi.note2.items.' + dataset) }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
        <h2>{{ $t('data.policy.publishing.title') }}</h2>
        <p>{{ $t('data.policy.publishing.blurb-citations') }}</p>
        <v-card color="info" class="mb-4">
          <v-card-title>
            {{ $t('data.policy.publishing.note1.title') }}
          </v-card-title>
          <v-card-text>
            {{ $t('data.policy.publishing.note1.body') }}
          </v-card-text>
        </v-card>
        <v-card color="info">
          <v-card-title>
            {{ $t('data.policy.publishing.note2.title') }}
          </v-card-title>
          <v-card-text>
            <ol>
              <li v-for="dataClass in classOrder" :key="dataClass">
                {{ $t('data.policy.publishing.note2.items.' + dataClass) }}
              </li>
            </ol>
          </v-card-text>
        </v-card>
        <i18n path="data.policy.publishing.blurb-contributors" tag="p">
          <template #contributors-page>
            <nuxt-link :to="localePath('contributors')">
              {{ $t('common.contributors-page') }}
            </nuxt-link>
          </template>
        </i18n>
        <h2>{{ $t('data.policy.products.title') }}</h2>
        <p>{{ $t('data.policy.products.blurb') }}</p>
        <v-card color="info">
          <v-card-title>
            {{ $t('data.policy.products.note.title') }}
          </v-card-title>
          <v-card-text>
            {{ $t('data.policy.products.note.body') }}
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
      classOrder: ['ozone', 'uv'],
      datasetOrder: [
        'totalozone',
        'totalozoneobs',
        'lidar',
        'ozonesonde',
        'umkehr1',
        'umkehr2',
        'rocketsonde',
        'broadband',
        'multiband',
        'spectral',
        'uv-index',
      ],
      doisURL: 'https://en.wikipedia.org/wiki/Digital_object_identifier',
      gawURL: 'https://gawsis.meteoswiss.ch/GAWSIS/index.html#/faq/',
      resolution40:
        'https://www.wmo.int/pages/prog/hwrp/documents/wmo_827_enCG-XII-Res40.pdf',
      wmoURL: 'https://www.wmo.int/pages/about/exchangingdata_en.html',
    }
  },
  head() {
    return {
      title: this.$t('data.policy.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.policy.blurb'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/data-use-policy',
      fr: "/donnees/politique-d'utilisation-des-donnees",
    },
  },
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
