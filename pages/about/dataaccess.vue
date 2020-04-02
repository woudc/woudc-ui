<template>
  <div>
    <h1>{{ $t('title') }}</h1>
    <v-card id="table-of-contents">
      <v-card-title>
        {{ $t('contents-title') }}
      </v-card-title>
      <v-data-table
        :headers="linkHeaders"
        :items="contentsLinks"
        hide-default-header
        hide-default-footer
      >
        <template v-slot:item.link="section">
          <td>
            <woudc-link :link="selfLink(section.item)" />
            <ul v-if="section.item.children !== undefined">
              <li v-for="(link, i) in section.item.children" :key="i">
                <woudc-link :link="selfLink(link)" />
              </li>
            </ul>
          </td>
        </template>
      </v-data-table>
    </v-card>
    <woudc-blurb :items="$t('blurb')" />
    <woudc-note
      :title="$t('note1-title')"
      :body="$t('note1-body')"
      maxwidth="68%"
    />
    <woudc-note
      :title="$t('note2-title')"
      :body="$t('note2-body')"
      maxwidth="68%"
    />
    <div id="data-search-section">
      <h2>{{ $t('search-title') }}</h2>
      <woudc-blurb :items="$t('search-blurb')" />
      <woudc-note :body="$t('search-note-body')" maxwidth="68%" />
    </div>
    <div id="waf-section">
      <h2>{{ $t('waf-title') }}</h2>
      <woudc-blurb :items="$t('waf-blurb')" />
    </div>
    <div id="web-services-section">
      <h2>{{ $t('web-title') }}</h2>
      <woudc-blurb :items="$t('web-blurb')" />
      <woudc-note
        :title="$t('web-table-title')"
        body="That font size is too big. Also the colour is wrong."
      />
      <div id="csw-subsection">
        <h2>{{ '1. ' + $t('csw-title') }}</h2>
        <woudc-blurb :items="$t('csw-blurb')" />
        <woudc-note :title="$t('csw-note-title')" :body="$t('csw-note-body')" />
      </div>
      <div id="wms-subsection">
        <h2>{{ '2. ' + $t('wms-title') }}</h2>
        <woudc-blurb :items="$t('wms-blurb')" />
        <woudc-note :title="$t('wms-note-title')" :body="$t('wms-note-body')" />
      </div>
      <div id="wfs-subsection">
        <h2>{{ '3. ' + $t('wfs-title') }}</h2>
        <woudc-blurb :items="$t('wfs-blurb')" />
        <woudc-note :title="$t('wfs-note-title')" :body="$t('wfs-note-body')" />
      </div>
      <div id="wps-section">
        <h2>{{ '4. ' + $t('wps-title') }}</h2>
        <woudc-blurb :items="$t('wps-blurb')" />
        <woudc-note :title="$t('wps-note-title')" :body="$t('wps-note-body')" />
      </div>
    </div>
    <div id="definitions-service-section">
      <h2>{{ $t('definitions-title') }}</h2>
      <p>{{ $t('definitions-blurb') }}</p>
      <woudc-note
        :title="$t('definitions-note-title')"
        :body="$t('definitions-note-body')"
      />
    </div>
    <div id="iso-catalogue-section">
      <h2>{{ $t('iso-title') }}</h2>
      <p>{{ $t('iso-blurb1') }}</p>
      <woudc-note :title="$t('iso-note-title')" :body="$t('iso-note-body')" />
    </div>
    <div id="examples-section">
      <woudc-blurb :items="$t('iso-blurb2')" />
      <h2>{{ $t('examples-title') }}</h2>
      <woudc-blurb :items="$t('examples-blurb')" />
      <v-data-table
        :headers="linkHeaders"
        :items="examplesLinks"
        hide-default-header
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:item.link="props">
          <a :href="props.item.to">{{ props.item.text }}</a>
          : {{ props.item.description }}
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #cef;
  color: steelblue;
}

#table-of-contents {
  float: right;
  max-width: 30%;

  margin-left: 36px;

  color: white;
  background-color: royalblue;
}
</style>

