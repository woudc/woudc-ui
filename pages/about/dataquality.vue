<template>
  <v-layout justify-center column align-content-center>
    <h1 v-text="$t('about.quality.title')" />
    <p v-text="$t('about.quality.blurb')" />
    <h2 v-text="$t('gawFull')" />
    <i18n path="about.quality.gaw-blurb.template" tag="p">
      <template v-slot:gaw-qa>
        <a :href="gawURL" target="_blank" v-text="$t('about.quality.gaw-blurb.gaw-qa')" />
      </template>
    </i18n>
    <h2 v-text="$t('about.quality.sag.title')" />
    <i18n path="about.quality.sag.blurb.template" tag="p">
      <template v-slot:sop>
        <nuxt-link :to="localePath('resources-sop')" v-text="$t('about.quality.sag.blurb.sop')" />
      </template>
    </i18n>
    <ul>
      <li v-for="link in sagLinks" :key="link.to">
        <a :href="link.to" v-text="link.text" /> ({{ link.note }})
      </li>
    </ul>
    <h2 v-text="$t('about.quality.eccc.title')" />
    <p v-text="$t('about.quality.eccc.blurb')" />
    <ul>
      <li>
        <i18n path="about.quality.eccc.item1.template" tag="span">
          <template v-slot:guidelines>
            <nuxt-link :to="localePath('about-formats')" v-text="$t('about.quality.eccc.item1.guidelines')" />
          </template>
        </i18n>
      </li>
      <li v-text="$t('about.quality.eccc.item2')" />
      <li v-text="$t('about.quality.eccc.item3')" />
      <li v-text="$t('about.quality.eccc.item4')" />
      <li v-text="$t('about.quality.eccc.item5')" />
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
      fr: '/apropos/qualite-donnees'
    }
  }
}
</script>
