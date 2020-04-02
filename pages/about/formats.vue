<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <woudc-blurb :items="$t('blurb')" />
    <woudc-note :body="$t('note')" />
    <h2>{{ $t('contributor-guide') }}</h2>
    <ul>
      <li v-for="(link, i) in $t('contributor-links')" :key="i">
        <a :href="link.url">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('examples-title') }}</h2>
    <p>{{ $t('examples-blurb') }}</p>
    <h2>{{ $t('ozone-title') }}</h2>
    <ul>
      <li v-for="(link, i) in $t('ozone-links')" :key="i">
        <a :href="link.url">
          {{ link.text }}
        </a>
      </li>
    </ul>
    <h2>{{ $t('uv-title') }}</h2>
    <ul>
      <li v-for="(link, i) in $t('uv-links')" :key="i">
        <a :href="link.url">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "File Formats",
    "blurb": [
      "The WOUDC uses ASCII text file format standard for data submissions in an ",
      { "bold": "extended" },
      " (ext) Comma-Separated Value (CSV) format.",
      { "newlines": 2 },
      "The extended CSV (extCSV) is the standard data file format for submission to WOUDC. The ",
      { "bold": "extended" },
      " standard for the CSV syntax rules support the provision of comments and multiple data content within individual files. The extCSV provides a simple text-based format for data providers when submitting data to the WOUDC, as well as one of many ways for users to integrate ozone and ultraviolet (UV) radiation data into their database, spreadsheet and workflow analysis. Please refer to the ",
      { "link": { "to": "about-dataaccess", "text": "data access" } },
      " page for more information on WOUDC data discovery, access and visualization."
    ],
    "note": [
      { "bold": "Note" },
      " The WOUDC does not accept files in binary formats such as MS-Excel or MS-Word."
    ],
    "contributor-guide": "Contributor Guide",
    "contributor-links": [
      {
        "text": "WOUDC Contributor Guide",
        "url": "https://guide.woudc.org/en/"
      }
    ],
    "examples-title": "Examples: extended Comma-Separated Value",
    "examples-blurb": "The following examples of extCSV files are based on the observation category (open files in a text editor):",
    "ozone-title": "Ozone Examples:",
    "ozone-links": [
      {
        "text": "Lidar (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Lidar.csv"
      },
      {
        "text": "OzoneSonde (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Ozonesonde.csv"
      },
      {
        "text": "TotalOzone (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/TotalOzone-Brewer.csv"
      },
      {
        "text": "TotalOzoneObs (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/TotalOzoneObs.csv"
      },
      {
        "text": "UmkehrN14 (Level 1.0) (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Umkehr-N_values-Dobson.csv"
      },
      {
        "text": "UmkehrN14 (Level 2.0) (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Umkehr_UMK92Retrieval-Dobson.csv"
      }
    ],
    "uv-title": "Ultraviolet Radiation Examples:",
    "uv-links": [
      {
        "text": "Broadband (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Broad-band.csv"
      },
      {
        "text": "Multiband (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Multi-band.csv"
      },
      {
        "text": "Spectral (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Spectral.csv"
      }
    ]
  },
  "fr": {
    "title": "Formats de fichier",
    "blurb": [
      "Le WOUDC utilise le format de fichier texte ASCII pour la soumission de données dans un format CSV ",
      { "bold": "étendu" },
      " (ext).",
      { "newlines": 2 },
      "Le format CSV étendu (extCSV) est le format de fichier de données standard pour les soumissions au WOUDC. Le format ",
      { "bold": "étendu" },
      " standard pour les règles de syntaxe du CSV prend en charge la formulation des observations ainsi que de multiple contenus dans des fichiers individuels. Lorsque les fournisseurs désirent soumettre des données au WOUDC, le extCSV leur simplifie la tâche avec un format texte classiqueen plus de leur permettre d’intégrer des données sur l’ozone et le rayonnement ultraviolet (UV) dans leur base de données, leur feuille de calcul et leurs analyses du déroulement du travail. Veuillez consulter la ",
      { "link": { "to": "about-dataaccess", "text": "d'accès aux données" } },
      " pour plus de renseignements au sujet de la découverte, de l’accessibilité et de la visualisation des données du WOUDC."
    ],
    "note": [
      { "bold": "Remarque" },
      " Le WOUDC n’accepte pas les fichiers en format binaire comme les fichiers MS-Excel ou MS-Word, par exemple."
    ],
    "contributor-guide": "Guide du contributeur",
    "contributor-links": [
      {
        "text": "Guide du contributeur WOUDC",
        "url": "https://guide.woudc.org/en/"
      }
    ],
    "example-title": "Exemple: format CSV (extended CSV)",
    "example-blurb": "Les exemples de fichiers extCSV suivants sont fondés sur la catégorie Observations (ouvrir les fichiers dans un éditeur de texte) :",
    "ozone-title": "Exemples portant sur l’ozone :",
    "ozone-links": [
      {
        "text": "Lidar (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Lidar.csv"
      },
      {
        "text": "Sonde pour l’ozone (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Ozonesonde.csv"
      },
      {
        "text": "Quantité totale d’ozone (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/TotalOzone-Brewer.csv"
      },
      {
        "text": "Observations relatives à la quantité totale d’ozone (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/TotalOzoneObs.csv"
      },
      {
        "text": "UmkehrN14 (Niveau 1.0) (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Umkehr-N_values-Dobson.csv"
      },
      {
        "text": "UmkehrN14 (Niveau 2.0) (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Umkehr_UMK92Retrieval-Dobson.csv"
      }
    ],
    "uv-title": "Exemples portant sur le rayonnement ultraviolet :",
    "uv-links": [
      {
        "text": "Large bande (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Broad-band.csv"
      },
      {
        "text": "Multibande (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Multi-band.csv"
      },
      {
        "text": "Spectrale (CSV)",
        "url": "https://woudc.org/archive/Documentation/Examples-extCSV/Spectral.csv"
      }
    ]
  }
}
</i18n>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'
import WoudcNote from '~/components/WoudcNote'

export default {
  components: {
    'woudc-blurb': WoudcBlurb,
    'woudc-note': WoudcNote
  },
  nuxtI18n: {
    paths: {
      en: '/formats',
      fr: '/formats'
    }
  }
}
</script>
