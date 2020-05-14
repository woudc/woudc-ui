<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('data.info.title') }}</h1>
    <p>{{ $t('data.info.blurb') }}</p>
    <h3>{{ $t('data.info.subtitle') }}</h3>
    <ul>
      <li v-for="(value, name) in links" :key="name">
        {{ $t('data.info.sections.' + name + '.title') }}
        <ul>
          <li v-for="link in value" :key="link.to">
            <nuxt-link :to="localePath(link.to)">
              {{ link.text }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      links: {
        'total-ozone': [
          {
            text: this.$t('data.info.sections.total-ozone.links[0]'),
            to: 'data-datasetinfo-totalozone'
          },
          {
            text: this.$t('data.info.sections.total-ozone.links[1]'),
            to: 'data-datasetinfo-totalozoneobs'
          }
        ],
        'vertical-ozone': [
          {
            text: this.$t('data.info.sections.vertical-ozone.links[0]'),
            to: 'data-datasetinfo-lidar'
          },
          {
            text: this.$t('data.info.sections.vertical-ozone.links[1]'),
            to: 'data-datasetinfo-ozonesonde'
          },
          {
            text: this.$t('data.info.sections.vertical-ozone.links[2]'),
            to: 'data-datasetinfo-umkehrn14-1'
          },
          {
            text: this.$t('data.info.sections.vertical-ozone.links[3]'),
            to: 'data-datasetinfo-umkehrn14-2'
          },
          {
            text: this.$t('data.info.sections.vertical-ozone.links[4]'),
            to: 'data-datasetinfo-rocketsonde'
          }
        ],
        'uv-index': [
          {
            text: this.$t('data.info.sections.uv-irradiance.links[0]'),
            to: 'data-datasetinfo-broadband'
          },
          {
            text: this.$t('data.info.sections.uv-irradiance.links[1]'),
            to: 'data-datasetinfo-multiband'
          },
          {
            text: this.$t('data.info.sections.uv-irradiance.links[2]'),
            to: 'data-datasetinfo-spectral'
          },
          {
            text: this.$t('data.info.sections.uv-irradiance.links[3]'),
            to: 'data-datasetinfo-uvindex'
          }
        ]
      }
    }
  },
  computed: {
    totalOzoneSectionHead() {
      return this.$t('data.info.sections.total-ozone.title')
    },
    verticalOzoneSectionHead() {
      return this.$t('data.info.sections.vertical-ozone.title')
    },
    uvIrradianceSectionHead() {
      return this.$t('data.info.sections.uv-irradiance.title')
    }
  },
  methods: {
    constructLink(dataset) {
      const basepath = 'data-datasetinfo'
      return this.localePath(basepath) + '/' + dataset
    }
  },
  nuxtI18n: {
    paths: {
      en: '/datasetinfo',
      fr: '/datasetinfo-in-fr'
    }
  }
}
</script>
