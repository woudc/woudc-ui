<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('contact.title') }}</h1>
        <i18n path="contact.blurb.body-faq" tag="p">
          <template v-slot:faq>
            <nuxt-link :to="localePath('about-faq')">
              {{ $t('common.faq') }}
            </nuxt-link>
          </template>
        </i18n>
        <i18n path="contact.blurb.body-contact" tag="p">
          <template v-slot:woudc>
            <strong>{{ $t('common.woudc') }}</strong>
          </template>
        </i18n>
        <v-card class="mt-1 mb-4" color="info">
          <v-card-title class="pt-3 pb-0">
            {{ $t('contact.note.title') }}
          </v-card-title>
          <v-card-text>
            <i18n path="contact.note.body" tag="span">
              <template v-slot:privacy-act>
                <i><a :href="privacyActURL" target="_blank">
                  {{ $t('common.privacy-act') }}
                </a></i>
              </template>
            </i18n>
          </v-card-text>
        </v-card>
        <div id="other-contacts">
          <h2>{{ $t('contact.other-channels') }}</h2>
          <h4>{{ $t('contact.by-email') }}</h4>
          <a href="mailto:email.address@canada.ca">
            {{ $t(woudcEmail) }}
          </a>
          <div v-for="(lines, header) in $t('contact.contact-methods')" :key="header">
            <h4>{{ header }}:</h4>
            <div v-for="(line, index) in lines" :key="index">
              {{ line }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      privacyActURL: 'https://laws-lois.justice.gc.ca/eng/acts/P-21/index.html',
      woudcEmail: process.env.EMAIL_ADDRESS 
    }
  },
  nuxtI18n: {
    paths: {
      en: '/contact',
      fr: '/contacter'
    }
  }
}
</script>

<style>
.v-text-field .v-input__slot {
  min-height: 0px;
}

.v-text-field input {
  margin-top: 8px;
  margin-bottom: 8px;
}

.v-text-field .v-text-field__details,
.v-text-field .v-messages {
  min-height: 0px;
}

.v-textarea textarea {
  padding-top: 4px;
}
</style>
