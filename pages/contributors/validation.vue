<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb') }}</p>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Data Validator",
    "blurb": "This process performs syntax and format checks against a file in support of realtime format validation of ozone and ultraviolet radiation data submissions to the Data Centre."
  },
  "fr": {
    "title": "Validateur de données",
    "blurb": "Ce processus effectue des contrôles de syntaxe et de format sur un fichier à l'appui de temps réel le format de validation de l'ozone et le rayonnement ultraviolet soumission des données au centre de données."
  }
}
</i18n>
