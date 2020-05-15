<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('resources.working-groups.title') }}</h1>
    <ul>
      <li v-for="(value, key) in urls" :key="key">
        <a :href="value" target="_blank">
          {{ $t('resources.working-groups.links.' + key) }}
        </a>
      </li>
    </ul>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      urls: {
        brewer: 'https://woudc.org/archive/Documentation/www/bdms/meetings/',
        dobson: 'http://www.o3soft.eu/dobsonweb/committee.html',
        umkehr: 'https://woudc.org/archive/Publications/Meeting_Reports/Umkehr_Sub-Committee/'
      }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/resources/working-groups',
      fr: '/ressources/groupes-travail'
    }
  }
}
</script>
