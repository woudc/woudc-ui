<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <p>{{ $t('blurb') }}</p>
    <v-data-table
      :headers="headers"
      :items="rows"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.link="link">
        <td>
          <a :href="link.item.to">
            {{ link.item.text }}
          </a>
        </td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Standard Operating Procedures",
    "blurb": "Links to Standard Operating Procedures (SOP) related to Ozone and UV Radiation data.",
    "headers": [
       {
        "text": "Category",
        "value": "category"
       },
       {
        "text": "SOP",
        "value": "link"
       },
       {
        "text": "Source",
        "value": "source"
       }
    ],
    "table-rows": [
      {
        "category": "Brewer SOP",
        "text": "SOP Manual for the Brewer Spectrophotometer",
        "to": "https://woudc.org/archive/Documentation/SOP_Documents",
        "source": "Environment and Climate Change Canada"
      },
      {
        "category": "Dobson SOP",
        "text": "Operations Handbook - Ozone Observations with a Dobson Spectrophotometer",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/GAW183-Dobson-WEB.pdf",
        "source": "GAW Report No. 183"
      },
      {
        "category": "Ozone QA/QC",
        "text": "Quality Assurance and Quality Control for Ozonesonde Measurements in GAW",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/GAW_201.pdf",
        "source": "GAW Report No. 201"
      },
      {
        "category": "UV Data Quality",
        "text": "Data Quality Objectives (DQO) for Solar Ultraviolet Radiation Measurements (Part I). Addendum to WMO/GAW Report No. 146 - Quality Assurance in Monitoring Solar Ultraviolet Radiation: State of the Art",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/Final_GAW198_18_June.pdf",
        "source": "GAW Report No. 198"
      },
      {
        "category": "UV Instruments",
        "text": "Instruments to Measure Solar Ultraviolet Radiation Part 4: Array Spectroradiometers",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/GAW191_TD_No_1538_web.pdf",
        "source": "GAW Report No. 191"
      },
      {
        "category": "UV Study",
        "text": "Intercomparison of Global UV Index from Multiband Radiometers: Harmonization of Global UVI and Spectral Irradiance",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/GAW190_TD_No_1537_web.pdf",
        "source": "GAW Report No. 190"
      }
    ]
  },
  "fr": {
    "title": "Procédures d'utilisation normalisées",
    "blurb": "Liens vers les Procédures d'utilisation normalisées (PUN) sur l’ozone et les rayons UV Données sur le rayonnement.",
    "headers": [
       {
        "text": "Catégorie",
        "value": "category"
       },
       {
        "text": "PUN",
        "value": "link"
       },
       {
        "text": "Source",
        "value": "source"
       }
    ],
    "table-rows": [
      {
        "category": "PUN de Brewer",
        "text": "Manuel de PUN pour le spectrophotomètre Brewer",
        "to": "https://woudc.org/archive/Documentation/SOP_Documents",
        "source": "Environnement et Changement climatique Canada"
      },
      {
        "category": "PUN Dobson",
        "text": "Guide des opérations - observation de l’ozone avec un spectrophotomètre de Dobson",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/GAW183-Dobson-WEB.pdf",
        "source": "Rapport VAG no 183"
      },
      {
        "category": "AQ/CQ ozone",
        "text": "Assurance de la qualité et contrôle de la qualité des relevés des sondes pour l’ozone de la VAG",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/GAW_201.pdf",
        "source": "Rapport VAG no 201"
      },
      {
        "category": "Qualité des données sur le rayonnement UV",
        "text": "Objectifs de qualité des données (OQD) pour le rayonnement solaire ultravioletRelevés (Partie I). Addenda au rapport OMM/VAG no 146 - Qualité Assurance de la surveillance du rayonnement solaire ultraviolet : État actuel de la technologie",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/Final_GAW198_18_June.pdf",
        "source": "Rapport VAG no 198"
      },
      {
        "category": "Instruments pour les UV",
        "text": "Instruments servant à la mesure du rayonnement solaire ultraviolet Partie 4 : Dispositif Spectroradiomètres",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/GAW191_TD_No_1538_web.pdf",
        "source": "Rapport VAG no 191"
      },
      {
        "category": "Étude des UV",
        "text": "Comparaison corrélative de l’index UV mondial relevé par les radiomètres multibandes : Harmonisation de l’index UV mondial et de l’irradiance spectrale",
        "to": "https://www.wmo.int/pages/prog/arep/gaw/documents/GAW190_TD_No_1537_web.pdf",
        "source": "Rapport VAG no 190"
      }
    ]
  }
}
</i18n>

<script>
export default {
  computed: {
    headers() {
      return this.$i18nToArray(this.$t('headers')).map((definition) => {
        return {
          text: definition.text,
          align: 'left',
          sortable: false,
          value: definition.value
        }
      })
    },
    rows() {
      return this.$i18nToArray(this.$t('table-rows'))
    }
  },
  nuxtI18n: {
    paths: {
      en: '/sop',
      fr: '/sop-in-fr'
    }
  }
}
</script>
