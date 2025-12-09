<template>
  <v-container>
    <h1>{{ $t('resources.related-links.title') }}</h1>
    <h2>{{ $t('common.wmo') }}</h2>
    <v-row>
      <v-col>
        <ul>
          <li>
            <a href="https://gawsis.meteoswiss.ch/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.gawsis') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="https://www.wmo-sat.info/oscar/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.oscar') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a :href="projectsURL" target="_blank">
              <span>
                {{ $t('resources.related-links.links.projects') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="https://www.gaw-wdca.org/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.wdc-aerosol') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="https://gaw.kishou.go.jp/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.wdc-ghg') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="http://wdcpc.org/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.wdc-precip') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="https://wdc.dlr.de/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.wdc-sensing') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="http://wrdc.mgo.rssi.ru/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.wrdc') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
        </ul>
        <h2>{{ $t('resources.related-links.other-title') }}</h2>
        <ul>
          <li>
            <a href="https://avdc.gsfc.nasa.gov/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.avdc') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="http://cci.esa.int/ozone" target="_blank">
              <span>
                {{ $t('resources.related-links.links.crdp') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="https://www.esrl.noaa.gov/gmd/dv/data/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.esrl') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="http://www.eubrewnet.org/cost1207/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.eubrewnet') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://www1.muk.uni-hannover.de/~seckmeyer/EDUCE/"
              target="_blank"
            >
              <span>
                {{ $t('resources.related-links.links.euvdb') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://www.earthdata.nasa.gov/about/competitive-programs/measures/global-ozone-chemistry-data-records-stratosphere"
              target="_blank"
            >
              <span>
                {{ $t('resources.related-links.links.gozcards') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="http://www.iagos-data.fr/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.mozaic') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="http://www.ndacc.org/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.ndacc') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="http://uv.biospherical.com/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.polar') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://spacephysics.msfc.nasa.gov/projects/uvi/data_archives.shtml"
              target="_blank"
            >
              <span>
                {{ $t('resources.related-links.links.uvi') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
          <li>
            <a href="https://croc.gsfc.nasa.gov/shadoz/" target="_blank">
              <span>
                {{ $t('resources.related-links.links.shadoz') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
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
      projectsURL: this.$config.WOUDC_UI_WAF_URL + '/Projects-Campaigns',
    }
  },
  head() {
    return {
      title: this.$t('resources.links.links'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('resources.links.links'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('resources.links.keywords'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/resources/links',
      fr: '/ressources/liens',
    },
  },
}
</script>
