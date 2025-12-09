<template>
  <v-container>
    <h1>{{ $t('data.info.title') }}</h1>
    <p>{{ $t('data.info.blurb') }}</p>
    <v-row>
      <v-col>
        <h2>{{ $t('data.info.subtitle') }}</h2>
        <ul>
          <li>
            <span>{{ $t('data.info.sections.totalozone') }}</span>
            <ul>
              <li>
                <nuxt-link
                  :to="localePath('data-dataset_info') + '/totalozone'"
                >
                  {{ $t('data.info.links.totalozone') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="localePath('data-dataset_info') + '/totalozoneobs'"
                >
                  {{ $t('data.info.links.totalozoneobs') }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li>
            <span>{{ $t('data.info.sections.vertical-ozone') }}</span>
            <ul>
              <li>
                <nuxt-link :to="localePath('data-dataset_info') + '/lidar'">
                  {{ $t('data.info.links.lidar') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="localePath('data-dataset_info') + '/ozonesonde'"
                >
                  {{ $t('data.info.links.ozonesonde') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="localePath('data-dataset_info') + '/rocketsonde'"
                >
                  {{ $t('data.info.links.rocketsonde') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="localePath('data-dataset_info') + '/umkehrn14_1'"
                >
                  {{ $t('data.info.links.umkehrn14_1') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="localePath('data-dataset_info') + '/umkehrn14_2'"
                >
                  {{ $t('data.info.links.umkehrn14_2') }}
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li>
            <span>{{ $t('data.info.sections.uv-irradiance') }}</span>
            <ul>
              <li>
                <nuxt-link :to="localePath('data-dataset_info') + '/broadband'">
                  {{ $t('data.info.links.broadband') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('data-dataset_info') + '/multiband'">
                  {{ $t('data.info.links.multiband') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="localePath('data-dataset_info') + '/spectral'">
                  {{ $t('data.info.links.spectral') }}
                </nuxt-link>
              </li>
              <li>
                <nuxt-link
                  :to="localePath('data-dataset_info') + '/uv_index_hourly'"
                >
                  {{ $t('data.info.links.uv_index_hourly') }}
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('data.info.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('data.info.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('data.info.keywords'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data/dataset-information',
      fr: '/donnees/information-sur-les-jeux-de-donnees',
    },
  },
}
</script>
