<template>
  <div>
    <v-expansion-panels accordion hover>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
          {{ $t('data.products.normal-ozone-maps.infoAboutNormals') }}
          <template #actions>
            <v-icon color="info">mdi-information</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- prettier-ignore -->
          <v-alert color="info" outlined text border="left">
            <span>{{ $t('data.products.normal-ozone-maps.aboutNormalOzoneMaps') }}</span>
          </v-alert>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'NormalOzoneMapsInfo',
}
</script>

<style scoped></style>
