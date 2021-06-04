<template>
  <v-container>
    <h1>{{ $t('data.access.title') }}</h1>
    <v-row>
      <v-col cols="8">
        <p>{{ $t('data.access.blurb.body-intro') }}</p>
        <i18n path="data.access.blurb.body-accessibility" tag="p">
          <template v-slot:contact-us>
            <nuxt-link :to="localePath('contact')">
              {{ $t('common.contact-us') }}
            </nuxt-link>
          </template>
        </i18n>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('data.access.note1.title') }}
          </v-card-title>
          <v-card-text>
            <i18n class="mb-0" path="data.access.note1.body" tag="p">
              <template v-slot:policy>
                <nuxt-link :to="localePath('data-data_policy')">
                  {{ $t('common.policy') }}
                </nuxt-link>
              </template>
            </i18n>
          </v-card-text>
        </v-card>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('data.access.note2.title') }}
          </v-card-title>
          <v-card-text>
            <i18n class="mb-0" path="data.access.note2.body" tag="p">
              <template v-slot:stations-page>
                <nuxt-link :to="localePath('data-stations')">
                  {{ $t('common.stations-page') }}
                </nuxt-link>
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card id="contents-table">
          <v-card-title class="primary white--text">
            {{ $t('data.access.contents.title') }}
          </v-card-title>
          <v-list id="contents-body" class="pa-0">
            <div
              v-for="(section, i) in tableOfContents"
              :key="section.selector"
            >
              <v-divider v-if="i !== 0" />
              <template v-if="section.subsections === null">
                <v-list-item>
                  <v-list-item-title>
                    <nuxt-link :to="'#' + section.selector">
                      {{ section.text }}
                    </nuxt-link>
                  </v-list-item-title>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-group>
                  <template v-slot:activator>
                    <v-list-item-title>
                      <nuxt-link :to="'#' + section.selector">
                        {{ section.text }}
                      </nuxt-link>
                    </v-list-item-title>
                  </template>
                  <v-list-item
                    v-for="subsection in section.subsections"
                    :key="subsection.selector"
                  >
                    <v-list-item-title>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <nuxt-link :to="'#' + subsection.selector">
                        {{ subsection.text }}
                      </nuxt-link>
                    </v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </template>
            </div>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div id="data-search-section">
          <h2>{{ $t('data.access.search.title') }}</h2>
          <i18n path="data.access.search.blurb.body-intro" tag="p">
            <template v-slot:search>
              <nuxt-link :to="localePath('data-search')">
                {{ $t('common.search') }}
              </nuxt-link>
            </template>
          </i18n>
          <i18n path="data.access.search.blurb.body-howto" tag="p">
            <template v-slot:how-to>
              <a :href="searchHelpURL" target="_blank">
                {{ $t('data.access.search.how-to') }}
              </a>
            </template>
          </i18n>
          <v-card class="mt-1 mb-4" color="info">
            <v-card-text>
              {{ $t('data.access.search.note') }}
            </v-card-text>
          </v-card>
        </div>
        <div id="waf-section">
          <h2>{{ $t('data.access.waf.title') }}</h2>
          <i18n path="data.access.waf.blurb.body-intro" tag="p">
            <template v-slot:waf>
              <a :href="wafURL" target="_blank">
                {{ $t('common.wafFull') }}
              </a>
            </template>
          </i18n>
          <i18n path="data.access.waf.blurb.body-files" tag="p">
            <template v-slot:summary>
              <a :href="wafSummaryURL" target="_blank">
                {{ $t('data.access.waf.summary') }}
              </a>
            </template>
          </i18n>
          <i18n path="data.access.waf.blurb.body-howto" tag="p">
            <template v-slot:how-to>
              <a :href="wafGuideURL" target="_blank">
                {{ $t('data.access.waf.how-to') }}
              </a>
            </template>
          </i18n>
        </div>
        <div id="web-services-section">
          <h2>{{ $t('data.access.web.title') }}</h2>
          <p>{{ $t('data.access.web.blurb.body-intro') }}</p>
          <i18n path="data.access.web.blurb.body-standards" tag="p">
            <template v-slot:ogc>
              <a :href="ogcURL" target="_blank">
                {{ $t('common.ogc') }}
              </a>
            </template>
            <template v-slot:iso>
              <a :href="isoURL" target="_blank">
                {{ $t('common.iso') }}
              </a>
            </template>
            <template v-slot:interoperability>
              <a :href="interoperabilityURL" target="_blank">
                {{ $t('common.interoperability') }}
              </a>
            </template>
            <template v-slot:wis>
              <a :href="wisURL" target="_blank">
                {{ $t('common.wis') }}
              </a>
            </template>
          </i18n>
          <v-card class="mt-1 mb-4" color="info">
            <v-card-title class="pt-3 pb-0">
              {{ $t('data.access.web.table.title') }}
            </v-card-title>
            <v-card-text>
              <span>That font size is too big. Also the colour is wrong.</span>
            </v-card-text>
          </v-card>
          <div id="csw-subsection">
            <h3>{{ $t('data.access.csw.title') }}</h3>
            <i18n class="mb-0" path="data.access.csw.blurb" tag="p">
              <template v-slot:ogc-cs>
                <a :href="ogcStandardsURL" target="_blank">
                  {{ $t('common.ogc-cs') }}
                </a>
              </template>
            </i18n>
            <v-card class="mt-1 mb-4" color="info">
              <v-card-title class="pt-3 pb-0">
                {{ $t('data.access.csw.note.title') }}
              </v-card-title>
              <v-card-text>
                <i18n class="mb-0" path="data.access.csw.note.body" tag="p">
                  <template v-slot:link>
                    <a :href="cswURL" target="_blank">
                      {{ cswURL }}
                    </a>
                  </template>
                </i18n>
              </v-card-text>
            </v-card>
          </div>
          <div id="wms-subsection">
            <h3>{{ $t('data.access.wms.title') }}</h3>
            <i18n path="data.access.wms.blurb" tag="p">
              <template v-slot:wms>
                <a :href="wmsURL" target="_blank">
                  {{ $t('common.wms') }}
                </a>
              </template>
            </i18n>
            <v-card class="mt-1 mb-4" color="info">
              <v-card-title class="pt-3 pb-0">
                {{ $t('data.access.wms.note.title') }}
              </v-card-title>
              <v-card-text>
                <i18n class="mb-0" path="data.access.wms.note.body" tag="p">
                  <template v-slot:link>
                    <a :href="wmsAPIURL" target="_blank">
                      {{ wmsAPIURL }}
                    </a>
                  </template>
                </i18n>
              </v-card-text>
            </v-card>
          </div>
          <div id="wfs-subsection">
            <h3>{{ $t('data.access.wfs.title') }}</h3>
            <i18n path="data.access.wfs.blurb.body-intro" tag="p">
              <template v-slot:wfs>
                <a :href="wfsURL" target="_blank">
                  {{ $t('common.wfs') }}
                </a>
              </template>
            </i18n>
            <p>{{ $t('data.access.wfs.blurb.body-limits') }}</p>
            <v-card class="mt-1 mb-4" color="info">
              <v-card-title class="pt-3 pb-0">
                {{ $t('data.access.wfs.note.title') }}
              </v-card-title>
              <v-card-text>
                <i18n class="mb-0" path="data.access.wfs.note.body" tag="p">
                  <template v-slot:link>
                    <a :href="wfsAPIURL" target="_blank">
                      {{ wfsAPIURL }}
                    </a>
                  </template>
                </i18n>
              </v-card-text>
            </v-card>
          </div>
          <div id="wps-subsection">
            <h3>{{ $t('data.access.wps.title') }}</h3>
            <i18n path="data.access.wps.blurb" tag="p">
              <template v-slot:wps>
                <a :href="wpsURL" target="_blank">
                  {{ $t('common.wps') }}
                </a>
              </template>
            </i18n>
            <v-card class="mt-1 mb-4" color="info">
              <v-card-title class="pt-3 pb-0">
                {{ $t('data.access.wps.note.title') }}
              </v-card-title>
              <v-card-text>
                <i18n class="mb-0" path="data.access.wps.note.body" tag="p">
                  <template v-slot:link>
                    <a :href="wpsAPIURL" target="_blank">
                      {{ wpsAPIURL }}
                    </a>
                  </template>
                </i18n>
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div id="definitions-service-section">
          <h2>{{ $t('data.access.definitions.title') }}</h2>
          <p>{{ $t('data.access.definitions.blurb') }}</p>
          <v-card class="mt-1 mb-4" color="info">
            <v-card-title class="pt-3 pb-0">
              {{ $t('data.access.definitions.note.title') }}
            </v-card-title>
            <v-card-text>
              <i18n
                class="mb-0"
                path="data.access.definitions.note.body"
                tag="p"
              >
                <template v-slot:link>
                  <a :href="definitionsURL" target="_blank">
                    {{ definitionsURL }}
                  </a>
                </template>
              </i18n>
            </v-card-text>
          </v-card>
        </div>
        <div id="iso-catalogue-section">
          <h2>{{ $t('data.access.iso.title') }}</h2>
          <p>{{ $t('data.access.iso.blurb-intro') }}</p>
          <v-card class="mt-1 mb-4" color="info">
            <v-card-title class="pt-3 pb-0">
              {{ $t('data.access.iso.note.title') }}
            </v-card-title>
            <v-card-text>
              <i18n class="mb-0" path="data.access.iso.note.body" tag="p">
                <template v-slot:link>
                  <a :href="isoAPIURL" target="_blank">
                    {{ isoAPIURL }}
                  </a>
                </template>
              </i18n>
            </v-card-text>
          </v-card>
          <i18n path="data.access.iso.blurb-howto" tag="p">
            <template v-slot:how-to>
              <a :href="isoServicesURL" target="_blank">
                {{ $t('data.access.iso.how-to') }}
              </a>
            </template>
          </i18n>
        </div>
        <div id="examples-section">
          <h2>{{ $t('data.access.examples.title') }}</h2>
          <i18n path="data.access.examples.blurb" tag="p">
            <template v-slot:github>
              <a :href="githubURL" target="_blank">
                {{ $t('common.github') }}
              </a>
            </template>
          </i18n>
          <v-card>
            <v-list id="example-list" class="pa-0" dense>
              <v-list-item>
                <a :href="examples.pywoudc" target="_blank">
                  pywoudc
                </a>
                : {{ $t('data.access.examples.links.pywoudc') }}
              </v-list-item>
              <v-divider />
              <v-list-item>
                <a :href="examples.notebooks" target="_blank">
                  notebooks
                </a>
                : {{ $t('data.access.examples.links.notebooks') }}
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cswURL:
        'https://geo.woudc.org/csw?service=CSW&version=2.0.2&request=GetCapabilities',
      definitionsURL: 'https://geo.woudc.org/def',
      githubURL: 'https://github.com/woudc',
      interoperabilityURL:
        'https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf',
      isoAPIURL: 'https://geo.woudc.org/codelists.xml',
      isoURL: 'https://www.isotc211.org/',
      isoServicesURL: 'https://github.com/woudc/woudc/wiki/WebServicesHowto',
      ogcStandardsURL: 'https://opengeospatial.org/standards/cat',
      ogcURL: 'https://opengeospatial.org/',
      searchHelpURL:
        'https://github.com/woudc/woudc/wiki/DataSearchDownloadHowto',
      wafURL: this.$config.wafURL,
      wafGuideURL: 'https://github.com/woudc/woudc/wiki/WAFHowto',
      wafSummaryURL: 'https://woudc.org/archive/Summaries/dataset-snapshots',
      wfsAPIURL:
        'https://geo.woudc.org/ows?service=WFS&version=1.1.0&request=GetCapabilities',
      wfsURL: 'https://www.opengeospatial.org/standards/wfs',
      wisURL: 'https://www.wmo.int/pages/prog/www/WIS/',
      wmsAPIURL:
        'https://geo.woudc.org/ows?service=WMS&version=1.3.0&request=GetCapabilities',
      wmsURL: 'https://www.opengeospatial.org/standards/wms',
      wpsAPIURL:
        'https://geo.woudc.org/wps?service=WPS&version=1.0.0&request=GetCapabilities',
      wpsURL: 'https://www.opengeospatial.org/standards/wps',
      contentsSelectors: {
        csw: 'csw-subsection',
        definitions: 'definitions-service-section',
        examples: 'examples-section',
        iso: 'iso-catalogue-section',
        search: 'data-search-section',
        waf: 'waf-section',
        web: 'web-services-section',
        wfs: 'wfs-subsection',
        wms: 'wms-subsection',
        wps: 'wps-subsection'
      },
      examples: {
        pywoudc: 'https://github.com/woudc/pywoudc',
        notebooks: 'https://github.com/woudc/woudc/tree/master/notebooks'
      }
    }
  },
  computed: {
    tableOfContents() {
      const sections = [
        'search',
        'waf',
        'web',
        'definitions',
        'iso',
        'examples'
      ].map(this.prepareContentsLink)

      sections[2].subsections = this.webContentsSubsections
      return sections
    },
    webContentsSubsections() {
      return ['csw', 'wms', 'wfs', 'wps'].map(this.prepareContentsLink)
    }
  },
  methods: {
    prepareContentsLink(key) {
      return {
        text: this.$t('data.access.contents.links.' + key),
        selector: this.contentsSelectors[key],
        subsections: null
      }
    }
  },
  head() {
    return {
      title: this.$t('data.access.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.access.blurb.body-intro')
        }
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/data-access',
      fr: '/donnees/accessibilite-des-donnees'
    }
  }
}
</script>

<style scoped>
#contents-body,
#example-list {
  font-size: 14px;
}
</style>
