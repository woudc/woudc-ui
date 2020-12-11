<template>
  <v-container>
    <h1>{{ $t('resources.working-groups.title') }}</h1>
    <v-row>
      <v-col>
        <ul>
          <li v-for="(value, key) in urls" :key="key">
            <a :href="value" target="_blank">
              {{ $t('resources.working-groups.links.' + key) }}
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
        brewer: process.env.WAF_URL + '/Documentation/www/bdms/meetings/',
        dobson: 'http://www.o3soft.eu/dobsonweb/committee.html',
        umkehr: process.env.WAF_URL + '/Publications/Meeting_Reports/Umkehr_Sub-Committee/'
      }
    }
  }
}
</script>
