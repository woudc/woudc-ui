<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>{{ $t('resources.title') }}</h2>
        <ul>
          <li v-for="path in localLinks" :key="path">
            <nuxt-link :to="localePath('resources-' + path)">
              {{ $t('resources.links.' + path) }}
            </nuxt-link>
          </li>
          <li>
            <a :href="softwareURL" target="_blank">
              {{ $t('resources.links.software') }}
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
      localLinks: [ 'sop', 'workinggroups', 'links' ],
      softwareURL: 'https://github.com/woudc/woudc/wiki'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/resources',
      fr: '/ressources'
    }
  }
}
</script>
