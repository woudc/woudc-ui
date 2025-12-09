<template>
  <v-container>
    <h1>{{ $t('about.faq.title') }}</h1>
    <p>{{ $t('about.faq.blurb') }}</p>
    <v-row>
      <v-col>
        <div>
          <h4>{{ $t('about.faq.questions.dataAccess.question') }}</h4>
          <i18n path="about.faq.questions.dataAccess.answer" tag="p">
            <template #policy>
              <nuxt-link :to="localePath('data-data_policy')">
                <span>{{ $t('common.policy') }}</span>
              </nuxt-link>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.faq.questions.dataSubmission.question') }}</h4>
          <i18n path="about.faq.questions.dataSubmission.answer" tag="p">
            <template #submission>
              <nuxt-link :to="localePath('contributors-submission')">
                <span>{{ $tc('common.submission', 1) }}</span>
              </nuxt-link>
            </template>
            <template #registration-form>
              <nuxt-link :to="localePath('contributors-registration')">
                <span>{{ $t('common.registration-form') }}</span>
              </nuxt-link>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.faq.questions.accessArchive.question') }}</h4>
          <i18n path="about.faq.questions.accessArchive.answer" tag="p">
            <template #access>
              <nuxt-link :to="localePath('data-data_access')">
                <span>{{ $t('common.access') }}</span>
              </nuxt-link>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.faq.questions.dataAvailable.question') }}</h4>
          <i18n path="about.faq.questions.dataAvailable.answer" tag="p">
            <template #search>
              <nuxt-link :to="localePath('data-search')">
                <span>{{ $t('common.search') }}</span>
              </nuxt-link>
            </template>
            <template #products>
              <nuxt-link :to="localePath('data-products')">
                <span>{{ $t('common.products') }}</span>
              </nuxt-link>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.faq.questions.dataSources.question') }}</h4>
          <i18n path="about.faq.questions.dataSources.answer" tag="p">
            <template #contributors-page>
              <nuxt-link :to="localePath('contributors')">
                <span>{{ $t('common.contributors-page') }}</span>
              </nuxt-link>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.faq.questions.updateFrequency.question') }}</h4>
          <i18n path="about.faq.questions.updateFrequency.answer" tag="p">
            <template #access>
              <nuxt-link :to="localePath('data-data_access')">
                <span>{{ $t('common.access') }}</span>
              </nuxt-link>
            </template>
          </i18n>
        </div>
        <div>
          <h4>{{ $t('about.faq.questions.dataResponsibility.question') }}</h4>
          <i18n
            path="about.faq.questions.dataResponsibility.answer"
            tag="p"
          ></i18n>
        </div>
        <div>
          <h4>{{ $t('about.faq.questions.automaticAccess.question') }}</h4>
          <i18n
            path="about.faq.questions.automaticAccess.answer"
            tag="p"
          ></i18n>
        </div>
        <div>
          <h4>{{ $t('about.faq.questions.mobileAccess.question') }}</h4>
          <i18n path="about.faq.questions.mobileAccess.answer" tag="p">
            <template #accessibility>
              <a :href="accessibilityURL" target="_blank">
                <span>
                  {{ $t('common.accessibility') }}
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </span>
              </a>
            </template>
            <template #usability>
              <a
                href="https://www.tbs-sct.gc.ca/pol/doc-eng.aspx?id=24227"
                target="_blank"
              >
                <span>
                  {{ $t('about.faq.usability') }}
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </span>
              </a>
            </template>
            <template #w3c>
              <a href="https://www.w3.org/WAI/intro/wcag" target="_blank">
                <span>
                  {{ $t('common.w3c') }}
                  <v-icon x-small>mdi-open-in-new</v-icon>
                </span>
              </a>
            </template>
          </i18n>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('about.faq.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('about.faq.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('about.faq.keywords'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about/frequently-asked-questions',
      fr: '/a-propos/foire-aux-questions',
    },
  },
}
</script>
