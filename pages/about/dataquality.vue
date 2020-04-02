<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb') }}</p>
    <h2>{{ $t('gaw-title') }}</h2>
    <woudc-blurb :items="$t('gaw-blurb')" />
    <h2>{{ $t('sag-title') }}</h2>
    <woudc-blurb :items="$t('sag-blurb')" />
    <ul>
      <li v-for="link in $t('sag-links')" :key="link.to">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('eccc-title') }}</h2>
    <p>{{ $t('eccc-blurb') }}</p>
    <ul>
      <li v-for="(blurb, i) in $t('eccc-items')" :key="i">
        <woudc-blurb :items="blurb" />
      </li>
    </ul>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Data Quality",
    "blurb": "The WOUDC data are subject to the Global Atmosphere Watch quality assurance system and the oversight of the Scientific Advisory Groups on ozone and solar ultraviolet radiation.",
    "gaw-title": "Global Atmosphere Watch",
    "gaw-blurb": [
      "The primary objectives of the ",
      { "link": { "to": "https://www.wmo.int/pages/prog/arep/gaw/qassurance.html", "type": "external", "text": "GAW quality assurance system" } },
      " are to ensure that the data in the World Data Centres are consistent, of known and adequate quality, supported by comprehensive metadata, and sufficiently complete to describe global atmospheric states with respect to spatial and temporal distribution."
    ],
    "sag-title": "Scientific Advisory Groups",
    "sag-blurb": [
      "The SAG on ozone and solar ultraviolet radiation establish data quality objectives and ",
      { "link": { "to": "resources-sop", "text": "standard operating procedures" } },
      " outlining measurement methods and procedures.",
      { "newlines": 2 },
      "The SAG ensure that all data produced by the system conform to international standards, via the following calibration centres:"
    ],
    "sag-links": [
      {
        "text": "WMO GAW World Calibration Centre for Dobson total ozone measurements",
        "to": "https://www.esrl.noaa.gov/gmd/ozwv/dobson/troubleshooting.html",
        "note": "Global Monitoring Division, NOAA"
      },
      {
        "text": "WMO GAW World Calibration Centre for Brewer total ozone measurements",
        "to": "http://exp-studies.tor.ec.gc.ca/e/ozone/ozone.htm",
        "note": "Environment and Climate Change Canada"
      },
      {
        "text": "WMO GAW World Calibration Centre for ozonesonde measurements",
        "to": "https://www.fz-juelich.de/iek/iek-8/EN/Expertise/Infrastructure/WCCOS/WCCOS_node.html",
        "note": "Forschungszentrum Jülich, Germany"
      }
    ],
    "eccc-title": "Environment and Climate Change Canada",
    "eccc-blurb": "The WOUDC is operated by the Department of the Environment (referred to as Environment and Climate Change Canada) and undertakes the following activities:",
    "eccc-items": [
      [
        "Provides ",
        { "link": { "to": "about-formats", "text": "guidelines" } },
        " for submitting data;"
      ],
      "Checks submitted data for necessary format elements and the availability of comprehensive metadata and reject the submission of data that do not meet these formal criteria;",
      "Performs plausibility and consistency checks on submitted data, flag data problems, and provide feedback to the stations, when necessary;",
      "Provides collection of data user feedback;",
      "Shares results of quality assessment and user feedback with data contributors so that data can be corrected or corrective actions can be taken as required; and",
      [
        "Provides ",
        { "link": { "to": "about-dataaccess", "text": "data access" } },
        " mechanisms."
      ]
    ]
  },
  "fr": {
    "title": "Qualité des données",
    "blurb": "Les données du WOUDC sont régies par le système de contrôle de la qualité de l’Organisation météorologique mondiale et sous la surveillance des Groupes consultatifs scientifiques sur l’ozone et le rayonnement UV solaire.",
    "gaw-title": "Veille de l’atmosphère du globe",
    "gaw-blurb": [
      "Le ",
      { "link": { "to": "https://www.wmo.int/pages/prog/arep/gaw/qassurance.html" , "type": "external", "text": "système de contrôle de la qualité de l’OMM" } },
      " sert principalement à s’assurer que les données des Centres mondiaux de données sont pertinentes, de qualité vérifiable et adéquate, appuyées par des métadonnées complètes, et suffisamment complètes pour décrire des états atmosphériques globaux selon la distribution spatiale et temporelle."
    ],
    "sag-title": "Groupes consultatifs scientifiques",
    "sag-blurb": [
      "Le GCS sur l’ozone et le rayonnement UV solaire établit des objectifs de qualité et ",
      { "link": { "to": "resources-sop", "text": "procédures opérationnelles normalisées" } },
      " qui décrivent les méthodes et procédures de mesure.",
      { "newlines": 2 },
      "Le GCS s’assure que toutes les données produites par le système sont conformes aux normes internationales par l’entremise des centres d’étalonnage suivants"
    ],
    "sag-links": [
      {
        "text": "Centre d’étalonnage mondial pour les mesures Dobson d’ozone totale de l’OMM et de la VAG",
        "to": "https://www.esrl.noaa.gov/gmd/ozwv/dobson/troubleshooting.html",
        "note": "Section de la surveillance mondiale, NOAA"
      },
      {
        "text": "Centre d’étalonnage mondial pour les mesures Brewer d’ozone totale de l’OMM et de la VAG",
        "to": "http://exp-studies.tor.ec.gc.ca/e/ozone/ozone.htm",
        "note": "Environnement et Changement climatique Canada"
      },
      {
        "text": "Centre d’étalonnage mondial pour les mesures de sondes pour l’ozone de l’OMM et de la VAG",
        "to": "https://www.fz-juelich.de/iek/iek-8/EN/Expertise/Infrastructure/WCCOS/WCCOS_node.html",
        "note": "Centre de recherche de Jülich, en Allemagne"
      }
    ],
    "eccc-title": "Environnement et Changement climatique Canada",
    "eccc-blurb": "Le WOUDC relève du ministère de l’Environnement (aussi connu sous le nom d’Environnement et Changement climatique Canada) et exécute les activités suivantes :",
    "eccc-items": [
      [
        "Élabore ",
        { "link": { "to": "about-formats", "text": "des directives" } },
        " pour la soumission de données ;"
      ],
      "Vérifie que les données soumises possèdent tous les éléments de format nécessaires, assure la disponibilité de métadonnées complètes et rejette la soumission de données ne répondant pas à ces critères ;",
      "Effectue des contrôles de vraisemblance et de cohérence sur les données soumises, identifie les problèmes avec les données, et fournit une rétroaction lorsque nécessaire ;",
      "Fournit la collection de la rétroaction des utilisateurs de données ;",
      "Partage les résultats de l’évaluation de la qualité et de la rétroaction des utilisateurs avec les contributeurs afin que ceux-ci puissent apporter les mesures correctives lorsque nécessaire ; et",
      [
        "Fournitdes mécanismes ",
        { "link": { "to": "about-dataaccess", "text": "d’accès aux données" } },
        "."
      ]
    ]
  }
}
</i18n>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'

export default {
  components: {
    'woudc-blurb': WoudcBlurb
  },
  nuxtI18n: {
    paths: {
      en: '/data-quality',
      fr: '/qualite-donnees'
    }
  }
}
</script>
