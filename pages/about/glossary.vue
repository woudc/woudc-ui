<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb') }}</p>
    <div v-for="(entry, i) in $t('terms')" :key="i">
      <h4>{{ entry.term }}</h4>
      <woudc-blurb :items="entry.definition" />
    </div>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Glossary",
    "blurb": "Terms related to the data centre, including definitions about network operations centres and words and phrases about the storage, management and the transmission of data.",
    "terms": [
      {
        "term": "Agency",
        "definition": "The WOUDC term for the contributing institute or organization responsible for the data submission to the WOUDC."
      },
      {
        "term": "Agency acronym",
        "definition": "The WOUDC abbreviation or short form for the institute or organization name."
      },
      {
        "term": "Broadband UV",
        "definition": "Measurements of UV-A, UV-B, or erythemally weighted UV radiation. This is a WOUDC defined data category. Refer to ultraviolet radiation."
      },
      {
        "term": "Catalogue Service for the Web (CSW)",
        "definition": "An Open Geospatial Consortium (OGC) standard for defining interfaces to discover, browse, and query metadata about geospatial records."
      },
      {
        "term": "Contributor",
        "definition": "The institute or organization that obtains and submits the observation data to the WOUDC."
      },
      {
        "term": "CSW",
        "definition": "The abbreviation for Catalogue Service for the Web."
      },
      {
        "term": "Data Category",
        "definition": "WOUDC term for type of data. Current data categories for ozone are total column ozone, lidar, ozonesonde, Umkehr and ultraviolet radiation data categories are broadband, multiband and high resolution spectral."
      },
      {
        "term": "Data Class",
        "definition": "The WOUDC term for the type of observation data collection set. Current WOUDC data classes are ozone and solar ultraviolet radiation."
      },
      {
        "term": "Data Level",
        "definition": "Refers to the data product. Raw data are Level 0 and considered unchanged. Processed data are Level 1 while spectrally gridded data is Level 2, etc."
      },
      {
        "term": "Data product",
        "definition": "Refers to value-added products such as maps, statistical summaries (e.g. daily means), data gridded on wavelengths and bandwidths, time series analysis, etc."
      },
      {
        "term": "Data Resolution",
        "definition": "Refers to the frequency of data such as D = daily M = monthly."
      },
      {
        "term": "Data Sponsorship Statement (DSS)",
        "definition": "Refers to a condensed scientific description of the origin, processing and quality of the data, typically written by the scientist responsible for these data and submitted by the contributing agency (formerly called the Scientific Sponsorship Statement (SSS))."
      },
      {
        "term": "Data Version",
        "definition": "Data version specified by the submitting agency. These versions have the form major.minor (eg. 3.2)."
      },
      {
        "term": "Dobson Unit (DU)",
        "definition": "A unit of measurement of atmospheric ozone columnar density, used as a measure of total column ozone, which is dominated by ozone in the stratospheric ozone layer."
      },
      {
        "term": "DSS",
        "definition": "The abbreviation for Data Sponsorship Statement."
      },
      {
        "term": "Erythemal",
        "definition": [
          "The solar erythemal ultraviolet (UV) radiation which is defined by the integral over the UV wavelengths of the irradiance multiplied by the erythemal action spectrum (refer to ",
          { "link": { "to": "https://www.wmo.int/pages/prog/dra/etrp/documents/926E.pdf", "type": "external", "text": "carcinogenesis effectiveness" } },
          ")."
        ]
      },
      {
        "term": "extCSV",
        "definition": "The abbreviation for the extended (ext) Comma-Separated Values (CSV) file format created by WOUDC as a data archive file format standard that supports the provision of comments and multi data content within individual files."
      },
      {
        "term": "Extended Comma-Separated Value",
        "definition": "Refer to extCSV."
      },
      {
        "term": "File Format Version",
        "definition": [
          "The WOUDC term for the format of a data file. Data files of a given content will always contain the tables and fields specified by the WOUDC for that form. Refer to ",
          { "link": { "to": "contributors-registration", "text": "contributor registration form" } },
          "."
        ]
      },
      {
        "term": "Form",
        "definition": "The version of the WOUDC extCSV file format (represented by the form index). If the existing file structure is altered the form index will be increased."
      },
      {
        "term": "GAW",
        "definition": "The abbreviation for the Global Atmosphere Watch programme of the World Meteorological Organization (WMO). The GAW programme was established in 1991 to provide scientific data on the chemical composition of the atmosphere."
      },
      {
        "term": "GAW ID",
        "definition": "The abbreviation for the station identifier defined by the GAW programme of the WMO. This identifier is a three letter code and is used in the WOUDC extCSV formatted files."
      },
      {
        "term": "GAW Name",
        "definition": "The abbreviation for the GAW station (platform) name."
      },
      {
        "term": "GAWSIS",
        "definition": "The abbreviation for the GAW Station Information System."
      },
      {
        "term": "Global Atmosphere Watch",
        "definition": "Refer to GAW."
      },
      {
        "term": "Height",
        "definition": "Height (elevation) in metres above sea level (m.a.s.l.)."
      },
      {
        "term": "Instrument",
        "definition": "The sensor or device used to measure / provide the data."
      },
      {
        "term": "Instrument Manufacturer",
        "definition": "The manufacturer or make of an instrument or sensor."
      },
      {
        "term": "Instrument Model",
        "definition": "The model identifier (ID) where applicable. For example, a typical Brewer spectrophotometer model is MKIII and an ECC sonde is 6A."
      },
      {
        "term": "Instrument Serial Number",
        "definition": "The serial number (S/N) for an instrument or sensor."
      },
      {
        "term": "Instrument Type",
        "definition": "The common name of the instrument or sensor. For example, the Brewer spectrophotometer is called the \"Brewer\" where as the Brewer-Mast ozonesonde is called the \"Brewer-Mast.\""
      },
      {
        "term": "ISO",
        "definition": "The abbreviation for the International Organization for Standardization."
      },
      {
        "term": "Latitude",
        "definition": "In signed decimal degrees (DD), with north positive and south negative."
      },
      {
        "term": "Lidar",
        "definition": "Abbreviated term for Light Detection and Ranging. This is a WOUDC defined category."
      },
      {
        "term": "Location",
        "definition": "The latitude, longitude and height of the data collection; typically the location of the station (platform) and instrument."
      },
      {
        "term": "Longitude",
        "definition": "In signed decimal degrees (DD), with east positive and west negative."
      },
      {
        "term": "Metadata",
        "definition": "Data about data. Additional spatial, temporal and instrument information for data within the WOUDC."
      },
      {
        "term": "Multiband UV",
        "definition": "Measured with several discrete, pass-band filters with nominal spectral resolution of 2-10 nm at FWHM. This is a WOUDC defined data category. Refer to ultraviolet radiation."
      },
      {
        "term": "NDACC",
        "definition": "Network for the Detection of Atmospheric Composition Change"
      },
      {
        "term": "Observation Time Period",
        "definition": "The duration, usually one local or two days yielding a single profile."
      },
      {
        "term": "OGC",
        "definition": "The abbreviation for the Open Geospatial Consortium which serves as a global forum for the collaboration of geospatial data; they set the international standards and provide services that promote geospatial interoperability."
      },
      {
        "term": "Open Geospatial Consortium",
        "definition": "Refer to OGC."
      },
      {
        "term": "Ozone",
        "definition": "A special form of oxygen with the chemical formula O3. Ozone in the stratosphere absorbs some of the sun's biologically harmful ultraviolet radiation. Ozone is one of the current WOUDC data classes and includes these data categories: total column ozone (two levels: daily and hourly values), lidar vertical profiles, ozonesonde vertical profiles, and Umkehr (two levels: N-value and C-Umkehr) vertical profiles."
      },
      {
        "term": "Ozonesonde",
        "definition": "A balloon-borne, ozone instrument used to vertically profile the ozone amount in the atmosphere. This is a WOUDC defined data category. Refer to ozone."
      },
      {
        "term": "Platform",
        "definition": "Refer to Station."
      },
      {
        "term": "Platform Type",
        "definition": "Refer to Station Type."
      },
      {
        "term": "Project",
        "definition": "The name of the project (e.g. IONS, EUVB, Antarctica)."
      },
      {
        "term": "RDF",
        "definition": [
          "Resource Description Framework - A part of the SKOS Web Service standard from World Wide Web Consortium (",
          { "link": { "to": "https://www.w3.org/", "type": "external", "text": "www.w3.org" } },
          ")."
        ]
      },
      {
        "term": "Revision",
        "definition": "An update to existing data. This may be a minor adjustment or a major re-write of the data."
      },
      {
        "term": "SAG",
        "definition": "The abbreviation for the WMO Scientific Advisory Group. WOUDC receives guidance from the WMO SAG for issues related to both ozone and solar ultraviolet radiation data."
      },
      {
        "term": "Scientific Advisory Group",
        "definition": "Refer to SAG."
      },
      {
        "term": "Scientific Authority",
        "definition": "The person responsible for the data quality."
      },
      {
        "term": "Scientific Sponsorship Statement",
        "definition": "Refer to Data Sponsorship Statement (DSS)."
      },
      {
        "term": "SHADOZ",
        "definition": "The abbreviation for Southern Hemisphere ADditional Ozonesondes."
      },
      {
        "term": "SHP",
        "definition": "The abbreviation and designator for a WOUDC mobile station (platform) for shipborne data. Refer to station (platform) type."
      },
      {
        "term": "SKOS",
        "definition": [
          "Simple Knowledge Organization System - A part of the Web Service standard from World Wide Web Consortium (",
          { "link": { "to": "https://www.w3.org/", "type": "external", "text": "www.w3.org" } },
          ")."
        ]
      },
      {
        "term": "S/N",
        "definition": "The serial number of the instrument. Refer to instrument serial number."
      },
      {
        "term": "Source Class",
        "definition": "WOUDC's term for the source of the data e.g. NDACC, SHADOZ"
      },
      {
        "term": "Spectral UV",
        "definition": "Radiation is measured in a continuous spectral band, with a resolution of less than or equal to 2 nm. This is a WOUDC defined data category. Refer to ultraviolet radiation."
      },
      {
        "term": "Station",
        "definition": "The station platform at which an observation is performed. The stations consist of stationary platforms (including towers) and mobile platforms (including ships)."
      },
      {
        "term": "Station Type",
        "definition": "The abbreviation (short form) used to identify whether a station (platform) is stationary (STN) or on a ship (SHP)."
      },
      {
        "term": "STN",
        "definition": "The abbreviation and designator for the WOUDC stationary or station (platform) data. Refer to station (platform) type."
      },
      {
        "term": "Supporting Contributor",
        "definition": "The institute or organization, other than the contributor, that technically or financially supports the observation."
      },
      {
        "term": "Total Ozone",
        "definition": "Total column ozone measurements. This is a WOUDC defined data category. Refer to ozone and also to Dobson Unit."
      },
      {
        "term": "Ultraviolet (UV) Radiation",
        "definition": "Often abbreviated to UV. Short-wave radiation (UV-B) is absorbed by the ozone layer, whereas long-wave UV (UV-A) passes through the ozone layer and reaches the ground. The WOUDC UV radiation data is in the UV-A and UV-B regions (290 to 400 nm) of the E-M spectrum. UV radiation is one of the WOUDC data classes and includes three data categories: broadband, multiband, and high resolution spectral."
      },
      {
        "term": "UmkehrN14",
        "definition": "For Umkehr measurements using 14 N-values (representing 14 solar zenith angles). This is a WOUDC defined data category. Refer to ozone."
      },
      {
        "term": "UTC",
        "definition": "The international abbreviation for Coordinated Universal Time. It is the standard time common to every place in the world. The WMO has adopted the UTC as the standard time for use in reporting all meteorological data."
      },
      {
        "term": "UTCOffset",
        "definition": "The signed amount of time subtracted from the local time in order to obtain UTC time (where east is positive and local time is defined by the data originator), represented in ISO-8601 time (hh)."
      },
      {
        "term": "UV Radiation",
        "definition": "One of the WOUDC Data Classes. Example of WOUDC UV Radiation data are Multiband, Broadband and Spectral."
      },
      {
        "term": "WDC",
        "definition": "The abbreviation for the World Data Centres. WOUDC is one of six GAW WDCs that collect, document and archive atmospheric measurements and the associated metadata from stations worldwide and make these data freely available to the scientific community."
      },
      {
        "term": "Web Accessible Folder (WAF)",
        "definition": [
          "The entire archive of contributed data files in Extended CSV format is made available at ",
          { "link": { "to": "https://woudc.org/archive", "type": "external", "text": "https://woudc.org/archive/" } },
          " for users to browse, download or integrate into their workflows."
        ]
      },
      {
        "term": "Web Feature Service (WFS)",
        "definition": "A common interface to access geospatial data. Typical use of WFS includes custom query / raw access to geospatial features. The WOUDC WFS provides archive data in numerous formats, including Extended CSV, KML, CSV, GML, ESRI Shapefile, MapInfo, GeoJSON, and NetCDF."
      },
      {
        "term": "Web Map Service (WMS)",
        "definition": "A common interface to visualize geospatial data layers. Typical use of WMS includes simple visualization in web or desktop GIS applications via web friendly image formats such as PNG or JPEG."
      },
      {
        "term": "WIS",
        "definition": "The acronym for the WMO Information System which is responsible for the telecommunications and data management functions for weather, climate and water information to ensures adequate uniformity and standardization in the data, information and communications practices procedures and specifications employed among WMO members."
      },
      {
        "term": "WMO",
        "definition": "The abbreviation for the World Meteorological Organization. The WMO carries out its work through scientific and technical programmes such as the WOUDC."
      },
      {
        "term": "WMO Information System",
        "definition": "Refer to WIS."
      },
      {
        "term": "WMO Regions",
        "definition": "Six specific geographic portions of the globe defined by the WMO."
      },
      {
        "term": "World Data Centres",
        "definition": "Refer to WDC."
      },
      {
        "term": "World Meteorological Organization",
        "definition": "Refer to WMO."
      },
      {
        "term": "World Ozone and Ultraviolet Radiation Data Centre (WOUDC)",
        "definition": "One of six WDCs which are part of the GAW programme of the WMO."
      },
      {
        "term": "WOUDC",
        "definition": "The abbreviation for the World Ozone and Ultraviolet Radiation Data Centre."
      },
      {
        "term": "WOUDC Platform ID",
        "definition": "A number assigned by the WOUDC to uniquely identify each station (platform). Referred to as the WOUDC ID."
      }
    ]
  },
  "fr": {
    "title": "Glossaire",
    "blurb": "Termes reliés au centre des données, y compris les définitions portant sur les centres d’exploitation du réseau et les mots et phrases qui portent sur l’entreposage, la gestion et la transmission de données.",
    "terms": [
      {
        "term": "Acronyme de l’organisme",
        "definition": "Forme abrégée ou simplifiée qu’utilise le WOUDC pour désigner le nom de l’institution."
      },
      {
        "term": "Autorité scientifique",
        "definition": "La personne responsable de la qualité des données."
      },
      {
        "term": "Catégorie de données",
        "definition": "Terme propre au WOUDC servant à désigner le type de données. Les catégories actuelles pour les données sur l’ozone sont colonne d’ozone total, lidar, sonde pour l’ozone, Umkehr et les catégories pour les données sur le rayonnement ultraviolet sont à large bande, multibande et haute résolution spectrale."
      },
      {
        "term": "Centre mondial de données sur l’ozone et le rayonnement ultraviolet (WOUDC)",
        "definition": "L’un des six CMD qui font partie du programme VAG de l’OMM. "
      },
      {
        "term": "Centres mondiaux de données",
        "definition": "Voir CMD."
      },
      {
        "term": "Classe de données",
        "definition": "Terme propre au WOUDC pour décrire le type d’ensemble de collecte de données d’observation.Les classes de données actuelles du WOUDC sont l’ozone et le rayonnement solaire ultraviolet."
      },
      {
        "term": "Classe de la source",
        "definition": "Le terme utilisé par le WOUDC pour désigner la source des données p. ex. NDACC, SHADOZ"
      },
      {
        "term": "CMD",
        "definition": "Abréviation pour les Centres mondiaux de données. Le WOUDC est l’un des six VAG CMD qui collecte, documente et archive des mesures atmosphériques et et les métadonnées qui y sont associées à partir de stations situées au quatre coins de la planète et qui produit ces données disponibles gratuitement dans toute la communauté scientifique. "
      },
      {
        "term": "Contributeur",
        "definition": "L’institut ou l’organisation qui obtient les données d’observation et les soumet au WOUDC."
      },
      {
        "term": "Contributeur de soutien",
        "definition": "L’institut ou organisation, outre le contributeur, qui soutien techniquement ou financièrement l’observation."
      },
      {
        "term": "CSW",
        "definition": "L’abréviation désignant le Service de catalogue pour le web."
      },
      {
        "term": "Déclaration de patronage des données (DSS)",
        "definition": "Désigne une description scientifique condensée de l’origine, du traitement et de la qualité des données, rédigée par le travailleur scientifique responsable de ces données et soumise par l’organisme contributeur (anciennement Déclaration de patronage scientifique [SSS])."
      },
      {
        "term": "Déclaration de patronage scientifique",
        "definition": "Consultez la Déclaration de patronage des données."
      },
      {
        "term": "Dossier accessible sur le web (WAF)",
        "definition": [
          "Toutes les archives de fichiers de données qui ont été envoyées par les contributeurs en format CSV étendu sont disponibles au ",
          { "link": { "to": "https://woudc.org/archive", "type": "external", "text": "https://woudc.org/archive/" } },
          " pour les utilisateurs qui souhaitent consulter ou télécharger les données ou les intégrer dans leurs chaînes d’exploitation."
        ]
      },
      {
        "term": "DSS",
        "definition": "L’abréviation qui désigne la Déclaration de patronage des données."
      },
      {
        "term": "Emplacement",
        "definition": "La latitude, la longitude et la hauteur de la collecte de données, généralementl’emplacement de la station (plate-forme) et l’instrument utilisé."
      },
      {
        "term": "Érythémateux",
        "definition": [
          "Le rayonnement solaire ultraviolet à effet érythémateux se définit comme l’intégrale sur les longueurs d’onde UV de l’irradiation, multipliée par le spectre à action érythémateuse (consulter ",
          { "link": { "to": "https://www.wmo.int/pages/prog/dra/etrp/documents/926E.pdf", "type": "external", "text": "efficacité sur la carcinogenèse" } },
          ")."
        ]
      },
      {
        "term": "extCSV",
        "definition": "L’abréviation qui désigne la forme étendue du format de fichier de type valeurs séparées par des virgules (CSV) qui a été créé par le WOUDC comme format de fichier normalisé pour l’archivage des données. Ce format de fichier prend en charge la formulation des observations et de multiples données contenus dans des fichiers individuels."
      },
      {
        "term": "Fabricant d’instruments",
        "definition": "Le constructeur ou le fabricant d’un instrument ou d’un capteur."
      },
      {
        "term": "Format valeurs séparées par des virgules étendu",
        "definition": "Voir extCSV."
      },
      {
        "term": "Formulaire",
        "definition": "La version du format de fichier extCSV du WOUDC (représenté par le fichier forme). Si la structure du fichier existant est modifiée, le fichier forme sera augmenté."
      },
      {
        "term": "Fuseau horaire",
        "definition": "Le nombre d’heures soustraites à l’heure locale afin d’obtenir l’UTC (le nombre est positif pour les fuseaux horaires à l’est et l’heure locale est définie par la source des données), comme décrite dans la norme ISO-8601 sur l'heure (hh)."
      },
      {
        "term": "GCS",
        "definition": "Abréviation pour le Groupe consultatif scientifique de l’OMM. Le WOUDC reçoit des directives du GCS de l’OMM en lien avec les questions les données sur l’ozoneet le rayonnement ultraviolet."
      },
      {
        "term": "Groupe consultatif scientifique",
        "definition": "Voir GCS."
      },
      {
        "term": "Hauteur",
        "definition": "Hauteur (élévation) en mètres au-dessus du niveau de la mer (m.a.s.l.)."
      },
      {
        "term": "Identifiant de plate-forme WOUDC",
        "definition": "Un nombre assigné à chaque station (plate-forme) par le WOUDC à des fins d’identification. Aussi appelé ID WOUDC."
      },
      {
        "term": "Identifiant VAG",
        "definition": "L’abréviation pour l’identificateur de station défini par le programme VAG de l’OMM. Cet identificateur est un code composé de trois chiffres et utilisé dans les fichiers extCSV du WOUDC."
      },
      {
        "term": "Instrument",
        "definition": "Le capteur ou dispositif utilisé pour relever / fournir les données."
      },
      {
        "term": "ISO",
        "definition": "L’abréviation pour l’Organisation internationale de normalisation."
      },
      {
        "term": "Latitude",
        "definition": "Elle est exprimée en degrés décimaux (DD) signés, une valeur positive est attribuée au nord et une valeur négative est attribuée au sud."
      },
      {
        "term": "Lidar",
        "definition": "Terme qui désigne la détection et télémétrie par ondes lumineuses. Il s’agit d’une catégorie définie par le WOUDC."
      },
      {
        "term": "Longitude",
        "definition": "Elle est exprimée en degrés décimaux (DD) signés, une valeur positive est attribuée à l’est et une valeur négative est attribuée à l’ouest."
      },
      {
        "term": "Métadonnées",
        "definition": "Données portant sur des données. Il s’agit d’informations supplémentaires spatiales et temporales, ainsi qu’à propos des instruments utilisés dans les données du WOUDC."
      },
      {
        "term": "Modèle de l’instrument",
        "definition": "l’identifiant du modèle (ID) s’il y a lieu. Par exemple, un spectrophotomètre Brewer commun est désigné par l’identifiant MKIII et une sonde CCE par le code 6A."
      },
      {
        "term": "NDACC",
        "definition": "Réseau pour la détection de changements dans la composition de l’atmosphère"
      },
      {
        "term": "Niveau de données",
        "definition": "Voir les produits de données. Les données brutes sont de niveau 0 et sont considérées comme inchangées. Les données élaborées sont de niveau 1 alors que les données maillées spectrales classées dans un tableau sont de niveau 2, et ainsi de suite."
      },
      {
        "term": "Nom VAG",
        "definition": "L’abréviation du nom de la station (plate-forme) du VAG."
      },
      {
        "term": "Numéro de série de l’instrument",
        "definition": "le numéro de série (N/S) d’un instrument ou d’un capteur."
      },
      {
        "term": "OGC",
        "definition": "Abréviation pour Open Geospatial Consortium, qui consiste en un forum global pour la collaboration des données géospatiales; ils établissent les normes internationales et offrent des services qui font la promotion de l’interopérabilité géospatiale."
      },
      {
        "term": "OMM",
        "definition": "Abréviation de l’Organisation météorologique mondiale. L’OMM mène ses activités par l’intermédiaire de programmes scientifiques et techniques tels que le WOUDC."
      },
      {
        "term": "Open Geospatial Consortium",
        "definition": "Voir OGC."
      },
      {
        "term": "Organisation météorologique mondiale",
        "definition": "Voir OMM."
      },
      {
        "term": "Organisme",
        "definition": "Terme propre au WOUDC pour décrire l’institution ou l’organisme contributeur qui est responsable des soumissions de données au WOUDC."
      },
      {
        "term": "Ozone",
        "definition": "Une forme spéciale d’oxygène dont la formule chimique est O3. L’ozone de la stratosphère absorbe les rayons ultraviolets biologiquement néfastes du soleil. L’ozone est l’une des classes de données actuelles du WOUDC et comprend ces catégories de données : colonne d’ozone total (deux niveaux : quotidien et mensuel), profils verticaux lidar, profils verticaux de sonde pour l’ozone, et profils verticaux (deux niveaux : valeur N et C-Umkehr) d'Umkehrn."
      },
      {
        "term": "Ozone total",
        "definition": "Contenu de la colonne d’ozone total. Il s’agit d’une catégorie de données définie par le WOUDC. Voir ozone et unité Dobson."
      },
      {
        "term": "Période de temps d’observation",
        "definition": "Période durant laquelle les observations sont notées, souvent un jour ou deux, qui donne un seul profile."
      },
      {
        "term": "Plate-forme",
        "definition": "Voir la station."
      },
      {
        "term": "Produits de données",
        "definition": "Désigne les produits de données à valeur ajoutée comme les cartes, les résumés statistiques (les moyennes quotidiennes, par exemple), les tableaux regroupant les données sur les longueurs d’onde et les largeurs de bande, les analyses de séries temporelles, et ainsi de suite."
      },
      {
        "term": "Projet",
        "definition": "Le nom du projet (p. ex. IONS, EUVB, Antarctique)."
      },
      {
        "term": "Rayonnement ultraviolet (UV)",
        "definition": "Souvent abrégé UV. Les ondes courtes (UV-B) sont absorbées par la couche d’ozone, tandis que les rayons UV à ondes longues (UVA) passent à travers la couche d’ozone et atteignent le sol. Les données de rayonnement UV du WOUDC se situent dans les alentours des UVA et UVB (290 à 400 nm) sur le spectre électromagnétique. Les données sur les rayons UVfigurent parmi les classes de données recueillies par la WOUDC et comprennent trois catégories : à large bande, multibande, et à haute résolution."
      },
      {
        "term": "Rayonnement UV",
        "definition": "L’une des classes de données du WOUDC. Des exemples de données de rayonnement UV du WOUDC sont multibandes, à large bande et spectrales."
      },
      {
        "term": "RDF",
        "definition": [
          "Resource Description Framework - Une partie de la norme de service Web SKOS de World Wide Web Consortium (",
          { "link": { "to": "https://www.w3.org/", "type": "external", "text": "www.w3.org" } },
          ")."
        ]
      },
      {
        "term": "Régions de l’OMM",
        "definition": "L’OMM divise la Terre en six régions géographiques."
      },
      {
        "term": "Résolution des données",
        "definition": "Désigne la fréquence des données où Q = quotidiennement M = mensuellement."
      },
      {
        "term": "Révision",
        "definition": "Une mise à jour apportée à une donnée existante. Il peut s’agit d’un ajustement mineur ou d’une réécriture importante de la donnée."
      },
      {
        "term": "Service de caractéristiques web (WFS)",
        "definition": "Une interface populaire utilisée pour consulter des données géospatiales. L’utilisateur du WFS va généralement indiquer une requête personnalisée / accéder à des données géospatiales brutes. Le centre de données permet d’accéder aux données d’archive sous de nombreux formats de données, dont CSV, KML, CSV, GML, ESRI Shapefile, MapInfo, GeoJSON, et NetCDF."
      },
      {
        "term": "Service de cartes web (WMS)",
        "definition": "Une interface populaire utilisée pour visualiser des couches de données géospatiales. L’utilisateur du WMS va généralement accéder à une simple visualisation sur le web ou une application SIG dans un format d’image connu tel que PNG ou JPEG."
      },
      {
        "term": "Service de catalogue pour le web (CSW)",
        "definition": "Norme de l’Open Geospatial Consortium (OGC) pour définir des interfaces servant à découvrir, parcourir et rechercher des métadonnées sur les registres géospatiaux."
      },
      {
        "term": "SHADOZ",
        "definition": "L’abréviation de Southern Hemisphere ADditional Ozonesondes (Sondes pour l’ozone supplémentaires de l’hémisphère sud)."
      },
      {
        "term": "SHP",
        "definition": "L’abréviation et l’indicatif pour une station mobile du WOUDC (plate-forme) pour données embarquées Se réfère au type de station (plate-forme)."
      },
      {
        "term": "SIO",
        "definition": "Acronyme pour le système d’information de l’OMM responsable des télécommunications et de la gestion des données météorologiques et climatiques et de l’information à propos des eaux afin d’assurer l’uniformité et la normalisation des données, de l’information et des communications, ainsi que des procédures et normes qui y sont reliées dont se servent les membres de l’OMM."
      },
      {
        "term": "SISVAG",
        "definition": "L’abréviation pour le Système d’information de la station du VAG."
      },
      {
        "term": "SKOS",
        "definition": [
          "Simple Knowledge Organization System - Une partie de la norme du Consortium World Wide Web Service Web (",
          { "link": { "to": "https://www.w3.org/", "type": "external", "text": "www.w3.org" } },
          ")."
        ]
      },
      {
        "term": "S/N",
        "definition": "Le numéro de série de l’instrument. Il s’agit du numéro de série de l’instrument."
      },
      {
        "term": "Sonde pour l’ozone",
        "definition": "Instrument à ballon servant à mesurer la concentration en ozone atmosphérique selon l’altitude. Il s’agit d’une catégorie de données définie par le WOUDC. Voir ozone."
      },
      {
        "term": "Station",
        "definition": "La station de la plate-forme à partir de laquelle une observation est effectuée. Les stations sont des plates-formes stationnaires (y compris les tours) et des plates-formes mobiles (y compris les navires)."
      },
      {
        "term": "STN",
        "definition": "L’abréviation et l’indicatif pour une station stationnaire du WOUDC ou (plate-forme) données. Se réfère au type de station (plate-forme)."
      },
      {
        "term": "Système d’information de l’OMM",
        "definition": "Voir SIO."
      },
      {
        "term": "Type de plate-forme",
        "definition": "Voir type de station."
      },
      {
        "term": "Type de station",
        "definition": "L’abréviation est utilisée pour déterminer si une station (plate-forme) est stationnaire (STN) ou sur un navire (SHP)."
      },
      {
        "term": "Type d’instrument",
        "definition": "Le nom commun de l’instrument ou du capteur. Par exemple, le spectrophotomètre est appelé le \"Brewer\" alors que la sonde pour l’ozone Brewer-Mast est appelée la \"Brewer-Mast.\""
      },
      {
        "term": "UmkehrN14",
        "definition": "Pour les mesures obtenues à l’aide de la technique Umkehr avec 14 valeurs-N (représentant 14 angles zénithaux du soleil). Il s’agit d’une catégorie de données définie par le WOUDC. Se référer à l'ozone."
      },
      {
        "term": "Unité Dobson (UD)",
        "definition": "Unité de mesure qui permet d’évaluer la densité d’une colonne atmosphérique d’ozone, utilisée pour mesurer la colonne d’ozone total, laquelle est dominée par l’ozone présent dans la couche d’ozone stratosphérique."
      },
      {
        "term": "UTC",
        "definition": "L’abréviation uniformisée pour le temps universel coordonné. Il s’agit de l’heure officielle dans tous les pays. L’OMM a adopté l’UTC en tant que temps standard dans tous ses rapports de données météorologiques."
      },
      {
        "term": "UV à large bande",
        "definition": "Relevés des rayonnements UVA, UVB ou des rayons UV à effet érythémateux.Il s’agit d’une catégorie de données définie par le WOUDC. Voir rayonnement ultraviolet."
      },
      {
        "term": "UV multibande",
        "definition": "Mesuré à l’aide de quelques filtres passe-bande discrets avec une résolution spectrale de 2 à 10 miles nautiques de largeur totale à mi-hauteur. Il s’agit d’une catégorie de données définie par le WOUDC. Voir rayonnement ultraviolet."
      },
      {
        "term": "UV spectral",
        "definition": "Le rayonnement est mesuré par une bande spectrale continue d’une résolution inférieure ou égale à 2 miles nautiques. Il s’agit d’une catégorie de données définie par le WOUDC. Voir rayonnement ultraviolet."
      },
      {
        "term": "VAG",
        "definition": "L’abréviation qui désigne le programme Veille de l’atmosphère du globe de l’Organisation météorologique mondiale (OMM). Le programme VAG a étéinstauré en 1991 pour fournir des données scientifiques sur la composition chimique de l’atmosphère."
      },
      {
        "term": "Veille de l’atmosphère du globe",
        "definition": "Voir VAG."
      },
      {
        "term": "Version des données",
        "definition": "Version des données définie par l’organisme qui les soumet. Ces versions se présentent sous une forme majeure.mineure (3.2, par exemple)."
      },
      {
        "term": "Version du format de fichier",
        "definition": [
          "Terme propre au WOUDC pour décrire le format d’un fichier de données. Les fichiers de données portant sur un sujet précis contiendront toujours les tableaux et les champs définis par le WOUDC pour ce formulaire. Consulter le ",
          { "link": { "to": "contributors-registration", "text": "formulaire d’inscription des contributeurs" } },
          "."
        ]
      },
      {
        "term": "WOUDC",
        "definition": "Le Centre mondial de données sur l’ozone et le rayonnement ultraviolet."
      },
      {
        "term": "",
        "definition": ""
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
  nuxtI18n: {
    paths: {
      en: '/glossary',
      fr: '/glossaire'
    }
  }
}
</script>
