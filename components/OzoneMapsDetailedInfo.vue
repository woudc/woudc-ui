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
        <!-- prettier-ignore -->
        <v-expansion-panel-content>
          <v-alert color="info" outlined text border="left">
            <p>{{ $t('data.products.ozone_maps.dataObtainedFrom') }}</p>
            <ul>
              <i18n path="data.products.ozone_maps.dataSourcesFrom.toms" tag="li">
                <template #tomsFullName>
                  <a href="https://science.nasa.gov/missions/toms/" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.tomsFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #nasa>
                  <a href="https://www.nasa.gov/" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.nasa') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #earthProbe>
                  <a href="https://science.nasa.gov/missions/toms/" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.earthProbe') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>
              <i18n path="data.products.ozone_maps.dataSourcesFrom.omi" tag="li">
                <template #omiFullName>
                  <a href="" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.omiFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #nivrFullName>
                  <a href="https://www.spaceoffice.nl/en/" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.nivrFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #fmiFullName>
                  <a href="https://www.ilmatieteenlaitos.fi" hreflang="fi" target="_blank">{{ $t('data.products.ozone_maps.fmiFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #nasa>
                  <a href="https://www.nasa.gov" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.nasa') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #eos>
                  <a href="https://eospso.gsfc.nasa.gov" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.eos') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #aura>
                  <a href="https://aura.gsfc.nasa.gov" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.aura') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #nasaTomsSite>
                  <a href="https://science.nasa.gov/mission/toms-ep/" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.nasaTomsSite') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>
              <i18n path="data.products.ozone_maps.dataSourcesFrom.smoba" tag="li">
                <template #noaa>
                  <a href="https://www.noaa.gov" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.noaa') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #smobaFullName>
                  <a href="https://www.cpc.ncep.noaa.gov/products/stratosphere/SMOBA" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.smobaFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>
              <i18n path="data.products.ozone_maps.dataSourcesFrom.tovs" tag="li">
                <template #noaa>
                  <a href="https://www.noaa.gov" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.noaa') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #tovsFullName>
                  <a href="https://www.ozonelayer.noaa.gov/action/tovs.htm" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.tovsFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>
              <i18n path="data.products.ozone_maps.dataSourcesFrom.gome" tag="li">
                <template #gomeFullName>
                  <a href="https://earth.esa.int/eogateway/instruments/gome" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.gomeFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #esaFullName>
                  <a href="https://www.esa.int" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.esaFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #ers2>
                  <a href="https://www.esa.int/Enabling_Support/Operations/ERS-2" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.ers2') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #gome2>
                  <a href="https://www.esa.int/Applications/Observing_the_Earth/Meteorological_missions/MetOp/About_GOME-2" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.gome2') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #eumetsat>
                  <a href="https://www.eumetsat.int" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.eumetsat') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #metOpA>
                  <a href="https://www.eumetsat.int/our-satellites/metop-series" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.metOpA') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>
              <i18n path="data.products.ozone_maps.dataSourcesFrom.toast" tag="li">
                <template #noaa>
                  <a href="https://www.noaa.gov" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.noaa') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #toast>
                  <a href="https://www.ospo.noaa.gov/Products/atmosphere/ntoast/index.html" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.toast') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>
            </ul>

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
                    {{ $t('data.products.ozone_maps.saozInstruments') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
                <template #eccc>
                  <a
                    :href="eccc[$i18n.locale]"
                    :hreflang="$i18n.locale" target="_blank">
                    {{ $t('contact.mail-address.eccc') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
                <template #russianCentralAerologicalObservatory>
                  <a
                    href="https://www.cao-rhms.ru/"
                    hreflang="en" target="_blank">
                    {{ $t('data.products.ozone_maps.russianCentralAerologicalObservatory') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
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
                    {{ $t('data.products.ozone_maps.tomsFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
                <template #nasa>
                  <a
                    href="https://www.nasa.gov/"
                    hreflang="en" target="_blank">
                    {{ $t('data.products.ozone_maps.nasa') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
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
                    {{ $t('data.products.ozone_maps.tovsFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
                <template #noaa>
                  <a
                    href="https://www.noaa.gov"
                    hreflang="en" target="_blank">
                    {{ $t('data.products.ozone_maps.noaa') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
              </i18n>

              <dt>{{ $t('data.products.ozone_maps.dt.gome') }}</dt>
              <i18n
                path="data.products.ozone_maps.dd.gome"
                tag="dd"
              >
                <template #gomeFullName>
                  <a
                    href="https://wdc.dlr.de/sensors/gome"
                    hreflang="en" target="_blank">
                    {{ $t('data.products.ozone_maps.gomeFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
                <template #esaFullName>
                  <a
                    href="https://www.noaa.gov"
                    hreflang="en" target="_blank">
                    {{ $t('data.products.ozone_maps.esaFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
                <template #ers2FullName>
                  <a
                    href="https://www.deos.tudelft.nl/ers/ers2info.html"
                    hreflang="en" target="_blank">
                    {{ $t('data.products.ozone_maps.ers2FullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
                <template #gome2>
                  <a
                    href="https://wdc.dlr.de/sensors/gome2"
                    hreflang="en" target="_blank">
                    {{ $t('data.products.ozone_maps.gome2') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
                <template #metOpA>
                  <a
                    href="https://www.esa.int/Applications/Observing_the_Earth/MetOp_overview"
                    hreflang="en" target="_blank">
                    {{ $t('data.products.ozone_maps.metOpA') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
                <template #wdcrsatFullName>
                  <a
                    href="https://wdc.dlr.de"
                    hreflang="en" target="_blank">
                    {{ $t('data.products.ozone_maps.wdcrsatFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
              </i18n>

              <dt>{{ $t('data.products.ozone_maps.dt.knmiAnalysis') }}</dt>
              <i18n
                path="data.products.ozone_maps.dd.knmiAnalysis"
                tag="dd"
              >
                <template #gomeFastDeliveryService>
                  <a href="https://www.knmi.nl/kennis-en-datacentrum/publicatie/a-fast-delivery-system-of-the-retrieval-of-near-real-time-ozone-colomns-from-gome-data" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.gomeFastDeliveryService') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #sciamachy>
                  <a href="https://earth.esa.int/eogateway/instruments/sciamachy" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.sciamachy') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #envisat>
                  <a href="https://earth.esa.int/eogateway/missions/envisat" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.envisat') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #temis>
                  <a href="https://www.temis.nl" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.temis') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #knmiFullName>
                  <a href="https://www.knmi.nl/home" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.knmiFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>

              <dt>{{ $t('data.products.ozone_maps.dt.smoba') }}</dt>
              <i18n
                path="data.products.ozone_maps.dd.smoba"
                tag="dd"
              >
                <template #noaa>
                  <a href="https://www.noaa.gov" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.noaa') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #smobaFullName>
                  <a href="https://www.cpc.ncep.noaa.gov/products/stratosphere/SMOBA" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.smobaFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>

              <dt>{{ $t('data.products.ozone_maps.dt.toast') }}</dt>
              <i18n
                path="data.products.ozone_maps.dd.toast"
                tag="dd"
              >
                <template #noaa>
                  <a href="https://www.noaa.gov" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.noaa') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #toastFullName>
                  <a href="https://www.ospo.noaa.gov/Products/atmosphere/ntoast/index.html" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.toastFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>

              <dt>{{ $t('data.products.ozone_maps.dt.ncep') }}</dt>
              <i18n
                path="data.products.ozone_maps.dd.ncep"
                tag="dd"
              >
                <template #ncepFullName>
                  <a href="https://www.weather.gov/ncep" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.ncepFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
                <template #noaaFullName>
                  <a href="https://www.noaa.gov" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.noaaFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>

              <dt>{{ $t('data.products.ozone_maps.dt.knmiForecasts') }}</dt>
              <i18n
                path="data.products.ozone_maps.dd.knmiForecasts"
                tag="dd"
              >
                <template #knmiFullName>
                  <a href="https://www.knmi.nl/home" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.knmiFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>

              <dt>{{ $t('data.products.ozone_maps.dt.totalOzone') }}</dt>
              <i18n
                path="data.products.ozone_maps.dd.totalOzone"
                tag="dd"
              >
                <template #dobsonUnits>
                  <a href="https://en.wikipedia.org/wiki/Dobson_unit" hreflang="en" target="_blank">{{ $t('data.products.ozone_maps.dobsonUnits') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>

              <dt>{{ $t('data.products.ozone_maps.dt.deviationFromNormal') }}</dt>
              <i18n
                path="data.products.ozone_maps.dd.deviationFromNormal"
                tag="dd"
              >
                <template #19781988level>
                  <a :href="`https://exp-studies.tor.ec.gc.ca/clf2/${$i18n.locale}/normalozone.html`" :hreflang="$i18n.locale" target="_blank">{{ $t('data.products.ozone_maps.19781988level') }}<v-icon x-small>mdi-open-in-new</v-icon></a>
                </template>
              </i18n>
            </dl>

            <p>{{ $t('data.products.ozone_maps.illustrationPurposes') }}</p>
          </v-alert>
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
