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
        <i18n path="contact.blurb.body-alternatives" tag="p">
          <template v-slot:contact-channels>
            <nuxt-link to="#other-contacts">
              {{ $t('contact.contact-channels') }}
            </nuxt-link>
          </template>
        </i18n>
        <hr>
        <span class="headline">{{ $t('contact.contact-info') }}</span>
        <p>{{ $t('contact.prompt') }}</p>
        <h4>
          <span class="red--text">*</span>
          {{ $t('contact.name') }} <span class="red--text">({{ $t('contact.required') }})</span>
        </h4>
        <v-text-field v-model="selectedName" :label="$t('contact.name')" solo />
        <h4>
          <span class="red--text">*</span>
          {{ $t('contact.email') }} <span class="red--text">({{ $t('contact.required') }})</span>
        </h4>
        <v-text-field v-model="selectedEmail" :label="$t('contact.email')" solo />
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
        <h4>
          <span class="red--text">*</span>
          {{ $t('contact.subject') }}
          <span class="red--text">({{ $t('contact.required') }})</span>
        </h4>
        <v-text-field v-model="selectedSubject" :label="$t('contact.subject')" solo />
        <h4>
          <span class="red--text">*</span>
          {{ $t('contact.message') }}
          <span class="red--text">({{ $t('contact.required') }})</span>
        </h4>
        <v-textarea v-model="selectedMessage" :label="$t('contact.message')" solo />
        <div id="other-contacts">
          <h2>{{ $t('contact.other-channels') }}</h2>
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
      selectedName: null,
      selectedEmail: null,
      selectedSubject: null,
      selectedMessage: null
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
