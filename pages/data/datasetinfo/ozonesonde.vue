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
    "dataset": "OzoneSonde",
    "abstract": "Vertically profiled ozone levels in the atmosphere defined by ballone-borne ozone instruments. Ozonesondes are lightweight, ozone-measuring modules suitable for launching on small balloons. These balloons ascend to the stratospheric and lower tropospheric layers of the atmosphere.",
    "db-link": "https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/ozonesonde",
    "keywords": [
      "ozone",
      "ozonesonde",
      "level 1.0",
      "carbon-iodine",
      "indian-sonde",
      "brewer-mast",
      "ecc",
      "regener",
      "undefined-sondes",
      "pion",
      "brewer-gdr",
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
    "dataset": "Sonde pour l'ozone",
    "abstract": "Des instruments emportés par ballon de détection de l'ozone dans l'atmosphère établissent des profils verticaux des niveaux d'ozone. Les sondes pour l'ozone sont des modules légers de mesure de l'ozone capables d'être lancés à l'aide de petits ballons. Ces ballons s'élèvent dans la stratosphère et les couches de la basse troposphère de l'atmosphère.",
    "db-link": "https://geo.woudc.org/def/data/ozone/vertical-ozone-profile/ozonesonde",
    "keywords": [
      "ozone",
      "sonde pour l'ozone",
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
      dataset: 'OzoneSonde',
      doi: 'doi:10.14287/10000008',
      temporalRange: ['1951-10-21', null],
      isoCategory: 'climatologyMeteorologyAtmosphere'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/ozonesonde',
      fr: '/sondelozone'
    }
  }
}
</script>
