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
                <i
                  ><a :href="privacyActURL" target="_blank">
                    {{ $t('common.privacy-act') }}
                    <v-icon small>mdi-open-in-new</v-icon>
                  </a></i
                >
              </template>
            </i18n>
          </v-card-text>
        </v-card>
        <div id="other-contacts">
          <h2>{{ $t('contact.other-channels') }}</h2>
          <div>
            <h3>{{ $t('contact.by-email') }}</h3>
            <a :href="`mailto:${$config.WOUDC_UI_EMAIL_ADDRESS}`">
              {{ $config.WOUDC_UI_EMAIL_ADDRESS }}
            </a>
          </div>
          <div>
            <h3>{{ $t('contact.by-mail') }}</h3>
            <div v-text="$t('common.woudcFull')"></div>
            <div v-text="$t('contact.mail-address.msc')"></div>
            <div v-text="$t('contact.mail-address.eccc')"></div>
            <div v-text="$t('contact.mail-address.street')"></div>
            <div v-text="$t('contact.mail-address.city-prov-postcode')"></div>
            <div v-text="$t('contact.mail-address.country')"></div>
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
      privacyActURL: 'https://laws-lois.justice.gc.ca/eng/acts/P-21/index.html'
    }
  },
  head() {
    return {
      title: this.$t('contact.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('contact.blurb.body-contact')
        }
      ]
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

<style></style>