<i18n>
{
  "en": {
     "title": "Data Access",
    "blurb": [
      "Access to the WOUDC data archive is available via numerous mechanisms in support of vendor neutral, multi-application access and integration. Whether you are using the website, geospatial tools or custom solutions, the WOUDC data archive provides flexible, authoritative data access.",
      { "newlines": 2 },
      "Every effort has been made to make the WOUDC data archive as accessible as possible. If you have any questions, comments, or suggestions on improving data access, please ",
      { "link": { "to": "contact", "text": "contact us" } },
      "."
    ],
    "note": "Note",
    "contents-title": "Table of Contents",
    "contents-links": [
      {
        "text": "Data Search / Download",
        "selector": "#data-search-section"
      },
      {
        "text": "Web Accessible Folder (WAF)",
        "selector": "#waf-section"
      },
      {
        "text": "Web Services",
        "selector": "#web-services-section",
        "children": [
          {
            "text": "Catalogue Service for the Web (CSW)",
            "selector": "#csw-subsection"
          },
          {
            "text": "Web Map Service (WMS)",
            "selector": "#wms-subsection"
          },
          {
            "text": "Web Feature Service (WFS)",
            "selector": "#wfs-subsection"
          },
          {
            "text": "Web Processing Service (WPS)",
            "selector": "#wps-subsection"
          }
        ]
      },
      {
        "text": "Definitions Service",
        "selector": "#definitions-service-section"
      },
      {
        "text": "ISO Codelist Catalogue",
        "selector": "#iso-catalogue-section"
      },
      {
        "text": "Examples",
        "selector": "#examples-section"
      }
    ],
    "note1-title": "Data Policy",
    "note1-body": [
      "All data and metadata are subject to the WOUDC ",
      { "link": { "to": "about-datapolicy", "text": "data policy" } },
      "."
    ],
    "note2-title": "Data Revisions/Updates",
    "note2-body": [
      "The data revision dates are available on the ",
      { "link": { "to": "data-stations", "text": "stations list" } },
      " for stations that have provided revised data."
    ],
    "search-title": "Data Search / Download",
    "search-blurb": [
      "Observation data are made available via the ",
      { "link": { "to": "data-explore", "text": "data search / download" } },
      " page, which allows users to browse and filter the entire archive in a responsive, interactive manner. All data provide a link to download data for offline use in a variety of formats.",
      { "newlines": 2 },
      "Please consult the ",
      { "link": { "to": "https://github.com/woudc/woudc/wiki/DataSearchDownloadHowto", "type": "external", "text": "Data Search / Download How To" } },
      " for detailed information."
    ],
    "search-note-body": [
      { "bold": "Note (1)" },
      " Please note that dataset specific limits are put on bulk data download to maintain quality of service."
    ],
    "waf-title": "Web Accessible Folder (WAF)",
    "waf-blurb": [
      "The entire archive of contributed data files in Extended CSV format is made available at ",
      { "link": { "to": "https://woudc.org/archive/", "type": "external", "text": "https://woudc.org/archive/" } },
      " for users to browse, download or integrate into their workflows.",
      { "newlines": 2 },
      " Static dataset ",
      { "link": { "to": "https://woudc.org/archive/Summaries/dataset-snapshots", "type": "external", "text": "archive files" } },
      " are also available on the WAF in CSV format with ZIP compression. These archive files are updated on a daily basis and provide users the option to download an entire dataset in CSV format.",
      { "newlines": 2 },
      "Please consult the ",
      { "link": { "to": "https://github.com/woudc/woudc/wiki/WAFHowto", "type": "external", "text": "WAF How To" } },
      " for detailed information."
    ],
    "web-title": "Web Services",
    "web-blurb": [
      "In addition to traditional data access mechanisms, WOUDC has made the archive available using geospatial web services adhering to publically available international standards. Web services are systems designed to support machine to machine interaction over a network, and are typically utilized in a client/server computing environment made available through programmatic access, associated tools and applications.",
      { "newlines": 2 },
      "The WOUDC web services adhere to open standards ratified by the ",
      { "link": { "to": "https://opengeospatial.org/", "type": "external", "text": "Open Geospatial Consortium" } },
      " (OGC), and the ",
      { "link": { "to": "https://www.isotc211.org/", "type": "external", "text": "International Organization for Standardization" } },
      " (ISO) which enable interoperability and thus make data easy to discover, access, visualize and integrate. OGC and ISO standards play an important role in ",
      { "link": { "to": "https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf", "type": "external", "text": "World Meteorological Organization interoperability" } },
      " as part of the ",
      { "link": { "to": "https://www.wmo.int/pages/prog/www/WIS/", "type": "external", "text": "WMO Information System" } },
      " and are supported by numerous off the shelf open source or commercial tools."
    ],
    "web-table-title": "The following OGC web services are made available for standards-based, dynamic data access:",
    "web-table-links": [
      "???"
    ],
    "csw-title": "Catalogue Service for the Web (CSW)",
    "csw-blurb": [
      "The ",
      { "link": { "to": "https://www.opengeospatial.org/standards/cat", "type": "external", "text": "OGC Catalogue Service" } },
      " provides a common interface to discover, browse and query discovery metadata (data about data). The WOUDC CSW provides a yellow pages catalogue of all WOUDC data available in the archive. Metadata records are formatted using the ISO 19115/19139 geospatial metadata standards."
    ],
    "csw-note-title": "WOUDC OGC CSW",
    "csw-note-body": [
      "WOUDC provides OGC CSW (version 2.0.2) at the following endpoint: ",
      { "link": { "to": "https://geo.woudc.org/csw?service=CSW&version=2.0.2&request=GetCapabilities", "type": "external", "text": "https://geo.woudc.org/csw?service=CSW&version=2.0.2&request=GetCapabilities" } }
    ],
    "wms-title": "Web Map Service (WMS)",
    "wms-blurb": [
      "The ",
      { "link": { "to": "https://www.opengeospatial.org/standards/wms", "type": "exteral", "text": "OGC Web Map Service" } },
      " provides a common interface to visualize geospatial data layers. Typical use of WMS includes simple visualization in web or desktop GIS applications via web friendly image formats such as PNG or JPEG."
    ],
    "wms-note-title": "WOUDC OGC WMS",
    "wms-note-body": [
      "WOUDC provides OGC WMS (versions 1.1.1 - 1.3.0) at the following endpoint: ",
      { "link": { "to": "https://geo.woudc.org/ows?service=WMS&version=1.3.0&request=GetCapabilities", "type": "external", "text": "https://geo.woudc.org/ows?service=WMS&version=1.3.0&request=GetCapabilities" } }
    ],
    "wfs-title": "Web Feature Service (WFS)",
    "wfs-blurb": [
      "The ",
      { "link": { "to": "https://www.opengeospatial.org/standards/wfs", "type": "external", "text": "OGC Web Feature Service" } },
      " provides a common interface to access geospatial data. Typical use of WFS includes custom query / raw access to geospatial features. The WOUDC WFS provides archive data in numerous formats, including Extended CSV, KML, CSV, GML, ESRI Shapefile, MapInfo, GeoJSON, and NetCDF.\n\nThe WFS has a server side limit of a maximum of 200000 features to ensure quality of service and availability."
    ],
    "wfs-note-title": "WOUDC OGC WFS",
    "wfs-note-body": [
      "WOUDC provides OGC WFS (versions 1.0.0 - 1.1.0) at the following endpoint: ",
      { "link": { "to": "https://geo.woudc.org/ows?service=WFS&version=1.1.0&request=GetCapabilities", "type": "external", "text": "https://geo.woudc.org/ows?service=WFS&version=1.1.0&request=GetCapabilities" } }
    ],
    "wps-title": "Web Processing Service (WPS)",
    "wps-blurb": [
      "The ",
      { "link": { "to": "https://www.opengeospatial.org/standards/wps", "type": "external", "text": "OGC Web Processing Service" } },
      " provides a common interface to define rules, inputs, outputs for geospatial processing / calculations. Typical use of WPS includes custom processes (buffer, overlay). The WOUDC WPS provides a suite of tools used in support of validation of submissions to the Data Centre."
    ],
    "wps-note-title": "WOUDC OGC WPS",
    "wps-note-body": [
      "WOUDC provides OGC WPS (version 1.0.0) at the following endpoint: ",
      { "link": { "to": "https://geo.woudc.org/wps?service=WPS&version=1.0.0&request=GetCapabilities", "type": "external", "text": "https://geo.woudc.org/wps?service=WPS&version=1.0.0&request=GetCapabilities" } }
    ],
    "definitions-title": "Definitions Service",
    "definitions-blurb": "Web Services are modelled and managed using a data taxonomy. An RDF-based definitions service exists to describe WOUDC's data taxonomy and relationships.",
    "definitions-note-title": "WOUDC Definitions Service",
    "definitions-note-body": [
      "WOUDC provides RDF/SKOS at the following endpoint: ",
      { "link": { "to": "https://geo.woudc.org/def", "type": "external", "text": "https://geo.woudc.org/def" } }
    ],
    "iso-title": "ISO Codelist Catalogue",
    "iso-blurb1": "Codelists are managed using the ISO 19115 standard. An ISO 19115 codelist catalogue exists to describe various WOUDC's domain objects for use in metadata.",
    "iso-note-title": "WOUDC Codelist Catalogue",
    "iso-note-body": [
      "WOUDC provides the ISO Codelist Catalogue at the following endpoint: ",
      { "link": { "to": "https://geo.woudc.org/codelists.xml", "type": "external", "text": "https://geo.woudc.org/codelists.xml" } }
    ],
    "iso-blurb2": [
      "Please consult the ",
      { "link": { "to": "https://github.com/woudc/woudc/wiki/WebServicesHowto", "type": "external", "text": "Web Services How To" } },
      " for detailed information."
    ],
    "examples-title": "Examples",
    "examples-blurb": [
      "The following ",
      { "link": { "to": "https://github.com/woudc", "type": "external", "text": "GitHub" } },
      " examples provide high level access and workflow examples of integrating WOUDC Web Services:"
    ],
    "examples-links": [
      {
        "text": "pywoudc",
        "to": "https://github.com/woudc/pywoudc",
        "description": "High level package providing Pythonic access to WMO WOUDC data services"
      },
      {
        "text": "notebooks",
        "to": "https://github.com/woudc/woudc/tree/master/notebooks",
        "description": "A collection of data centre workflows implemented as IPython notebooks"
      }
    ]
  },
  "fr": {
    "title": "Accessibilité des données",
    "blurb": [
      "L’accès aux données archivées du WOUDC est possible par l’entremise de nombreux mécanismes en appui à une accessibilité multi-application non rattachée à un fournisseur donné. Que vous utilisiez le site web, les outils géospatiaux ou nos solutions personnalisées, les archives de données du WOUDC fournissent une accessibilité souple et officielle en plus de vous permettre l’accès aux données.",
      { "newlines": 2 },
      "Tous les efforts ont été déployés pour rendre les archives de données du WOUDC aussi accessibles que possible. Si vous avez des questions, des commentaires ou des suggestions sur la façon dont nous pourrions améliorer l’accès aux données, veuillez ",
      { "link": { "to": "contact", "text": "nous contacter" } },
      "."
    ],
    "contents-title": "Table des matières",
    "contents-links": [
      {
        "text": "Rechercher des données / Télécharger",
        "to": "about-dataaccess",
        "selector": "#data-search-section"
      },
      {
        "text": "Dossier accessible sur le web (WAF)",
        "to": "about-dataaccess",
        "selector": "#waf-section"
      },
      {
        "text": "Services web",
        "selector": "web-services-section",
        "children": [
          {
            "text": "Service de catalogue pour le web (CSW)",
            "to": "about-dataaccess",
            "selector": "#csw-subsection"
          },
          {
            "text": "Service de cartes web (WMS)",
            "to": "about-dataaccess",
            "selector": "#wms-subsection"
          },
          {
            "text": "Service de caractéristiques web (WFS)",
            "to": "about-dataaccess",
            "selector": "#wfs-subsection"
          },
          {
            "text": "Service de traitement web (WPS)",
            "to": "about-dataaccess",
            "selector": "#wps-subsection"
          }
        ]
      },
      {
        "text": "Service de définitions",
        "to": "about-dataaccess",
        "selector": "#definitions-service-section"
      },
      {
        "text": "Catalogue des listes de codes ISO",
        "to": "about-dataaccess",
        "selector": "#iso-catalogue-section"
      },
      {
        "text": "Exemples",
        "to": "about-dataaccess",
        "selector": "#examples-section"
      }
    ],
    "note1-title": "Politiques en matière de données",
    "note1-body": [
      "Toutes les données et métadonnées sont assujetties à la ",
      { "link": { "to": "about-datapolicy", "text": "politique en matière de données du WOUDC" } },
      "."
    ],
    "note2-title": "Révisions de données / mises à jour",
    "note2-body": [
      "Les dates de révision des données sont disponibles à ",
      { "link": { "to": "data-stations", "text": "stations list" } },
      " pour les postes qui ont fourni des données révisées."
    ],
    "search-title": "Rechercher des données / Télécharger",
    "search-blurb": [
      "Les données d’observation sont accessibles via ",
      { "link": { "to": "data-explore", "text": "la page Recherche de données / Téléchargement" } },
      " qui permet aux usagers de parcourir l’ensemble des archives et de filtrer les résultats d’une façon réceptive et interactive. Toutes les données offrent un lien qui permet de télécharger les données dans divers formats pour une utilisation hors ligne.",
      { "newlines": 2 },
      "Veuillez consulter les ",
      { "link": { "to": "https://github.com/woudc/woudc/wiki/DataSearchDownloadHowto", "type": "external", "text": "instructions de recherche / téléchargement de données" } },
      " pour plus de détails."
    ],
    "search-note-body": [
      {"bold": "Remarque (1) :" },
      " Veuillez noter que des limites spécifiques aux ensembles de données sont imposées au téléchargement de données en vrac afin de maintenir la qualité du service."
    ],
    "waf-title": "Dossier accessible sur le web (WAF)",
    "waf-blurb": [
      "Toutes les archives de fichiers de données qui ont été envoyées par les contributeurs en format CSV étendu sont disponibles sur ",
      { "link": { "to": "https://woudc.org/archive", "type": "external", "text": "https://woudc.org/archive/" } },
      ", les utilisateurs peuvent les parcourir, les télécharger ou les intégrer à leurs flux de travaux.",
      { "newlines": 2 },
      "Les ",
      { "link": { "to": "https://woudc.org/archive/Summaries/dataset-snapshots", "type": "external", "text": "données d'archives" } },
      " statiques sont également disponibles dans le WAF au format CSV avec compression ZIP. Ces archives sont mis à jour hebdomadairement et offrent aux usagers une méthode pour télécharger le jeu de données entier au format CSV.",
      { "newlines": 2 },
      "Veuillez consulter les ",
      { "link": { "to": "https://github.com/woudc/woudc/wiki/WAFHowto", "type": "external", "text": "instructions de WAF" } },
      " pour plus de détails."
    ],
    "web-title": "Services web",
    "web-blurb": [
      "En plus des mécanismes d’accès aux données traditionnels, le WOUDC rend égalementdisponible ses archives par l’entremise de services web géospatiaux, se conformant ainsi aux normes internationales accessibles au public. Les services web sont des systèmes informatiques conçus pour prendre en charge des interactions machine à machine sur un réseau. Ils sont normalement utilisés dans un environnement informatique de type client/serveur accessible par des accès programmatiques, des outils connexes et des applications.",
      { "newlines": 2 },
      "Les services web du WOUDC se conforment aux normes ouvertes ratifiées par l’",
      { "link": { "to": "https://opengeospatial.org/", "type": "exteral", "text": "Open Geospatial Consortium" } },
      " (OGC) et l’",
      { "link": { "to": "https://www.isotc211.org/", "type": "external", "text": "International Organization for Standardization" } },
      " (ISO) qui assurent l’interopérabilité des données, en facilitant ainsi la découverte, l’accessibilité, la visualisation et l’intégration. Les normes de l’OGC et de l’Organisation internationale de normalisation (ISO) jouent un rôle prépondérant dans l’",
      { "link": { "to": "https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf", "type": "external", "text": "interopérabilité de l’Organisation météorologique mondiale" } },
      " où elles font partie intégrante du ",
      { "link": { "to": "https://www.wmo.int/pages/prog/www/WIS/", "type": "external", "text": "système d’information de l’OMM" } },
      " et sont prises en charge par de nombreuses sources libres grand public ou outils commerciaux."
    ],
    "web-table-title": "Ces services web de l’OGC sont mis à la disposition des utilisateurs afin d’assurer une accessibilité des données rapideet conforme aux normes :",
    "web-table-links": [
      "???"
    ],
    "csw-title": "Service de catalogue pour le web (CSW)",
    "csw-blurb": [
      "Le ",
      { "link": { "to": "https://www.opengeospatial.org/standards/cat", "type": "external", "text": "service de catalogue de l’OGC" } },
      " fournit une interface commune pour permettre à l’usager de découvrir, de parcourir et de faire des recherches de métadonnées (des données au sujet des données) facilement. Le CSW du WOUDC fournit un catalogue de type Pages Jaunes de toutes les données du WOUDC disponibles dans les archives. Les registres de métadonnées sont formatés selon les normes du contenu des métadonnées géospatiales ISO 19115/19139."
    ],
    "csw-note-title": "Le WOUDC et le CSW de l’OGC",
    "csw-note-body": [
      "Le WOUDC donne accès au CSW de l’OGC (version 2.0.2) à ces différents endroits : ",
      { "link": { "to": "https://geo.woudc.org/csw?service=CSW&version=2.0.2&request=GetCapabilities", "type": "external", "text": "https://geo.woudc.org/csw?service=CSW&version=2.0.2&request=GetCapabilities" } }
    ],
    "wms-title": "Service de cartes web (WMS)",
    "wms-blurb": [
      "Le ",
      { "link": { "to": "https://www.opengeospatial.org/standards/wms", "type": "external", "text": "Service de cartes Web de l’OGC" } },
      " fournit une interface populaire utilisée pour visualiser des couches de données géospatiales. Le WMS est souvent utilisé pour effectuer une visualisation simple sur le web ou sur une application SIG à l’aide des formats d’image adaptés pour une utilisation sur le web comme les formats PNG ou JPEG, par exemple."
    ],
    "wms-note-title": "Le WOUDC et le WMS de l’OGC",
    "wms-note-body": [
      "Le WOUDC donne accès au WMS de l’OGC (versions 1.1.1 - 1.3.0) à cet endroit : ",
      { "link": { "to": "https://geo.woudc.org/ows?service=WMS&version=1.3.0&request=GetCapabilities", "type": "external", "text": "https://geo.woudc.org/ows?service=WMS&version=1.3.0&request=GetCapabilities" } }
    ],
    "wfs-title": "Service de caractéristiques web (WFS)",
    "wfs-blurb": [
      "Le ",
      { "link": { "to": "https://www.opengeospatial.org/standards/wfs", "type": "external", "text": "Service de fonctionnalités web (WFS) de l’OGC" } },
      " fournit une interface populaire pour permettre à l’utilisateur d’accéder aux données géospatiales. Le Service de fonctionnalités web (WFS) est habituellement utilisé pour effectuer des recherches personnalisées ou obtenir un accès brut aux fonctionnalités géospatiales. Le WFS du WOUDC permet l’accès à des données archivées dans divers formats comme le format CSV étendu, KML, CSV, GML, le fichier de formes ESRI, MapInfo, GeoJSON et NetCDF.",
      { "newlines": 2 },
      "Le WFS a une limite côté serveur de 200000 entités au maximum, afin de pouvoir assurer la qualité du service et en garantir la disponibilité."
    ],
    "wfs-note-title": "Le WOUDC et le WFS de l’OGC",
    "wfs-note-body": [
      "Le WOUDC donne accès au WFS de l’OGC (versions 1.0.0 - 1.1.0) à ces différents endroits : ",
      { "link": { "to": "https://geo.woudc.org/ows?service=WFS&version=1.1.0&request=GetCapabilities", "type": "external", "text": "https://geo.woudc.org/ows?service=WFS&version=1.1.0&request=GetCapabilities" } }
    ],
    "wps-title": "Service de traitement web (WPS)",
    "wps-blurb": [
      "Le ",
      { "link": { "to": "https://www.opengeospatial.org/standards/wfs", "type": "external", "text": "Service de fonctionnalités web (WFS) de l’OGC" } },
      " fournit une interface populaire pour permettre à l’utilisateur d’accéder aux données géospatiales. Le Service de fonctionnalités web (WFS) est habituellement utilisé pour effectuer des recherches personnalisées ou obtenir un accès brut aux fonctionnalités géospatiales. Le WFS du WOUDC permet l’accès à des données archivées dans divers formats comme le format CSV étendu, KML, CSV, GML, le fichier de formes ESRI, MapInfo, GeoJSON et NetCDF."
    ],
    "wps-note-title": "Le WOUDC et le WPS de l’OGC",
    "wps-note-body": [
      "Le WOUDC fournit le WPS de l'OGC (version 1.0.0.0) au point d'extrémité suivant : ",
      { "link": { "to": "https://geo.woudc.org/wps?service=WPS&version=1.0.0&request=GetCapabilities", "type": "external", "text": "https://geo.woudc.org/wps?service=WPS&version=1.0.0&request=GetCapabilities" } }
    ],
    "definitions-title": "Service de définitions",
    "definitions-blurb": "Les services web sont modélisés et gérés grâce à une taxonomie des données. Il existe un service dedéfinitions, fondé sur un modèle RDF, servant à décrire la taxonomie des données du WOUDC et les liens qui les unissent.",
    "definitions-note-title": "Le service de définitions du WOUDC",
    "definitions-note-body": [
      "Le WOUDC fournit le modèle RDF/SKOS aux endroits suivants : ",
      { "link": { "to": "https://geo.woudc.org/def", "type": "external", "text": "https://geo.woudc.org/def" } }
    ],
    "iso-title": "Catalogue des listes de codes ISO",
    "iso-blurb1": "Les listes de codes sont gérées en conformité avec la norme ISO 19115. Il existe un catalogue répertoriant les listes de codes servant à décrire une variété d’objets de domaine du WOUDC servant dans les métadonnées.",
    "iso-note-title": "Catalogue répertoriant les listes de codes du WOUDC",
    "iso-note-body": [
      "Le WOUDC donne accès au catalogue des listes de codes aux endroits suivants : ",
      { "link": { "to": "https://geo.woudc.org/codelists.xml", "type": "external", "text": "https://geo.woudc.org/codelists.xml" } }
    ],
    "iso-blurb2": [
      "Veuillez consulter les ",
      { "link": { "to": "https://github.com/woudc/woudc/wiki/WebServicesHowto", "type": "external", "text": "instructions pour les services web" } },
      " pour plus de détails."
    ],
    "examples-title": "Exemples",
    "examples-blurb": [
      "Les exemples ",
      { "link": { "to": "https://github.com/woudc", "type": "external", "text": "GitHub" } },
      " suivants démontrent l’accessibilité de haut niveau et l’intégration dans les flux de travaux des Services Web du WOUDC :"
    ],
    "examples-links": [
      {
        "text": "pywoudc",
        "url": "https://github.com/woudc/pywoudc",
        "description": "L’ensemble de haut niveau permet un accès pythonique aux données de l’OMM et du WOUDC"
      },
      {
        "text": "notebooks",
        "url": "https://github.com/woudc/woudc/tree/master/notebooks",
        "description": "Et regroupe toute une collection de flux de travaux provenant de divers centres de données qui sont implémentés comme cahiers IPython"
      }
    ]
  }
}
</i18n>

<script>
import WoudcLink from '~/components/WoudcLink'
import WoudcBlurb from '~/components/WoudcBlurb'
import WoudcNote from '~/components/WoudcNote'

export default {
  components: {
    'woudc-link': WoudcLink,
    'woudc-blurb': WoudcBlurb,
    'woudc-note': WoudcNote
  },
  data() {
    return {
      linkHeaders: [
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'link'
        }
      ]
    }
  },
  computed: {
    contentsLinks() {
      const links = []
      for (let i = 0; this.$t('contents-links')[i] !== undefined; i++) {
        links.push(this.$t('contents-links')[i])
      }
      return links
    },
    examplesLinks() {
      const links = []
      for (let i = 0; this.$t('examples-links')[i] !== undefined; i++) {
        links.push(this.$t('examples-links')[i])
      }
      return links
    }
  },
  methods: {
    selfLink(props) {
      return {
        text: props.text,
        to: 'about-dataaccess',
        selector: props.selector
      }
    }
  },
  nuxtI18n: {
    paths: {
      en: '/data-access',
      fr: '/data-access-fr'
    }
  }
}
</script>
