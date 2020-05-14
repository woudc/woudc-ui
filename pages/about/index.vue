<template>
  <v-layout justify-center column align-content-center>
    <h2>{{ $t('about.home.title') }}</h2>
    <woudc-blurb :items="blurb" />

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
          v-for="(milestone, i) in milestones"
          :key="i"
          itemprop="itemListElement"
        >
          <span>
            <b>{{ milestone.year }}</b>
            : {{ milestone.text }}
          </span>
        </v-list-item>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'

const years = [ 1960, 1964, 1992, 1995, 1996, 2006, 2015 ]

export default {
  components: {
    'woudc-blurb': WoudcBlurb
  },
  data() {
    return {
      blurb: [
        { text: this.$t('about.home.blurb[0]') },
        { newlines: 2 },
        { text: this.$t('about.home.blurb[1]') },
        { newlines: 2 },
        { text: this.$t('about.home.blurb[2]') },
        { link: { to: 'data-stations', text: this.$t('about.home.blurb[3]') } },
        { text: this.$t('about.home.blurb[4]') },
        { link: { to: 'contributors', text: this.$t('about.home.blurb[5]') } },
        { text: this.$t('about.home.blurb[6]') },
        { newlines: 2 },
        { text: this.$t('about.home.blurb[7]') },
        { newlines: 2 },
        { text: this.$t('about.home.blurb[8]') },
        { link: { to: 'data-explore', text: this.$t('about.home.blurb[9]') } },
        { text: this.$t('about.home.blurb[10]') },
        { link: { to: 'about-dataaccess', text: this.$t('about.home.blurb[11]') } },
        { text: this.$t('about.home.blurb[12]') },
      ],
      milestones: [...years.keys()].map((index) => {
        return {
          year: years[index],
          text: this.$t('about.home.history.milestones[' + index + ']')
        }
      })
    }
  },
  head() {
    return {
      title: this.$t('about.home.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'The World Ozone and Ultraviolet Radiation Data Centre (WOUDC) is one of six World Data Centres which are part of the Global Atmosphere Watch programme of the World Meteorological Organization. The WOUDC data centre is operated by the Meteorological Service of Canada, a branch of Environment and Climate Change Canada.'
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
