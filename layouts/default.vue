<template>
  <v-app>
    <v-navigation-drawer v-model="drawerOpen" temporary fixed app>
      <v-list>
        <div v-for="(group, name) in $t('links')" :key="name">
          <v-list-item
            v-if="group.sections === undefined"
            :to="localePath(group.to)"
            nuxt
          >
            <v-list-item-icon>
              <v-icon>{{ icons[name] }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="group.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-else :prepend-icon="icons[name]" :to="group.to">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="group.title" />
              </v-list-item-content>
            </template>
            <div v-for="link in group.sections" :key="link.text">
              <v-list-item v-if="link.type === 'external'">
                <v-list-item-action>
                  <v-icon>{{ icons[name] }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <a :href="link.to">{{ link.text }}</a>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-else :to="localePath(link.to)" nuxt>
                <v-list-item-action>
                  <v-icon>{{ icons[name] }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="link.text" />
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawerOpen = !drawerOpen" />
      <v-toolbar-title v-text="$t('title')" />
      <v-spacer />
      <nuxt-link v-if="locale === 'fr'" :to="switchLocalePath('en')">
        English
      </nuxt-link>
      <nuxt-link v-if="locale === 'en'" :to="switchLocalePath('fr')">
        Français
      </nuxt-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<i18n>
{
  "en": {
    "about": "About",
    "contributors": "Contributors",
    "data": "Data",
    "home": "Home",
    "resources": "Resources",
    "news": "News",
    "title": "World Ozone and Ultraviolet Radiation Data Centre",
    "links": {
      "home": {
        "title": "Home",
        "to": "index"
      },
      "data": {
        "title": "Data",
        "sections": [
          {
            "text": "Data Search",
            "to": "data-explore"
          },
          {
            "text": "Products",
            "to": "data-products"
          },
          {
            "text": "Summary",
            "to": "data-datasetinfo"
          },
          {
            "text": "Stations List",
            "to": "data-stations"
          },
          {
            "text": "Instruments List",
            "to": "data-instruments"
          }
        ]
      },
      "contributors": {
        "title": "Contributors",
        "sections": [
          {
            "text": "Contributor Guide",
            "type": "external",
            "to": "https://guide.woudc.org"
          },
          {
            "text": "Registration",
            "to": "contributors-registration"
          },
          {
            "text": "Contributor List",
            "to": "contributors"
          },
          {
            "text": "Data Submission",
            "to": "contributors-submission"
          },
          {
            "text": "Data Validation",
            "to": "contributors-validation"
          }
        ]
      },
      "resources": {
        "title": "Resources",
        "sections": [
          {
            "text": "Standard Operating Procedures",
            "to": "resources-sop"
          },
          {
            "text": "Working Groups",
            "to": "resources-workinggroups"
          },
          {
            "text": "Related Data Links",
            "to": "resources-links"
          },
          {
            "text": "Software",
            "type": "external",
            "to": "https://github.com/woudc/woudc/wiki"
          }
        ]
      },
      "news": {
        "title": "News",
        "to": "news"
      },
      "about": {
        "title": "About",
        "sections": [
          {
            "text": "About WOUDC",
            "to": "about"
          },
          {
            "text": "Data Quality",
            "to": "about-dataquality"
          },
          {
            "text": "Data Use Policy",
            "to": "about-datapolicy"
          },
          {
            "text": "Standards",
            "to": "about-standards"
          },
          {
            "text": "Data Access",
            "to": "about-dataaccess"
          },
          {
            "text": "File Formats",
            "to": "about-formats"
          },
          {
            "text": "Glossary",
            "to": "about-glossary"
          },
          {
            "text": "FAQ",
            "to": "about-faq"
          }
        ]
      }
    }
  },
  "fr": {
    "title": "Centre mondial de données sur l’ozone et le rayonnement ultraviolet",
    "links": {
      "home": {
        "title": "Accueil",
        "to": "index"
      },
      "data": {
        "title": "Données",
        "sections": [
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
      },
      "contributors": {
        "title": "Contributeurs",
        "sections": [
          {
            "text": "Guide du contributeur",
            "type": "external",
            "to": "https://guide.woudc.org"
          },
          {
            "text": "Inscription",
            "to": "contributors-registration"
          },
          {
            "text": "Liste des contributeurs",
            "to": "contributors"
          },
          {
            "text": "Soumission de données",
            "to": "contributors-submission"
          },
          {
            "text": "Validateur de données",
            "to": "contributors-validation"
          }
        ]
      },
      "resources": {
        "title": "Ressources",
        "sections": [
          {
            "text": "Procédures d'utilisation normalisées",
            "to": "resources-sop"
          },
          {
            "text": "Groupes de travail",
            "to": "resources-workinggroups"
          },
          {
            "text": "Liens de données connexes",
            "to": "resources-links"
          },
          {
            "text": "Logiciel",
            "type": "external",
            "to": "https://github.com/woudc/woudc/wiki"
          }
        ]
      },
      "news": {
        "title": "Nouvelles",
        "to": "news"
      },
      "about": {
        "title": "À propos",
        "sections": [
          {
            "text": "Qu’est-ce que le WOUDC",
            "to": "about"
          },
          {
            "text": "Qualité des données",
            "to": "about-dataquality"
          },
          {
            "text": "Politique d’utilisation des données",
            "to": "about-datapolicy"
          },
          {
            "text": "Normes",
            "to": "about-standards"
          },
          {
            "text": "Accessibilité des données",
            "to": "about-dataaccess"
          },
          {
            "text": "Formats de fichier",
            "to": "about-formats"
          },
          {
            "text": "Glossaire",
            "to": "about-glossary"
          },
          {
            "text": "FAQ",
            "to": "about-faq"
          }
        ]
      }
    }
  }
}
</i18n>

<script>
export default {
  data() {
    return {
      drawerOpen: false,
      icons: {
        home: 'mdi-apps',
        data: 'mdi-database',
        contributors: 'mdi-account-group',
        resources: 'mdi-book-open-variant',
        news: 'mdi-newspaper',
        about: 'mdi-information'
      }
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    }
  }
}
</script>
