<template>
  <v-container>
    <h1>{{ $t('resources.procedures.title') }}</h1>
    <p>{{ $t('resources.procedures.blurb') }}</p>
    <v-row>
      <v-col>
        <v-simple-table class="elevation-1">
          <thead>
            <tr>
              <th v-for="header in headers" :key="header.value">
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.category">
              <td>{{ row.category }}</td>
              <td>
                <a :href="row.to" target="_blank">
                  <span>
                    {{ row.text }}
                    <v-icon x-small>mdi-open-in-new</v-icon>
                  </span>
                </a>
              </td>
              <td>{{ row.source }}</td>
            </tr>
          </tbody>
        </v-simple-table>
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
        dobson: 'https://library.wmo.int/idurl/4/47538',
        'ozone-quality': 'https://library.wmo.int/idurl/4/55131',
        'uv-quality': 'https://library.wmo.int/idurl/4/47579',
        'uv-instruments': 'https://library.wmo.int/idurl/4/59989',
        'uv-study': 'https://library.wmo.int/idurl/4/58935',
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
      return [
        {
          align: 'left',
          sortable: false,
          value: 'category',
          text: this.$t('resources.procedures.headers.category'),
        },
        {
          align: 'left',
          sortable: false,
          value: 'link',
          text: this.$t('resources.procedures.headers.link'),
        },
        {
          align: 'left',
          sortable: false,
          value: 'source',
          text: this.$t('resources.procedures.headers.source'),
        },
      ]
    },
    rows() {
      return [
        {
          category: this.$t('resources.procedures.rows.brewer.category'),
          text: this.$t('resources.procedures.rows.brewer.text'),
          to: this.$config.WOUDC_UI_WAF_URL + '/Documentation/SOP_Documents',
          source: this.$t('resources.procedures.rows.brewer.source'),
        },
        {
          category: this.$t('resources.procedures.rows.dobson.category'),
          text: this.$t('resources.procedures.rows.dobson.text'),
          to: 'https://library.wmo.int/idurl/4/47538',
          source: this.$t('resources.procedures.rows.dobson.source'),
        },
        {
          category: this.$t('resources.procedures.rows.ozone-quality.category'),
          text: this.$t('resources.procedures.rows.ozone-quality.text'),
          to: 'https://library.wmo.int/idurl/4/55131',
          source: this.$t('resources.procedures.rows.ozone-quality.source'),
        },
        {
          category: this.$t('resources.procedures.rows.uv-quality.category'),
          text: this.$t('resources.procedures.rows.uv-quality.text'),
          to: 'https://library.wmo.int/idurl/4/47579',
          source: this.$t('resources.procedures.rows.uv-quality.source'),
        },
        {
          category: this.$t(
            'resources.procedures.rows.uv-instruments.category'
          ),
          text: this.$t('resources.procedures.rows.uv-instruments.text'),
          to: 'https://library.wmo.int/idurl/4/59989',
          source: this.$t('resources.procedures.rows.uv-instruments.source'),
        },
        {
          category: this.$t('resources.procedures.rows.uv-study.category'),
          text: this.$t('resources.procedures.rows.uv-study.text'),
          to: 'https://library.wmo.int/idurl/4/58935',
          source: this.$t('resources.procedures.rows.uv-study.source'),
        },
      ]
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
