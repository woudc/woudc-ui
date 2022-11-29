<template>
  <v-container>
    <h1>{{ $t('data.access.title') }}</h1>
    <v-row>
      <v-col sm="12" md="8" cols="12">
        <p>{{ $t('data.access.blurb.body-intro') }}</p>
        <i18n path="data.access.blurb.body-accessibility" tag="p">
          <template #contact-us>
            <nuxt-link :to="localePath('contact')">
              <span>{{ $t('common.contact-us') }}</span>
            </nuxt-link>
          </template>
        </i18n>
        <v-card class="mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('data.access.note1.title') }}
          </v-card-title>
          <i18n path="data.access.note1.body" tag="v-card-text">
            <template #policy>
              <nuxt-link :to="localePath('data-data_policy')">
                <span>{{ $t('common.policy') }}</span>
              </nuxt-link>
            </template>
          </i18n>
        </v-card>
        <v-card class="mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('data.access.note2.title') }}
          </v-card-title>
          <i18n path="data.access.note2.body" tag="v-card-text">
            <template #stations-page>
              <nuxt-link :to="localePath('data-stations')">
                <span>{{ $t('common.stations-page') }}</span>
              </nuxt-link>
            </template>
          </i18n>
        </v-card>
      </v-col>
      <v-col sm="12" md="4" cols="12">
        <v-card id="table-of-contents">
          <v-card-title class="primary white--text">
            {{ $t('data.access.contents.title') }}
          </v-card-title>
          <v-list id="contents-body" class="pa-0">
            <v-list-item>
              <v-list-item-title>
                <nuxt-link to="#data-search-section">
                  <span>{{ $t('data.access.contents.links.search') }}</span>
                </nuxt-link>
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-title>
                <nuxt-link to="#waf-section">
                  <span>{{ $t('data.access.contents.links.waf') }}</span>
                </nuxt-link>
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-title>
                <nuxt-link to="#web-services-section">
                  <span>{{ $t('data.access.ogcapi.title') }}</span>
                </nuxt-link>
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-title>
                <nuxt-link to="#examples-section">
                  <span>{{ $t('data.access.contents.links.examples') }}</span>
                </nuxt-link>
              </v-list-item-title>
            </v-list-item>
            <v-divider />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div id="data-search-section">
          <h2>{{ $t('data.access.search.title') }}</h2>
          <i18n path="data.access.search.blurb.body-intro" tag="p">
            <template #search>
              <nuxt-link :to="localePath('data-search')">
                <span>{{ $t('common.search') }}</span>
              </nuxt-link>
            </template>
          </i18n>
          <i18n path="data.access.search.blurb.body-howto" tag="p">
            <template #how-to>
              <a :href="searchHelpURL" target="_blank">
                {{ $t('data.access.search.how-to') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </template>
          </i18n>
          <v-card class="mb-4" color="info">
            <v-card-text>
              {{ $t('data.access.search.note') }}
            </v-card-text>
          </v-card>
        </div>
        <div id="waf-section">
          <h2>{{ $t('data.access.waf.title') }}</h2>
          <i18n path="data.access.waf.blurb.body-intro" tag="p">
            <template #waf>
              <a :href="$config.WOUDC_UI_WAF_URL" target="_blank">
                {{ $t('common.wafFull') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </template>
          </i18n>
          <i18n path="data.access.waf.blurb.body-files" tag="p">
            <template #summary>
              <a :href="wafSummaryURL" target="_blank">
                {{ $t('data.access.waf.summary') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </template>
          </i18n>
          <i18n path="data.access.waf.blurb.body-howto" tag="p">
            <template #how-to>
              <a :href="wafGuideURL" target="_blank">
                {{ $t('data.access.waf.how-to') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </template>
          </i18n>
        </div>
        <div id="web-services-section">
          <h2>{{ $t('data.access.ogcapi.title') }}</h2>
          <p>{{ $t('data.access.ogcapi.intro-api') }}</p>
          <i18n path="data.access.ogcapi.intro-ogc" tag="p">
            <template #ogc>
              <a :href="ogcURL" target="_blank">
                {{ $t('common.ogcThe') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </template>
          </i18n>
          <v-card class="mb-4" color="info">
            <i18n path="data.access.ogcapi.intro-endpoint" tag="v-card-text">
              <template #url>
                <strong>
                  <a :href="$config.WOUDC_UI_API_URL" target="_blank">
                    {{ $config.WOUDC_UI_API_URL }}
                    <v-icon x-small>mdi-open-in-new</v-icon>
                  </a>
                </strong>
              </template>
            </i18n>
          </v-card>
          <p>{{ $t('data.access.ogcapi.intro-provides') }}</p>
          <i18n path="data.access.ogcapi.intro-consult" tag="p">
            <template #webServicesHowTo>
              <a :href="webServicesHowToURL" target="_blank">
                {{ $t('data.access.iso.how-to') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </template>
          </i18n>
        </div>

        <div id="examples-section">
          <h2>{{ $t('data.access.examples.title') }}</h2>
          <i18n path="data.access.examples.blurb" tag="p">
            <template #github>
              <a :href="githubURL" target="_blank">
                {{ $t('common.github') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </a>
            </template>
          </i18n>

          <v-list id="example-list" dense>
            <i18n path="data.access.examples.links.pywoudc" tag="v-list-item">
              <template #pywoudc>
                <a :href="examples.pywoudc" target="_blank">
                  pywoudc
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </a>
              </template>
            </i18n>

            <i18n path="data.access.examples.links.notebooks" tag="v-list-item">
              <template #notebooks>
                <a :href="examples.notebooks" target="_blank">
                  notebooks
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </a>
              </template>
            </i18n>
          </v-list>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cswURL: `${this.$config.WOUDC_UI_OWS_URL}/csw?service=CSW&version=2.0.2&request=GetCapabilities`,
      definitionsURL: `${this.$config.WOUDC_UI_OWS_URL}/def`,
      githubURL: 'https://github.com/woudc',
      interoperabilityURL:
        'https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf',
      isoAPIURL: `${this.$config.WOUDC_UI_OWS_URL}/codelists.xml`,
      isoURL: 'https://www.isotc211.org/',
      webServicesHowToURL:
        'https://github.com/woudc/woudc/wiki/WebServicesHowto',
      ogcStandardsURL: 'https://opengeospatial.org/standards/cat',
      ogcURL: 'https://opengeospatial.org/',
      searchHelpURL:
        'https://github.com/woudc/woudc/wiki/DataSearchDownloadHowto',
      wafGuideURL: 'https://github.com/woudc/woudc/wiki/WAFHowto',
      wafSummaryURL: `${this.$config.WOUDC_UI_WAF_URL}/Summaries/dataset-snapshots`,
      wfsAPIURL: `${this.$config.WOUDC_UI_OWS_URL}/ows?service=WFS&version=1.1.0&request=GetCapabilities`,
      wfsURL: 'https://www.opengeospatial.org/standards/wfs',
      wisURL: 'https://www.wmo.int/pages/prog/www/WIS/',
      wmsAPIURL: `${this.$config.WOUDC_UI_OWS_URL}/ows?service=WMS&version=1.3.0&request=GetCapabilities`,
      wmsURL: 'https://www.opengeospatial.org/standards/wms',
      wpsAPIURL: `${this.$config.WOUDC_UI_OWS_URL}/wps?service=WPS&version=1.0.0&request=GetCapabilities`,
      wpsURL: 'https://www.opengeospatial.org/standards/wps',
      contentsSelectors: {
        examples: 'examples-section',
        search: 'data-search-section',
        waf: 'waf-section',
        web: 'web-services-section',
      },
      examples: {
        pywoudc: 'https://github.com/woudc/pywoudc',
        notebooks: 'https://github.com/woudc/woudc/tree/master/notebooks',
      },
    }
  },
  head() {
    return {
      title: this.$t('data.access.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.access.blurb.body-intro'),
        },
      ],
    }
  },
  computed: {},
  methods: {
    prepareContentsLink(key) {
      return {
        text: this.$t('data.access.contents.links.' + key),
        selector: this.contentsSelectors[key],
        subsections: null,
      }
    },
  },
  nuxtI18n: {
    paths: {
      en: '/data/data-access',
      fr: '/donnees/accessibilite-des-donnees',
    },
  },
}
</script>

<style scoped></style>
