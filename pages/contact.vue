<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('title') }}</h1>
    <woudc-blurb :items="$t('blurb')" />
    <hr>
    <span class="headline">{{ $t('contact-info') }}</span>
    <p>{{ $t('prompt') }}</p>
    <h4>
      <span class="red--text">*</span>
      {{ $t('name') }} <span class="red--text">({{ $t('required') }})</span>
    </h4>
    <v-text-field v-model="selectedName" solo />
    <h4>
      <span class="red--text">*</span>
      {{ $t('email') }} <span class="red--text">({{ $t('required') }})</span>
    </h4>
    <v-text-field v-model="selectedEmail" solo />
    <woudc-note :title="$t('note-title')" :body="$t('note-body')" />
    <h4>
      <span class="red--text">*</span>
      {{ $t('subject') }} <span class="red--text">({{ $t('required') }})</span>
    </h4>
    <v-text-field v-model="selectedSubject" solo />
    <h4>
      <span class="red--text">*</span>
      {{ $t('message') }} <span class="red--text">({{ $t('required') }})</span>
    </h4>
    <v-textarea v-model="selectedMessage" solo />
    <div id="other-contacts">
      <h2>{{ $t('other-channels') }}</h2>
      <div v-for="(lines, header) in $t('contact-methods')" :key="header">
        <h4>{{ header }}:</h4>
        <div v-for="(line, i) in lines" :key="i">
          {{ line }}
        </div>
      </div>
    </div>
  </v-layout>
</template>

<i18n>
{
  "en": {
    "title": "Contact WOUDC",
    "blurb": [
      "For answers to technical questions, please consult the ",
      { "link": { "to": "about-faq", "text": "Frequently Asked Questions" } },
      " section.",
      { "newlines": 2 },
      "If you do not find answers to your questions or to submit your comments, suggestions, and ideas about ",
      { "bold": "WOUDC" },
      ", please fill out the form below.",
      { "newlines": 2 },
      "If you have difficulty with the following form, you can use any of our ",
      { "link": { "to": "contact", "selector": "#other-contacts", "text": "other service channels" } },
      " to contact us."
    ],
    "contact-info": "Your Contact Information",
    "note-title": "Personal Information Collection Statement",
    "note-body": [
      "All personal information created, held or collected by this department is protected under the ",
      { "italic": { "link": { "to": "https://laws-lois.justice.gc.ca/eng/acts/P-21/index.html", "type": "external", "text": "Privacy Act" } } },
      ". This means that you will be informed of the purpose for which it is being collected and how to exercise your right of access to that information. You will be asked for your consent where appropriate."
    ],
    "prompt": "Please provide information that we could use to contact you.",
    "required": "required",
    "name": "Name",
    "email": "E-mail Address",
    "subject": "Subject",
    "message": "Message",
    "submit": "Submit",
    "reset": "Reset",
    "other-channels": "Other Service Channels",
    "contact-methods": {
      "By Mail": [
        "World Ozone and Ultraviolet Radiation Data Centre",
        "Meteorological Service of Canada",
        "Environment and Climate Change Canada",
        "4905 Dufferin Street",
        "Toronto, ON M3H 5T4",
        "Canada"
      ]
    }
  },
  "fr": {
    "title": "Communiquez avec le WOUDC",
    "blurb": [
      "Pour les questions techniques, consultez la ",
      { "link": { "to": "about-faq", "text": "Foire aux questions" } },
      ".",
      { "newlines": 2 },
      "Si vous ne trouvez pas de réponse à vos questions, ou si vous désirez nous faire part de vos commentaires, suggestions ou idées à propos du ",
      { "bold": "WOUDC" },
      ", veuillez remplir le formulaire ci-dessous.",
      { "newlines": 2 },
      "Si vous avez des problèmes avec le formulaire suivant, vous pouvez utiliser une des ",
      { "link": { "to": "contact", "selector": "#other-contacts", "text": "autres voies de service" } },
      " pour communiquer avec nous."
    ],
    "contact-info": "Vos Coordonnées",
    "note-title": "Énoncé de collecte de renseignements personnels",
    "note-body": [
      "Tous les renseignements personnels créés, recueillis ou conservés par le ministère sont protégés par la ",
      { "italic": { "link": { "to": "https://laws-lois.justice.gc.ca/fra/lois/P-21/index.html", "type": "external", "text": "Loi sur la protection des renseignements personnels" } } },
      ". Cela signifie qu'on vous informera des fins auxquelles ces renseignements sont recueillis et de la façon dont vous pouvez exercer votre droit d'accès à ces renseignements. Le cas échéant, on vous demandera d'exprimer votre consentement par rapport à ces renseignements."
    ],
    "prompt": "S'il vous plaît fournir des informations que nous pourrions utiliser pour communiquer avec vous.",
    "required": "obligatoire",
    "name": "Nom",
    "email": "Courriel",
    "subject": "Sujet",
    "message": "Message",
    "submit": "Soumettre",
    "reset": "Réinitialisation",
    "other-channels": "Autres voies de service",
    "contact-methods": {
      "Par la poste": [
        "Centre mondial de données sur l’ozone et le rayonnement ultraviolet",
        "Services météorologiques du Canada",
        "Environnement et Changement climatique Canada",
        "4905, rue Dufferin",
        "Toronto, ON M3H 5T4",
        "Canada"
      ]
    }
  }
}
</i18n>

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
      selectedMessage: ''
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
