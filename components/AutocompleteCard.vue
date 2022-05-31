<template>
  <v-card class="mb-5">
    <v-card-title class="mx-2 pb-0">
      {{ $t('common.filtering.title') }}
    </v-card-title>
    <v-col class="mr-2 pt-0 d-flex align-content-start flex-wrap">
      <v-col v-for="(field, key) in distinctfields" :key="key" cols="6">
        <v-autocomplete
          v-model="filters[field.value]"
          :loading="loadingfields"
          :disabled="loadingitems"
          :items="field.array"
          :label="field.text"
          auto-select-first
          multiple
          chips
          small-chips
          deletable-chips
          @input="changeFilters($event, field.value)"
        />
      </v-col>
    </v-col>
    <div class="pb-5 px-3">
      <v-tooltip
        v-model="toolTipOn"
        class="mt-1 mb-4 align-content-start"
        bottom
      >
        <template #activator="{ onBadge }">
          <v-badge
            :value="searchOutOfDate"
            class="mx-2"
            icon="mdi-refresh"
            color="green"
            bordered
            overlap
            v-on="onBadge"
          >
            <v-btn
              class="btn-left"
              color="primary"
              :disabled="loadingitems"
              :loading="loadingitems"
              @mouseover="onButton = true"
              @mouseleave="onButton = false"
              @click="refresh()"
              @input="oldSearchExists = true"
            >
              {{ $t('common.filtering.apply') }}
            </v-btn>
          </v-badge>
        </template>
        <v-card-title class="py-3">
          <v-icon class="mr-1">mdi-alert</v-icon>
          {{ $t('common.old-search.title') }}
        </v-card-title>
        <i18n path="common.old-search.body" tag="v-card-text">
          <template #search>
            <strong>{{ $t('common.filtering.apply') }}</strong>
          </template>
        </i18n>
      </v-tooltip>
      <v-btn class="btn-right" :disabled="loadingitems" @click="reset()">
        {{ $t('common.reset') }}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'AutocompleteCard',
  props: {
    bboxarray: { type: Array, required: false, default: null },
    distinctfields: { type: Object, required: true },
    enablebboxsearch: { type: Boolean, required: false, default: true },
    loadingfields: { type: Boolean, required: false, default: false },
    loadingitems: { type: Boolean, required: false, default: false },
    oldsearchparams: { type: Object, required: false, default: null },
    refresh: { type: Function, required: true },
    reset: { type: Function, required: true },
    resettingfilters: { type: Boolean, required: false, default: false },
    selectedfilters: { type: Object, required: false, default: null },
    value: { type: String, required: false, default: null },
  },
  data() {
    return {
      filters: this.selectedfilters,
      oldSearchExists: false,
      onButton: false,
      resetDone: false,
      searchOutOfDate: false,
    }
  },
  computed: {
    toolTipOn() {
      return this.searchOutOfDate && this.onButton
    },
  },
  watch: {
    bboxarray: {
      async handler() {
        this.oldSearchExists = true
        this.checkSearch()
      },
    },
    enablebboxsearch: {
      async handler() {
        this.oldSearchExists = true
        this.checkSearch()
      },
    },
    resettingfilters: {
      async handler() {
        for (const field in this.filters) {
          this.filters[field] = []
        }
        this.onbutton = false
        this.resetDone = true
        this.oldSearchExists = false
        this.searchOutOfDate = false
      },
    },
    oldsearchparams: {
      async handler() {
        this.checkSearch()
      },
      deep: true,
    },
  },
  methods: {
    async changeFilters(selections, field) {
      if (field === `country_name_${this.$i18n.locale}`) {
        this.filters['country_name'] = selections
      } else {
        this.filters[field] = selections
      }
      this.oldSearchExists = true
      this.checkSearch()
    },
    checkSearch() {
      if (this.oldSearchExists === false || this.resetDone == true) {
        if (this.oldSearchExists === true) {
          this.resetDone = false
        }
        this.oldSearchExists = false
        this.searchOutOfDate = false
      } else {
        this.searchOutOfDate = false
        for (const field in this.oldsearchparams) {
          if (field == 'bbox' || field == 'enableBboxSearch') {
            if (
              !(
                (this.oldsearchparams['bbox'][0] == this.bboxarray[0] &&
                  this.oldsearchparams['bbox'][1] == this.bboxarray[1] &&
                  this.oldsearchparams['bbox'][2] == this.bboxarray[2] &&
                  this.oldsearchparams['bbox'][3] == this.bboxarray[3] &&
                  this.oldsearchparams['enableBboxSearch'] == true &&
                  this.enablebboxsearch == true) ||
                (this.enablebboxsearch == false &&
                  this.oldsearchparams['enableBboxSearch'] == false)
              )
            ) {
              this.searchOutOfDate = true
              return
            }
          } else if (
            this.oldsearchparams[field] !== this.selectedfilters[field]
          ) {
            if (
              this.oldsearchparams[field].length ==
              this.selectedfilters[field].length
            ) {
              const isIncluded = this.oldsearchparams[field].every(
                (element, index) => {
                  if (element === this.oldsearchparams[field][index]) {
                    return true
                  }
                  return false
                }
              )
              if (isIncluded == false) {
                this.searchOutOfDate = true
              }
            } else {
              this.searchOutOfDate = true
            }
          }
        }
      }
    },
  },
}
</script>
