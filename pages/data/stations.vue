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
    "title": "Station List",
    "blurb": "The WOUDC data archive can be sorted by station. To find out the identifying number of a particular station, select the metadata link on the WOUDC website and then the region that you are interested in. All available stations and their numbers for that region will then be displayed.",
    "instructions-label": "How to Use: Interactive Map",
    "instructions": "Lorem Ipsum something something something"
  },
  "fr": {
    "title": "Liste des stations",
    "blurb": "Les archives de données du WOUDC peuvent être classées par station. Pour connaître le numéro identificateur d’une station, sélectionner le lien des métadonnées sur le site Web du WOUDC, puis la région désirée. Vous pourrez ensuite consulter la liste des stations et leur numéro d’identification.",
    "instructions-label": "Guide d'utilisation : Carte interactive",
    "instructions": "Lorem Ipsum something something something"
  }
}
</i18n>

<script>
export default {
  nuxtI18n: {
    paths: {
      en: '/stations',
      fr: '/stations'
    }
  }
}
</script>
