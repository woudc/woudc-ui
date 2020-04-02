<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb') }}</p>
    <div v-for="(question, i) in $t('questions')" :key="i">
      <h4>{{ question.text }}</h4>
      <woudc-blurb :items="question.answer" />
    </div>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Frequently Asked Questions",
    "blurb": "Here are the answers to some of the most frequently asked questions about our data centre.",
    "questions": [
      {
        "text": "Who can access the WOUDC data?",
        "answer": [
          "The WOUDC is a public website in support of the WMO Global Atmospheric Watch (GAW) programme. WOUDC data is made publically available on behalf of data contributors. For information on data access and usage, please refer to the ",
          { "link": { "to": "about-datapolicy", "text": "data policy page" } },
          "."
        ]
      },
      {
        "text": "How do I submit data?",
        "answer": [
          "Registered contributors can submit data to the WOUDC via FTP. Visit the ",
          { "link": { "to": "contributors-submission", "text": "data submission" } },
          " page for all of the details. All new data contributors require a WOUDC account. To become a contributor, please visit the ",
          { "link": { "to": "contributors-registration", "text": "registration page" } },
          "."
        ]
      },
      {
        "text": "How do I access the WOUDC data archive?",
        "answer": [
          "Registered contributors can access the WOUDC data archive using the WOUDC website, geospatial tools or custom solutions. Visit the ",
          { "link": { "to": "about-dataaccess", "text": "data access" } },
          " page for all the details."
        ]
      },
      {
        "text": "What data can I find in WOUDC?",
        "answer": [
          "The WOUDC currently manages and provides Ozone and Ultra Violet Radiation data. Please refer to ",
          { "link": { "to": "data-explore", "text": "data search / download" } },
          " to see all WOUDC datasets. Other products such as maps, graphs and reports are also available on the ",
          { "link": { "to": "data-products", "text": "data products" } },
          " page."
        ]
      },
      {
        "text": "Where does WOUDC get its data from?",
        "answer": [
          "WOUDC data comes from worldwide contributors consisting of institutions, agencies and organizations. Contributors submit their data to WOUDC, where the data are then archived and made available. Please refer to ",
          { "link": { "to": "contributors", "text": "contributor list" } },
          "."
        ]
      },
      {
        "text": "How frequently is data updated?",
        "answer": "Data is typically updated and made available to users within five business day of receipt by WOUDC. Extended CSV (extCSV) data are processed and made available in near real time."
      },
      {
        "text": "Who is responsible for keeping WOUDC information up-to-date?",
        "answer": "WOUDC uses information provided by contributors who submit data. The WOUDC is responsible for ensuring that the most recent information provided by the contributors is available to all users."
      },
      {
        "text": "Can I use my application to automatically retrieve data from WOUDC and also to upload data to WOUDC?",
        "answer": [
          "Yes. The WOUDC provides raw data through a web accessible folder (WAF) as well as Open Geospatial Consortium web services such as Web Map Service and Web Feature Service, providing dynamic, real-time access of the WOUDC data in numerous formats and encodings. For more information, please refer to the ",
          { "link": { "to": "about-dataaccess", "text": "data access" } },
          " page."
        ]
      },
      {
        "text": "Can I use my handheld device to access WOUDC?",
        "answer": [
          "Yes. The WOUDC web application has been developed using Government of Canada directives on ",
          { "link": { "to": "https://www.tbs-sct.gc.ca/ws-nw/wa-aw/index-eng.asp", "type": "external", "text": "accessibility" } },
          " and ",
          { "link": { "to": "https://www.tbs-sct.gc.ca/ws-nw/wu-fe/index-eng.asp", "type": "external", "text": "usability" } },
          ", which align with ",
          { "italic": { "link": { "to": "https://www.w3.org/WAI/intro/wcag", "type": "external", "text": "W3C Web Content Accessibility Guidelines" } } },
          "."
        ]
      }
    ]
  },
  "fr": {
    "title": "Foire aux questions",
    "blurb": "Voici les réponses aux questions les plus fréquemment poséesà propos de notre centre de données.",
    "questions": [
      {
        "text": "Qui peut consulter les données du WOUDC ?",
        "answer": [
          "Le WOUDC est un site Web public qui appuie le programme de Veille de l’atmosphère globale (VAG) de l’OMM. Les données du WOUDC sont rendues publiques au nom de leurs contributeurs. Pour plus d’information à propos des données, de leur accessibilité et leur utilisation, voir la ",
          { "link": { "to": "about-datapolicy", "text": "politique sur les données" } },
          "."
        ]
      },
      {
        "text": "Comment puis-je soumettre des données ?",
        "answer": [
          "Les contributeurs inscrits peuvent soumettre des données au WOUDC par FTP. Rendez-vous à la page de ",
          { "link": { "to": "contributors-submission", "text": "soumission des données" } },
          " pour tous les détails. Créer de nouvelles données requiert un compte d’utilisateur du WOUDC. Pour devenir contributeur, visitez la page ",
          { "link": { "to": "contributors-registration", "text": "d’inscription" } },
          "."
        ]
      },
      {
        "text": "Comment puis-je accéder aux données du WOUDC ?",
        "answer": [
          "Les contributeurs enregistrés peuvent accéder aux données du WOUDC par l’entremise du site web du WOUDC, d’outils de renseignement géospatial ou d’autres solutions. Visitez la page d’",
          { "link": { "to": "about-dataaccess", "text": "accès aux données" } },
          " pourtous les détails."
        ]
      },
      {
        "text": "Quel genre de données trouverais-je dans le WOUDC ?",
        "answer": [
          "Le WOUDC gère et conserve des données sur l’ozone etle rayonnement UV. Veuillez vous référer au ",
          { "link": { "to": "data-explore", "text": "recherche de données / téléchargement" } },
          " pour consulter la listedes ensembles de données du WOUDC. D’autres produits, comme des cartes, des graphiques et des rapports, sont également disponibles sur la page de ",
          { "link": { "to": "data-products", "text": "données" } },
          "."
        ]
      },
      {
        "text": "D’où viennent les données du WOUDC ?",
        "answer": [
          "Les données du WOUDC sont recueillies et partagées par des contributeurs de partout dans le monde, soit des établissements, des agences et des organisations. Les contributeurs soumettent leurs données au WOUDC, qui conserve les données et les rend disponibles sur son site web. Voir la ",
          { "link": { "to": "contributors", "text": "liste des contributeurs" } },
          "."
        ]
      },
      {
        "text": "À quelle fréquence les données sont-elles mises à jour ?",
        "answer": "Les données sont normalement mises à jour et disponibles pour la consultation cinq jours ouvrables après leur réception par le WOUDC. Les données en format CSV étendu (extCSV) sont traitées et mises en ligne presque immédiatement."
      },
      {
        "text": "Qui est responsable de la mise à jour des données du WOUDC ?",
        "answer": "Le WOUDC utilise les informations que lui soumettent des contributeurs. Les WOUDC s’assure que les informations les plus récentes envoyées par le contributeur sont disponibles pour tous les utilisateurs."
      },
      {
        "text": "Est-ce que je peux me servir de mon application pour consulter des données du WOUDCet envoyer des données au WOUDC ?",
        "answer": [
          "Oui. Le WOUDC permet d’accéder aux données brutes par dossier accessible sur le web (WAF) ou les services Web de l’Open Geospatial Consortium tels que des services de cartographie web et des Service de caractéristiques web, procurant une accessibilité dynamique en temps réel aux données du WOUDC dans une variété de formats et d’encodages. Pour obtenir de plus amples renseignements, veuillez vous référer au d’",
          { "link": { "to": "about-dataaccess", "text": "accès aux données" } },
          "."
        ]
      },
      {
        "text": "Puis-je utiliser mon appareil mobile pour accéder au WOUDC ?",
        "answer": [
          "Oui. L’application web du WOUDC a été mise sur pied à partir des directives du gouvernement du Canada à propos de ",
          { "link": { "to": "https://www.tbs-sct.gc.ca/ws-nw/wa-aw/index-fr.asp", "type": "external", "text": "l’accessibilité" } },
          " et ",
          { "link": { "to": "https://www.tbs-sct.gc.ca/ws-nw/wu-fe/index-fr.asp", "type": "external", "text": "l’utilisation" } },
          ", qui sont alignées avec ",
          { "italic": { "link": { "to": "https://www.w3.org/WAI/intro/wcag", "type": "external", "text": "les directives d’accessibilité du contenu du site web W3C" } } },
          " ."
        ]
      }
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
      en: '/faq',
      fr: '/faq-in-fr'
    }
  }
}
</script>
