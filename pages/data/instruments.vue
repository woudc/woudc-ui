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
    "title": "Instrument List",
    "blurb": "The WOUDC data archive can be sorted by instrument. The instrument list includes the instrument type, name and model.",
    "instructions-label": "How to Use: Interactive Map",
    "instructions": "Lorem Ipsum something something something"
  },
  "fr": {
    "title": "Liste des instruments",
    "blurb": "Les archives de données du WOUDC peuvent être classées par instrument. La liste d’instruments comprend le type d’instrument, le nom et le modèle.",
    "instructions-label": "Guide d'utilisation : Carte interactive",
    "instructions": "Lorem Ipsum something something something"
  }
}
</i18n>

<script>
export default {
  nuxtI18n: {
    paths: {
      en: '/instruments',
      fr: '/instruments'
    }
  }
}
</script>
