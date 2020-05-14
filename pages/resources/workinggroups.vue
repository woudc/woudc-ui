<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('resources.working-groups.title') }}</h1>
    <ul>
      <li v-for="(link, i) in links" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </v-layout>
</template>

<script>
const urls = [
  'https://woudc.org/archive/Documentation/www/bdms/meetings/',
  'http://www.o3soft.eu/dobsonweb/committee.html',
  'https://woudc.org/archive/Publications/Meeting_Reports/Umkehr_Sub-Committee/'
]

export default {
  data() {
    return {
      links: [...urls.keys()].map((index) => {
        return {
          text: this.$t('resources.working-groups.links[' + index + ']'),
          to: urls[index]
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/workinggroups',
      fr: '/workinggroups-in-fr'
    }
  }
}
</script>
