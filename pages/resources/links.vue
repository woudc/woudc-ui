<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('resources.related-links.title') }}</h1>
    <h2>{{ $t('wmo') }}</h2>
    <ul>
      <li v-for="(link, i) in wmoLinks" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('resources.related-links.other-title') }}</h2>
    <ul>
      <li v-for="(link, i) in otherLinks" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </v-layout>
</template>

<script>
const otherURLs = [
  'https://avdc.gsfc.nasa.gov/',
  'http://cci.esa.int/ozone/?q=node/160',
  'https://www.esrl.noaa.gov/gmd/dv/data/',
  'http://www.eubrewnet.org/cost1207/',
  'https://www1.muk.uni-hannover.de/~seckmeyer/EDUCE/',
  'https://gozcards.jpl.nasa.gov/',
  'http://www.iagos-data.fr/',
  'https://www.ndsc.ncep.noaa.gov/data/',
  'http://uv.biospherical.com/',
  'https://spacephysics.msfc.nasa.gov/projects/uvi/data_archives.shtml',
  'https://croc.gsfc.nasa.gov/shadoz/'
]

const wmoURLs = [
  'https://gawsis.meteoswiss.ch/',
  'https://www.wmo-sat.info/oscar/',
  'https://woudc.org/archive/Projects-Campaigns',
  'https://www.gaw-wdca.org/',
  'https://gaw.kishou.go.jp/',
  'http://wdcpc.org/',
  'https://wdc.dlr.de/',
  'http://wrdc.mgo.rssi.ru/'
]

export default {
  data() {
    return {
      wmoLinks: [...wmoURLs.keys()].map((index) => {
        return {
          text: this.$t('resources.related-links.wmo-links[' + index + ']'),
          to: wmoURLs[index]
        }
      }),
      otherLinks: [...otherURLs.keys()].map((index) => {
        return {
          text: this.$t('resources.related-links.other-links[' + index + ']'),
          to: otherURLs[index]
        }
      })
    }
  },
  nuxtI18n: {
    paths: {
      en: '/links',
      fr: '/links-in-fr'
    }
  }
}
</script>
