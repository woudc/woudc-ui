<template>
  <v-container>
    <h1>{{ $t('news.title') }}</h1>
    <p>{{ $t('news.blurb') }}</p>
    <v-card
      v-for="(announcement, i) in newsCollection"
      :key="i"
      class="news-panel"
    >
      <div class="news-panel-header">
        <v-card-title>
          {{ announcement.header }}
        </v-card-title>
        <v-card-subtitle>
          <span class="news-date">{{ announcement.date }}</span>
          <span class="news-keywords">
            {{ announcement.keywords.join(',') }}
          </span>
        </v-card-subtitle>
      </div>
      <v-card-text>
        <woudc-blurb :items="announcement.body" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import WoudcBlurb from '~/components/WoudcBlurb'

export default {
  components: {
    'woudc-blurb': WoudcBlurb
  },
  data() {
    return {
      newsCollection: [
        {
          header: 'New Website',
          date: '2015/02/02',
          keywords: ['new website', 'renewal'],
          body: [
            'Welcome to the renewed WOUDC! Improved data access is one of the major enhancements (see ',
            {
              link: {
                to: 'about-dataaccess',
                text: 'data access summary page'
              }
            },
            ' for details). As part of the transition the ',
            {
              link: {
                to: 'http://old.woudc.org/',
                type: 'external',
                text: 'legacy WOUDC'
              }
            },
            ' will continue to be available for a short period of time. Users are encouraged to provide feedback through the WOUDC ',
            { link: { to: 'contact', text: 'email address' } },
            '.'
          ]
        }
      ]
    }
  },
  nuxtI18n: {
    paths: {
      en: '/news',
      fr: '/nouvelles'
    }
  }
}
</script>

<style scoped>
.news-panel > .news-panel-header {
  background-color: lightblue;
}

.news-panel-header > .v-card__title {
  padding-bottom: 0px;
}

.news-panel-header > .v-card__subtitle {
  margin-top: -4px;
}

.news-panel-header > .v-card__subtitle > .news-date {
  color: blue;
}
</style>
