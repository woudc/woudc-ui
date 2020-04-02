<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <ul>
      <li v-for="(link, i) in $t('links')" :key="i">
        <a :href="link.to">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Working Groups",
    "links": [
      {
        "text": "Brewer User Group",
        "to": "https://woudc.org/archive/Documentation/www/bdms/meetings/"
      },
      {
        "text": "Dobson Ad-Hoc Committee",
        "to": "http://www.o3soft.eu/dobsonweb/committee.html"
      },
      {
        "text": "Umkehr Sub-Committee",
        "to": "https://woudc.org/archive/Publications/Meeting_Reports/Umkehr_Sub-Committee/"
      }
    ]
  },
  "fr": {
    "title": "Groupes de travail",
    "links": [
      {
        "text": "Groupe d'utilasateurs pour le Brewer",
        "to": "https://woudc.org/archive/Documentation/www/bdms/meetings/"
      },
      {
        "text": "Comité ad hoc pour le Dobson",
        "to": "http://www.o3soft.eu/dobsonweb/committee.html"
      },
      {
        "text": "Sous-comité pour la méthode d’Umkehr",
        "to": "https://woudc.org/archive/Publications/Meeting_Reports/Umkehr_Sub-Committee/"
      }
    ]
  }
}
</i18n>

<script>
export default {
  nuxtI18n: {
    paths: {
      en: '/workinggroups',
      fr: '/workinggroups-in-fr'
    }
  }
}
</script>
