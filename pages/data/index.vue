<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <ul>
      <li v-for="(link, i) in $t('links')" :key="i">
        <nuxt-link :to="localePath(link.to)">
          {{ link.text }}
        </nuxt-link>
      </li>
    </ul>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Data",
    "links": [
      {
        "text": "Data Search / Download",
        "to": "data-explore"
      },
      {
        "text": "Data Products",
        "to": "data-products"
      },
      {
        "text": "Dataset Information",
        "to": "data-datasetinfo"
      },
      {
        "text": "Station List",
        "to": "data-stations"
      },
      {
        "text": "Instrument List",
        "to": "data-instruments"
      }
    ]
  },
  "fr": {
    "title": "Données",
    "links": [
      {
        "text": "Rechercher des données / Télécharger",
        "to": "data-explore"
      },
      {
        "text": "Produits de données",
        "to": "data-products"
      },
      {
        "text": "Information sur les jeux de données",
        "to": "data-datasetinfo"
      },
      {
        "text": "Liste des stations",
        "to": "data-stations"
      },
      {
        "text": "Liste des instruments",
        "to": "data-instruments"
      }
    ]
  }
}
</i18n>
