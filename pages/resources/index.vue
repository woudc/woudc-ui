<template>
  <v-layout justify-center column align-content-center>
    <h2>{{ $t('title') }}</h2>
    <ul>
      <li v-for="(link, i) in $t('links')" :key="i">
        <a v-if="link.type === 'external'" :href="link.to">
          {{ link.text }}
        </a>
        <nuxt-link v-else :to="localePath(link.to)">
          {{ link.text }}
        </nuxt-link>
      </li>
    </ul>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Resources",
    "links": [
      { "to": "resources-sop", "text": "Standard Operating Procedures" },
      { "to": "resources-workinggroups", "text": "Working Groups" },
      { "to": "resources-links", "text": "Related Data Links" },
      {
        "to": "https://github.com/woudc/woudc/wiki",
        "type": "external",
        "text": "Software"
      }
    ]
  },
  "fr": {
    "title": "Ressources",
    "links": [
      { "to": "resources-sop", "text": "Procédures d'utilisation normalisées" },
      { "to": "resources-workinggroups", "text": "Groupes de travail" },
      { "to": "resources-links", "text": "Liens de données connexes" },
      {
        "to": "https://github.com/woudc/woudc/wiki",
        "type": "external",
        "text": "Logiciel"
      }
    ]
  }
}
</i18n>

<script>
export default {
  nuxtI18n: {
    paths: {
      en: '/resources',
      fr: '/ressources'
    }
  }
}
</script>
