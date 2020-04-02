<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb') }}</p>
    <h3>{{ $t('subtitle') }}</h3>
    <ul>
      <li v-for="(value, name) in $t('links')" :key="name">
        {{ name }}
        <ul>
          <li v-for="link in value" :key="link.to">
            <nuxt-link :to="localePath(link.to)">
              {{ link.text }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Dataset Information:",
    "blurb": "The WOUDC data archive can provide high level information about each dataset. Select a dataset of interest to see its ISO discovery metadata and a contextual map of the stations.",
    "subtitle": "Dataset",
    "links": {
      "Total Column Ozone": [
        {
          "text": "Total Ozone - Daily Observations",
          "to": "data-datasetinfo-totalozone"
        },
        {
          "text": "Total Ozone - Hourly Observations",
          "to": "data-datasetinfo-totalozoneobs"
        }
      ],
      "Vertical Ozone Profile": [
        {
          "text": "Lidar",
          "to": "data-datasetinfo-lidar"
        },
        {
          "text": "OzoneSonde",
          "to": "data-datasetinfo-ozonesonde"
        },
        {
          "text": "UmkehrN14 (Level 1.0)",
          "to": "data-datasetinfo-umkehrn14-1"
        },
        {
          "text": "UmkehrN14 (Level 2.0)",
          "to": "data-datasetinfo-umkehrn14-2"
        },
        {
          "text": "RocketSonde",
          "to": "data-datasetinfo-rocketsonde"
        }
      ],
      "UV Irradiance": [
        {
          "text": "Broadband",
          "to": "data-datasetinfo-broadband"
        },
        {
          "text": "Multiband",
          "to": "data-datasetinfo-multiband"
        },
        {
          "text": "Spectral",
          "to": "data-datasetinfo-spectral"
        },
        {
          "text": "UV Index",
          "to": "data-datasetinfo-uvindex"
        }
      ]
    }
  },
  "fr": {
    "title": "Information sur les jeux de données:",
    "blurb": "L'archive de données WOUDC peut fournir des informations de haut niveau sur chaque ensemble de données. Sélectionnez un ensemble de données d'intérêt pour voir ses métadonnées de découverte de l'ISO et une carte contextuelle des stations.",
    "subtitle": "Jeu de données",
    "links": {
      "Colonne d’ozone total": [
        {
          "text": "Ozone total - observations quotidiennes",
          "param": "totalozone"
        },
        {
          "text": "Ozone total - Observations horaires",
          "param": "totalozoneobs"
        }
      ],
      "Courbe de répartition verticale de l’ozone": [
        {
          "text": "Lidar",
          "param": "lidar"
        },
        {
          "text": "Sonde pour l’ozone",
          "param": "ozonesonde"
        },
        {
          "text": "UmkehrN14 (Niveau 1.0)",
          "param": "umkehrn14-1"
        },
        {
          "text": "UmkehrN14 (Niveau 2.0)",
          "param": "umkehrn14-2"
        },
        {
          "text": "RocketSonde",
          "param": "rocketsonde"
        }
      ],
      "Rayonnement UV": [
        {
          "text": "Large bande",
          "param": "broadband"
        },
        {
          "text": "Multibande",
          "param": "multiband"
        },
        {
          "text": "Spectrale",
          "param": "spectral"
        },
        {
          "text": "Indice UV",
          "param": "uv-index-hourly"
        }
      ]
    }
  }
}
</i18n>

<script>
export default {
  methods: {
    constructLink(dataset) {
      const basepath = 'data-datasetinfo'
      return this.localePath(basepath) + '/' + dataset
    }
  },
  nuxtI18n: {
    paths: {
      en: '/datasetinfo',
      fr: '/datasetinfo-in-fr'
    }
  }
}
</script>
