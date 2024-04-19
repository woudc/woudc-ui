<template>
  <v-app>
    <v-container v-if="error.statusCode === 404" class="mt-3">
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="6" xs="3" xl="3" lg="4">
          <div class="d-flex">
            <v-icon color="red" class="d-flex align-start mt-1">
              mdi-alert
            </v-icon>
            <h2 v-t="{ path: 'error.not-found', locale: 'en' }" class="mx-1" />
          </div>
          <p v-t="{ path: 'error.error-text.not-found-text', locale: 'en' }" />
          <div class="d-flex">
            <li
              v-t="{ path: 'error.error-link-start', locale: 'en' }"
              class="ml-10"
            />
            <a
              v-t="{ path: 'error.error-link-end', locale: 'en' }"
              :href="$config.WOUDC_UI_BASE_URL"
              class="ml-1"
            />
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12" xl="3" lg="4" justify="center">
          <div class="d-flex">
            <v-icon color="red" class="d-flex align-start mt-1">
              mdi-alert
            </v-icon>
            <h2 v-t="{ path: 'error.not-found', locale: 'fr' }" class="mx-1" />
          </div>
          <p v-t="{ path: 'error.error-text.not-found-text', locale: 'fr' }" />
          <div class="d-flex">
            <li
              v-t="{ path: 'error.error-link-start', locale: 'fr' }"
              class="ml-10"
            />
            <a
              v-t="{ path: 'error.error-link-end', locale: 'fr' }"
              :href="$config.WOUDC_UI_BASE_URL"
              class="ml-1"
            />
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
            <h2
              v-t="{ path: 'error.other-error', locale: 'en' }"
              class="mx-1"
            />
          </div>
          <p
            v-t="{ path: 'error.error-text.other-error-text', locale: 'en' }"
          />
          <div class="d-flex">
            <li
              v-t="{ path: 'error.error-link-start', locale: 'en' }"
              class="ml-10"
            />
            <a
              v-t="{ path: 'error.error-link-end', locale: 'en' }"
              :href="$config.WOUDC_UI_BASE_URL"
              class="ml-1"
            />
          </div>
        </v-col>
        <v-col cols="12" md="6" sm="12" xl="3" lg="4">
          <div class="d-flex">
            <v-icon color="red" class="d-flex align-start mt-1">
              mdi-alert-circle
            </v-icon>
            <h2
              v-t="{ path: 'error.other-error', locale: 'fr' }"
              class="mx-1"
            />
          </div>
          <p
            v-t="{ path: 'error.error-text.other-error-text', locale: 'fr' }"
          />
          <div class="d-flex">
            <li
              v-t="{ path: 'error.error-link-start', locale: 'fr' }"
              class="ml-10"
            />
            <a
              v-t="{ path: 'error.error-link-end', locale: 'fr' }"
              :href="$config.WOUDC_UI_BASE_URL"
              class="ml-1"
            />
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
