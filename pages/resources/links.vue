<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('resources.related-links.title') }}</h1>
        <h2>{{ $t('common.wmo') }}</h2>
        <ul>
          <li v-for="(value, key) in wmoURLs" :key="key">
            <a :href="value" target="_blank">
              {{ $t('resources.related-links.links.' + key) }}
            </a>
          </li>
        </ul>
        <h2>{{ $t('resources.related-links.other-title') }}</h2>
        <ul>
          <li v-for="(value, key) in relatedURLs" :key="key">
            <a :href="value" target="_blank">
              {{ $t('resources.related-links.links.' + key) }}
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
      wmoURLs: {
        gawsis: 'https://gawsis.meteoswiss.ch/',
        oscar: 'https://www.wmo-sat.info/oscar/',
        projects: process.env.WAF_URL + '/Projects-Campaigns',
        'wdc-aerosol': 'https://www.gaw-wdca.org/',
        'wdc-ghg': 'https://gaw.kishou.go.jp/',
        'wdc-precip': 'http://wdcpc.org/',
        'wdc-sensing': 'https://wdc.dlr.de/',
        wrdc: 'http://wrdc.mgo.rssi.ru/'
      },
      relatedURLs: {
        avdc: 'https://avdc.gsfc.nasa.gov/',
        crdp: 'http://cci.esa.int/ozone',
        esrl: 'https://www.esrl.noaa.gov/gmd/dv/data/',
        eubrewnet: 'http://www.eubrewnet.org/cost1207/',
        euvdb: 'https://www1.muk.uni-hannover.de/~seckmeyer/EDUCE/',
        gozcards: 'https://gozcards.jpl.nasa.gov/',
        mozaic: 'http://www.iagos-data.fr/',
        ndacc: 'http://www.ndacc.org/',
        polar: 'http://uv.biospherical.com/',
        uvi: 'https://spacephysics.msfc.nasa.gov/projects/uvi/data_archives.shtml',
        shadoz: 'https://croc.gsfc.nasa.gov/shadoz/'
      }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/resources/links',
      fr: '/ressources/liens'
    }
  }
}
</script>
