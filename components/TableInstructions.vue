<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <strong>{{ $t('common.table-instructions.label') }}</strong>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <i18n path="common.table-instructions.body-filtering" tag="p">
          <template #filtering>
            <strong>{{ $t('common.table-instructions.filtering') }}</strong>
          </template>
        </i18n>
        <i18n path="common.table-instructions.body-sorting" tag="p">
          <template #sorting>
            <strong>{{ $t('common.table-instructions.sorting') }}</strong>
          </template>
        </i18n>
        <i18n path="common.table-instructions.body-paging" tag="p">
          <template #paging>
            <strong>{{ $t('common.table-instructions.paging') }}</strong>
          </template>
        </i18n>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'TableInstructions',
}
</script>
