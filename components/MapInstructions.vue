<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <strong>{{ $t('common.map-instructions.label') }}</strong>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <i18n path="common.map-instructions.body-panning" tag="p">
          <template v-slot:panning>
            <strong>{{ $t('common.map-instructions.panning') }}</strong>
          </template>
          <template v-slot:tab>
            <kbd>{{ $t('common.map-instructions.tab') }}</kbd>
          </template>
        </i18n>
        <i18n path="common.map-instructions.body-zooming" tag="p">
          <template v-slot:zooming>
            <strong>{{ $t('common.map-instructions.zooming') }}</strong>
          </template>
          <template v-slot:tab>
            <kbd>{{ $t('common.map-instructions.tab') }}</kbd>
          </template>
          <template v-slot:plus>
            <kbd>+</kbd>
          </template>
          <template v-slot:minus>
            <kbd>-</kbd>
          </template>
        </i18n>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'MapInstructions'
}
</script>
