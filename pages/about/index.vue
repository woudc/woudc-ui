<template>
  <v-layout justify-center column align-content-center>
    <h2 v-text="$t('about.home.title')" />
    <i18n class="newlines" path="about.home.blurb.template" tag="p">
      <template v-slot:stations>
        <nuxt-link :to="localePath('data-stations')" v-text="$t('about.home.blurb.stations')" />
      </template>
      <template v-slot:contributors>
        <nuxt-link :to="localePath('contributors')" v-text="$t('about.home.blurb.contributors')" />
      </template>
      <template v-slot:search>
        <nuxt-link :to="localePath('data-explore')" v-text="$t('about.home.blurb.search')" />
      </template>
      <template v-slot:access>
        <nuxt-link :to="localePath('about-dataaccess')" v-text="$t('about.home.blurb.access')" />
      </template>
    </i18n>
    <v-card
      id="history"
      itemprop="hasPart"
      itemscope
      itemtype="http://schema.org/CreativeWork"
    >
      <v-card-title itemprop="name">
        {{ $t('about.home.history.title') }}
      </v-card-title>
      <v-list itemprop="about" itemscope itemtype="http://schema.org/ItemList">
        <v-list-item
          v-for="(event, year, i) in $t('about.home.history.milestones')"
          :key="i"
          itemprop="itemListElement"
        >
          <span>
            <b>{{ year }}</b> : {{ event }}
          </span>
        </v-list-item>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('about.home.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The World Ozone and Ultraviolet Radiation Data Centre (WOUDC) is one of six World Data Centres which are part of the Global Atmosphere Watch programme of the World Meteorological Organization. The WOUDC data centre is operated by the Meteorological Service of Canada, a branch of Environment and Climate Change Canada.'
        }
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos'
    }
  }
}
</script>
