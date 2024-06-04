<template>
  <v-container>
    <h1>{{ $t('data.products.normal-ozone-maps.title') }}</h1>
    <v-btn-toggle v-model="ozoneMapTab" mandatory>
      <v-btn value="global">
        {{ $t('data.products.normal-ozone-maps.global') }}
      </v-btn>
      <v-btn value="northern">
        {{ $t('data.products.normal-ozone-maps.northern') }}
      </v-btn>
      <v-btn value="southern">
        {{ $t('data.products.normal-ozone-maps.southern') }}
      </v-btn>
    </v-btn-toggle>

    <section v-if="ozoneMapTab === 'global'">
      <h2>{{ $t('data.products.normal-ozone-maps.globalDesc') }}</h2>

      <normal-ozone-maps-info class="mt-2 mb-2"></normal-ozone-maps-info>

      <graph-carousel :graphs="normalOzoneMapsGlobal"></graph-carousel>
    </section>

    <section v-if="ozoneMapTab === 'northern'">
      <h2>{{ $t('data.products.normal-ozone-maps.northernDesc') }}</h2>

      <normal-ozone-maps-info class="mt-2 mb-2"></normal-ozone-maps-info>

      <graph-carousel :graphs="normalOzoneMapsNorthern"></graph-carousel>
    </section>

    <section v-if="ozoneMapTab === 'southern'">
      <h2>{{ $t('data.products.normal-ozone-maps.southernDesc') }}</h2>

      <normal-ozone-maps-info class="mt-2 mb-2"></normal-ozone-maps-info>

      <graph-carousel :graphs="normalOzoneMapsSouthern"></graph-carousel>
    </section>
  </v-container>
</template>

<script>
import GraphCarousel from '~/components/GraphCarousel'
import NormalOzoneMapsInfo from '~/components/NormalOzoneMapsInfo'

export default {
  components: {
    'graph-carousel': GraphCarousel,
    'normal-ozone-maps-info': NormalOzoneMapsInfo,
  },
  data() {
    return {
      baseOzoneClimatologyURL: `${this.$config.WOUDC_UI_WAF_URL}/products/ozone_maps/climatology`,
      ozoneMapTab: 'global',
      normalOzoneMapTypes: ['global', 'northern', 'southern'],
      months: [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sept',
        'oct',
        'nov',
        'dec',
      ],
    }
  },
  head() {
    return {
      title: this.$t('data.products.normal-ozone-maps.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.products.normal-ozone-maps.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('data.products.normal-ozone-maps.keywords'),
        },
      ],
    }
  },
  computed: {
    normalOzoneMapsGlobal() {
      const { baseOzoneClimatologyURL } = this
      const ozoneMaps = this.months.map((month, index) => {
        const paddedNumber = (index + 1).toString().padStart(2, '0')
        const caption = this.$t(
          `data.products.normal-ozone-maps.captions.globe.${month}`
        )
        const url = `${baseOzoneClimatologyURL}/gl_cl/to${paddedNumber}.gif`
        return { caption, url }
      })

      return ozoneMaps
    },
    normalOzoneMapsNorthern() {
      const { baseOzoneClimatologyURL } = this
      const ozoneMaps = this.months.map((month, index) => {
        const paddedNumber = (index + 1).toString().padStart(2, '0')
        const caption = this.$t(
          `data.products.normal-ozone-maps.captions.northern.${month}`
        )
        const url = `${baseOzoneClimatologyURL}/nh_cl/to${paddedNumber}.gif`
        return { caption, url }
      })

      return ozoneMaps
    },

    normalOzoneMapsSouthern() {
      const { baseOzoneClimatologyURL } = this
      const ozoneMaps = this.months.map((month, index) => {
        const paddedNumber = (index + 1).toString().padStart(2, '0')
        const caption = this.$t(
          `data.products.normal-ozone-maps.captions.southern.${month}`
        )
        const url = `${baseOzoneClimatologyURL}/sh_cl/to${paddedNumber}.gif`
        return { caption, url }
      })

      return ozoneMaps
    },
  },
  watch: {
    ozoneMapTab(newTab) {
      this.$router.push({
        params: { type: newTab },
      })
    },
    '$route.params.type'() {
      const sanitizedOzoneType = encodeURIComponent(this.$route.params.type)
      if (this.normalOzoneMapTypes.includes(sanitizedOzoneType)) {
        this.ozoneMapTab = sanitizedOzoneType
      }
    },
  },
  created() {
    const sanitizedOzoneType = encodeURIComponent(this.$route.params.type)
    if (this.normalOzoneMapTypes.includes(sanitizedOzoneType)) {
      this.ozoneMapTab = sanitizedOzoneType
      this.$router.push({
        params: { type: this.ozoneMapTab },
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/products/normal-ozone-maps/:type?',
      fr: `/donnees/produits/cartes-normales-de-l'ozone/:type?`,
    },
  },
}
</script>

<style>
.recent {
  max-width: 800px;
}
</style>
