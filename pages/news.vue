<template>
  <v-container>
    <v-row>
      <v-col v-if="loaded">
        <h1>{{ $t('news.title') }}</h1>
        <p>{{ $t('news.blurb') }}</p>
        <v-card v-for="(newsItem, i) in newsItems.json.features" :key="i" class="my-6">
          <v-card-title v-if="en" class="info">
            {{ newsItem.properties.title_en }}
          </v-card-title>
          <v-card-title v-if="fr" class="info">
            {{ newsItem.properties.title_fr }}
          </v-card-title>
          <v-card-subtitle v-if="en" class="info">
            <span class="blue--text text--darken-3">{{ newsItem.properties.published.slice(0,11) }}</span>
            <v-chip v-for="(keyword, j) in newsItem.properties.tags_en.split(',')" :key="j" class="ma-2" small> 
              <span style="font-size: 12px">{{ keyword }}</span> 
            </v-chip>
          </v-card-subtitle>
          <v-card-subtitle v-if="fr" class="info">
            <span class="blue--text text--darken-3">{{ newsItem.properties.published.slice(0,11) }}</span>
            <v-chip v-for="(keyword, j) in newsItem.properties.tags_fr.split(',')" :key="j" class="ma-2" small>
              <span style="font-size: 12px">{{ keyword }}</span>
            </v-chip>
          </v-card-subtitle>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <v-card-text v-if="en" class="pt-3" v-html="newsItem.properties.description_en" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <v-card-text v-if="fr" class="pt-3" v-html="newsItem.properties.description_fr" />
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
      en: false,
      fr: false
    }
  },
  computed: {
    woudcLink() {
      return 'https://woudc.org/home.php?lang=' + this.$i18n.locale
    },
    ...mapState('news', 
      ['newsItems']),

  },
  created() {
    if (this.$i18n.locale === "en"){
      this.en = true
    }
    if(this.$i18n.locale === "fr"){
      this.fr = true
    }
    this.loadNewsItems()
    // Future: make an HTTP call to gather news items.
    // For now, add one dummy news item as an example of the format.
    // this.$store.dispatch(news/getJson)

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
