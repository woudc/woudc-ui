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
    "dataset": "Spectral",
    "abstract": "Similar to broad-band, Spectral measurements involves UV radiation measured with several discrete, pass-band filters with nominal spectral resolution of 2-10nm at FWHM (Full width at half maximum)",
    "db-link": "https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/spectral",
    "keywords": [
      "uv-a",
      "uv-b",
      "uv",
      "radiation",
      "multi-band",
      "level 1.0",
      "fwhm",
      "filter",
      "bentham",
      "optronics",
      "brewer",
      "biospherical",
      "yankee",
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
    "dataset": "Spectrale",
    "abstract": "Tout comme la bande large, les mesures spectrales portent entre autres sur le rayonnement UV mesuré au moyen de plusieurs filtres passe-bande discrets à une résolution spectrale nominale de 2 à 10 nm à LTMH (largeur totale à mi-hauteur).",
    "db-link": "https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/spectral",
    "keywords": [
      "uv-a",
      "uv-b",
      "uv",
      "rayonnement",
      "multibande",
      "niveau 1.0",
      "ltmh",
      "filtre"
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
      dataset: 'Spectral',
      doi: 'doi:10.14287/10000011',
      temporalRange: ['1988-11-18', null],
      isoCategory: 'climatologyMeteorologyAtmosphere'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/spectral',
      fr: '/spectrale'
    }
  }
}
</script>
