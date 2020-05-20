<template>
  <div>
    <h1>{{ $t('about.access.title') }}</h1>
    <v-card id="contents-table">
      <v-card-title>
        {{ $t('about.access.contents.title') }}
      </v-card-title>
      <v-list id="contents-body">
        <div v-for="(section, i) in contents" :key="i">
          <v-divider v-if="i !== 0" />
          <v-list-item>
            <nuxt-link :to="'#' + section.selector" v-text="section.text" />
          </v-list-item>
          <v-list-item v-if="section.children !== undefined">
            <ul>
              <li v-for="(child, j) in section.children" :key="j">
                <nuxt-link :to="'#' + child.selector" v-text="child.text" />
              </li>
            </ul>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
    <i18n class="newlines" path="about.access.blurb.template" tag="p">
      <template v-slot:contact>
        <nuxt-link :to="localePath('contact')" v-text="$t('about.access.blurb.contact')" />
      </template>
    </i18n>
    <v-card class="woudc-note" tile max-width="68%" min-width="0px">
      <v-card-title v-text="$t('about.access.note1.title')" />
      <v-card-text>
        <i18n path="about.access.note1.body.template" tag="p">
          <template v-slot:policy>
            <nuxt-link
              :to="localePath('about-datapolicy')"
              v-text="$t('about.access.note1.body.policy')"
            />
          </template>
        </i18n>
      </v-card-text>
    </v-card>
    <v-card class="woudc-note" tile max-width="68%" min-width="0px">
      <v-card-title v-text="$t('about.access.note2.title')" />
      <v-card-text>
        <i18n path="about.access.note2.body.template" tag="p">
          <template v-slot:stations>
            <nuxt-link
              :to="localePath('data-stations')"
              v-text="$t('about.access.note2.body.stations')"
            />
          </template>
        </i18n>
      </v-card-text>
    </v-card>
    <div id="data-search-section">
      <h2>{{ $t('about.access.search.title') }}</h2>
      <i18n class="newlines" path="about.access.search.blurb.template" tag="p">
        <template v-slot:search>
          <nuxt-link :to="localePath('data-explore')" v-text="$t('about.access.search.blurb.search')" />
        </template>
        <template v-slot:how-to>
          <a :href="searchHelpURL" target="_blank" v-text="$t('about.access.search.blurb.how-to')" />
        </template>
      </i18n>
      <v-card class="woudc-note" tile max-width="68%" min-width="0px">
        <v-card-text>
          {{ $t('about.access.search.note') }}
        </v-card-text>
      </v-card>
    </div>
    <div id="waf-section">
      <h2>{{ $t('about.access.waf.title') }}</h2>
      <i18n class="newlines" path="about.access.waf.blurb.template" tag="p">
        <template v-slot:waf>
          <a :href="wafURL" target="_blank" v-text="$t('wafFull')" />
        </template>
        <template v-slot:summary>
          <a :href="wafSummaryURL" target="_blank" v-text="$t('about.access.waf.blurb.summary')" />
        </template>
        <template v-slot:how-to>
          <a :href="wafGuideURL" target="_blank" v-text="$t('about.access.waf.blurb.how-to')" />
        </template>
      </i18n>
    </div>
    <div id="web-services-section">
      <h2>{{ $t('about.access.web.title') }}</h2>
      <i18n class="newlines" path="about.access.web.blurb.template" tag="p">
        <template v-slot:ogc>
          <a :href="ogcURL" target="_blank" v-text="$t('about.access.web.blurb.ogc')" />
        </template>
        <template v-slot:iso>
          <a :href="isoURL" target="_blank" v-text="$t('about.access.web.blurb.iso')" />
        </template>
        <template v-slot:interoperability>
          <a :href="interoperabilityURL" target="_blank" v-text="$t('about.access.web.blurb.interoperability')" />
        </template>
        <template v-slot:wis>
          <a :href="wisURL" target="_blank" v-text="$t('about.access.web.blurb.wis')" />
        </template>
      </i18n>
      <v-card class="woudc-note" tile min-width="0px">
        <v-card-title v-text="$t('about.access.web.table.title')" />
        <v-card-text>
          <p>That font size is too big. Also the colour is wrong.</p>
        </v-card-text>
      </v-card>
      <div id="csw-subsection">
        <h2>{{ '1. ' + $t('about.access.csw.title') }}</h2>
        <i18n path="about.access.csw.blurb.template" tag="p">
          <template v-slot:ogc>
            <a :href="ogcStandardsURL" target="_blank" v-text="$t('about.access.csw.blurb.ogc')" />
          </template>
        </i18n>
        <v-card class="woudc-note" tile min-width="0px">
          <v-card-title v-text="$t('about.access.csw.note.title')" />
          <v-card-text>
            <i18n path="about.access.csw.note.template" tag="p">
              <template v-slot:link>
                <a :href="cswURL" target="_blank" v-text="cswURL" />
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </div>
      <div id="wms-subsection">
        <h2>{{ '2. ' + $t('about.access.wms.title') }}</h2>
        <i18n path="about.access.wms.blurb.template" tag="p">
          <template v-slot:wms>
            <a href="" target="_blank" v-text="$t('about.access.wms.blurb.wms')" />
          </template>
        </i18n>
        <v-card class="woudc-note" tile min-width="0px">
          <v-card-title v-text="$t('about.access.wms.note.title')" />
          <v-card-text>
            <i18n path="about.access.wms.note.template" tag="p">
              <template v-slot:link>
                <a :href="wmsURL" target="_blank" v-text="wmsURL" />
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </div>
      <div id="wfs-subsection">
        <h2>{{ '3. ' + $t('about.access.wfs.title') }}</h2>
        <i18n path="about.access.wfs.blurb.template" tag="p">
          <template v-slot:wfs>
            <a href="" target="_blank" v-text="$t('about.access.wfs.blurb.wfs')" />
          </template>
        </i18n>
        <v-card class="woudc-note" tile min-width="0px">
          <v-card-title v-text="$t('about.access.wfs.note.title')" />
          <v-card-text>
            <i18n path="about.access.wfs.note.template" tag="p">
              <template v-slot:link>
                <a :href="wfsURL" target="_blank" v-text="wfsURL" />
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </div>
      <div id="wps-section">
        <h2>{{ '4. ' + $t('about.access.wps.title') }}</h2>
        <i18n path="about.access.wps.blurb.template" tag="p">
          <template v-slot:wps>
            <a href="" target="_blank" v-text="$t('about.access.wps.blurb.wps')" />
          </template>
        </i18n>
        <v-card class="woudc-note" tile min-width="0px">
          <v-card-title v-text="$t('about.access.wps.note.title')" />
          <v-card-text>
            <i18n path="about.access.wps.note.template" tag="p">
              <template v-slot:link>
                <a :href="wpsURL" target="_blank" v-text="wpsURL" />
              </template>
            </i18n>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div id="definitions-service-section">
      <h2>{{ $t('about.access.definitions.title') }}</h2>
      <p>{{ $t('about.access.definitions.blurb') }}</p>
      <v-card class="woudc-note" tile min-width="0px">
        <v-card-title v-text="$t('about.access.definitions.note.title')" />
        <v-card-text>
          <i18n path="about.access.definitions.note.template" tag="p">
            <template v-slot:link>
              <a :href="definitionsURL" target="_blank" v-text="definitionsURL" />
            </template>
          </i18n>
        </v-card-text>
      </v-card>
    </div>
    <div id="iso-catalogue-section">
      <h2>{{ $t('about.access.iso.title') }}</h2>
      <p>{{ $t('about.access.iso.blurb1') }}</p>
      <v-card class="woudc-note" tile min-width="0px">
        <v-card-title v-text="$t('about.access.iso.note.title')" />
        <v-card-text>
          <i18n path="about.access.iso.note.template" tag="p">
            <template v-slot:link>
              <a :href="isoURL" target="_blank" v-text="isoURL" />
            </template>
          </i18n>
        </v-card-text>
      </v-card>
      <i18n path="about.access.iso.blurb2.template" tag="p">
        <template v-slot:how-to>
          <a href="" target="_blank" v-text="$t('about.access.iso.blurb2.how-to')" />
        </template>
      </i18n>
    </div>
    <div id="examples-section">
      <h2>{{ $t('about.access.examples.title') }}</h2>
      <i18n path="about.access.examples.blurb.template" tag="p">
        <template v-slot:github>
          <a :href="githubURL" target="_blank" v-text="$t('about.access.examples.blurb.github')" />
        </template>
      </i18n>
      <v-card>
        <v-list id="example-list" dense>
          <v-list-item>
            <a :href="exampleLinks[0]" target="_blank" v-text="exampleNames[0]" /> : {{ $t('about.access.examples.links[0]') }}
          </v-list-item>
          <v-divider />
          <v-list-item>
            <a :href="exampleLinks[1]" target="_blank" v-text="exampleNames[1]" /> : {{ $t('about.access.examples.links[1]') }}
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cswURL: 'https://geo.woudc.org/csw?service=CSW&version=2.0.2&request=GetCapabilities',
      definitionsURL: 'https://geo.woudc.org/def',
      githubURL: 'https://github.com/woudc',
      interoperabilityURL: 'https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf',
      isoURL: 'https://geo.woudc.org/codelists.xml',
      ogcStandardsURL: 'https://opengeospatial.org/standards/cat',
      ogcURL: 'https://opengeospatial.org/',
      searchHelpURL: 'https://github.com/woudc/woudc/wiki/DataSearchDownloadHowto',
      wafURL: 'https://woudc.org/archive/',
      wafGuideURL: 'https://github.com/woudc/woudc/wiki/WAFHowto',
      wafSummaryURL: 'https://woudc.org/archive/Summaries/dataset-snapshots',
      wfsURL: 'https://geo.woudc.org/ows?service=WFS&version=1.1.0&request=GetCapabilities',
      wisURL: 'https://www.wmo.int/pages/prog/www/WIS/',
      wmsURL: 'https://geo.woudc.org/ows?service=WMS&version=1.3.0&request=GetCapabilities',
      wpsURL: 'https://geo.woudc.org/wps?service=WPS&version=1.0.0&request=GetCapabilities',
      contentsSelectors: [
        'data-search-section',
        'waf-section',
        'web-services-section',
        'csw-subsection',
        'wms-subsection',
        'wfs-subsection',
        'wps-subsection',
        'definitions-service-section',
        'iso-catalogue-section',
        'examples-section'
      ],
      exampleNames: [ 'pywoudc', 'notebooks' ],
      exampleLinks: [
        'https://github.com/woudc/pywoudc',
        'https://github.com/woudc/woudc/tree/master/notebooks'
      ]
    }
  },
  computed: {
    contents() {
      const head = [0, 1, 2].map(this.prepareContentsLink)
      const subsections = [3, 4, 5, 6].map(this.prepareContentsLink)
      const tail = [7, 8, 9].map(this.prepareContentsLink)

      head[2].children = subsections
      return head.concat(tail)
    }
  },
  methods: {
    prepareContentsLink(index) {
      return {
        text: this.$t('about.access.contents.links[' + index + ']'),
        selector: this.contentsSelectors[index]
      }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/data-access',
      fr: '/apropos/data-access-fr'
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #cef;
  color: steelblue;
}

#contents-table {
  float: right;
  max-width: 30%;

  margin-left: 36px;

  color: white;
  background-color: royalblue;
}

#contents-body {
  padding: 0px;
  font-size: 14px;
}

#contents-body ul {
  margin-bottom: 16px;
}

#example-list {
  padding: 0px;
  font-size: 14px;
}
</style>
