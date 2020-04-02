<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <woudc-blurb :items="$t('blurb')" />
    <h2>{{ $t('wmo-title') }}</h2>
    <woudc-blurb :items="$t('wmo-blurb')" />
    <h2>{{ $t('gaw-title') }}</h2>
    <p>{{ $t('gaw-blurb') }}</p>
    <woudc-note :title="$t('gaw-note-title')" :body="$t('gaw-note-body')" />
    <h2>{{ $t('doi-title') }}</h2>
    <woudc-blurb :items="$t('doi-blurb')" />
    <v-card>
      <v-card-title class="card">
        {{ $t('doi-note1-title') }}
      </v-card-title>
      <v-card-text>
        <ul>
          <li v-for="text in $t('doi-note1-items')" :key="text">
            {{ text }}
          </li>
        </ul>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title class="card">
        {{ $t('doi-note2-title') }}
      </v-card-title>
      <v-card-text>
        <ul>
          <li v-for="text in $t('doi-note2-items')" :key="text">
            {{ text }}
          </li>
        </ul>
      </v-card-text>
    </v-card>
    <h2>{{ $t('publishing-title') }}</h2>
    <p>{{ $t('publishing-blurb1') }}</p>
    <v-card>
      <v-card-title class="card">
        {{ $t('publishing-note1-title') }}
      </v-card-title>
      <v-card-text>
        {{ $t('publishing-note1-body') }}
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title class="card">
        {{ $t('publishing-note2-title') }}
      </v-card-title>
      <v-card-text>
        <ol>
          <li v-for="text in $t('publishing-note2-items')" :key="text">
            {{ text }}
          </li>
        </ol>
      </v-card-text>
    </v-card>
    <woudc-blurb :items="$t('publishing-blurb2')" />
    <h2>{{ $t('products-title') }}</h2>
    <p>{{ $t('products-blurb') }}</p>
    <v-card>
      <v-card-title class="card">
        {{ $t('products-note-title') }}
      </v-card-title>
      <v-card-text>
        {{ $t('products-note-body') }}
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<style scoped>
.card {
  background-color: #cef;
  color: steelblue;
}

ol {
  counter-reset: list;
  padding-left: 0;
}

ol > li {
  list-style: none;
}

ol > li:before {
  content: counter(list, lower-alpha) ') ';
  counter-increment: list;
}
</style>

