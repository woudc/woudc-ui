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
    "dataset": "UV Index",
    "abstract": "Developed by Canadian scientists in 1992, the ultraviolet index or UV index measures the strength of sunburn-producing ultraviolet radiation at a given location and time. The index values are calculated from measurements made by ground-based spectometers, broad-band filter radiometer and multi-filter radiometer. UV index values can also be retrieved from satellite measurements of atmospheric ozone and cloud cover. The UV index is measured on a linear scale with higher values indicative of greater risk of sunburn on human skin. Mean noontime UV index values in summer range from 1 in the Arctic to about 12 over the subtropical latitudes. It can be as high as 26 over higher elevations in the tropics. Factors affecting the UV index are sun elevation, total amount of ozone in the atmosphere, cloud cover, reflection from snow cover and local pollution. Forecasts of UV index are now routinely made by various meteorological centres, and adopted as a standard indicator of UV radiation by the World Meteorological Organization and the World Health Organization.",
    "db-link": "https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/uv_index_hourly",
    "keywords": [
      "ultraviolet radiation",
      "spectral",
      "broadband",
      "multiband",
      "solar zenith angle",
      "sunburn",
      "kipp-zonen",
      "uv-biometer",
      "optronics",
      "brewer",
      "biospherical",
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
    "dataset": "Indice UV",
    "abstract": "Mis au point par des scientifiques canadiens en 1992, l’indice ultraviolet, ou indice UV, mesure l’intensité du rayonnement ultraviolet pouvant causer des coups de soleil à un endroit précis et à une heure donnée. Les valeurs de l’indice sont calculées d’après les mesures effectuées par des spectromètres au sol, un radiomètre à filtre à bande large et un radiomètre multifiltre. Les valeurs de l’indice UV peuvent également être tirées des mesures satellitaires de l’ozone atmosphérique et de la couverture nuageuse. L’indice UV est mesuré sur une échelle linéaire dont les valeurs les plus élevées indiquent un risque accru de coup de soleil sur la peau humaine. Les valeurs moyennes de l’indice UV à midi, en été, sont comprises entre 1 dans l’Arctique et près de 12 à des latitudes subtropicales. Cet indice peut monter jusqu’à 26 dans des zones de haute altitude sous les tropiques. Les facteurs influant sur l’indice UV sont la hauteur du soleil, la quantité totale d’ozone dans l’atmosphère, la couverture nuageuse, la réflexion produite par la couverture de neige et la pollution locale. Les prévisions de l’indice UV sont maintenant couramment effectuées par les divers centres météorologiques et ont été adoptées comme indicateur standard du rayonnement UV par l’Organisation météorologique mondiale et l’Organisation mondiale de la santé.",
    "db-link": "https://geo.woudc.org/def/data/uv-radiation/uv-irradiance/uv_index_hourly",
    "keywords": [
      "rayonnement ultraviolet",
      "spectral",
      "large bande",
      "multibande",
      "angle zénithal du soleil",
      "coup de soleil"
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
      dataset: 'uv_index_hourly',
      doi: 'doi:10.14287/10000013',
      temporalRange: ['1988-11-18', null],
      isoCategory: 'climatologyMeteorologyAtmosphere'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/uvindex',
      fr: '/indiceuv'
    }
  }
}
</script>
