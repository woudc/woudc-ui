<template>
  <v-container>
    <h1>{{ $t('contributors.validation.title') }}</h1>
    <p>{{ $t('contributors.validation.blurb') }}</p>
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
