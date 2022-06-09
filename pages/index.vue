<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>{{ $t('common.welcome') }}</h2>
        <v-card itemscope itemtype="http://schema.org/GovernmentOrganization">
          <v-card-title itemprop="name">WOUDC</v-card-title>
          <v-card-subtitle itemprop="description">
            {{ $t('home.adTitle') }}
          </v-card-subtitle>
          <v-container class="d-flex justify-start">
            <v-card
              max-width="400"
              class="ma-2"
              itemprop="memberOf"
              itemscope
              itemtype="http://schema.org/GovernmentOrganization"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline">
                    <a :href="wmoURL" target="_blank" itemprop="name">
                      {{ $t('common.wmo') }}
                    </a>
                  </v-card-title>
                  <v-card-subtitle>
                    {{ $t('common.wmoFull') }}
                  </v-card-subtitle>
                </div>
                <v-avatar class="ma-3" size="150" tile>
                  <a target="_blank" :href="wmoURL" itemprop="url">
                    <v-img
                      :src="require('~/assets/wmo_acronym_vertical_sm.jpg')"
                      :alt="$t('home.wmoLogo')"
                      width="111"
                      height="150"
                      itemprop="logo"
                    />
                  </a>
                </v-avatar>
              </div>
            </v-card>
            <v-card
              max-width="400"
              class="ma-2"
              itemprop="memberOf"
              itemscope
              itemtype="http://schema.org/GovernmentOrganization"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline">
                    <a target="_blank" :href="gawURL" itemprop="name">
                      {{ $t('common.gaw') }}
                    </a>
                  </v-card-title>
                  <v-card-subtitle>
                    {{ $t('common.gawFull') }}
                  </v-card-subtitle>
                </div>
                <v-avatar class="ma-3" size="150" tile>
                  <a :href="gawURL" target="_blank" itemprop="url">
                    <v-img
                      :src="require('~/assets/gaw_acronym_vertical_sm.jpg')"
                      :alt="$t('home.gawLogo')"
                      width="102"
                      height="150"
                      itemprop="logo"
                    />
                  </a>
                </v-avatar>
              </div>
            </v-card>
          </v-container>
          <v-card-text itemprop="description">
            <i18n path="home.blurb" tag="span">
              <template #wmo>
                <a :href="wmoURL" target="_blank">
                  <span>
                    {{ $t('common.wmo') }}
                    <v-icon x-small>mdi-open-in-new</v-icon>
                  </span>
                </a>
              </template>
              <template #gaw>
                <a :href="gawURL" target="_blank">
                  <span>
                    {{ $t('common.gaw') }}
                    <v-icon x-small>mdi-open-in-new</v-icon>
                  </span>
                </a>
              </template>
            </i18n>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :to="localePath('about')"
              :title="$t('home.aboutWoudc')"
              color="primary"
              nuxt
            >
              {{ $t('home.learnMore') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <h3 class="h2 mt-2 mb-2">
          {{ $t('home.quickLinks') }}
        </h3>
        <div v-for="(linkItem, i) in quickLinks" :key="i">
          <nuxt-link :to="localePath(linkItem.link)">
            {{ $t(linkItem.title) }}
          </nuxt-link>
        </div>
        <h3 class="h2 mt-2 mb-2">
          {{ $t('home.news.title') }}
        </h3>
        <div v-if="loaded">
          <div v-for="(newsItem, i) in recentNewsItems" :key="i">
            <nuxt-link
              :to="
                localePath('news') +
                '#' +
                newsItem.properties.published_date.slice(0, 10)
              "
            >
              {{ newsItem.properties[`title_${$i18n.locale}`] }}
            </nuxt-link>
            <p>
              {{ newsItem.properties.published_date.slice(0, 10) }}
            </p>
          </div>
          <nuxt-link :to="localePath('news')">
            {{ $t('home.news.more') }}
          </nuxt-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      loaded: false,
      gawURL: 'https://community.wmo.int/activity-areas/gaw',
      wmoURL: 'https://wmo.int',
    }
  },
  head() {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('home.adTitle'),
        },
      ],
    }
  },
  computed: {
    woudcLink() {
      return (
        'https://woudc.org/home.php?lang=' +
        this.$i18n.locale +
        '/' +
        this.$t('news.title')
      )
    },
    quickLinks() {
      return [
        {
          title: 'data.explore.title',
          link: 'data-search',
        },
        {
          title: 'data.stations.title',
          link: 'data-stations',
        },
        {
          title: 'data.access.web.title',
          link: 'data-data_access',
        },
        {
          title: 'resources.related-links.title',
          link: 'resources-links',
        },
      ]
    },
    ...mapState('news', ['newsItems']),
    recentNewsItems() {
      const recentNewsItems = this.newsItems.json.features
        .slice(0)
        .sort((a, b) =>
          a.properties.published_date.slice(0, 10) <
          b.properties.published_date.slice(0, 10)
            ? 1
            : -1
        )
      return recentNewsItems.slice(0, 3)
    },
  },
  created() {
    this.loadNewsItems()
  },
  methods: {
    async loadNewsItems() {
      this.$store.dispatch('news/loadNews').then(() => {
        this.loaded = true
      })
    },
    prepareContentsLink(key) {
      return {
        text: this.$t('data.access.contents.links.' + key),
        selector: this.contentsSelectors[key],
        subsections: null,
      }
    },
  },
}
</script>
