<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('contact.title') }}</h1>
    <woudc-blurb :items="blurb" />
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
    <woudc-note :title="$t('contact.note-title')" :body="noteBody" />
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
      <div v-for="(lines, header) in $t('contact.contact-methods')" :key="header">
        <h4>{{ header }}:</h4>
        <div v-for="(line, i) in lines" :key="i">
          {{ line }}
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'
import WoudcNote from '~/components/WoudcNote'

export default {
  components: {
    'woudc-blurb': WoudcBlurb,
    'woudc-note': WoudcNote
  },
  data() {
    return {
      selectedName: '',
      selectedEmail: '',
      selectedSubject: '',
      selectedMessage: '',
      blurb: [
        { text: this.$t('contact.blurb[0]') },
        { link: { to: 'about-faq', text: this.$t('contact.blurb[1]') } },
        { text: this.$t('contact.blurb[2]') },
        { newlines: 2 },
        { text: this.$t('contact.blurb[3]') },
        { bold: 'WOUDC' },
        { text: this.$t('contact.blurb[4]') },
        { newlines: 2 },
        { text: this.$t('contact.blurb[5]') },
        { link: { to: 'contact', selector: '#other-contacts', text: this.$t('contact.blurb[6]') } },
        { text: this.$t('contact.blurb[7]') }
      ],
      noteBody: [
        { text: this.$t('contact.note-body[0]') },
        { italic: { link: { to: 'https://laws-lois.justice.gc.ca/eng/acts/P-21/index.html', type: 'external', text: this.$t('contact.note-body[1]') } } },
        { text: this.$t('contact.note-body[2]') }
      ]
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
