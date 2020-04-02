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
    "dataset": "Broadband",
    "abstract": "Measurements of ultraviolet-A (UV-A), UV-B radiation and erythemally weighted UV radiation. The measurement technique utilizes colored glass optical filters to block the Sun’s visible spectra and a UV sensitive fluorescent phosphor to convert the UV light into visible light, which is then measured by a solid-state photodetector.",
    "db-link": "https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/broadband",
    "keywords": [
      "uv-a",
      "uv-b",
      "uv",
      "radiation",
      "broad-band",
      "level 1.0",
      "yankee",
      "kipp-zonen",
      "uv-biometer",
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
    "dataset": "Large bande",
    "abstract": "Mesures du rayonnement ultraviolet-A (UV-A), du rayonnement ultraviolet-B (UV-B) et du rayonnement des UV érythématogènes. La technique de mesure consiste en une combinaison de filtres optiques de verre de couleur pour bloquer les spectres visibles du soleil et d'une couche de phosphore fluorescent, sensible aux UV, pour convertir les UV-B en lumière visible, puis à mesurer celle-ci au moyen d'un détecteur photo-électrique à semi-conducteurs.",
    "db-link": "https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/broadband",
    "keywords": [
      "uv-a",
      "uv-b",
      "uv",
      "rayonnement",
      "bande large",
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
      dataset: 'Broad-band',
      doi: 'doi:10.14287/10000012',
      temporalRange: ['1988-11-18', null],
      isoCategory: 'climatologyMeteorologyAtmosphere'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/broadband',
      fr: '/bandelarge'
    }
  }
}
</script>
