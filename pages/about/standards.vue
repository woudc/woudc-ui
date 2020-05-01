<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.standards.title') }}</h1>
    <woudc-blurb :items="blurb1" />
    <v-data-table
      :headers="headers"
      :items="rows"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.formats="props">
        <td>
          <ul>
            <li v-for="link in props.item.formats" :key="link.to">
              <a :href="link.to">
                {{ link.text }}
              </a>
            </li>
          </ul>
        </td>
      </template>
      <template v-slot:item.services="props">
        <td>
          <ul>
            <li v-for="link in props.item.services" :key="link.to">
              <a :href="link.to">
                {{ link.text }}
              </a>
            </li>
          </ul>
        </td>
      </template>
    </v-data-table>
    <woudc-blurb :items="blurb2" />
  </v-layout>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'

const headerKeys = [ 'resource', 'formats', 'services' ]

const linksURLs = [
  {
    formats: [
      'https://www.wmo.int/pages/prog/www/metadata/WMO-core-metadata.html'
    ],
    services: [
      'https://www.opengeospatial.org/standards/cat',
      'https://www.openarchives.org/pmh/',
      'http://www.opensearch.org/'
    ]
  },
  {
    formats: [
      'https://www.opengeospatial.org/standards/gml',
      'https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf'
    ],
    services: [
      'https://www.opengeospatial.org/standards/wms',
      'https://www.opengeospatial.org/standards/wfs'
    ]
  },
  {
    formats: [
      'https://www.opengeospatial.org/standards/gml',
      'https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf'
    ],
    services: [
      'https://www.opengeospatial.org/standards/wms',
      'https://www.opengeospatial.org/standards/wfs'
    ]
  },
  {
    formats: [
      'https://en.wikipedia.org/wiki/Comma-separated_values',
      'https://geojson.org/',
      'https://www.opengeospatial.org/standards/gml',
      'https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf'
    ],
    services: [
      'https://www.opengeospatial.org/standards/wms',
      'https://www.opengeospatial.org/standards/wfs'
    ]
  }
]

export default {
  components: {
    'woudc-blurb': WoudcBlurb
  },
  data() {
    return {
      blurb1: [
        { text: this.$t('about.standards.blurb1[0]') },
        { link: { to: 'https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf', type: 'external', text: this.$t('about.standards.blurb1[1]') } },
        { text: this.$t('about.standards.blurb1[2]') },
        { link: { to: 'https://www.wmo.int/pages/prog/www/WIS/', type: 'external', text: this.$t('about.standards.blurb1[3]') } },
        { text: this.$t('about.standards.blurb1[4]') }
      ],
      blurb2: [
        { text: this.$t('about.standards.blurb2[0]') },
        { link: { to: 'about-dataaccess', text: this.$t('about.standards.blurb2[1]') } },
        { text: '.' }
      ],
      headers: [...headerKeys.keys()].map((index) => {
        return {
          text: this.$t('about.standards.headers[' + index + ']'),
          value: headerKeys[index]
        }
      }),
      rows: [...linksURLs.keys()].map((index) => {
        return {
          resource: this.$t('about.standards.links[' + index + '].resource'),
          formats: [...linksURLs[index].formats.keys()].map((index2) => {
            return {
              text: this.$t('about.standards.links[' + index + '].formats[' + index2 + ']'),
              to: linksURLs[index].formats[index2]
            }
          }),
          services: [...linksURLs[index].services.keys()].map((index3) => {
            return {
              text: this.$t('about.standards.links[' + index + '].services[' + index3 + ']'),
              to: linksURLs[index].services[index3]
            }
          }),
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/standards',
      fr: '/normes'
    }
  }
}
</script>
