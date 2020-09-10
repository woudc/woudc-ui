<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ $t('news.title') }}</h1>
        <p>{{ $t('news.blurb') }}</p>
        <v-card v-for="(newsItem, i) in newsCollection" :key="i">
          <v-card-title class="info">
            {{ newsItem.title }}
          </v-card-title>
          <v-card-subtitle class="info">
            <span class="blue--text text--darken-3">{{ newsItem.date }}</span>
            <span class="ml-2">{{ newsItem.keywords.join(',') }}</span>
          </v-card-subtitle>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <v-card-text class="pt-3" v-html="newsItem.content" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newsCollection: []
    }
  },
  computed: {
    woudcLink() {
      return 'https://woudc.org/home.php?lang=' + this.$i18n.locale
    }
  },
  created() {
    // Future: make an HTTP call to gather news items.
    // For now, add one dummy news item as an example of the format.

    const item = {
      title: 'New Website',
      date: '2015-02-02',
      keywords: [ 'new website', 'renewal' ],
      content: 'Welcome to the renewed WOUDC! Improved data access is one of the major enhancements (see <a href="/woudc-ui/about/data-access">data access summary page</a> for details). As part of the transition the <a href=' + this.woudcLink + '>legacy WOUDC</a> will continue to be available for a short period of time. Users are encouraged to provide feedback through the WOUDC <a href="/woudc-ui/contact">email address</a>.'
    }
    this.newsCollection.push(item)
  },
  nuxtI18n: {
    paths: {
      en: '/news',
      fr: '/nouvelles'
    }
  }
}
</script>
