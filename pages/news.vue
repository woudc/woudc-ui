<template>
  <v-container>
    <h1>
      {{ $t('news.title') }}
    </h1>
    <p>
      {{ $t('news.blurb') }}
    </p>
    <div v-if="!loaded">
      <v-skeleton-loader
        type="card-avatar, article"
        elevation="2"
        class="mt-9"
        height="400"
      />
      <v-skeleton-loader
        type="card-avatar, article"
        elevation="2"
        class="my-8"
        height="400"
      />
      <v-skeleton-loader
        type="card-avatar, article"
        elevation="2"
        class="my-8"
        height="400"
      />
    </div>
    <v-row>
      <v-col v-if="loaded">
        <v-btn class="ma-2" medium rounded @click="tagSelection('reset')">
          {{ $t('news.reset') }}
        </v-btn>
        <v-card
          v-for="(newsItem, i) in sortedItems"
          :id="newsItem.properties.published_date.slice(0, 10)"
          :key="i"
          class="mb-6"
        >
          <v-card-title>
            {{ newsItem.properties[`title_${$i18n.locale}`] }}
          </v-card-title>
          <v-card-subtitle>
            <span class="blue--text text--darken-3">
              {{ newsItem.properties.published_date.slice(0, 10) }}
            </span>
            <v-chip
              v-for="(keyword, j) in newsItem.properties[
                `keywords_${$i18n.locale}`
              ]"
              :key="j"
              :input-value="selectedTags.includes(keyword)"
              filter
              class="ma-2"
              rounded
              small
              @click="tagSelection(keyword)"
            >
              {{ keyword }}
            </v-chip>
          </v-card-subtitle>
          <!-- eslint-disable vue/no-v-html -->
          <v-card-text
            class="pt-3"
            v-html="newsItem.properties[`description_${$i18n.locale}`]"
          />
          <!-- eslint-enable -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      loaded: false,
      selectedTags: [],
    }
  },
  head() {
    return {
      title: this.$t('news.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('news.blurb'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('news.keywords'),
        },
      ],
    }
  },
  computed: {
    ...mapState('news', ['newsItems']),
    sortedItems() {
      // let currNewsItem, currTag
      const allNewsItems = this.newsItems.json.features
      let sortedItems = []
      if (this.selectedTags.length === 0) {
        sortedItems = allNewsItems
      } else if (this.selectedTags.length > 0) {
        // filter by tags
        for (const currNewsItem of allNewsItems) {
          sortedItems.push(currNewsItem)
          for (const currTag of this.selectedTags) {
            if (
              currNewsItem.properties.keywords_en.includes(currTag) === false
            ) {
              sortedItems.pop()
              break
            }
          }
        }
      }
      return sortedItems
    },
  },
  created() {
    this.loadNewsItems()
  },
  updated() {
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
    tagSelection(inputSelectedTag) {
      if (inputSelectedTag === 'reset') {
        inputSelectedTag = ''
        this.$data.selectedTags = []
      }
      if (this.$data.selectedTags.includes(inputSelectedTag) === true) {
        this.$data.selectedTags = this.$data.selectedTags.filter(function (
          Elem
        ) {
          return Elem !== inputSelectedTag
        })
      } else if (inputSelectedTag !== '') {
        this.$data.selectedTags.push(inputSelectedTag)
      }
    },
  },
  nuxtI18n: {
    paths: {
      en: '/news',
      fr: '/nouvelles',
    },
  },
}
</script>
