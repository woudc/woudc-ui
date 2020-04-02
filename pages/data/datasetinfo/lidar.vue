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
    "dataset": "Lidar",
    "abstract": "Temperature and ozone density data above about 25km is lidar derived. Lidar is a technology that measures distances by laser targeting to create density maps. Temperature and density below 20-25km (maximum sonde height) is that given by the nearest in time Buffalo radiosonde. Between the maximum sonde height up to around 25km the temperature and density is estimated by interpolating between the sonde and lidar values.",
    "db-link": "https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/lidar",
    "keywords": [
      "lidar",
      "lidar (level 1.0)",
      "ozone",
      "atmospheric",
      "level",
      "25km",
      "ozone density",
      "dial",
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
    "dataset": "Lidar",
    "abstract": "Les données sur la température et sur la densité de l'ozone au-dessus de 25 km environ sont dérivées de lidar. La technologie du lidar permet de mesurer les distances en désignant des objectifs par laser et de générer des cartes de densité. La température et la densité sous les 20 à 25 km (altitude maximale que peut atteindre une sonde) correspondent à celles données par la radiosonde de Buffalo la plus près, chronologiquement parlant. Entre l'altitude maximale atteinte par la sonde et une altitude d'environ 25 km, la température et la densité s'obtiennent en interpolant les valeurs de la sonde et du lidar.",
    "db-link": "https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/lidar",
    "keywords": [
      "lidar",
      "lidar (niveau 1.0)",
      "ozone",
      "atmosphérique",
      "niveau",
      "25km",
      "densité de l'ozone"
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
      dataset: 'Lidar',
      doi: 'doi:10.14287/10000007',
      temporalRange: ['1951-10-21', null],
      isoCategory: 'climatologyMeteorologyAtmosphere'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/lidar',
      fr: '/lidar'
    }
  }
}
</script>
