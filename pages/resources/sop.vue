<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('resources.procedures.title') }}</h1>
    <p>{{ $t('resources.procedures.blurb') }}</p>
    <v-data-table
      :headers="headers"
      :items="rows"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.link="link">
        <td>
          <a :href="link.item.to">
            {{ link.item.text }}
          </a>
        </td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
const headerKeys = [ 'category', 'link', 'source' ]

const linkURLs = [
  'https://woudc.org/archive/Documentation/SOP_Documents',
  'https://www.wmo.int/pages/prog/arep/gaw/documents/GAW183-Dobson-WEB.pdf',
  'https://www.wmo.int/pages/prog/arep/gaw/documents/GAW_201.pdf',
  'https://www.wmo.int/pages/prog/arep/gaw/documents/Final_GAW198_18_June.pdf',
  'https://www.wmo.int/pages/prog/arep/gaw/documents/GAW191_TD_No_1538_web.pdf',
  'https://www.wmo.int/pages/prog/arep/gaw/documents/GAW190_TD_No_1537_web.pdf'
]

export default {
  data() {
    return {
      headers: [...headerKeys.keys()].map((index) => {
        return {
          text: this.$t('resources.procedures.headers[' + index + ']'),
          align: 'left',
          sortable: false,
          value: headerKeys[index]
        }
      }),
      rows: [...linkURLs.keys()].map((index) => {
        const definition = this.$t('resources.procedures.rows[' + index + ']')
        definition.to = linkURLs[index]

        return definition
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/sop',
      fr: '/sop-in-fr'
    }
  }
}
</script>
