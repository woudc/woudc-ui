<template>
  <dataset-info
    :dataset="dataset"
    :name="$t('dataset')"
    :abstract="$t('abstract')"
    :url="$t('db-link')"
    :doi="doi"
    :range="temporalRange"
    :iso-topic="isoCategory"
    :keywords="$t('keywords')"
    :links="$t('links')"
  />
</template>

<i18n>
{
  "en": {
    "dataset": "RocketSonde",
    "abstract": [
      "ROCOZ data campaigns designed to survey latitude and seasonal changes in ozone densities in the stratosphere and lower mesosphere. Further information can be found at ",
      { "link": { "to": "https://woudc.org/archive/Archive-NewFormat/RocketSonde_1.0_1/DSS_ROCOZ_Ozonesondes.pdf", "type": "external", "text": "ROCOZ data campaigns designed to survey latitude and seasonal changes in ozone densities in the stratosphere and lower mesosphere. Further information can be found at https://woudc.org/archive/Archive-NewFormat/RocketSonde_1.0_1/DSS_ROCOZ_Ozonesondes.pdf" } }
    ],
    "db-link": "https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/rocketsonde",
    "keywords": [
      "ozone",
      "rocketsonde",
      "Super Loki",
      "arcas",
      "synoptic",
      "level 1.0",
      "rocoz",
      "atmosphericComposition",
      "pollution",
      "observationPlatform",
      "rocketSounding"
    ],
    "links": [
      {
        "text": "Web Accessible Folder (WAF)",
        "type": "external",
        "to": "https://woudc.org/archive/Archive-NewFormat/"
      },
      {
        "text": "OGC Web Map Service (WMS)",
        "type": "external",
        "to": "https://geo.woudc.org/ows"
      },
      {
        "text": "OGC Web Feature Service (WFS)",
        "type": "external",
        "to": "https://geo.woudc.org/ows"
      },
      {
        "text": "Data Search / Download User Interface",
        "to": "data-explore"
      }
    ]
  },
  "fr": {
    "dataset": "Sonde pour la fusée",
    "abstract": [
      "campagnes de données ROCOZ conçus pour étudier la latitude et les changements saisonniers dans les densités d'ozone dans la stratosphère et la mésosphère inférieure. Plus d'informations peuvent être trouvées à ",
      { "link": { "to": "https://woudc.org/archive/Archive-NewFormat/RocketSonde_1.0_1/DSS_ROCOZ_Ozonesondes.pdf", "type": "external", "text": "https://woudc.org/archive/Archive-NewFormat/RocketSonde_1.0_1/DSS_ROCOZ_Ozonesondes.pdf" } }
    ],
    "db-link": "https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/rocketsonde",
    "keywords": [
      "ozone",
      "sonde pour la fusée",
      "Super Loki",
      "arcas",
      "synoptique",
      "niveau 1.0"
    ],
    "links": [
      {
        "text": "Dossier accessible sur le web (WAF)",
        "type": "external",
        "to": "https://woudc.org/archive/Archive-NewFormat/"
      },
      {
        "text": "OGC Web Map Service (WMS)",
        "type": "external",
        "to": "https://geo.woudc.org/ows"
      },
      {
        "text": "OGC Web Feature Service (WFS)",
        "type": "external",
        "to": "https://geo.woudc.org/ows"
      },
      {
        "text": "Interface de recherche et téléchargement de données",
        "to": "data-explore"
      }
    ]
  }
}
</i18n>

<script>
import DatasetInfo from '~/components/DatasetInfo'

export default {
  components: {
    'dataset-info': DatasetInfo
  },
  data() {
    return {
      dataset: 'RocketSonde',
      doi: 'doi:10.14287/10000009',
      temporalRange: ['1951-10-21', null],
      isoCategory: 'climatologyMeteorologyAtmosphere'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/rocketsonde',
      fr: '/sondefusee'
    }
  }
}
</script>
