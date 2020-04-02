<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb') }}</p>
    <h2>{{ $t('time_series_title') }}</h2>
    <p v-if="$t('time_series_blurb').length > 0">
      {{ $t('time_series_blurb') }}
    </p>
    <ul>
      <li v-for="(link, i) in $t('time_series_links')" :key="i">
        <nuxt-link :to="localePath(link.to)">
          {{ link.text }}
        </nuxt-link>
      </li>
    </ul>
    <h2>{{ $t('related_title') }}</h2>
    <p v-if="$t('related_blurb') !== EMPTY_CHAR">
      {{ $t('related_blurb') }}
    </p>
    <ul>
      <li v-for="(link, i) in $t('related_links')" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('maps_title') }}</h2>
    <p v-if="$t('maps_blurb') !== EMPTY_CHAR">
      {{ $t('maps_blurb') }}
    </p>
    <ul>
      <li v-for="(link, i) in $t('maps_links')" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('summaries_title') }}</h2>
    <p v-if="$t('summaries_blurb') !== EMPTY_CHAR">
      {{ $t('summaries_blurb') }}
    </p>
    <ul>
      <li v-for="(link, i) in $t('summaries_links')" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Data Products",
    "blurb": "Special output data products are prepared by the WOUDC to assist researchers and provide value added information; some of the data products include total column ozone time series graphs and near real-time ozone maps.",
    "time_series_title": "Time Series Graphs",
    "time_series_blurb": "A variety of plots are available which can be used, for example, to check the data availability.",
    "time_series_links": [
      {
        "text": "Ozonesonde plots",
        "to": "data-products-ozonesonde"
      },
      {
        "text": "Total Ozone plots",
        "to": "data-products-totalozone"
      },
      {
        "text": "UV index plots",
        "to": "data-products-uvindex"
      }
    ],
    "related_title": "Related Ozone Products",
    "related_blurb": "_",
    "related_links": [
      {
        "text": "Total Ozone Summary Data: Daily and Monthly Means",
        "to": "https://woudc.org/archive/Summaries/TotalOzone"
      },
      {
        "text": "Satellite versus Ground-based Total Ozone Comparison Results",
        "to": "https://woudc.org/archive/Projects-Campaigns/Ground-Sat_Plots/"
      },
      {
        "text": "Umkehr Data by Algorithm",
        "to": "https://woudc.org/archive/Summaries/Umkehr"
      },
      {
        "text": "Spectral UV Monthly Summaries and Plots",
        "to": "https://woudc.org/archive/Summaries/Spectral_UV"
      },
      {
        "text": "Zonal Mean Ozone from Ground-Based Instruments",
        "to": "https://woudc.org/archive/Projects-Campaigns/ZonalMeans"
      },
      {
        "text": "Trajectory-mapped Ozonesonde dataset for the Stratosphere and Troposphere (TOST)",
        "to": "https://woudc.org/archive/products/ozone/vertical-ozone-profile/ozonesonde/1.0/tost"
      }
    ],
    "maps_title": "Ozone Maps",
    "maps_blurb": "Near-real time, global total ozone maps, normally updated daily at approximately 1400 UTC.",
    "maps_links": [
      {
        "text": "Most Recent Global Total Ozone Maps",
        "to": "http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap_g.htm"
      },
      {
        "text": "Ozone Maps for the Northern Hemisphere",
        "to": "http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap.htm"
      },
      {
        "text": "Ozone Maps for the Southern Hemisphere",
        "to": "http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap_s.htm"
      },
      {
        "text": "Ozone Map Archive",
        "to": "http://exp-studies.tor.ec.gc.ca/cgi-bin/selectMap"
      },
      {
        "text": "Recent Ozone Maps Individual Data Sources and Ozone Forecast Maps",
        "to": "http://exp-studies.tor.ec.gc.ca/cgi-bin/dailyMaps"
      }
    ],
    "summaries_title": "Data Summaries and Reports",
    "summaries_blurb": "_",
    "summaries_links": [
      {
        "text": "Antarctic and Arctic ozone bulletins - WMO",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/ozone/index.html"
      },
      {
        "text": "GAW Research and Monitoring Reports - WMO",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/gaw-reports.html"
      },
      {
        "text": "Global Ozone Research and Monitoring Project Reports - WMO",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/ozone_reports.html"
      },
      {
        "text": "Ozone Hole Watch - NASA",
        "to": "https://ozonewatch.gsfc.nasa.gov/SH.html"
      },
      {
        "text": "Satellite Measurements from Polar Orbit - FMI",
        "to": "https://sampo.fmi.fi/"
      },
      {
        "text": "Tropospheric Emission Monitoring Internet Service",
        "to": "http://www.temis.nl/index.php"
      }
    ]
  },
  "fr": {
    "title": "Produits de données",
    "blurb": "Des données de sortie spéciales sont préparées par le WOUDC afin d’aider les chercheurs et leur fournir des renseignements à valeur ajoutée ; certaines données comprennent des graphiques de série chronologique détaillant l’épaisseur de la colonne d’ozone total ainsi que des cartes indiquant la quantité d’ozone en temps quasi réel.",
    "time_series_title": "Graphiques de séries chronologiques",
    "time_series_blurb": "Une variété de schémas sont disponibles afin de vérifier la disponibilité des données, par exemple.",
    "time_series_links": [
      {
        "text": "Schémas de sondes pour l’ozone",
        "to": "/data/products/ozonesonde"
      },
      {
        "text": "Schémas d’ozone total",
        "to": "/data/products/totalozone"
      },
      {
        "text": "Schémas d’indice UV",
        "to": "/data/products/uv-index"
      }
    ],
    "related_title": "Produits relatifs à l'ozone",
    "related_blurb": "_",
    "related_links": [
      {
        "text": "Données sommaires de l’ozone total : Moyennes quotidiennes et mensuelles",
        "to": "https://woudc.org/archive/Summaries/TotalOzone"
      },
      {
        "text": "Comparaison des résultats d’ozone total obtenus au sol et par satellite",
        "to": "https://woudc.org/archive/Projects-Campaigns/Ground-Sat_Plots/"
      },
      {
        "text": "Données obtenues par la technique Umkehr par algorithme",
        "to": "https://woudc.org/archive/Summaries/Umkehr"
      },
      {
        "text": "Résumés et schémas des UV spectraux mensuels",
        "to": "https://woudc.org/archive/Summaries/Spectral_UV"
      },
      {
        "text": "Moyenne de l’ozone par zone obtenue par les instruments au sol",
        "to": "https://woudc.org/archive/Projects-Campaigns/ZonalMeans"
      },
      {
        "text": "Ensemble de données cartographié par des Trajectoires provenant des sondages d'Ozone dans la Stratosphère et la Troposphère (TOST)",
        "to": "https://woudc.org/archive/products/ozone/vertical-ozone-profile/ozonesonde/1.0/tost"
      }
    ],
    "maps_title": "Cartes de l’ozone",
    "maps_blurb": "Des cartes de l’ozone total en temps quasi réel, mises à jour quotidiennement à environ 14:00 (UTC).",
    "maps_links": [
      {
        "text": "Cartes globales de l’ozone total les plus récentes",
        "to": "http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap_g.htm"
      },
      {
        "text": "Cartes de l’ozone de l’hémisphère nord",
        "to": "http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap.htm"
      },
      {
        "text": "Cartes de l’ozone de l’hémisphère sud",
        "to": "http://exp-studies.tor.ec.gc.ca/e/ozone/Curr_allmap_s.htm"
      },
      {
        "text": "Archive des cartes d’ozone",
        "to": "http://exp-studies.tor.ec.gc.ca/cgi-bin/selectMap"
      },
      {
        "text": "Sources des données individuelles des cartes de l’ozone récentes et cartes de prévision de l’ozone",
        "to": "http://exp-studies.tor.ec.gc.ca/cgi-bin/dailyMaps"
      }
    ],
    "summaries_title": "Sommaires et rapports des données",
    "summaries_blurb": "_",
    "summaries_links": [
      {
        "text": "Les bulletins sur l'ozone de l'Antarctique et de l'Arctique - OMM",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/ozone/index.html"
      },
      {
        "text": "VAG recherche et rapports de surveillance - OMM",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/gaw-reports.html"
      },
      {
        "text": "Recherche sur l'ozone mondial de surveillance et les rapports de projet - de l'OMM",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/ozone_reports.html"
      },
      {
        "text": "Du trou d'ozone Watch - NASA",
        "to": "https://ozonewatch.gsfc.nasa.gov/SH.html"
      },
      {
        "text": "Mesures de satellite en orbite polaire - FMI",
        "to": "https://sampo.fmi.fi/"
      },
      {
        "text": "Emission troposphérique service surveillance d'Internet",
        "to": "http://www.temis.nl/index.php"
      }
    ]
  }
}
</i18n>

<script>
export default {
  data() {
    return {
      EMPTY_CHAR: '_'
    }
  },
  nuxtI18n: {
    paths: {
      en: '/products',
      fr: '/produits'
    }
  }
}
</script>
