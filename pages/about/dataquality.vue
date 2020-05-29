<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.quality.title') }}</h1>
    <p>{{ $t('about.quality.blurb') }}</p>
    <h2>{{ $t('gawFull') }}</h2>
    <i18n path="about.quality.gaw-blurb.template" tag="p">
      <template v-slot:gaw-qa>
        <a :href="gawURL" target="_blank">{{ $t('about.quality.gaw-blurb.gaw-qa') }}</a>
      </template>
    </i18n>
    <h2>{{ $t('about.quality.sag.title') }}</h2>
    <i18n path="about.quality.sag.blurb.template" tag="p">
      <template v-slot:sop>
        <nuxt-link :to="localePath('resources-sop')" v-text="$t('about.quality.sag.blurb.sop')" />
      </template>
    </i18n>
    <ul>
      <li v-for="link in sagLinks" :key="link.to">
        <a :href="link.to">{{ link.text }}</a> ({{ link.note }})
      </li>
    </ul>
    <h2>{{ $t('about.quality.eccc.title') }}</h2>
    <p>{{ $t('about.quality.eccc.blurb') }}</p>
    <ul>
      <li>
        <i18n path="about.quality.eccc.item1.template" tag="span">
          <template v-slot:guidelines>
            <nuxt-link :to="localePath('about-formats')" v-text="$t('about.quality.eccc.item1.guidelines')" />
          </template>
        </i18n>
      </li>
      <li>{{ $t('about.quality.eccc.item2') }}</li>
      <li>{{ $t('about.quality.eccc.item3') }}</li>
      <li>{{ $t('about.quality.eccc.item4') }}</li>
      <li>{{ $t('about.quality.eccc.item5') }}</li>
      <li>
        <i18n path="about.quality.eccc.item6.template" tag="span">
          <template v-slot:access>
            <nuxt-link :to="localePath('about-dataaccess')" v-text="$t('about.quality.eccc.item6.access')" />
          </template>
        </i18n>
      </li>
    </ul>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      gawURL: 'https://www.wmo.int/pages/prog/arep/gaw/qassurance.html',
      sagURLs: [
        'https://www.esrl.noaa.gov/gmd/ozwv/dobson/troubleshooting.html',
        'http://exp-studies.tor.ec.gc.ca/e/ozone/ozone.htm',
        'https://www.fz-juelich.de/iek/iek-8/EN/Expertise/Infrastructure/WCCOS/WCCOS_node.html'
      ]
    }
  },
  computed: {
    sagLinks() {
      const definitions = this.$t('about.quality.sag.links')

      return [...definitions.keys()].map((index) => {
        const defn = definitions[index]
        defn.to = this.sagURLs[index]
        return defn
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/data-quality',
      fr: '/a-propos/qualite-donnees'
    }
  }
}
</script>
