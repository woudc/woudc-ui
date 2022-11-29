<template>
  <v-container>
    <h1>{{ $t('resources.working-groups.title') }}</h1>
    <v-row>
      <v-col>
        <ul>
          <li v-for="(value, key) in urls" :key="key">
            <a :href="value" target="_blank">
              <span>
                {{ $t('resources.working-groups.links.' + key) }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
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
      urls: {
        brewer:
          this.$config.WOUDC_UI_WAF_URL + '/Documentation/www/bdms/meetings/',
        dobson: 'http://www.o3soft.eu/dobsonweb/committee.html',
        umkehr:
          this.$config.WOUDC_UI_WAF_URL +
          '/Publications/Meeting_Reports/Umkehr_Sub-Committee/',
      },
    }
  },
  head() {
    return {
      title: this.$t('resources.working-groups.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('resources.working-groups.title'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/resources/working-groups',
      fr: '/ressources/groupes-de-travail',
    },
  },
}
</script>
