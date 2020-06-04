<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contact.title') }}</h1>
    <i18n class="newlines" path="contact.blurb.template" tag="p">
      <template v-slot:faq>
        <nuxt-link :to="localePath('about-faq')" v-text="$t('contact.blurb.faq')" />
      </template>
      <template v-slot:woudc>
        <b>WOUDC</b>
      </template>
      <template v-slot:channels>
        <nuxt-link to="#other-contacts" v-text="$t('contact.blurb.channels')" />
      </template>
    </i18n>
    <hr>
    <span class="headline">{{ $t('contact.contact-info') }}</span>
    <p>{{ $t('contact.prompt') }}</p>
    <h4>
      <span class="red--text">*</span>
      {{ $t('contact.name') }} <span class="red--text">({{ $t('contact.required') }})</span>
    </h4>
    <v-text-field v-model="selectedName" solo />
    <h4>
      <span class="red--text">*</span>
      {{ $t('contact.email') }} <span class="red--text">({{ $t('contact.required') }})</span>
    </h4>
    <v-text-field v-model="selectedEmail" solo />
    <v-card class="mt-1 mb-4" color="info">
      <v-card-title class="pt-3 pb-0">
        {{ $t('contact.note.title') }}
      </v-card-title>
      <v-card-text>
        <i18n path="contact.note.template" tag="span">
          <template v-slot:privacy-act>
            <i><a href="https://laws-lois.justice.gc.ca/eng/acts/P-21/index.html" target="_blank">
              {{ $t('contact.note.privacy-act') }}
            </a></i>
          </template>
        </i18n>
      </v-card-text>
    </v-card>
    <h4>
      <span class="red--text">*</span>
      {{ $t('contact.subject') }} <span class="red--text">({{ $t('contact.required') }})</span>
    </h4>
    <v-text-field v-model="selectedSubject" solo />
    <h4>
      <span class="red--text">*</span>
      {{ $t('contact.message') }} <span class="red--text">({{ $t('contact.required') }})</span>
    </h4>
    <v-textarea v-model="selectedMessage" solo />
    <div id="other-contacts">
      <h2>{{ $t('contact.other-channels') }}</h2>
      <div v-for="(line, header) in $t('contact.contact-methods')" :key="header">
        <h4>{{ header }}:</h4>
        <p class="newlines">
          {{ line }}
        </p>
      </div>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      selectedName: null,
      selectedEmail: null,
      selectedSubject: null,
      selectedMessage: null
    }
  },
  nuxtI18n: {
    paths: {
      en: '/contact',
      fr: '/contact-in-french'
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
