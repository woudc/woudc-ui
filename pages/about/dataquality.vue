<template>
  <v-container>
    <h1>{{ $t('about.quality.title') }}</h1>
    <p>{{ $t('about.quality.blurb') }}</p>
    <v-row>
      <v-col>
        <h2>{{ $t('common.gawFull') }}</h2>
        <i18n path="about.quality.gaw-blurb" tag="p">
          <template v-slot:gaw-qa>
            <a :href="gawURL" target="_blank">
              {{ $t('about.quality.gaw-qa') }}
            </a>
          </template>
        </i18n>
        <h2>{{ $t('about.quality.sag.title') }}</h2>
        <i18n path="about.quality.sag.blurb.body-intro" tag="p">
          <template v-slot:sop>
            <nuxt-link :to="localePath('resources-sop')">
              {{ $t('common.sop') }}
            </nuxt-link>
          </template>
        </i18n>
        <p>{{ $t('about.quality.sag.blurb.body-standards') }}</p>
        <ul>
          <li v-for="link in sagLinks" :key="link.to">
            <a :href="link.to" target="_blank">
              {{ link.text }}
            </a> ({{ link.note }})
          </li>
        </ul>
        <h2>{{ $t('about.quality.eccc.title') }}</h2>
        <p>{{ $t('about.quality.eccc.blurb') }}</p>
        <ul>
          <li>
            <i18n path="about.quality.eccc.item1" tag="span">
              <template v-slot:guidelines>
                <nuxt-link :to="localePath('about-formats')">
                  {{ $t('common.guidelines') }}
                </nuxt-link>
              </template>
            </i18n>
          </li>
          <li>{{ $t('about.quality.eccc.item2') }}</li>
          <li>{{ $t('about.quality.eccc.item3') }}</li>
          <li>{{ $t('about.quality.eccc.item4') }}</li>
          <li>{{ $t('about.quality.eccc.item5') }}</li>
          <li>
            <i18n path="about.quality.eccc.item6" tag="span">
              <template v-slot:access>
                <nuxt-link :to="localePath('about-dataaccess')">
                  {{ $t('common.access') }}
                </nuxt-link>
              </template>
            </i18n>
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
      gawURL: 'https://community.wmo.int/quality-assurance',
      sagURLs: {
        brewer: 'http://exp-studies.tor.ec.gc.ca/e/ozone/ozone.htm',
        dobson: 'https://www.esrl.noaa.gov/gmd/ozwv/dobson/troubleshooting.html',
        ozonesonde: 'https://www.fz-juelich.de/iek/iek-8/EN/Expertise/Infrastructure/WCCOS/WCCOS_node.html'
      }
    }
  },
  computed: {
    sagLinks() {
      const linkOrder = [ 'dobson', 'brewer', 'ozonesonde' ]

      return linkOrder.map((key) => {
        const defn = this.$t('about.quality.sag.links.' + key)
        defn.to = this.sagURLs[key]
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
