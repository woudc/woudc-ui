<template>
  <products-page
    :title="$t('title')"
    :instructions="$t('instructions')"
    dataset="OzoneSonde"
    hide-instruments
  />
</template>

<i18n>
{
  "en": {
    "title": "Ozonesonde Plots",
    "instructions": [
      "Select a ",
      { "bold": "station" },
      " to start. A list of ",
      { "bold": "years" },
      " will be provided in which data is available for that station. Either select all years or a specific year.",
      { "newlines": 2 },
      "Submit the search to display ozonesonde plots for the selected station and year(s). The following types of ozonesonde plots are provided for each calendar year selected:",
      { "newlines": 1 },
      [
        [
          { "bold": "Annual Profile Graph of Ozone Partial Pressure:" },
          " Plots of the time-altitude cross-section of the ozone partial pressure measured by ECC ozonesondes"
        ],
        [
          { "bold": "Annual Profile Graph of Temperature:" },
          " Plots of the time-altitude cross-section of the temperature measured by ECC ozonesondes"
        ],
        [
          { "bold": "Ozonesonde Flight Graphs:" },
          " Plots presenting the measurements took during every flight in that year at that station; for every flight observation, pressure is plotted against ozone partial pressure in blue and altitude is plotted against temperature in red"
        ]
      ],
      { "newlines": 1 },
      "Ozonesonde plots are grouped by year in the search result."
    ]
  },
  "fr": {
    "title": "Schémas de sondes pour l’ozone",
    "instructions": [
      "Sélectionner une ",
      { "bold": "station" },
      " pour démarrer. Il en résultera une liste d'",
      { "bold": "années" },
      " pour lesquelles des données sont disponibles à la station. Veuillez sélectionner soit toutes les années soit une année spécifique.",
      { "newlines": 2 },
      "Lancer la recherche pour afficher les graphiques de sonde pour l’ozone pour l'année et la station sélectionnée. Les graphiques de sonde pour l’ozone sont présentés pour chaque année sélectionée :",
      { "newlines": 1 },
      [
        [
          { "bold": "Graphique du profil annuel de la Pression partielle d'ozone :" },
          " Graphique d'une coupe temps-altitude pour la pression partielle d'ozone mesurée par les sondes pour l’ozone d'ECC"
        ],
        [
          { "bold": "Graphique du profil annuel de la température :" },
          " Graphique d'une coupe temps-altitude pour la température mesurée par les sondes pour l’ozone d'ECC"
        ],
        [
          { "bold": "Graphiques de vol de la sonde à ozone :" },
          " Les graphiques présentent les mesures acquises pour chaque envolée de l'année à la station ; pour chaque observation d'envolée, la pression est présentée avec la pression partielle en bleu, et l'altitude est présentée avec la température en rouge"
        ]
      ],
      { "newlines": 1 },
      "Les graphiques de sonde pour l’ozone sont regroupés par année dans les résultats de recherche."
    ]
  }
}
</i18n>

<script>
import ProductsPage from '~/components/Products'

export default {
  components: {
    'products-page': ProductsPage
  },
  nuxtI18n: {
    paths: {
      en: '/ozonesonde',
      fr: '/sondeslozone'
    }
  }
}
</script>
