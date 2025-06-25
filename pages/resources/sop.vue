<template>
  <v-container>
    <h1>{{ $t('resources.procedures.title') }}</h1>
    <p>{{ $t('resources.procedures.blurb') }}</p>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="rows"
          hide-default-footer
          class="elevation-1"
        >
          <template #item.link="link">
            <td>
              <a :href="link.item.to" target="_blank">
                <span>
                  {{ link.item.text }}
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </span>
              </a>
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      linkURLs: {
        brewer: this.$config.WOUDC_UI_WAF_URL + '/Documentation/SOP_Documents',
        dobson:
          'https://library.wmo.int/idurl/4/47538',
        'ozone-quality':
          'https://library.wmo.int/idurl/4/55131',
        'uv-quality':
          'https://library.wmo.int/idurl/4/47579',
        'uv-instruments':
          'https://library.wmo.int/idurl/4/59989',
        'uv-study':
          'https://library.wmo.int/idurl/4/58935',
      },
    }
  },
  head() {
    return {
      title: this.$t('resources.procedures.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('resources.procedures.blurb'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('resources.procedures.keywords'),
        },
      ],
    }
  },
  computed: {
    headers() {
      const headerKeys = ['category', 'link', 'source']

      return headerKeys.map((column) => {
        return {
          align: 'left',
          sortable: false,
          value: column,
          text: this.$t('resources.procedures.headers.' + column),
        }
      })
    },
    rows() {
      const categoryOrder = [
        'brewer',
        'dobson',
        'ozone-quality',
        'uv-quality',
        'uv-instruments',
        'uv-study',
      ]

      return categoryOrder.map((category) => {
        const definition = this.$t('resources.procedures.rows.' + category)
        definition.to = this.linkURLs[category]

        return definition
      })
    },
  },
  nuxtI18n: {
    paths: {
      en: '/resources/standard-operating-procedures',
      fr: "/ressources/procedures-d'utilisation-normalisees",
    },
  },
}
</script>
