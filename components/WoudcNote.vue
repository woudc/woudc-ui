<template>
  <v-card class="woudc-note" tile :max-width="maxwidth" min-width="0px">
    <v-card-title v-if="title !== undefined">
      {{ title }}
    </v-card-title>
    <v-card-text v-if="body !== undefined">
      <woudc-blurb :items="body" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.woudc-note {
  background-color: #cef;
  margin-top: 4px;
  margin-bottom: 16px;
}

.woudc-note .v-card__title {
  padding-top: 12px;
  padding-bottom: 0px;
}
</style>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'

export default {
  components: {
    'woudc-blurb': WoudcBlurb
  },
  props: {
    title: { type: String, required: false, default: '' },
    body: { type: [String, Object], required: true },
    maxwidth: { type: String, required: false, default: '100%' }
  }
}
</script>
