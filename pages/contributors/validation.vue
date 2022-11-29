<template>
  <v-container>
    <h1>{{ $t('contributors.validation.title') }}</h1>
    <p>{{ $t('contributors.validation.blurb') }}</p>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <strong>
            {{ $t('contributors.validation.table-instructions.label') }}
          </strong>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <i18n path="contributors.validation.table-instructions.blurb" tag="p">
            <template #filtering>
              <strong>
                {{ $t('contributors.validation.table-instructions.blurb') }}
              </strong>
            </template>
          </i18n>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="mt-3">
      <h3>
        <span>
          {{ $t('contributors.validation.data') }}
        </span>
        <span v-if="noDataSubmitted" class="red--text">
          {{ $t('contributors.validation.required') }}
        </span>
      </h3>
      <v-textarea v-model="formContents" no-resize outlined></v-textarea>
    </div>
    <v-row>
      <v-col>
        <v-btn
          class="btn-left"
          color="primary"
          :loading="validatingExtendedCSV"
          :disabled="loadingForm"
          @click="validateExtendedCSV()"
        >
          {{ $t('contributors.validation.validate') }}
        </v-btn>
        <v-btn
          class="btn-right"
          :disabled="loadingForm || validatingExtendedCSV"
          @click="reset()"
        >
          {{ $t('contributors.validation.clear') }}
        </v-btn>
      </v-col>
      <v-col>
        <v-file-input
          id="ufile"
          ref="doc"
          v-model="selectedFile"
          outlined
          dense
          accept=".csv,text/plain,application/vnd.ms-excel"
          :disabled="loadingForm"
          @change="selectFile"
        />
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col>
        <h2>{{ $t('contributors.validation.validation-results') }}</h2>
        <span v-if="!oldValidationExists || noDataSubmitted" class="red--text">
          {{ $t('contributors.validation.no-results') }}
        </span>
        <div v-else>
          <v-alert v-if="validationResponse" dense type="success">
            {{ $t('contributors.validation.passed') }}
          </v-alert>
          <v-alert
            v-else-if="!validationResponse"
            dense
            type="error"
            class="multi-line"
          >
            {{ $t('contributors.validation.failed.title') }}
            <ul>
              <li v-for="error in errorMessages" :key="error">
                {{ error }}
              </li>
            </ul>
          </v-alert>
          <v-alert v-if="hasWarnings" dense type="warning">
            {{ $t('contributors.validation.failed.warnings') }}
            <ul class="px-0 mx-0">
              <li v-for="warn in warningMessages" :key="warn" class="px-0 mx-0">
                {{ warn }}
              </li>
            </ul>
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getValidate } from '~/plugins/api/wdr.api.processes'
export default {
  data() {
    return {
      errorMessages: null,
      fileContents: null,
      formContents: null,
      hasWarnings: false,
      loadingForm: false,
      noDataSubmitted: false,
      oldFormContents: null,
      oldValidationExists: false,
      selectedFile: null,
      validatingExtendedCSV: false,
      validationResponse: null,
      warningMessages: null,
    }
  },
  head() {
    return {
      title: this.$t('contributors.validation.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('contributors.validation.blurb'),
        },
      ],
    }
  },
  methods: {
    async selectFile(infile) {
      if (infile == null) {
        return
      }
      const reader = new FileReader()
      reader.onload = (res) => {
        this.fileContents = res.target.result
        this.formContents = this.fileContents
      }
      reader.readAsText(this.selectedFile)
    },
    async validateExtendedCSV() {
      this.validatingExtendedCSV = true
      if (this.formContents == null || this.formContents == '') {
        this.noDataSubmitted = true
        this.validationResponse = null
        this.hasWarnings = false
        this.errorMessages = null
        this.warningMessages = null
      } else {
        this.noDataSubmitted = false
        const inputs = {
          check_metadata: true,
        }
        inputs['extcsv'] = this.formContents
        const queryParams = { inputs }
        const response = await getValidate(
          this.$config.WOUDC_UI_API_URL,
          queryParams
        )
        this.validationResponse = response.data.response
        this.errorMessages = response.data.errors
        this.warningMessages = response.data.warnings
        this.hasWarnings = this.warningMessages.length !== 0
      }

      this.oldValidationExists = true
      this.oldFormContents = this.formContents
      this.validatingExtendedCSV = false
    },
    reset() {
      this.loadingForm = true
      this.fileContents = null
      this.formContents = null
      this.noDataSubmitted = false
      this.oldFormContents = null
      this.oldValidationExists = false
      this.selectedFile = null
      this.validatingExtendedCSV = false
      this.validationResponse = null
      this.loadingForm = false
      this.$refs.doc.reset()
    },
  },
  nuxtI18n: {
    paths: {
      en: '/contributors/validation',
      fr: '/contributeurs/validateur',
    },
  },
}
</script>
