<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }} {{ name }}</h1>
    <p>
      <b>{{ $t('title-section-head') }}</b> {{ name }}
    </p>
    <p>
      <b>{{ $t('abstract-section-head') }}</b>
      <woudc-blurb :items="abstract" />
    </p>
    <p>
      <b>{{ $t('uri-section-head') }}</b>
      <a :href="url">{{ url }}</a>
    </p>
    <p>
      <b>{{ $t('doi-section-head') }}</b>
      <a :href="buildDOILink()">{{ doi }}</a>
    </p>
    <p>
      <b>{{ $t('extent-section-head') }}</b> {{ buildTemporalRange() }}
    </p>
    <p>
      <b>{{ $t('iso-topic-section-head') }}</b> {{ isoTopic }}
    </p>
    <div>
      <b>{{ $t('keywords-section-head') }}</b>
      <div v-for="word in keywords" :key="word" class="keyword">
        {{ word }}
      </div>
    </div>
    <b>{{ $t('access-links-section-head') }}</b>
    <ul>
      <li v-for="(link, i) in links" :key="i">
        <woudc-link :link="link" />
      </li>
    </ul>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Dataset Information:",
    "divider": ":",
    "title-section-head": "Title:",
    "abstract-section-head": "Abstract:",
    "uri-section-head": "Dataset URI:",
    "doi-section-head": "DOI:",
    "extent-section-head": "Temporal Extent:",
    "extent-template": "From #start to #end",
    "extent-today": "present",
    "iso-topic-section-head": "ISO Topic Category:",
    "keywords-section-head": "Keywords:",
    "access-links-section-head": "Access Links:",
    "access-links": [
      {
        "text": "Web Accessible Folder (WAF)",
        "to": "https://woudc.org/contact.php"
      },
      {
        "text": "OGC Web Map Service (WMS)",
        "to": "https://geo.woudc.org/ows"
      },
      {
        "text": "OGC Web Feature Service (WFS)",
        "to": "https://geo.woudc.org/ows"
      },
      {
        "text": "Data Search / Download User Interface",
        "to": ""
      }
    ]
  },
  "fr": {
    "title": "Information sur les jeux de données :",
    "title-section-head": "Titre :",
    "abstract-section-head": "Abstract :",
    "uri-section-head": "URI de l'ensemble de données :",
    "doi-section-head": "DOI :",
    "extent-section-head": "Étendue temporelle :",
    "extent-template": "De #start á #end",
    "extent-today": "today in French",
    "iso-topic-section-head": "Catégorie de sujet ISO :",
    "keywords-section-head": "Mots-clés :",
    "access-links-section-head": "Liens d'accès :",
    "access-links": [
      {
        "text": "Web Accessible Folder (WAF)",
        "to": "https://woudc.org/contact.php"
      },
      {
        "text": "OGC Web Map Service (WMS)",
        "to": "https://geo.woudc.org/ows"
      },
      {
        "text": "OGC Web Feature Service (WFS)",
        "to": "https://geo.woudc.org/ows"
      },
      {
        "text": "Data Search / Download User Interface",
        "to": ""
      }
    ]
  }
}
</i18n>

<style scoped>
.keyword {
  display: inline-block;
  border-radius: 5px;
  background-color: skyblue;

  margin-right: 8px;
  margin-bottom: 6px;
  padding: 4px 12px 4px 12px;
}
</style>

<script>
import WoudcLink from '~/components/WoudcLink'
import WoudcBlurb from '~/components/WoudcBlurb'

export default {
  name: 'DatasetInfo',
  components: {
    'woudc-link': WoudcLink,
    'woudc-blurb': WoudcBlurb
  },
  props: {
    dataset: { type: String, required: true },
    name: { type: String, required: true },
    abstract: { type: String, required: true },
    url: { type: String, required: true },
    doi: { type: String, required: true },
    range: { type: Array, required: true },
    isoTopic: { type: String, required: true },
    keywords: { type: Array, required: true },
    links: { type: [Array, Object], required: true }
  },
  methods: {
    buildDOILink() {
      const number = this.doi.split(':')[1]
      const baseurl = 'http://dx.doi.org'
      return baseurl + '/' + number
    },
    buildTemporalRange() {
      const start = this.range[0]
      const end =
        this.range[1] === null ? this.$t('extent-today') : this.range[1]

      return this.$t('extent-template')
        .replace('#start', '' + start)
        .replace('#end', '' + end)
    }
  }
}
</script>
