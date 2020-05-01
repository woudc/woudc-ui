<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.title') }}</h1>
    <ul>
      <li v-for="(link, i) in links" :key="i">
        <nuxt-link :to="localePath(link.to)">
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
        { to: 'data-explore', text: this.$t('data.links[0]') },
        { to: 'data-products', text: this.$t('data.links[1]') },
        { to: 'data-datasetinfo', text: this.$t('data.links[2]') },
        { to: 'data-stations', text: this.$t('data.links[3]') },
        { to: 'data-instruments', text: this.$t('data.links[4]') }
      ]
    }
  }
}
</script>
