<template>
  <v-container>
    <h1>{{ $t('data.quality.title') }}</h1>
    <p>{{ $t('data.quality.blurb') }}</p>
    <v-row>
      <v-col>
        <h2>{{ $t('common.gawFull') }}</h2>
        <i18n path="data.quality.gaw-blurb" tag="p">
          <template #gaw-qa>
            <a :href="gawURL" target="_blank">
              <span>
                {{ $t('data.quality.gaw-qa') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </template>
        </i18n>
        <h2>{{ $t('data.quality.sag.title') }}</h2>
        <i18n path="data.quality.sag.blurb.body-intro" tag="p">
          <template #sop>
            <nuxt-link :to="localePath('resources-sop')">
              <span>{{ $t('common.sop') }}</span>
            </nuxt-link>
          </template>
        </i18n>
        <p>{{ $t('data.quality.sag.blurb.body-standards') }}</p>
        <ul>
          <li v-for="link in sagLinks" :key="link.to">
            <a :href="link.to" target="_blank">
              <span>
                {{ link.text }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
            ({{ link.note }})
          </li>
        </ul>
        <h2>{{ $t('data.quality.eccc.title') }}</h2>
        <p>{{ $t('data.quality.eccc.blurb') }}</p>
        <ul>
          <li>
            <i18n path="data.quality.eccc.item1" tag="span">
              <template #guidelines>
                <nuxt-link :to="localePath('about-formats')">
                  <span>{{ $t('common.guidelines') }}</span>
                </nuxt-link>
              </template>
            </i18n>
          </li>
          <li>{{ $t('data.quality.eccc.item2') }}</li>
          <li>{{ $t('data.quality.eccc.item3') }}</li>
          <li>{{ $t('data.quality.eccc.item4') }}</li>
          <li>{{ $t('data.quality.eccc.item5') }}</li>
          <li>
            <i18n path="data.quality.eccc.item6" tag="span">
              <template #access>
                <nuxt-link :to="localePath('data-data_access')">
                  <span>{{ $t('common.access') }}</span>
                </nuxt-link>
              </template>
            </i18n>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      gawURL: 'https://community.wmo.int/quality-assurance',
    }
  },
  head() {
    return {
      title: this.$t('data.quality.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.quality.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('data.quality.keywords'),
        },
      ],
    }
  },
  computed: {
    sagLinks() {
      return [
        {
          text: this.$t('data.quality.sag.links.dobson.text'),
          to: 'https://www.esrl.noaa.gov/gmd/ozwv/dobson/troubleshooting.html',
          note: this.$t('data.quality.sag.links.dobson.note'),
        },
        {
          text: this.$t('data.quality.sag.links.brewer.text'),
          to: 'https://open.canada.ca/data/en/dataset/bc0966ea-086b-46be-aa80-2490d9028eb5',
          note: this.$t('data.quality.sag.links.brewer.note'),
        },
        {
          text: this.$t('data.quality.sag.links.ozonesonde.text'),
          to: 'https://www.fz-juelich.de/iek/iek-8/EN/Expertise/Infrastructure/WCCOS/WCCOS_node.html',
          note: this.$t('data.quality.sag.links.ozonesonde.note'),
        },
      ]
    },
  },
  nuxtI18n: {
    paths: {
      en: '/data/data-quality',
      fr: '/donnees/qualite-donnees',
    },
  },
}
</script>
