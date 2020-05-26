<template>
  <v-layout justify-center column align-content-center>
    <h1 v-text="$t('about.standards.title')" />
    <i18n path="about.standards.blurb1.template" tag="p">
      <template v-slot:interoperability>
        <a :href="interoperabilityURL" target="_blank" v-text="$t('about.standards.blurb1.interoperability')" />
      </template>
      <template v-slot:wis>
        <a :href="wisURL" target="_blank" v-text="$t('about.standards.blurb1.wis')" />
      </template>
    </i18n>
    <v-data-table
      id="standards-table"
      :headers="headers"
      :items="rows"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.formats="props">
        <v-chip v-for="link in props.item.formats" :key="link.to" class="resource" label>
          <a :href="link.to" target="_blank" v-text="link.text" />
        </v-chip>
      </template>
      <template v-slot:item.services="props">
        <v-chip v-for="link in props.item.services" :key="link.to" class="resource" label>
          <a :href="link.to" target="_blank" v-text="link.text" />
        </v-chip>
      </template>
    </v-data-table>
    <i18n path="about.standards.blurb2.template" tag="p">
      <template v-slot:access>
        <nuxt-link :to="localePath('about-dataaccess')" v-text="$t('about.standards.blurb2.access')" />
      </template>
    </i18n>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      interoperabilityURL: 'https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf',
      wisURL: 'https://www.wmo.int/pages/prog/www/WIS/',
      formatURLs: {
        csv: 'https://en.wikipedia.org/wiki/Comma-separated_values',
        geojson: 'https://geojson.org/',
        gml: 'https://www.opengeospatial.org/standards/gml',
        iso: 'https://www.wmo.int/pages/prog/www/metadata/WMO-core-metadata.html',
        wigos: 'https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf'
      },
      serviceURLs: {
        csw: 'https://www.opengeospatial.org/standards/cat',
        opensearch: 'https://github.com/dewitt/opensearch',
        pmh: 'https://www.openarchives.org/pmh/',
        wfs: 'https://www.opengeospatial.org/standards/wfs',
        wms: 'https://www.opengeospatial.org/standards/wms'
      },
      tableRowIdentifiers: [
        {
          formats: [ 'iso' ],
          services: [ 'csw', 'pmh', 'opensearch' ]
        },
        {
          formats: [ 'gml', 'wigos' ],
          services: [ 'wms', 'wfs' ]
        },
        {
          formats: [ 'gml', 'wigos' ],
          services: [ 'wms', 'wfs' ]
        },
        {
          formats: [ 'csv', 'geojson', 'gml', 'wigos' ],
          services: [ 'wms', 'wfs' ]
        }
      ]
    }
  },
  computed: {
    headers() {
      const headerKeys = [ 'resource', 'formats', 'services' ]
      return [...headerKeys.keys()].map((index) => {
        return {
          text: this.$t('about.standards.headers[' + index + ']'),
          value: headerKeys[index]
        }
      })
    },
    rows() {
      return [...this.tableRowIdentifiers.keys()].map((index) => {
        const formatsList = this.tableRowIdentifiers[index].formats.map((format) => {
          return {
            text: this.$t('about.standards.links.formats.' + format),
            to: this.formatURLs[format]
          }
        })
        const servicesList = this.tableRowIdentifiers[index].services.map((service) => {
          return {
            text: this.$t('about.standards.links.services.' + service),
            to: this.serviceURLs[service]
          }
        })

        return {
          resource: this.$t('about.standards.links.resources[' + index + ']'),
          formats: formatsList,
          services: servicesList
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/standards',
      fr: '/a-propos/normes'
    }
  }
}
</script>

<style scoped>
#standards-table .v-chip {
  margin-right: 8px;
  background-color: #e8e8e8;
}

#standards-table .v-chip a {
  text-decoration: none;
}
</style>
