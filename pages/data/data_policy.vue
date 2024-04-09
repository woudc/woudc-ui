<template>
  <v-container>
    <h1>{{ $t('data.policy.title') }}</h1>
    <i18n path="data.policy.blurb" tag="p">
      <template #wmo-policy>
        <a :href="wmoURL" target="_blank" hreflang="en">
          <span>
            {{ $t('data.policy.wmo-policy') }}
            <v-icon x-small>mdi-open-in-new</v-icon>
          </span>
        </a>
      </template>
      <template #gaw-policy>
        <a :href="gawURL" target="_blank" hreflang="en">
          <span>
            {{ $t('data.policy.gaw-policy') }}
            <v-icon x-small>mdi-open-in-new</v-icon>
          </span>
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
              <span>
                {{ $t('data.policy.wmo.link') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </template>
        </i18n>
        <h2>{{ $t('data.policy.gaw.title') }}</h2>
        <p>{{ $t('data.policy.gaw.blurb') }}</p>
        <v-alert color="info" outlined text border="left">
          <h3>
            {{ $t('data.policy.gaw.note.title') }}
          </h3>
          <div>
            {{ $t('data.policy.gaw.note.body') }}
          </div>
        </v-alert>
        <h2>{{ $t('data.policy.doi.title') }}</h2>
        <i18n path="data.policy.doi.blurb" tag="p">
          <template #dois>
            <a :href="doisURL" target="_blank" hreflang="en">
              <span>
                {{ $t('data.policy.doi.dois') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </template>
        </i18n>
        <v-alert color="info" outlined text border="left" class="mb-4">
          <h3>
            {{ $t('data.policy.doi.note1.title') }}
          </h3>
          <div>
            <ul>
              <li v-for="dataClass in classOrder" :key="dataClass">
                {{ $t('data.policy.doi.note1.items.' + dataClass) }}
              </li>
            </ul>
          </div>
        </v-alert>
        <v-alert color="info" outlined text border="left">
          <h3>
            {{ $t('data.policy.doi.note2.title') }}
          </h3>
          <div>
            <ul>
              <li v-for="dataset in datasetOrder" :key="dataset">
                {{ $t(`data.policy.doi.note2.items.${dataset}`) }}
              </li>
            </ul>
          </div>
        </v-alert>
        <h2>{{ $t('data.policy.publishing.title') }}</h2>
        <p>{{ $t('data.policy.publishing.blurb-citations') }}</p>
        <v-alert color="info" outlined text border="left" class="mb-4">
          <h3>
            {{ $t('data.policy.publishing.note1.title') }}
          </h3>
          <div>
            {{ $t('data.policy.publishing.note1.body') }}
          </div>
        </v-alert>
        <v-alert color="info" outlined text border="left">
          <h3>
            {{ $t('data.policy.publishing.note2.title') }}
          </h3>
          <div>
            <ol>
              <li v-for="dataClass in classOrder" :key="dataClass">
                {{ $t('data.policy.publishing.note2.items.' + dataClass) }}
              </li>
            </ol>
          </div>
        </v-alert>
        <i18n path="data.policy.publishing.blurb-contributors" tag="p">
          <template #contributors-page>
            <nuxt-link :to="localePath('contributors')">
              <span>{{ $t('common.contributors-page') }}</span>
            </nuxt-link>
          </template>
        </i18n>
        <h2>{{ $t('data.policy.products.title') }}</h2>
        <p>{{ $t('data.policy.products.blurb') }}</p>
        <v-alert color="info" outlined text border="left">
          <h3>
            {{ $t('data.policy.products.note.title') }}
          </h3>
          <div>
            {{ $t('data.policy.products.note.body') }}
          </div>
        </v-alert>
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
        'josie-besos',
      ],
      doisURL: 'https://en.wikipedia.org/wiki/Digital_object_identifier',
      gawURL: 'https://gawsis.meteoswiss.ch/GAWSIS/index.html#/faq/',
      resolution40:
        'https://www.wmo.int/pages/prog/hwrp/documents/wmo_827_enCG-XII-Res40.pdf',
      wmoURL: 'https://wmo.int/activities/type-of-activity/exchange-data',
    }
  },
  head() {
    return {
      title: this.$t('data.policy.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.policy.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('data.policy.keywords'),
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
