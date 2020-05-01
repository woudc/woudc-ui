<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.quality.title') }}</h1>
    <p>{{ $t('about.quality.blurb') }}</p>
    <h2>{{ $t('gawFull') }}</h2>
    <woudc-blurb :items="gawBlurb" />
    <h2>{{ $t('about.quality.sag.title') }}</h2>
    <woudc-blurb :items="sagBlurb" />
    <ul>
      <li v-for="link in sagLinks" :key="link.to">
        <a :href="link.to">
          {{ link.text }}
        </a>
        ({{ link.note }})
      </li>
    </ul>
    <h2>{{ $t('about.quality.eccc.title') }}</h2>
    <p>{{ $t('about.quality.eccc.blurb') }}</p>
    <ul>
      <li v-for="(blurb, i) in ecccItems" :key="i">
        <woudc-blurb :items="blurb" />
      </li>
    </ul>
  </v-layout>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'

const sagURLs = [
  'https://www.esrl.noaa.gov/gmd/ozwv/dobson/troubleshooting.html',
  'http://exp-studies.tor.ec.gc.ca/e/ozone/ozone.htm',
  'https://www.fz-juelich.de/iek/iek-8/EN/Expertise/Infrastructure/WCCOS/WCCOS_node.html'
]

export default {
  components: {
    'woudc-blurb': WoudcBlurb
  },
  data() {
    return {
      gawBlurb: [
        { text: this.$t('about.quality.gaw-blurb[0]') },
        { link: { to: 'https://www.wmo.int/pages/prog/arep/gaw/qassurance.html', type: 'external', text: this.$t('about.quality.gaw-blurb[1]') } },
        { text: this.$t('about.quality.gaw-blurb[2]') }
      ],
      sagBlurb: [
        { text: this.$t('about.quality.sag.blurb[0]') },
        { link: { to: 'resources-sop', text: this.$t('about.quality.sag.blurb[1]') } },
        { text: this.$t('about.quality.sag.blurb[2]') },
        { newlines: 2 },
        { text: this.$t('about.quality.sag.blurb[3]') },
      ],
      sagLinks: [...sagURLs.keys()].map((index) => {
        const definition = this.$t('about.quality.sag.links[' + index + ']')
        definition.to = sagURLs[index]
        return definition
      }),
      ecccItems: [
        [
          { text: this.$t('about.quality.eccc.item1[0]') },
          { link: { to: 'about-formats', text: this.$t('about.quality.eccc.item1[1]') } },
          { text: this.$t('about.quality.eccc.item1[2]') }
        ],
        { text: this.$t('about.quality.eccc.item2[0]') },
        { text: this.$t('about.quality.eccc.item3[0]') },
        { text: this.$t('about.quality.eccc.item4[0]') },
        { text: this.$t('about.quality.eccc.item5[0]') },
        [
          { text: this.$t('about.quality.eccc.item6[0]') },
          { link: { to: 'about-dataaccess', text: this.$t('about.quality.eccc.item6[1]') } },
          { text: this.$t('about.quality.eccc.item6[2]') },
        ]
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data-quality',
      fr: '/qualite-donnees'
    }
  }
}
</script>
