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
    "dataset": "Total Ozone - Daily Observations",
    "abstract": "A measurement of the total amount of atmospheric ozone in a given column from the surface to the edge of the atmosphere. Ground based instruments such as spectrophotometers and ozonemeters are used to measure results daily.",
    "db-link": "https://geo.woudc.org/def/data/ozone/total-column-ozone/totalozone",
    "keywords": [
      "total",
      "ozone",
      "level 1.0",
      "column",
      "dobson",
      "brewer",
      "saoz",
      "vassey",
      "pion",
      "microtops",
      "spectral",
      "hoelper",
      "filter",
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
    "dataset": "Ozone Total - Observations Quotidiennes",
    "abstract": "Mesure de la quantité totale de l'ozone dans l'atmosphère dans une colonne donnée de la couche la plus basse à la couche la plus haute de l'atmosphère. Des instruments au sol, comme les spectrophotomètres et les ozonomètres, sont utilisés pour mesurer les résultats une fois par jour.",
    "db-link": "https://geo.woudc.org/def/data/ozone/total-column-ozone/totalozone",
    "keywords": [
      "total",
      "ozone",
      "niveau 1.0",
      "colonne",
      "dobson",
      "brewer",
      "saoz"
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
      dataset: 'TotalOzone',
      doi: 'doi:10.14287/10000004',
      temporalRange: ['1924-08-18', null],
      isoCategory: 'climatologyMeteorologyAtmosphere'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/totalozone',
      fr: '/ozonetotal'
    }
  }
}
</script>
