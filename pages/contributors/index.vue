<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb') }}</p>
    <v-expansion-panels id="instructions">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <b>{{ $t('instructions-label') }}</b>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ $t('instructions') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "List of contributors",
    "blurb": "The contributor list provides the institute or organization name and abbreviation, address, contact information and local file information.",
    "instructions-label": "How to Use: Interactive Map",
    "instructions": "Lorem Ipsum something something something"
  },
  "fr": {
    "title": "Liste des contributeurs",
    "blurb": "La liste des contributeurs contient le nom et l’abréviation de l’institut ou de l’organisation,l’adresse, les coordonnées et l’information sur le fichier local.",
    "instructions-label": "Guide d'utilisation : Carte interactive",
    "instructions": "Lorem Ipsum something something something"
  }
}
</i18n>

<script>
export default {
  nuxtI18n: {
    paths: {
      en: '/contributors',
      fr: '/contributeurs'
    }
  }
}
</script>
