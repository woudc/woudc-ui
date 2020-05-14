<template>
  <div>
    <h1>{{ $t('about.access.title') }}</h1>
    <v-card id="table-of-contents">
      <v-card-title>
        {{ $t('about.access.contents.title') }}
      </v-card-title>
      <v-data-table
        :headers="linkHeaders"
        :items="contents"
        hide-default-header
        hide-default-footer
      >
        <template v-slot:item.link="section">
          <td>
            <woudc-link :link="selfLink(section.item)" />
            <ul v-if="section.item.children !== undefined">
              <li v-for="(link, i) in section.item.children" :key="i">
                <woudc-link :link="selfLink(link)" />
              </li>
            </ul>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <woudc-blurb :items="mainBlurb" />
    <woudc-note
      :title="$t('about.access.note1.title')"
      :body="note1Body"
      maxwidth="68%"
    />
    <woudc-note
      :title="$t('about.access.note2.title')"
      :body="note2Body"
      maxwidth="68%"
    />
    <div id="data-search-section">
      <h2>{{ $t('about.access.search.title') }}</h2>
      <woudc-blurb :items="searchBlurb" />
      <woudc-note :body="$t('about.access.search.note')" maxwidth="68%" />
    </div>
    <div id="waf-section">
      <h2>{{ $t('about.access.waf.title') }}</h2>
      <woudc-blurb :items="wafBlurb" />
    </div>
    <div id="web-services-section">
      <h2>{{ $t('about.access.web.title') }}</h2>
      <woudc-blurb :items="webBlurb" />
      <woudc-note
        :title="$t('about.access.web.table.title')"
        body="That font size is too big. Also the colour is wrong."
      />
      <div id="csw-subsection">
        <h2>{{ '1. ' + $t('about.access.csw.title') }}</h2>
        <woudc-blurb :items="cswBlurb" />
        <woudc-note
          :title="$t('about.access.csw.note.title')"
          :body="cswNote"
        />
      </div>
      <div id="wms-subsection">
        <h2>{{ '2. ' + $t('about.access.wms.title') }}</h2>
        <woudc-blurb :items="wmsBlurb" />
        <woudc-note
          :title="$t('about.access.wms.note.title')"
          :body="wmsNote"
        />
      </div>
      <div id="wfs-subsection">
        <h2>{{ '3. ' + $t('about.access.wfs.title') }}</h2>
        <woudc-blurb :items="wfsBlurb" />
        <woudc-note
          :title="$t('about.access.wfs.note.title')"
          :body="wfsNote"
        />
      </div>
      <div id="wps-section">
        <h2>{{ '4. ' + $t('about.access.wps.title') }}</h2>
        <woudc-blurb :items="wpsBlurb" />
        <woudc-note
          :title="$t('about.access.wps.note.title')"
          :body="wpsNote"
        />
      </div>
    </div>
    <div id="definitions-service-section">
      <h2>{{ $t('about.access.definitions.title') }}</h2>
      <p>{{ $t('about.access.definitions.blurb') }}</p>
      <woudc-note
        :title="$t('about.access.definitions.note.title')"
        :body="definitionsNote"
      />
    </div>
    <div id="iso-catalogue-section">
      <h2>{{ $t('about.access.iso.title') }}</h2>
      <p>{{ $t('about.access.iso.blurb1') }}</p>
      <woudc-note
        :title="$t('about.access.iso.note.title')"
        :body="isoNote"
      />
      <woudc-blurb :items="isoBlurb2" />
    </div>
    <div id="examples-section">
      <h2>{{ $t('about.access.examples.title') }}</h2>
      <woudc-blurb :items="examplesBlurb" />
      <v-data-table
        :headers="linkHeaders"
        :items="examples"
        hide-default-header
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:item.link="props">
          <a :href="props.item.to">{{ props.item.text }}</a>
          : {{ props.item.description }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import WoudcLink from '~/components/WoudcLink'
import WoudcBlurb from '~/components/WoudcBlurb'
import WoudcNote from '~/components/WoudcNote'

const emptyHeader = {
  text: '',
  align: 'left',
  sortable: false,
  value: 'link'
}

const examplesLinks = [
  {
    text: 'pywoudc',
    to: 'https://github.com/woudc/pywoudc'
  },
  {
    text: 'notebooks',
    to: 'https://github.com/woudc/woudc/tree/master/notebooks'
  }
]

export default {
  components: {
    'woudc-link': WoudcLink,
    'woudc-blurb': WoudcBlurb,
    'woudc-note': WoudcNote
  },
  data() {
    return {
      contents: [
        {
          text: this.$t('about.access.contents.links[0]'),
          selector: '#data-search-section'
        },
        {
          text: this.$t('about.access.contents.links[1]'),
          selector: 'waf-section'
        },
        {
          text: this.$t('about.access.contents.links[2]'),
          selector: 'web-services-section',
          children: [
            {
              text: this.$t('about.access.contents.links[3]'),
              selector: '#csw-subsection'
            },
            {
              text: this.$t('about.access.contents.links[4]'),
              selector: '#wms-subsection'
            },
            {
              text: this.$t('about.access.contents.links[5]'),
              selector: '#wfs-subsection'
            },
            {
              text: this.$t('about.access.contents.links[6]'),
              selector: '#wps-subsection'
            }
          ]
        },
        {
          text: this.$t('about.access.contents.links[7]'),
          selector: '#definitions-service-section'
        },
        {
          text: this.$t('about.access.contents.links[8]'),
          selector: '#iso-catalogue-section'
        },
        {
          text: this.$t('about.access.contents.links[9]'),
          selector: '#examples-section'
        }
      ],
      cswBlurb: [
        { text: this.$t('about.access.csw.blurb[0]') },
        { link: { to: 'https://www.opengeospatial.org/standards/cat', type: 'external', text: this.$t('about.access.csw.blurb[1]') } },
        { text: this.$t('about.access.csw.blurb[2]') }
      ],
      cswNote: [
        { text: this.$t('about.access.csw.note.body[0]') },
        { link: { to: 'https://geo.woudc.org/csw?service=CSW&version=2.0.2&request=GetCapabilities', type: 'external', text: this.$t('about.access.csw.note.body[1]') } }
      ],
      definitionsNote: [
        { text: this.$t('about.access.definitions.note.body[0]') },
        { link: { to: 'https://geo.woudc.org/def', type: 'external', text: this.$t('about.access.definitions.note.body[1]') } }
      ],
      examples: [...examplesLinks.keys()].map((index) => {
        return {
          text: examplesLinks[index].text,
          to: examplesLinks[index].to,
          description: this.$t('about.access.examples.links[' + index  + ']')
        }
      }),
      examplesBlurb: [
        { text: this.$t('about.access.examples.blurb[0]') },
        { link: { to: 'https://github.com/woudc', type: 'external', text: this.$t('about.access.examples.blurb[1]') } },
        { text: this.$t('about.access.examples.blurb[2]') },
      ],
      isoBlurb2: [
        { text: this.$t('about.access.iso.blurb2[0]') },
        { link: { to: 'https://github.com/woudc/woudc/wiki/WebServicesHowto', type: 'external', text: this.$t('about.access.iso.blurb2[1]') } },
        { text: this.$t('about.access.iso.blurb2[2]') }
      ],
      isoNote: [
        { text: this.$t('about.access.iso.note.body[0]') },
        { link: { to: 'https://geo.woudc.org/codelists.xml', type: 'external', text: this.$t('about.access.iso.note.body[1]') } }
      ],
      mainBlurb: [
        { text: this.$t('about.access.blurb[0]') },
        { newlines: 2 },
        { text: this.$t('about.access.blurb[1]') },
        { link: { to: 'contact', text: this.$t('about.access.blurb[2]') } },
        { text: '.' }
      ],
      note1Body: [
        { text: this.$t('about.access.note1.body[0]') },
        { link: { to: 'about-datapolicy', text: this.$t('about.access.note1.body[1]') } },
        { text: '.' }
      ],
      note2Body: [
        { text: this.$t('about.access.note2.body[0]') },
        { link: { to: 'about-datapolicy', text: this.$t('about.access.note2.body[1]') } },
        { text: this.$t('about.access.note2.body[2]') }
      ],
      linkHeaders: [
        emptyHeader
      ],
      searchBlurb: [
        { text: this.$t('about.access.search.blurb[0]') },
        { link: { to: 'data-explore', text: this.$t('about.access.search.blurb[1]') } },
        { text: this.$t('about.access.search.blurb[2]') },
        { newlines: 2 },
        { text: this.$t('about.access.search.blurb[3]') },
        { link: { to: 'https://github.com/woudc/woudc/wiki/DataSearchDownloadHowto', type: 'external', text: this.$t('about.access.search.blurb[4]') } },
        { text: this.$t('about.access.search.blurb[5]') }
      ],
      wafBlurb: [
        { text: this.$t('about.access.waf.blurb[0]') },
        { link: { to: 'https://woudc.org/archive/', type: 'external', text: this.$t('about.access.waf.blurb[1]') } },
        { text: this.$t('about.access.waf.blurb[2]') },
        { newlines: 2 },
        { text: this.$t('about.access.waf.blurb[3]') },
        { link: { to: 'https://woudc.org/archive/Summaries/dataset-snapshots', type: 'external', text: this.$t('about.access.waf.blurb[4]') } },
        { text: this.$t('about.access.waf.blurb[5]') },
        { newlines: 2 },
        { text: this.$t('about.access.waf.blurb[6]') },
        { link: { to: 'https://github.com/woudc/woudc/wiki/WAFHowto', type: 'external', text: this.$t('about.access.waf.blurb[7]') } },
        { text: this.$t('about.access.waf.blurb[8]') }
      ],
      webBlurb: [
        { text: this.$t('about.access.web.blurb[0]') },
        { newlines: 2 },
        { text: this.$t('about.access.web.blurb[1]') },
        { link: { to: 'https://opengeospatial.org/', type: 'external', text: this.$t('about.access.web.blurb[2]') } },
        { text: this.$t('about.access.web.blurb[3]') },
        { link: { to: 'https://www.isotc211.org/', type: 'external', text: this.$t('about.access.web.blurb[4]') } },
        { text: this.$t('about.access.web.blurb[5]') },
        { link: { to: 'https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf', type: 'external', text: this.$t('about.access.web.blurb[6]') } },
        { text: this.$t('about.access.web.blurb[7]') },
        { link: { to: 'https://www.wmo.int/pages/prog/www/WIS/', type: 'external', text: this.$t('about.access.web.blurb[8]') } },
        { text: this.$t('about.access.web.blurb[9]') }
      ],
      wfsBlurb: [
        { text: this.$t('about.access.wfs.blurb[0]') },
        { link: { to: 'https://www.opengeospatial.org/standards/wfs', type: 'external', text: this.$t('about.access.wfs.blurb[1]') } },
        { text: this.$t('about.access.wfs.blurb[2]') }
      ],
      wfsNote: [
        { text: this.$t('about.access.wfs.note.body[0]') },
        { link: { to: 'https://geo.woudc.org/ows?service=WFS&version=1.1.0&request=GetCapabilities', type: 'external', text: this.$t('about.access.wfs.note.body[1]') } }
      ],
      wmsBlurb: [
        { text: this.$t('about.access.wms.blurb[0]') },
        { link: { to: 'https://www.opengeospatial.org/standards/wms', type: 'external', text: this.$t('about.access.wms.blurb[1]') } },
        { text: this.$t('about.access.wms.blurb[2]') }
      ],
      wmsNote: [
        { text: this.$t('about.access.wms.note.body[0]') },
        { link: { to: 'https://geo.woudc.org/ows?service=WMS&version=1.3.0&request=GetCapabilities', type: 'external', text: this.$t('about.access.wms.note.body[1]') } }
      ],
      wpsBlurb: [
        { text: this.$t('about.access.wps.blurb[0]') },
        { link: { to: 'https://www.opengeospatial.org/standards/wps', type: 'external', text: this.$t('about.access.wps.blurb[1]') } },
        { text: this.$t('about.access.wps.blurb[2]') }
      ],
      wpsNote: [
        { text: this.$t('about.access.wps.note.body[0]') },
        { link: { to: 'https://geo.woudc.org/wps?service=WPS&version=1.0.0&request=GetCapabilities', type: 'external', text: this.$t('about.access.wps.note.body[1]') } }
      ]
    }
  },
  computed: {
    examplesLinks() {
      const links = []
      for (let i = 0; this.$t('examples-links')[i] !== undefined; i++) {
        links.push(this.$t('examples-links')[i])
      }
      return links
    }
  },
  methods: {
    selfLink(props) {
      return {
        text: props.text,
        to: 'about-dataaccess',
        selector: props.selector
      }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data-access',
      fr: '/data-access-fr'
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #cef;
  color: steelblue;
}

#table-of-contents {
  float: right;
  max-width: 30%;

  margin-left: 36px;

  color: white;
  background-color: royalblue;
}
</style>
