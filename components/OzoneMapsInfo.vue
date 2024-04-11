<template>
  <div>
    <v-expansion-panels accordion hover>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          {{ $t('data.products.ozone_maps.ozoneMapsInfo') }}
          <template #actions>
            <v-icon color="info">mdi-information</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- prettier-ignore -->
          <v-alert color="info" outlined text border="left">
            <i18n path="data.products.ozone_maps.totalOzoneInDobsonUnits" tag="p">
              <template #dobsonUnits>
                <a
                  :href="dobsonUnitWiki.en"
                  hreflang="en"
                  target="_blank"
                >{{ $t('data.products.ozone_maps.dobsonUnits') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
            </i18n>
            <i18n path="data.products.ozone_maps.mapsDescIntro" tag="p">
              <template #tomsFullName>
                <a
                  href="https://science.nasa.gov/missions/toms/"
                  hreflang="en"
                  target="_blank"
                >
                  {{ $t('data.products.ozone_maps.tomsFullName') }}<v-icon x-small>mdi-open-in-new</v-icon></a></template>
            </i18n>

            <p>{{ $t('data.products.ozone_maps.mapsDescUpdateDaily') }}</p>

            <!-- <p>
              {{ $t('data.products.ozone_maps.mapsDescNumbersDobsonUnits') }}
            </p> -->
          </v-alert>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-alert type="warning" outlined text class="mt-2">
      <strong>{{ $t('common.warning') }}</strong>
      {{ $t('data.products.ozone_maps.mapsDescWarningRealtime') }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'OzoneMapsInfo',
  data() {
    return {
      dobsonUnitWiki: {
        en: 'https://en.wikipedia.org/wiki/Dobson_unit',
        fr: 'https://fr.wikipedia.org/wiki/Unit%C3%A9_Dobson',
      },
    }
  },
}
</script>

<style scoped>
.icon-header {
  flex: 0 0 auto;
}
</style>
