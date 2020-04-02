<template>
  <v-layout justify-center column align-content-center>
    <h2>{{ $t('title') }}</h2>
    <woudc-blurb :items="$t('blurb')" />

    <v-card
      id="history"
      itemprop="hasPart"
      itemscope
      itemtype="http://schema.org/CreativeWork"
    >
      <v-card-title itemprop="name">
        {{ $t('history-title') }}
      </v-card-title>
      <v-list itemprop="about" itemscope itemtype="http://schema.org/ItemList">
        <v-list-item
          v-for="(milestone, i) in $t('history-milestones')"
          :key="i"
          itemprop="itemListElement"
        >
          <span>
            <b>{{ milestone.year }}</b>
            : {{ milestone.text }}
          </span>
        </v-list-item>
      </v-list>
    </v-card>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "About WOUDC",
    "blurb": [
      "The World Ozone and Ultraviolet Radiation Data Centre (WOUDC) is one of six World Data Centres which are part of the Global Atmosphere Watch programme of the World Meteorological Organization. The WOUDC data centre is operated by the Meteorological Service of Canada, a branch of Environment and Climate Change Canada.",
      { "newlines": 2 },
      "Ozone data set categories include total column ozone and vertical profile data from lidar measurements, ozonesonde flights, and the Umkehr technique. Ultraviolet (UV) radiation data set categories include broadband, multiband, and high resolution spectral data types.",
      { "newlines": 2 },
      "There are over 500 registered ",
      { "link": { "to": "data-stations", "text": "stations" } },
      " in the archive from over 150 ",
      { "link": { "to": "contributors", "text": "contributors" } },
      ". Metadata such as station lists with locations, are available from the WOUDC Website.",
      { "newlines": 2 },
      "Value added data products include total ozone time series graphs and near real-time ozone maps.",
      { "newlines": 2 },
      "All WOUDC data are made available by using the ",
      { "link": { "to": "data-explore", "text": "data search / download" } },
      ", or web accessible folder (WAF) access. In addition, the Open Geospatial Consortium web services provide enhanced access to the archive, which provides standards-based-on-demand access to the archive. For more information, please refer to the ",
      { "link": { "to": "about-dataaccess", "text": "data access" } },
      " page."
    ],
    "history-title": "History of the Data Centre",
    "history-milestones": [
      {
        "year": 1960,
        "text": "World Ozone Data Centre (WODC) created"
      },
      {
        "year": 1964,
        "text": "first publication of Ozone Data for the World issued"
      },
      {
        "year": 1992,
        "text": "solar ultraviolet (UV) radiation data is added to the data archives; data centre renamed to World Ozone and Ultraviolet Radiation Data Centre (WOUDC)"
      },
      {
        "year": 1995,
        "text": "initial website and FTP site created"
      },
      {
        "year": 1996,
        "text": "first data CD ROM produced"
      },
      {
        "year": 2006,
        "text": "first data DVD ROM with complete data archive released"
      },
      {
        "year": 2015,
        "text": "website updated, providing modernized mechanisms supporting discovery, visualization, access and management of ozone and UV data"
      }
    ]
  },
  "fr": {
    "title": "Qu’est-ce que le WOUDC",
    "blurb": [
      "Le Centre mondial de données sur l’ozone et le rayonnement ultraviolet (WOUDC) est l’undes six Centres mondiaux de données reconnus qui font partie du programme de Veille de l’atmosphère du globe de l’Organisation météorologique mondiale. Le centre de données du WOUDC est exploité par Service météorologique du Canada, une branche d’Environnement et Changement climatique Canada.",
      { "newlines": 2 },
      "Les catégories d’ensembles de données sur l’ozone comprennent les mesures de la colonne d’ozone total et de la courbe de répartition verticale de l’ozone relevées par des lidar, des sondes pour l’ozone en vol et par la technique Umkehr. Les catégories d’ensemble de données sur le rayonnement ultraviolet (UV) incluent les données de type spectrale, à large bande, multibande et à haute résolution.",
      { "newlines": 2 },
      "Il y a plus de 500 ",
      { "link": { "to": "data-stations", "text": "stations enregistrées" } },
      " dans les archives, provenant de plus de 150 ",
      { "link": { "to": "contributors", "text": "contributeurs" } },
      ". Des métadonnées telles que les listes des stations et leur emplacement sont offertes sur le site Web du WOUDC.",
      { "newlines": 2 },
      "Les données à valeur ajoutée incluent les graphiques représentant la quantité totale d’ozone, classés en ordre chronologique, et les cartes des quantités d’ozone qui en montrent l’évolution en temps quasi réel.",
      { "newlines": 2 },
      "Toutes les données du WOUDC sont fournies en utilisant la ",
      { "link": { "to": "data-explore", "text": "recherche de données / téléchargement" } },
      ", ou pardossier accessible sur le web (WAF). De plus, les services web de l’Open Geospatial Consortium fournissent une accessibilité accrue aux archives ce qui permet un accès sur demande conforme aux normes. Pour obtenir de plus amples renseignements, veuillez vous référer à la ",
      { "link": { "to": "about-dataaccess", "text": "d'accès aux données" } },
      "."
    ],
    "history-title": "Le centre de données - un peu d’histoire",
    "history-milestones": [
      {
        "year": 1960,
        "text": "Le Centre mondial des données sur l’ozone (WODC) a vu le jour"
      },
      {
        "year": 1964,
        "text": "la première publication de données sur l’ozone à l’échelle mondiale du WODC a été émise"
      },
      {
        "year": 1992,
        "text": "les données sur le rayonnement solaire ultraviolet (UV) ont été ajoutées aux archives ; le centre de données a alors été rebaptisé le Centre mondial de données sur l’ozone et le rayonnement ultraviolet (WOUDC)"
      },
      {
        "year": 1995,
        "text": "site initial et le site FTP ont été créé"
      },
      {
        "year": 1996,
        "text": "les premières données du cdrom ont été produites"
      },
      {
        "year": 2006,
        "text": "les premières données du DVD ROM avec l'archive complète sont sorties"
      },
      {
        "year": 2015,
        "text": "le site Web du WOUDC, mis à jour, fournit des mécanismes modernisés qui soutiennent la découverte, la visualisation et la gestion des données sur l’ozone et les UV, en plus d’en favoriser l’accessibilité"
      }
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
  data() {
    return {}
  },
  head() {
    return {
      title: this.$t('title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'The World Ozone and Ultraviolet Radiation Data Centre (WOUDC) is one of six World Data Centres which are part of the Global Atmosphere Watch programme of the World Meteorological Organization. The WOUDC data centre is operated by the Meteorological Service of Canada, a branch of Environment and Climate Change Canada.'
        }
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos'
    }
  }
}
</script>
