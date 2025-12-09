<template>
  <v-container>
    <h1>{{ $t('about.glossary.title') }}</h1>
    <p>{{ $t('about.glossary.blurb') }}</p>
    <v-row>
      <v-col>
        <div>
          <h4>{{ $t('about.glossary.terms.dataVersion.term') }}</h4>
          <i18n path="about.glossary.terms.dataVersion.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.scientificAuthority.term') }}</h4>
          <i18n
            path="about.glossary.terms.scientificAuthority.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.dataCategory.term') }}</h4>
          <i18n path="about.glossary.terms.dataCategory.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.woudc.term') }}</h4>
          <i18n path="about.glossary.terms.woudc.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.worldDataCentres.term') }}</h4>
          <i18n
            path="about.glossary.terms.worldDataCentres.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.dataClass.term') }}</h4>
          <i18n path="about.glossary.terms.dataClass.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.sourceClass.term') }}</h4>
          <i18n path="about.glossary.terms.sourceClass.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.wdc.term') }}</h4>
          <i18n path="about.glossary.terms.wdc.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.contributor.term') }}</h4>
          <i18n path="about.glossary.terms.contributor.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.supportingContributor.term') }}</h4>
          <i18n
            path="about.glossary.terms.supportingContributor.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.csw.term') }}</h4>
          <i18n path="about.glossary.terms.csw.definition" tag="p" />
        </div>
        <div>
          <h4>
            {{ $t('about.glossary.terms.dataSponsorshipStatement.term') }}
          </h4>
          <i18n
            path="about.glossary.terms.dataSponsorshipStatement.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>
            {{ $t('about.glossary.terms.scientificSponsorshipStatement.term') }}
          </h4>
          <i18n
            path="about.glossary.terms.scientificSponsorshipStatement.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.webAccessibleFolder.term') }}</h4>
          <i18n
            path="about.glossary.terms.webAccessibleFolder.definition"
            tag="p"
          >
            <template #waf>
              <a :href="WOUDC_UI_WAF_URL" target="_blank">
                <span>
                  {{ WOUDC_UI_WAF_URL }}
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </span>
              </a>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.dss.term') }}</h4>
          <i18n path="about.glossary.terms.dss.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.location.term') }}</h4>
          <i18n path="about.glossary.terms.location.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.erythemal.term') }}</h4>
          <i18n path="about.glossary.terms.erythemal.definition" tag="p">
            <template #carcinogenesis>
              <a :href="carcinogensURL" target="_blank">
                <span>
                  {{ $t('about.glossary.carcinogenesis') }}
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </span>
              </a>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.extcsv.term') }}</h4>
          <i18n path="about.glossary.terms.extcsv.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.instrumentManufacturer.term') }}</h4>
          <i18n
            path="about.glossary.terms.instrumentManufacturer.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>
            {{ $t('about.glossary.terms.extendedCommaSeparatedValue.term') }}
          </h4>
          <i18n
            path="about.glossary.terms.extendedCommaSeparatedValue.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.form.term') }}</h4>
          <i18n path="about.glossary.terms.form.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.utcOffset.term') }}</h4>
          <i18n path="about.glossary.terms.utcOffset.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.sag.term') }}</h4>
          <i18n path="about.glossary.terms.sag.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.scientificAdvisoryGroup.term') }}</h4>
          <i18n
            path="about.glossary.terms.scientificAdvisoryGroup.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.height.term') }}</h4>
          <i18n path="about.glossary.terms.height.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.woudcPlatformId.term') }}</h4>
          <i18n
            path="about.glossary.terms.woudcPlatformId.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.gawId.term') }}</h4>
          <i18n path="about.glossary.terms.gawId.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.instrument.term') }}</h4>
          <i18n path="about.glossary.terms.instrument.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.iso.term') }}</h4>
          <i18n path="about.glossary.terms.iso.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.latitude.term') }}</h4>
          <i18n path="about.glossary.terms.latitude.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.lidar.term') }}</h4>
          <i18n path="about.glossary.terms.lidar.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.longitude.term') }}</h4>
          <i18n path="about.glossary.terms.longitude.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.metadata.term') }}</h4>
          <i18n path="about.glossary.terms.metadata.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.instrumentModel.term') }}</h4>
          <i18n
            path="about.glossary.terms.instrumentModel.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.ndacc.term') }}</h4>
          <i18n path="about.glossary.terms.ndacc.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.dataLevel.term') }}</h4>
          <i18n path="about.glossary.terms.dataLevel.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.gawName.term') }}</h4>
          <i18n path="about.glossary.terms.gawName.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.instrumentSerialNumber.term') }}</h4>
          <i18n
            path="about.glossary.terms.instrumentSerialNumber.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.ogc.term') }}</h4>
          <i18n path="about.glossary.terms.ogc.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.wmo.term') }}</h4>
          <i18n path="about.glossary.terms.wmo.definition" tag="p" />
        </div>
        <div>
          <h4>
            {{ $t('about.glossary.terms.openGeospatialConsortium.term') }}
          </h4>
          <i18n
            path="about.glossary.terms.openGeospatialConsortium.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>
            {{
              $t('about.glossary.terms.worldMeteorologicalOrganization.term')
            }}
          </h4>
          <i18n
            path="about.glossary.terms.worldMeteorologicalOrganization.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.agency.term') }}</h4>
          <i18n path="about.glossary.terms.agency.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.agencyAcronym.term') }}</h4>
          <i18n path="about.glossary.terms.agencyAcronym.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.ozone.term') }}</h4>
          <i18n path="about.glossary.terms.ozone.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.totalOzone.term') }}</h4>
          <i18n path="about.glossary.terms.totalOzone.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.observationTimePeriod.term') }}</h4>
          <i18n
            path="about.glossary.terms.observationTimePeriod.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.platform.term') }}</h4>
          <i18n path="about.glossary.terms.platform.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.dataProduct.term') }}</h4>
          <i18n path="about.glossary.terms.dataProduct.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.project.term') }}</h4>
          <i18n path="about.glossary.terms.project.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.ultravioletRadiation.term') }}</h4>
          <i18n
            path="about.glossary.terms.ultravioletRadiation.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.uvRadiation.term') }}</h4>
          <i18n path="about.glossary.terms.uvRadiation.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.rdf.term') }}</h4>
          <i18n path="about.glossary.terms.rdf.definition" tag="p">
            <template #w3>
              <a :href="w3URL" target="_blank">www.w3.org</a>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.wmoRegions.term') }}</h4>
          <i18n path="about.glossary.terms.wmoRegions.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.dataResolution.term') }}</h4>
          <i18n path="about.glossary.terms.dataResolution.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.revision.term') }}</h4>
          <i18n path="about.glossary.terms.revision.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.webFeatureService.term') }}</h4>
          <i18n
            path="about.glossary.terms.webFeatureService.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.webMapService.term') }}</h4>
          <i18n path="about.glossary.terms.webMapService.definition" tag="p" />
        </div>
        <div>
          <h4>
            {{ $t('about.glossary.terms.catalogueServiceForTheWeb.term') }}
          </h4>
          <i18n
            path="about.glossary.terms.catalogueServiceForTheWeb.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.shadoz.term') }}</h4>
          <i18n path="about.glossary.terms.shadoz.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.shp.term') }}</h4>
          <i18n path="about.glossary.terms.shp.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.wis.term') }}</h4>
          <i18n path="about.glossary.terms.wis.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.gawsis.term') }}</h4>
          <i18n path="about.glossary.terms.gawsis.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.skos.term') }}</h4>
          <i18n path="about.glossary.terms.skos.definition" tag="p">
            <template #w3>
              <a :href="w3URL" target="_blank">www.w3.org</a>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.serialNumber.term') }}</h4>
          <i18n path="about.glossary.terms.serialNumber.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.ozonesonde.term') }}</h4>
          <i18n path="about.glossary.terms.ozonesonde.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.station.term') }}</h4>
          <i18n path="about.glossary.terms.station.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.stn.term') }}</h4>
          <i18n path="about.glossary.terms.stn.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.wmoInformationSystem.term') }}</h4>
          <i18n
            path="about.glossary.terms.wmoInformationSystem.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.platformType.term') }}</h4>
          <i18n path="about.glossary.terms.platformType.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.stationType.term') }}</h4>
          <i18n path="about.glossary.terms.stationType.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.instrumentType.term') }}</h4>
          <i18n path="about.glossary.terms.instrumentType.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.umkehrN14.term') }}</h4>
          <i18n path="about.glossary.terms.umkehrN14.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.dobsonUnit.term') }}</h4>
          <i18n path="about.glossary.terms.dobsonUnit.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.utc.term') }}</h4>
          <i18n path="about.glossary.terms.utc.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.broadbandUV.term') }}</h4>
          <i18n path="about.glossary.terms.broadbandUV.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.multibandUV.term') }}</h4>
          <i18n path="about.glossary.terms.multibandUV.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.spectralUV.term') }}</h4>
          <i18n path="about.glossary.terms.spectralUV.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.gaw.term') }}</h4>
          <i18n path="about.glossary.terms.gaw.definition" tag="p" />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.globalAtmosphereWatch.term') }}</h4>
          <i18n
            path="about.glossary.terms.globalAtmosphereWatch.definition"
            tag="p"
          />
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.fileFormatVersion.term') }}</h4>
          <i18n
            path="about.glossary.terms.fileFormatVersion.definition"
            tag="p"
          >
            <template #registration-page>
              <nuxt-link :to="localePath('contributors-registration')">
                <span>{{ $t('common.registration-page') }}</span>
              </nuxt-link>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.glossary.terms.woudcAbbreviation.term') }}</h4>
          <i18n
            path="about.glossary.terms.woudcAbbreviation.definition"
            tag="p"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      carcinogensURL:
        'https://www.wmo.int/pages/prog/dra/etrp/documents/926E.pdf',
      w3URL: 'https://www.w3.org/',
      WOUDC_UI_WAF_URL: this.$config.WOUDC_UI_WAF_URL,
    }
  },
  head() {
    return {
      title: this.$t('about.glossary.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('about.glossary.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('about.glossary.keywords'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/glossary',
      fr: '/a-propos/glossaire',
    },
  },
}
</script>
