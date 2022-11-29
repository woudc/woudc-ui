<template>
  <v-container>
    <h2>{{ $t('resources.title') }}</h2>
    <v-row>
      <v-col>
        <ul>
          <li v-for="path in localLinks" :key="path">
            <nuxt-link :to="localePath('resources-' + path)">
              <span>{{ $t('resources.links.' + path) }}</span>
            </nuxt-link>
          </li>
          <li>
            <a :href="softwareURL" target="_blank">
              <span>
                {{ $t('resources.links.software') }}
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
      localLinks: ['sop', 'working_groups', 'links'],
      softwareURL: 'https://github.com/woudc/woudc/wiki',
    }
  },
  head() {
    return {
      title: this.$t('resources.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('resources.links.links'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/resources',
      fr: '/ressources',
    },
  },
}
</script>
