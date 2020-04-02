<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <woudc-blurb :items="$t('blurb1')" />
    <ol>
      <li v-for="(blurb, i) in $t('steps')" :key="i">
        <woudc-blurb :items="blurb" />
      </li>
    </ol>
    <p>{{ $t('blurb2') }}</p>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Registration",
    "blurb1": [
      "All new data contributors require a WOUDC account. All account applications are subject to review by the WOUDC personnel. WOUDC reserves the right to evaluate all applications for data submission for compliance with the World Meteorological Organization (WMO) Global Atmosphere Watch (GAW) data exchange protocols.",
      { "newlines": 2 },
      "Contributors of new data are asked to follow the steps below for arranging ",
      { "link": { "to": "contributors-submission", "text": "data submissions" } },
      " to WOUDC for ozone and/or ultraviolet radiation data sets:"
    ],
    "steps": [
      [
        "Review the WOUDC ",
        { "link": { "to": "about-datapolicy", "text": "data policy" } },
        ";"
      ],
      [
        "Obtain a GAW ID (required) for each station by registering with ",
        { "link": { "to": "https://gawsis.meteoswiss.ch/", "type": "external", "text": "WMO/GAW" } },
        " (",
        { "link": { "to": "https://www.wmo.int/pages/prog/arep/gaw/gaw_home_en.html", "type": "external", "text": "more about GAW" } },
        ");"
      ],
      [
        "Complete the WOUDC registration process by ",
        { "link": { "to": "contact", "text": "contacting WOUDC" } },
        " with the subject line: ",
        { "bold": "new registration" },
        " and include your new GAW ID; and"
      ],
      "Upon receipt and approval of your registration, the WOUDC will assign an FTP location / account (with a personal username/password) to be used exclusively for data submission."
    ],
    "blurb2": "Thank you for registering with WOUDC."
  },
  "fr": {
    "title": "Inscription",
    "blurb1": [
      "Tous les nouveaux contributeurs aux données doivent posséder un compte WOUDC. Toutes les demandes pour la création de nouveaux comptes devront être vérifiées par le personnel du WOUDC. Le WOUDC se réserve le droit de vérifier toutes les demandes de soumission de données afin de s’assurer qu’elles soient conformes avec les protocoles d’échange de données du programme de Veille de l’atmosphère du globe (VAG) de l’Organisation météorologique mondiale (OMM).",
      { "newlines": 2 },
      "Les contributeurs qui désirent soumettre de nouvelles données doivent suivre les étapes suivantes afin d’organiser ",
      { "link": { "to": "contributors-submission", "text": "les soumissions de données" } },
      " au WOUDC en ensembles de données sur l’ozone ou le rayonnement ultraviolet :"
    ],
    "steps": [
      [
        "Lire la politique du WOUDC ",
        { "link": { "to": "about-datapolicy", "text": "relative aux données" } },
        ";"
      ],
      [
        "Obtenir un identifiant VAG (obligatoire) pour chacune des stations en s’inscrivant avec ",
        { "link": { "to": "https://gawsis.meteoswiss.ch/", "type": "external", "text": "OMM/VAG" } },
        " (",
        { "link": { "to": "https://www.wmo.int/pages/prog/arep/gaw/gaw_home_en.html", "type": "external", "text": "En savoir plus sur la VAG" } },
        ");"
      ],
      [
        "Compléter le processus d'enregistrement de WOUDC en ",
        { "link": { "to": "contact", "text": "contactant WOUDC" } },
        " avec comme titre : ",
        { "bold": "nouvelle inscription" },
        "et inclut votre nouvel identifiant VAG ; et"
      ],
      "Après réception et approbation de votre inscription, le WOUDC attribuera un emplacement FTP / compte FTP (avec un nom d'utilisateur / mot de passe personnel) à utiliser exclusivement pour la soumission des données."
    ],
    "blurb2": "Nous vous remercions de votre inscription au WOUDC."
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
      en: '/registration',
      fr: '/registration-in-fr'
    }
  }
}
</script>
