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
        <v-btn class="ma-2" medium rounded @click="tagSelection('reset')">
          Reset filters
        </v-btn>
        <v-card v-for="(newsItem, i) in sortedItems" :id="newsItem.properties.published_date.slice(0,10)" :key="i" class="mb-6">
          <v-card-title>
            {{ newsItem.properties[`title_${$i18n.locale}`] }}
          </v-card-title>
          <v-card-subtitle>
            <span class="blue--text text--darken-3">{{ newsItem.properties.published_date.slice(0,10) }}</span>
            <v-btn v-for="(keyword, j) in newsItem.properties[`keywords_${$i18n.locale}`]" :key="j" :class="{ active: selectedElems.includes(keyword), inactive: !selectedElems.includes(keyword) }" rounded small @click="tagSelection(keyword)">
              {{ keyword }}
            </v-btn>
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
      selectedElems: [],
    }
  },
  computed: {
    woudcLink() {
      return 'https://woudc.org/home.php?lang=' + this.$i18n.locale
    },
    ...mapState('news',
      ['newsItems']),
    sortedItems(){
      let h, i
      const temp = this.newsItems.json.features.slice(0).sort((a, b) => a.properties.published_date.slice(0,10) < b.properties.published_date.slice(0,10) ? 1 : -1)
      let sortedItems = []
      if (this.selectedElems.length===0){ // no particular tags to show: show all news items 
        sortedItems = temp
      }
      else if (this.selectedElems.length>0){ // show only items with all the tags in the list
        for (i = 0; i < temp.length; i++) {
          for (h = 0; h < this.selectedElems.length; h++){
            if (temp[i].properties.keywords_en.includes(this.selectedElems[h]) === false) {
              break
            }
            if (temp[i].properties.keywords_en.includes(this.selectedElems[h]) === true && h === this.selectedElems.length-1) {
              sortedItems.push(temp[i])
            }
          }
        }
      }
      return sortedItems
    }
  },
  created() {
    this.loadNewsItems()
  },
  updated(){
    if (this.$route.hash) {
      const stringHash = this.$route.hash.toString()
      const id = '#\\32 ' + stringHash.slice(2, stringHash.length)
      const el = document.querySelector(id)
      el && window.scrollTo(0, el.offsetTop - 5)
    }
  },
  methods: {
    async loadNewsItems() {
      const holder = await this.$store.dispatch('news/loadNews')
      this.loaded = true
      return holder
    },
    tagSelection(c) {
      if (c === "reset") { // show all news articles regardless of tags
        c = ""
        this.$data.selectedElems = [] 
      }
      if (this.$data.selectedElems.includes(c) === true) { 
        this.$data.selectedElems = this.$data.selectedElems.filter(function(Elem){ return Elem !== c })// arrayRemove(this.$data.selectedElems,c)
      }
      else if (c !== "") { 
        this.$data.selectedElems.push(c) 
      }
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
.active {
  color: rgb(157, 157, 157);
  margin: 8px 8px;
}
.inactive {
  margin: 8px 8px;
}

</style>