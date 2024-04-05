<template>
  <div>
    <v-expansion-panels accordion hover>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          {{ $t('data.products.ozone_maps.detailedExplanationOfTheseMaps') }}
          <template #actions>
            <v-icon color="info">mdi-information</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>{{ $t('data.products.ozone_maps.dataObtainedFrom') }}</p>
          <ul>
            <li>{{ $t('data.products.ozone_maps.dataSourcesFrom.toms') }}</li>
            <li>{{ $t('data.products.ozone_maps.dataSourcesFrom.omi') }}</li>
            <li>{{ $t('data.products.ozone_maps.dataSourcesFrom.smoba') }}</li>
            <li>{{ $t('data.products.ozone_maps.dataSourcesFrom.tovs') }}</li>
            <li>{{ $t('data.products.ozone_maps.dataSourcesFrom.gome') }}</li>
            <li>{{ $t('data.products.ozone_maps.dataSourcesFrom.toast') }}</li>
          </ul>

          <!-- prettier-ignore -->
          <dl class="mt-2">
            <dt>{{ $t('data.products.ozone_maps.dt.allSourcesBlended') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.allSourcesBlended"
              tag="dd"
            >
            </i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.groundBasedData') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.groundBasedData"
              tag="dd"
            >
              <template #saozInstruments>
                <a
                  href="https://saoz.obs.uvsq.fr/SAOZSol-UK.html"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.saozInstruments') }}</a></template>
              <template #eccc>
                <a
                  :href="eccc[$i18n.locale]"
                  :hreflang="$i18n.locale" target="_blank">
                  {{ $t('contact.mail-address.eccc') }}</a></template>
              <template #russianCentralAerologicalObservatory>
                <a
                  href="https://www.cao-rhms.ru/"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.russianCentralAerologicalObservatory') }}</a></template>
            </i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.toms') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.toms"
              tag="dd"
            >
              <template #tomsFullName>
                <a
                  href="https://science.nasa.gov/missions/toms/"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.tomsFullName') }}</a></template>
              <template #nasa>
                <a
                  href="https://www.nasa.gov/"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.nasa') }}</a></template>
            </i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.tovs') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.tovs"
              tag="dd"
            >
              <template #tovsFullName>
                <a
                  href="https://www.ospo.noaa.gov/Products/atmosphere/soundings/atovs/"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.tovsFullName') }}</a></template>
              <template #noaa>
                <a
                  href="https://www.noaa.gov/"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.noaa') }}</a></template>
            </i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.gome') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.gome"
              tag="dd"
            >
              <template #gomeFullName>
                <a
                  href="https://wdc.dlr.de/sensors/gome/"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.gomeFullName') }}</a></template>
              <template #esaFullName>
                <a
                  href="https://www.noaa.gov/"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.esaFullname') }}</a></template>
              <template #ers2FullName>
                <a
                  href="https://www.deos.tudelft.nl/ers/ers2info.html"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.ers2FullName') }}</a></template>
              <template #gome2>
                <a
                  href="https://wdc.dlr.de/sensors/gome2/"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.gome2') }}</a></template>
              <template #metOpA>
                <a
                  href="https://www.esa.int/Applications/Observing_the_Earth/MetOp_overview"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.metOpA') }}</a></template>
              <template #wdcrsatFullName>
                <a
                  href="https://wdc.dlr.de/"
                  hreflang="en" target="_blank">
                  {{ $t('data.products.ozone_maps.wdcrsatFullName') }}</a></template>
            </i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.knmiAnalysis') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.knmiAnalysis"
              tag="dd"
            ></i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.smoba') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.smoba"
              tag="dd"
            ></i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.toast') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.toast"
              tag="dd"
            ></i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.ncep') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.ncep"
              tag="dd"
            ></i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.knmiForecasts') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.knmiForecasts"
              tag="dd"
            ></i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.totalOzone') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.totalOzone"
              tag="dd"
            ></i18n>

            <dt>{{ $t('data.products.ozone_maps.dt.deviationFromNormal') }}</dt>
            <i18n
              path="data.products.ozone_maps.dd.deviationFromNormal"
              tag="dd"
            ></i18n>
          </dl>

          <p>{{ $t('data.products.ozone_maps.illustrationPurposes') }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'OzoneMapsDetailedInfo',
  data() {
    return {
      eccc: {
        en: 'https://www.canada.ca/en/environment-climate-change.html',
        fr: 'https://www.canada.ca/fr/environnement-changement-climatique.html',
      },
    }
  },
}
</script>

<style scoped>
dt {
  font-weight: bold;
}
</style>