<i18n>
{
  "en": {
    "title": "Data Use Policy",
    "blurb": [
      "Use of the WOUDC data are governed by the ",
      { "link": { "to": "https://www.wmo.int/pages/about/exchangingdata_en.html", "type": "external", "text": "World Meteorological Organization (WMO) data policy" } },
      " and ",
      { "link": { "to": "https://gawsis.meteoswiss.ch/GAWSIS/index.html#/faq", "type": "external", "text": "WMO Global Atmosphere Watch (GAW) data use policy" } },
      "."
    ],
    "wmo-title": "World Meteorological Organization Data Policy",
    "wmo-blurb": [
      "The WMO facilitates the free and unrestricted exchange of data and information, products and services in real or near-real time on matters relating to safety and security of society, economic welfare and the protection of the environment.",
      { "newlines": 2 },
      { "link": { "to": "https://www.wmo.int/pages/about/Resolution40_en.html", "type": "external", "text": "Resolution 40 (Cg-XII)" } },
      " WMO policy and practice for the exchange of meteorological and related data and products including guidelines on the relationships in commercial meteorological activities."
    ],
    "gaw-title": "Global Atmosphere Watch Data Use Policy",
    "gaw-blurb": "Use of data obtained from one of the WMO GAW World Data Centres (WDC) is subject to the following statement endorsed by the WMO Executive Council and the Commission for Atmospheric Sciences (EC/CAS) panel of experts working group on environmental pollution and atmospheric chemistry [WMO, 2001a].:",
    "gaw-note-title": "WMO Policy Statement",
    "gaw-note-body": "For scientific, educational and policy related use, access to these [GAW] data is unlimited and provided without charge. By their use you accept that an offer of co-authorship will be made through personal contact with the data providers or owners whenever substantial use is made of their data. In all cases, an acknowledgment must be made to the data providers or owners and to the data centre when these data are used within a publication.",
    "doi-title": "Digital Object Identifiers (DOI)",
    "doi-blurb": [
      "WOUDC has registered ",
      { "link": { "to": "https://en.wikipedia.org/wiki/Digital_object_identifier", "type": "external", "text": "DOIs" } },
      " for both Ozone and UV data. DOIs are persistent identifiers that allow research data to be accessible and citable. They make research data easier to access, reuse and verify, thereby making it easier to build on previous work, conduct new research and avoid duplicating already existing work."
    ],
    "doi-note1-title": "WOUDC Digital Object Identifiers (first order)",
    "doi-note1-items": [
      "Ozone: doi:10.14287/10000001",
      "UV Radiation: doi:10.14287/10000002"
    ],
    "doi-note2-title": "WOUDC Digital Object Identifiers (datasets)",
    "doi-note2-items": [
      "Total Ozone - Daily Observations: doi:10.14287/10000004",
      "Total Ozone - Hourly Observations: doi:10.14287/10000003",
      "Lidar: doi:10.14287/10000007",
      "OzoneSonde: doi:10.14287/10000008",
      "UmkehrN14 (Level 1.0): doi:10.14287/10000005",
      "UmkehrN14 (Level 2.0): doi:10.14287/10000006",
      "RocketSonde: doi:10.14287/10000009",
      "Broadband: doi:10.14287/10000012",
      "Multiband: doi:10.14287/10000010",
      "Spectral: doi:10.14287/10000011",
      "UV Index: doi:10.14287/10000013"
    ],
    "publishing-title": "Publishing Data",
    "publishing-blurb1": "When publishing data retrieved from the WOUDC you are expected to acknowledge the contributors who author these data as the data source and the WOUDC, using the appropriate citation as per the example provided.",
    "publishing-note1-title": "Example (1): Citation for ozone data originating (contributed) from the Japan Meteorological Agency (JMA) and NASA (NASA-WFF) retrieved from the WOUDC site",
    "publishing-note1-body": "JMA, & NASA-WFF. World Meteorological Organization-Global Atmosphere Watch Program (WMO-GAW)/World Ozone and Ultraviolet Radiation Data Centre (WOUDC) [Data]. Retrieved October 24, 2013, from https://woudc.org. doi:10.14287/10000001",
    "publishing-note2-title": "Example (2): Citation for data originating (contributed) from a large number of organizations retrieved from the WOUDC site",
    "publishing-note2-items": [
      "WMO/GAW Ozone Monitoring Community, World Meteorological Organization-Global Atmosphere Watch Program (WMO-GAW)/World Ozone and Ultraviolet Radiation Data Centre (WOUDC) [Data]. Retrieved October 24, 2013, from https://woudc.org. A list of all contributors is available on the website. doi:10.14287/10000001",
      "WMO/GAW UV Radiation Monitoring Community, World Meteorological Organization-Global Atmosphere Watch Program (WMO-GAW)/World Ozone and Ultraviolet Radiation Data Centre (WOUDC) [Data]. Retrieved October 24, 2013, from https://woudc.org. A list of all contributors is available on the website. doi:10.14287/10000002"
    ],
    "publishing-blurb2": [
      "For a complete list of all contributors refer to the ",
      { "link": { "to": "contributors", "text": "contributor list" } },
      "."
    ],
    "products-title": "Publishing Products",
    "products-blurb": "When publishing products extracted from WOUDC such as graphs, lists, maps or metadata you are expected to acknowledge the WOUDC, as the data and produce source, using the appropriate citation, as per the example provided.",
    "products-note-title": "Example (3): Citation for products originating from the WOUDC site",
    "products-note-body": "Environment and Climate Change Canada, Toronto (n.d.). World Meteorological Organization-Global Atmosphere Watch Program (WMO-GAW)/World Ozone and Ultraviolet Radiation Data Centre (WOUDC). Retrieved October 24, 2013, from https://woudc.org."
  },
  "fr": {
    "title": "Politique d’utilisation des données",
    "blurb": [
      "L’utilisation des données du WOUDC est régie par la ",
      { "link": { "to": "https://www.wmo.int/pages/about/exchangingdata_fr.html", "type": "external", "text": "politique sur les données de L’Organisation météorologique mondiale (OMM)" } },
      " et la ",
      { "link": { "to": "https://gawsis.meteoswiss.ch/GAWSIS/index.html#/faq", "type": "external", "text": "politique d’utilisation des données de la Veille de l’atmosphère du globe (VAG) de l’OMM" } },
      "."
    ],
    "wmo-title": "Politique des données de l’Organisation météorologique mondiale",
    "wmo-blurb": [
      "L’OMM facilite l’échange gratuit et sans restriction, en temps réel ou quasi réel, de données, d’informations, de produits et de services propres à renforcer la sécurité des populations, le bien-être économique et la protection de l’environnement.",
      { "newlines": 2 },
      { "link": { "to": "https://www.wmo.int/pages/about/Resolution40_fr.html", "type": "external", "text": "Résolution 40 (Cg-XII)" } },
      " : Politique et pratique adoptée par l’OMM pour l’échange de données et de produits météorologiques et connexes, y compris ses principes directeurs applicables aux relations entre partenaires en matière de commercialisation des services météorologiques."
    ],
    "gaw-title": "Politique d’utilisation des données de Veille de l’atmosphère du globe",
    "gaw-blurb": "L’utilisation des données obtenues de l’un des Centre mondial de données (CMD) de la VAG de l’OMM est régie par la déclaration suivante, endossée par le Conseil exécutif et la Commission des sciences de l’atmosphère (CE/CSA), un groupe de travail composé d’experts de la pollution environnementale et la chimie atmosphérique [OMM, 2001a].:",
    "gaw-note-title": "Énoncé de politique de l’OMM",
    "gaw-note-body": "Pour l’utilisation à des fins scientifiques, éducatives et stratégiques, l’accès à ces données [de la VAG] doit être illimité et gratuit. En utilisant ces données vous acceptez qu’une offre de collaboration sera envoyée directement aux fournisseurs ou aux propriétaires des données lorsque leurs données sont utilisées de manière significative. Dans tous les cas, une reconnaissance de la propriété des données doit être fournie, pour leurs auteurs et le centre de données dès que ces données sont utilisées dans une publication.",
    "doi-title": "Identificateurs d'objets numériques (DOI)",
    "doi-blurb": [
      "WOUDC a enregistré ",
      { "link": { "to": "https://en.wikipedia.org/wiki/Digital_object_identifier", "type": "external", "text": "DOIs" } },
      " pour les données sur l’ozone et les rayons UV. Les identificateurs d’objets numériques (ION) sont des identificateurs permanents qui rendent les données de recherche accessibles et en permettent la citation. Ils facilitent l’accès aux données de recherche, la réutilisation et la vérification, et ainsi tirer profit du travail déjà réalisé, mener de nouvelles recherches et éviter la duplication du travail déjà fait."
    ],
    "doi-note1-title": "Identificateurs d'objets numériques WOUDC (premier ordre)",
    "doi-note2-items": [
      "Ozone: doi:10.14287/10000001",
      "Rayonnement UV: doi:10.14287/10000002"
    ],
    "doi-note2-title": "Identificateurs d'objets numériques WOUDC (ensembles de données)",
    "doi-note2-items": [
      "Ozone total - observations quotidiennes: doi:10.14287/10000004",
      "Ozone total - Observations horaires: doi:10.14287/10000003",
      "Lidar: doi:10.14287/10000007",
      "Sonde pour l’ozone: doi:10.14287/10000008",
      "UmkehrN14 (Niveau 1.0): doi:10.14287/10000005",
      "UmkehrN14 (Niveau 2.0): doi:10.14287/10000006",
      "RocketSonde: doi:10.14287/10000009",
      "Large bande: doi:10.14287/10000012",
      "Multibande: doi:10.14287/10000010",
      "Spectrale: doi:10.14287/10000011",
      "Indice UV: doi:10.14287/10000013"
    ],
    "publishing-title": "Publication des données",
    "publishing-blurb1": "Lors de la publication de données extraites du WOUDC, vous devezindiquer les contributeurs qui ont fourni les données, ainsi que la source des données et le WOUDC, en utilisant la citation appropriée comme indiqué dans l’exemple suivant.",
    "publishing-note1-title": "Exemple (1) : Citation des données provenant (contribuées par) la Japan Meteorological Agency (JMA) et la NASA (NASA-WFF) et extraites du site du WOUDC",
    "publishing-note1-body": "JMA, & NASA-WFF. Organisation météorologique mondiale-Programme de Veille de l’atmosphère du globe (OMM-VAG)/Centre mondial des données sur l’ozone et le rayonnement ultraviolet (WOUDC) [Données]. Page consultée le 24 octobre 2013 : https://woudc.org. doi:10.14287/10000001",
    "publishing-note2-title": "Exemple (2) : Citation des données provenant (contribuées par) la Japan Meteorological Agency (JMA) et la NASA (NASA-WFF) et extraites du site du WOUDC",
    "publishing-note2-body": "a) Environnement et Changement climatique Canada, Toronto (n.d.). Organisation météorologique mondiale-Programme de Veille de l’atmosphère du globe (OMM-VAG)/Centre mondial des données sur l’ozone et le rayonnement ultraviolet (WOUDC) Page consultée le 24 octobre 2013 : https://woudc.org. doi:10.14287/10000001\nb) Environnement et Changement climatique Canada, Toronto (n.d.). Organisation météorologique mondiale-Programme de Veille de l’atmosphère du globe (OMM-VAG)/Centre mondial des données sur l’ozone et le rayonnement ultraviolet (WOUDC) Page consultée le 24 octobre 2013 : https://woudc.org. doi:10.14287/10000002",
    "publishing-blurb2": [
      "Pour la liste complète de tous les contributeurs, voir la ",
      { "link": { "to": "contributors", "text": "liste des contributeurs" } },
      "."
    ],
    "products-title": "Publication de produits",
    "products-blurb": "Lors de la publication de produits extraites du WOUDC, tels que des graphiques, listes, cartes ou métadonnées, vous devez indiquer que ces produits proviennent du WOUDC, en utilisant la citation appropriée comme indiqué dans l’exemple suivant.",
    "products-note-title": "Exemple (3) : Citation d'un produit provenant du site du WOUDC",
    "products-note-body": "Environnement et Changement climatique Canada, Toronto (n.d.). Organisation météorologique mondiale-Programme de Veille de l’atmosphère du globe (OMM-VAG)/Centre mondial des données sur l’ozone et le rayonnement ultraviolet (WOUDC) Page consultée le 24 octobre 2013 : https://woudc.org."
  }
}
</i18n>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'
import WoudcNote from '~/components/WoudcNote'

export default {
  components: {
    'woudc-blurb': WoudcBlurb,
    'woudc-note': WoudcNote
  },
  nuxtI18n: {
    paths: {
      en: '/data-policy',
      fr: '/politique-donnees'
    }
  }
}
</script>
