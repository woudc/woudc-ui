<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('contributors.validation.title') }}</h1>
        <p>{{ $t('contributors.validation.blurb') }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      en: '/contributors/validation',
      fr: '/contributeurs/validateur'
    }
  }
}
</script>
