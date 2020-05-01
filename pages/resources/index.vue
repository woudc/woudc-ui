<template>
  <v-layout justify-center column align-content-center>
    <h2>{{ $t('resources.title') }}</h2>
    <ul>
      <li v-for="(link, i) in links" :key="i">
        <a v-if="link.type === 'external'" :href="link.to">
          {{ link.text }}
        </a>
        <nuxt-link v-else :to="localePath(link.to)">
          {{ link.text }}
        </nuxt-link>
      </li>
    </ul>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { to: 'resources-sop', text: this.$t('resources.links[0]') },
        { to: 'resources-workinggroups', text: this.$t('resources.links[1]') },
        { to: 'resources-links', text: this.$t('resources.links[2]') },
        { to: 'https://github.com/woudc/woudc/wiki', type: 'external', text: this.$t('resources.links[3]') }
      ]
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
