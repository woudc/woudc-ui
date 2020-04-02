<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <woudc-blurb :items="$t('blurb1')" />
    <v-data-table
      :headers="headers"
      :items="rows"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.formats="props">
        <td>
          <ul>
            <li v-for="link in props.item.formats" :key="link.to">
              <a :href="link.to">
                {{ link.text }}
              </a>
            </li>
          </ul>
        </td>
      </template>
      <template v-slot:item.services="props">
        <td>
          <ul>
            <li v-for="link in props.item.services" :key="link.to">
              <a :href="link.to">
                {{ link.text }}
              </a>
            </li>
          </ul>
        </td>
      </template>
    </v-data-table>
    <woudc-blurb :items="$t('blurb2')" />
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Standards",
    "blurb1": [
      "WOUDC adheres to open standards which enable interoperability (discovery, access, visualization). Standards play an important role in ",
      { "link": { "to": "https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf", "type": "external", "text": "World Meteorological Organization interoperability" } },
      " as part of the ",
      { "link": { "to": "https://www.wmo.int/pages/prog/www/WIS/", "type": "external", "text": "WMO Information System" } },
      " and are supported by numerous off the shelf open source or commercial tools."
    ],
    "blurb2": [
      "More information can be found on the ",
      { "link": { "to": "about-dataaccess", "text": "Data Access page" } },
      "."
    ],
    "headers": [
      {
        "text": "Resources",
        "value": "resource"
      },
      {
        "text": "Format/Encoding",
        "value": "formats"
      },
      {
        "text":  "Service/API",
        "value": "services"
      }
    ],
    "links": [
      {
        "resource": "Discovery Metadata",
        "formats": [
          {
            "text": "ISO 19115 WMO Core Metadata Profile",
            "to": "https://www.wmo.int/pages/prog/www/metadata/WMO-core-metadata.html"
          }
        ],
        "services": [
          {
            "text": "OGC:CSW",
            "to": "https://www.opengeospatial.org/standards/cat"
          },
          {
            "text": "OAI-PMH",
            "to": "https://www.openarchives.org/pmh/"
          },
          {
            "text": "OpenSearch",
            "to": "http://www.opensearch.org/"
          }
        ]
      },
      {
        "resource": "Station Metadata",
        "formats": [
          {
            "text": "OGC:GML",
            "to": "https://www.opengeospatial.org/standards/gml"
          },
          {
            "text": "WIGOS",
            "to": "https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf"
          }
        ],
        "services": [
          {
            "text": "OGC:WMS",
            "to": "https://www.opengeospatial.org/standards/wms"
          },
          {
            "text": "OGC:WFS",
            "to": "https://www.opengeospatial.org/standards/wfs"
          }
        ]
      },
      {
        "resource": "Instrument Metadata",
        "formats": [
          {
            "text": "OGC:GML",
            "to": "https://www.opengeospatial.org/standards/gml"
          },
          {
            "text": "WIGOS",
            "to": "https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf"
          }
        ],
        "services": [
          {
            "text": "OGC:WMS",
            "to": "https://www.opengeospatial.org/standards/wms"
          },
          {
            "text": "OGC:WFS",
            "to": "https://www.opengeospatial.org/standards/wfs"
          }
        ]
      },
      {
        "resource": "Observations",
        "formats": [
          {
            "text": "CSV",
            "to": "https://en.wikipedia.org/wiki/Comma-separated_values"
          },
          {
            "text": "GeoJSON",
            "to": "https://geojson.org/"
          },
          {
            "text": "OGC:GML",
            "to": "https://www.opengeospatial.org/standards/gml"
          },
          {
            "text": "WIGOS",
            "to": "https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf"
          }
        ],
        "services": [
          {
            "text": "OGC:WMS",
            "to": "https://www.opengeospatial.org/standards/wms"
          },
          {
            "text": "OGC:WFS",
            "to": "https://www.opengeospatial.org/standards/wfs"
          }
        ]
      }
    ]
  },
  "fr": {
    "title": "Normes",
    "blurb1": [
      "Les services web du WOUDC se conforment aux normes ouvertes ratifiées par l’",
      { "link": { "to": "https://opengeospatial.org/", "type": "external", "text": "Open Geospatial Consortium (OGC)" } },
      " et l’",
      { "link": { "to": "https://www.isotc211.org/", "type": "external", "text": "International Organization for Standardization" } },
      " (ISO) qui assurent l’interopérabilité des données, en facilitant ainsi la découverte, l’accessibilité, la visualisation et l’intégration. Les normes de l’OGC et de l’Organisation internationale de normalisation (ISO) jouent un rôle prépondérant dans l’",
      { "link": { "to": "https://www.wmo.int/pages/prog/www/WIS/documents/MOAWMO_OGC.pdf", "type": "external", "text": "interopérabilité de l’Organisation météorologique mondiale" } },
      " où elles font partie intégrante du ",
      { "link": { "to": "https://www.wmo.int/pages/prog/www/WIS/", "type": "external", "text": "système d’information de l’OMM" } },
      " et sont prises en charge par de nombreuses sources libres grand public ou outils commerciaux."
    ],
    "blurb2": " ",
    "headers": [
      {
        "text": "Ressource",
        "value": "resource"
      },
      {
        "text": "Format/Codage",
        "value": "formats"
      },
      {
        "text":  "Services web",
        "value": "services"
      }
    ],
    "links": [
      {
        "resource": "Métadonnées de découverte",
        "formats": [
          {
            "text": "ISO 19115 WMO Core Metadata Profile",
            "to": "https://www.wmo.int/pages/prog/www/metadata/WMO-core-metadata.html"
          }
        ],
        "services": [
          {
            "text": "OGC:CSW",
            "to": "https://www.opengeospatial.org/standards/cat"
          },
          {
            "text": "OAI-PMH",
            "to": "https://www.openarchives.org/pmh/"
          },
          {
            "text": "OpenSearch",
            "to": "http://www.opensearch.org/"
          }
        ]
      },
      {
        "resource": "Station de métadonnées",
        "formats": [
          {
            "text": "OGC:GML",
            "to": "https://www.opengeospatial.org/standards/gml"
          },
          {
            "text": "WIGOS",
            "to": "https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf"
          }
        ],
        "services": [
          {
            "text": "OGC:WMS",
            "to": "https://www.opengeospatial.org/standards/wms"
          },
          {
            "text": "OGC:WFS",
            "to": "https://www.opengeospatial.org/standards/wfs"
          }
        ]
      },
      {
        "resource": "Métadonnées des instruments",
        "formats": [
          {
            "text": "OGC:GML",
            "to": "https://www.opengeospatial.org/standards/gml"
          },
          {
            "text": "WIGOS",
            "to": "https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf"
          }
        ],
        "services": [
          {
            "text": "OGC:WMS",
            "to": "https://www.opengeospatial.org/standards/wms"
          },
          {
            "text": "OGC:WFS",
            "to": "https://www.opengeospatial.org/standards/wfs"
          }
        ]
      },
      {
        "resource": "Observations",
        "formats": [
          {
            "text": "CSV",
            "to": "https://en.wikipedia.org/wiki/Comma-separated_values"
          },
          {
            "text": "GeoJSON",
            "to": "https://geojson.org/"
          },
          {
            "text": "OGC:GML",
            "to": "https://www.opengeospatial.org/standards/gml"
          },
          {
            "text": "WIGOS",
            "to": "https://www.wmo.int/pages/prog/www/wigos/documents/Cg-17/WIGOS_Metadata.pdf"
          }
        ],
        "services": [
          {
            "text": "OGC:WMS",
            "to": "https://www.opengeospatial.org/standards/wms"
          },
          {
            "text": "OGC:WFS",
            "to": "https://www.opengeospatial.org/standards/wfs"
          }
        ]
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
      return this.$i18nToArray(this.$t('links'))
    }
  },
  nuxtI18n: {
    paths: {
      en: '/standards',
      fr: '/normes'
    }
  }
}
</script>
