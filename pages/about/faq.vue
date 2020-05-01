<template>
  <v-layout justify-center column align-content-center>
    <h1>{{ $t('about.faq.title') }}</h1>
    <p>{{ $t('about.faq.blurb') }}</p>
    <div v-for="(question, i) in questions" :key="i">
      <h4>{{ question.text }}</h4>
      <woudc-blurb :items="question.answer" />
    </div>
  </v-layout>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'

function makeLink(text, to, external) {
  const link = { text, to }
  if (external) {
    link.type = 'external'
  }

  return { link }
}


export default {
  components: {
    'woudc-blurb': WoudcBlurb
  },
  data() {
    // (Deep-ish) copy list of questions from translations.
    const questions = this.$t('about.faq.questions').map((entry) => {
      return {
        text: entry.text,
        answer: Array.isArray(entry.answer) ? [...entry.answer] : entry.answer
      }
    })

    // Add parts of the answer text that are independent of language
    // (e.g. some link endpoints)
    questions[0].answer[1] = makeLink(questions[0].answer[1], 'about-datapolicy', false)
    questions[0].answer.push('.')

    questions[1].answer[1] = makeLink(questions[1].answer[1], 'contributors-submission', false)
    questions[1].answer[3] = makeLink(questions[1].answer[3], 'contributors-registration', false)
    questions[1].answer.push('.')

    questions[2].answer[1] = makeLink(questions[2].answer[1], 'about-dataaccess', false)

    questions[3].answer[1] = makeLink(questions[3].answer[1], 'data-explore', false)
    questions[3].answer[3] = makeLink(questions[3].answer[3], 'data-products', false)

    questions[4].answer[1] = makeLink(questions[4].answer[1], 'contributors', false)
    questions[4].answer.push('.')

    questions[7].answer[1] = makeLink(questions[7].answer[1], 'about-dataaccess', false)

    questions[8].answer[1] = makeLink(
      questions[8].answer[1],
      'https://www.tbs-sct.gc.ca/ws-nw/wa-aw/index-eng.asp',
      true
    )
    questions[8].answer[3] = makeLink(
      questions[8].answer[3],
      'https://www.tbs-sct.gc.ca/ws-nw/wu-fe/index-eng.asp',
      true
    )
    questions[8].answer[5] = {
      italic: makeLink(
        questions[8].answer[5],
        'https://www.w3.org/WAI/intro/wcag',
        true
      )
    }
    questions[8].answer.push('.')

    return { questions }
  },
  nuxtI18n: {
    paths: {
      en: '/faq',
      fr: '/faq-in-fr'
    }
  }
}
</script>
