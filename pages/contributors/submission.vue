<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb1') }}</p>
    <span class="note">
      <p>
        <b>{{ $t('note') }} (1)</b>
        {{ $t('note1') }}
      </p>
    </span>
    <h2>{{ $t('subtitle') }}</h2>
    <ol>
      <li v-for="(blurb, i) in $t('steps')" :key="i">
        <woudc-blurb :items="blurb" />
      </li>
    </ol>
    <span class="note">
      <p>
        <b>{{ $t('note') }} (2)</b>
        {{ $t('note2') }}
      </p>
    </span>
    <woudc-blurb :items="$t('blurb2')" />
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Data Submission",
    "blurb1": "The WOUDC processes data on a daily basis for near real-time data submissions. Registered contributors can submit data to the WOUDC via FTP.",
    "subtitle": "Data Submission Steps",
    "steps": [
      [
        "Data files can be sent individually or packaged into .zip, .tar, or .tar.gz format. See ",
        { "link": { "to": "about-formats", "text": "File Formats" } },
        " for more information"
      ],
      [
        "Using an FTP client, connect to the ",
        { "link": { "to": "ftp://ftp.woudc.org/", "type": "external", "text": "WOUDC FTP server" } }
      ],
      "Log in with your pre-assigned username and password",
      "Each contributor transfers their respective files to their individual folder on the FTP site (files cannot be updated after transfer to WOUDC. To submit updated data files, they must be transferred again, using a different file name)",
      "Log out to end the FTP session"
    ],
    "note": "Note",
    "note1": "files cannot be updated after they are transferred to the WOUDC. To submit updated data files, transfer again using a different file name.",
    "note2": "step details may vary depending on your computer system and FTP software.",
    "blurb2": [
      "It is recommended that data be submitted at least once a month. Please ",
      { "link": { "to": "contact", "text": "contact us" } },
      " for further information"
    ]
  },
  "fr": {
    "title": "Soumission de données",
    "blurb1": "Le WOUDC traite les données de façon quotidienne afin que les soumissions de données soient complétées pratiquement en temps réel. Les contributeurs inscrits peuvent soumettre des données1 au WOUDC via le serveur FTP.",
    "subtitle": "Étapes de soumission des données",
    "steps": [
      [
        "Les fichiers de données peuvent être envoyés individuellement ou compressés en format .zip, .tar ou tar.gz. Consultez ",
        { "link": { "to": "about-formats", "text": "Formats de fichiers" } },
        " pour obtenir de plus amples renseignements"
      ],
      [
        "Vous connecter au serveur FTP du WOUDC ",
        { "link": { "to": "ftp://ftp.woudc.org/", "type": "external", "text": "en utilisant un client FTP" } }
      ],
      "Vous connecter à l’aide du nom d’utilisateur et du mot de passe qui vous a été attribué",
      "Chacun des contributeurs transfère ses fichiers respectifs dans leur dossier individuel sur le serveur FTP (une fois transférés au WOUDC, les fichiers ne peuvent être mis à jour pour soumettre des fichiers mis à jour, il faut les transférer de nouveau en utilisant un nom de fichier différent)",
      "Veuillez vous déconnecter pour mettre fin à la session FTP"
    ],
    "note": "Remarque",
    "note1": "une fois les fichiers transférés au WOUDC, il ne sera plus possible de les mettre à jour. Pour soumettre des fichiers mis à jour, les transférer de nouveau en utilisant un nom de fichier différent.",
    "note2": "les détails de chacune des étapes peuvent varier selon le type d’ordinateur et le serveur FTP.",
    "blurb2": [
      "Il est recommandé de soumettre les données au moins une fois par mois. Veuillez ",
      { "link": { "to": "contact", "text": "communiquer avec nous" } },
      " pour obtenir plus de renseignements"
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
      en: '/submission',
      fr: '/submission-in-fr'
    }
  }
}
</script>
