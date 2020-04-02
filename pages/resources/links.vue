<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <h2>{{ $t('wmo-title') }}</h2>
    <ul>
      <li v-for="(link, i) in $t('wmo-links')" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('other-title') }}</h2>
    <ul>
      <li v-for="(link, i) in $t('other-links')" :key="i">
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
    "title": "Related Data Links",
    "wmo-title": "WMO",
    "wmo-links": [
      {
        "text": "GAW Station Information System (GAWSIS)",
        "to": "https://gawsis.meteoswiss.ch/GAWSIS/"
      },
      {
        "text": "Observing Systems Capability Analysis and Review Tool (OSCAR)",
        "to": "https://www.wmo-sat.info/oscar/"
      },
      {
        "text": "Projects and Campaigns",
        "to": "https://woudc.org/archive/Projects-Campaigns/"
      },
      {
        "text": "World Data Centre for Aerosols",
        "to": "https://www.gaw-wdca.org/"
      },
      {
        "text": "World Data Centre for Greenhouse Gases",
        "to": "https://gaw.kishou.go.jp/"
      },
      {
        "text": "World Data Centre for Precipitation Chemistry",
        "to": "http://wdcpc.org/"
      },
      {
        "text": "World Data Center for Remote Sensing of the Atmosphere",
        "to": "https://wdc.dlr.de/"
      },
      {
        "text": "World Radiation Data Centre",
        "to": ""
      }
    ],
    "other-title": "Other Related Data",
    "other-links": [
      {
        "text": "Aura Validation Data Center (AVDC) - NASA",
        "to": "https://avdc.gsfc.nasa.gov/"
      },
      {
        "text": "Climate Research Data Package (CRDP) - ESA",
        "to": "http://cci.esa.int/ozone/?q=node/160"
      },
      {
        "text": "Earth System Research Laboratory/Global Monitoring Division (ESRL/GMD) - NOAA",
        "to": "https://www.esrl.noaa.gov/gmd/dv/data/"
      },
      {
        "text": "European Brewer Network (EUBREWNET)",
        "to": "http://www.eubrewnet.org/cost1207/"
      },
      {
        "text": "European UV Database (EUVDB)",
        "to": "https://www1.muk.uni-hannover.de/~seckmeyer/EDUCE/"
      },
      {
        "text": "Global OZone Chemistry And Related trace gas Data records for the Stratosphere (GOZCARDS) - NASA",
        "to": "https://gozcards.jpl.nasa.gov/"
      },
      {
        "text": "MOZAIC/IAGOS Database ",
        "to": "http://www.iagos-data.fr/"
      },
      {
        "text": "Network for the Detection of Atmospheric Composition Change (NDACC) - NOAA",
        "to": "https://www.ndsc.ncep.noaa.gov/data/"
      },
      {
        "text": "NSF Polar Programs UV Monitoring Network",
        "to": "http://uv.biospherical.com/"
      },
      {
        "text": "Polar/UVI Data Archives - NASA",
        "to": "https://spacephysics.msfc.nasa.gov/projects/uvi/data_archives.shtml"
      },
      {
        "text": "Southern Hemisphere Additional Ozonesondes (SHADOZ) - NASA",
        "to": "https://croc.gsfc.nasa.gov/shadoz/"
      }
    ]
  },
  "fr": {
    "title": "Liens de données connexes",
    "wmo-title": "OMM",
    "wmo-links": [
      {
        "text": "Système d'information sur les stations de la VAG (GAWSIS)",
        "to": "https://gawsis.meteoswiss.ch/"
      },
      {
        "text": "L'outil OSCAR",
        "to": "https://www.wmo-sat.info/oscar/"
      },
      {
        "text": "Projets et campagnes",
        "to": "https://woudc.org/archive/Projects-Campaigns"
      },
      {
        "text": "Centre mondial de données relatives aux aérosols",
        "to": "https://www.gaw-wdca.org/"
      },
      {
        "text": "Centre mondial de données relatives aux gaz à effet de serre",
        "to": "https://gaw.kishou.go.jp/"
      },
      {
        "text": "Centre mondial de données relatives à la composition chimique des précipitations",
        "to": "http://wdcpc.org/"
      },
      {
        "text": "Centre mondial de données relatives à la télédétection de l’atmosphère",
        "to": "https://wdc.dlr.de/"
      },
      {
        "text": "Centre mondial de données rde radiation",
        "to": "http://wrdc.mgo.rssi.ru/"
      }
    ],
    "other-title": "Autres données connexes",
    "other-links": [
       {
        "text": "Centre pour la validation de données du satellite Aura (AVDC) - NASA",
        "to": "https://avdc.gsfc.nasa.gov/"
      },
      {
        "text": "Climat package de recherche de données (CRDP) - ESA",
        "to": "http://www.esa-ozone-cci.org/?q=node/160"
      },
      {
        "text": "Laboratoire de recherche sur le système terrestre / division mondiale de surveillance (ESRL / GMD) - NOAA",
        "to": "https://www.esrl.noaa.gov/gmd/dv/data"
      },
      {
        "text": "Réseau européen pour le Brewer (de EUBREWNET)",
        "to": "http://www.eubrewnet.org/cost1207"
      },
      {
        "text": "Base de données UV européenne (EUVDB)",
        "to": "https://www1.muk.uni-hannover.de/~seckmeyer/EDUCE"
      },
      {
        "text": "Chimie de l'ozone mondial et connexes enregistrements de données de traces de gaz pour la stratosphère (GOZCARDS) - NASA",
        "to": "https://gozcards.jpl.nasa.gov/"
      },
      {
        "text": "Base de données MOZAIC / IAGOS ",
        "to": "http://www.iagos-data.fr/"
      },
      {
        "text": "Réseau de détection des changements de composition de l'atmosphère (NDACC) - NOAA",
        "to": "https://www.ndsc.ncep.noaa.gov/data"
      },
      {
        "text": "Réseau de surveillance NSF Polar Programs UV",
        "to": "http://uv.biospherical.com/"
      },
      {
        "text": "Archives Polar / UVI données - NASA",
        "to": "https://spacephysics.msfc.nasa.gov/projects/uvi/data_archives.shtml"
      },
      {
        "text": "Sondes d'ozone additionnelles de l'hémisphère sud (SHADOZ) - NASA",
        "to": "https://croc.gsfc.nasa.gov/shadoz"
      }
    ]
  }
}
</i18n>

<script>
export default {
  nuxtI18n: {
    paths: {
      en: '/links',
      fr: '/links-in-fr'
    }
  }
}
</script>
