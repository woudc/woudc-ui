<template>
  <v-container>
    <h1> 
      {{ $t('news.title') }} 
    </h1>
    <p> 
      {{ $t('news.blurb') }} 
    </p>
    <div v-if="!loaded">
      <v-skeleton-loader type="card-avatar, article" elevation="2" class="mt-9" height="400" /> 
      <v-skeleton-loader type="card-avatar, article" elevation="2" class="my-8" height="400" /> 
      <v-skeleton-loader type="card-avatar, article" elevation="2" class="my-8" height="400" /> 
    </div>
    <v-row>
      <v-col v-if="loaded">
        <v-card v-for="(newsItem, i) in sortedItems" :key="i" class="mb-6">
          <v-card-title class="info">
            {{ newsItem.properties[`title_${$i18n.locale}`] }}
          </v-card-title>
          <v-card-subtitle class="info">
            <span class="blue--text text--darken-3">{{ newsItem.properties.published_date.slice(0,10) }}</span>
            <v-chip v-for="(keyword, j) in newsItem.properties[`keywords_${$i18n.locale}`]" :key="j" class="ma-2" small>
              {{ keyword }}
            </v-chip>
          </v-card-subtitle>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <v-card-text class="pt-3" v-html="newsItem.properties[`description_${$i18n.locale}`]" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return{
      loaded: false,
    }
  },
  computed: {
    woudcLink() {
      return 'https://woudc.org/home.php?lang=' + this.$i18n.locale
    },
    ...mapState('news', 
      ['newsItems']),
    
    sortedItems(){
      return this.newsItems.json.features.slice(0).sort((a, b) => a.properties.published_date.slice(0,10) < b.properties.published_date.slice(0,10) ? 1 : -1)
    }
  },
  created() {
    this.loadNewsItems()
  },
  methods: {
    async loadNewsItems() {
      const holder = await this.$store.dispatch('news/loadNews')
      this.loaded = true
      return holder
    },
  },
  nuxtI18n: {
    paths: {
      en: '/news',
      fr: '/nouvelles'
    }
  }
}
</script>
