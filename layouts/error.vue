<template>
  <v-app>
    <v-container v-if="error.statusCode === 404" class="mt-3">
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="6" xs="3" xl="3" lg="4">
          <div class="d-flex">
            <v-icon color="red" class="d-flex align-start mt-1">
              mdi-alert
            </v-icon>
            <h2 class="mx-1">{{ $i18n.t('error.not-found', 'en') }}</h2>
          </div>
          <p>{{ $i18n.t('error.error-text.not-found-text', 'en') }}</p>
          <div class="d-flex">
            <li class="ml-10">
              {{ $i18n.t('error.error-link-start', 'en') }}
            </li>
            <a :href="$config.WOUDC_UI_BASE_URL" class="ml-1">
              {{ $i18n.t('error.error-link-end', 'en') }}
            </a>
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12" xl="3" lg="4" justify="center">
          <div class="d-flex">
            <v-icon color="red" class="d-flex align-start mt-1">
              mdi-alert
            </v-icon>
            <h2 class="mx-1">{{ $i18n.t('error.not-found', 'fr') }}</h2>
          </div>
          <p>{{ $i18n.t('error.error-text.not-found-text', 'fr') }}</p>
          <div class="d-flex">
            <li class="ml-10">
              {{ $i18n.t('error.error-link-start', 'fr') }}
            </li>
            <a :href="$config.WOUDC_UI_BASE_URL" class="ml-1">
              {{ $i18n.t('error.error-link-end', 'fr') }}
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else class="mt-3">
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="6" sm="12" xl="3" lg="4">
          <div class="d-flex">
            <v-icon color="red" class="d-flex align-start mt-1">
              mdi-alert-circle
            </v-icon>
            <h2 class="mx-1">
              {{ $i18n.t('error.other-error', 'en') }}
            </h2>
          </div>
          <p>
            {{ $i18n.t('error.error-text.other-error-text', 'en') }}
          </p>
          <div class="d-flex">
            <li class="ml-10">
              {{ $i18n.t('error.error-link-start', 'en') }}
            </li>
            <a :href="$config.WOUDC_UI_BASE_URL" class="ml-1">
              {{ $i18n.t('error.error-link-end', 'en') }}
            </a>
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12" xl="3" lg="4">
          <div class="d-flex">
            <v-icon color="red" class="d-flex align-start mt-1">
              mdi-alert-circle
            </v-icon>
            <h2 class="mx-1">
              {{ $i18n.t('error.other-error', 'fr') }}
            </h2>
          </div>
          <p>
            {{ $i18n.t('error.error-text.other-error-text', 'fr') }}
          </p>
          <div class="d-flex">
            <li class="ml-10">
              {{ $i18n.t('error.error-link-start', 'fr') }}
            </li>
            <a :href="$config.WOUDC_UI_BASE_URL" class="ml-1">
              {{ $i18n.t('error.error-link-end', 'fr') }}
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head() {
    const errorTitle =
      this.error.statusCode === 404
        ? this.$t('error.not-found')
        : this.$t('error.other-error')
    return {
      title: errorTitle,
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: errorTitle,
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'noarchive',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
