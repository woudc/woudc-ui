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
          <div class="pa-3">
            <p>
              {{ $t('about.home.blurb.body-intro') }}
            </p>
            <p>
              {{ $t('about.home.blurb.body-datasets') }}
            </p>
            <i18n path="about.home.blurb.body-contributors" tag="p">
              <template #stations>
                <nuxt-link :to="localePath('data-stations')">
                  {{ $t('common.stations') }}
                </nuxt-link>
              </template>
              <template #contributors>
                <nuxt-link :to="localePath('contributors')">
                  {{ $t('common.contributors') }}
                </nuxt-link>
              </template>
            </i18n>
            <p>
              {{ $t('about.home.blurb.body-products') }}
            </p>
            <i18n path="about.home.blurb.body-access" tag="p">
              <template #search>
                <nuxt-link :to="localePath('data-search')">
                  {{ $t('common.search') }}
                </nuxt-link>
              </template>
              <template #access>
                <nuxt-link :to="localePath('data-data_access')">
                  {{ $t('common.access') }}
                </nuxt-link>
              </template>
            </i18n>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-container fluid>
        <v-card flat color="transparent">
          <v-card-title itemprop="name">
            {{ $t('home.collections.collections') }}
          </v-card-title>
          <div class="grid-container">
            <v-row flex-column flex-xs-row>
              <v-col
                v-for="(value, key) in collections"
                :key="key"
                cols="12"
                md="3"
                sm="3"
                class="grid-item"
              >
                <div class="pa-3">
                  <v-hover v-slot="{ hover }">
                    <v-card
                      max-width="344"
                      :elevation="hover ? 8 : 1"
                      :class="{ 'on-hover': hover }"
                      class="transition-swing"
                      nuxt
                      :to="localePath(value.link)"
                    >
                      <v-avatar
                        :class="
                          $vuetify.theme.dark
                            ? 'blue lighten-2'
                            : 'blue lighten-3'
                        "
                        tile
                        width="100%"
                        height="150"
                      >
                        <v-icon x-large>
                          {{ value.icon }}
                        </v-icon>
                      </v-avatar>

                      <v-card-title>
                        {{ value.name }}
                      </v-card-title>

                      <v-card-subtitle>
                        {{ value.description }}
                      </v-card-subtitle>
                    </v-card>
                  </v-hover>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-container>
    </v-row>
    <v-container>
      <v-row class="my-2" align-center>
        <v-col sm="8">
          <v-card>
            <v-card-title itemprop="name">
              {{ $t('about.home.history.title') }}
            </v-card-title>
            <v-col md="10">
              <div class="text-begin">
                <v-timeline>
                  <v-timeline-item icon="mdi-star" icon-color="yellow">
                    <template #opposite>1960</template>
                    <div class="py-4 mb-4">
                      {{ $t('about.home.history.milestones.1960') }}
                    </div>
                  </v-timeline-item>

                  <v-timeline-item>
                    <template #opposite>
                      {{ $t('about.home.history.milestones.1964') }}
                    </template>
                    <div class="text-end">1964</div>
                  </v-timeline-item>

                  <v-timeline-item>
                    <template #opposite>1992</template>
                    <div>
                      <p>
                        {{ $t('about.home.history.milestones.1992') }}
                      </p>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item icon="mdi-star" icon-color="yellow">
                    <template #opposite>
                      {{ $t('about.home.history.milestones.1995') }}
                    </template>
                    <div class="text-end">1995</div>
                  </v-timeline-item>

                  <v-timeline-item>
                    <template #opposite>1996</template>
                    <div>
                      <p>
                        {{ $t('about.home.history.milestones.1996') }}
                      </p>
                    </div>
                  </v-timeline-item>

                  <v-timeline-item>
                    <template #opposite>
                      {{ $t('about.home.history.milestones.2006') }}
                    </template>
                    <div class="text-end">2006</div>
                  </v-timeline-item>

                  <v-timeline-item icon="mdi-star" icon-color="yellow">
                    <template #opposite>2015</template>
                    <div>
                      {{ $t('about.home.history.milestones.2015') }}
                    </div>
                  </v-timeline-item>

                  <v-timeline-item icon="mdi-star" icon-color="yellow">
                    <div class="text-end">2025</div>
                    <template #opposite>
                      {{ $t('about.home.history.milestones.2025') }}
                    </template>
                  </v-timeline-item>
                </v-timeline>
              </div>
            </v-col>
          </v-card>
        </v-col>
        <v-col sm="4">
          <v-card class="my-4 py-3">
            <v-card-title>
              {{ $t('home.ContributorRegistrationCard.title') }}
            </v-card-title>
            <v-card-subtitle>
              {{ $t('home.ContributorRegistrationCard.subtitle') }}
            </v-card-subtitle>
            <p class="mx-3">
              {{ $t('home.ContributorRegistrationCard.description') }}
            </p>
            <v-card-action>
              <v-btn
                class="mx-3"
                color="primary"
                :to="localePath('contributors-registration')"
                :title="$t('home.ContributorRegistrationCard.buttonDetail')"
                aria-label="Go to the Registration page"
                nuxt
              >
                {{ $t('home.ContributorRegistrationCard.button') }}
              </v-btn>
            </v-card-action>
          </v-card>
          <v-card class="my-4 py-3">
            <v-card-title>{{ $t('banner.data-access') }}</v-card-title>
            <p class="mx-3">
              {{ $t('home.dataAccessCard.description') }}
            </p>
            <v-btn
              class="mx-3"
              color="primary"
              :to="localePath('data-data_access')"
              :title="$t('home.dataAccessCard.button')"
              aria-label="Go to the Data Access page"
              nuxt
            >
              {{ $t('home.dataAccessCard.button') }}
            </v-btn>
          </v-card>
          <v-card>
            <v-card-title>{{ $t('news.title') }}</v-card-title>
            <div v-if="loaded">
              <div v-for="(newsItem, i) in recentNewsItems" :key="i">
                <nuxt-link
                  :to="
                    localePath('news') +
                    '#' +
                    newsItem.properties.published_date.slice(0, 10)
                  "
                >
                  <div class="ml-2 mr-2">
                    <v-icon size="20" class="mr-2">
                      mdi-newspaper-variant
                    </v-icon>
                    {{ newsItem.properties[`title_${$i18n.locale}`] }}
                  </div>
                </nuxt-link>
                <p class="ml-10">
                  {{ newsItem.properties.published_date.slice(0, 10) }}
                </p>
              </div>
              <nuxt-link :to="localePath('news')">
                <div class="ml-2">
                  {{ $t('home.news.more') }}
                </div>
              </nuxt-link>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-col>
      <v-row align-center>
        <v-card>
          <div class="my-5">
            <v-container class="d-flex justify-center">
              <v-row>
                <v-card
                  max-width="400"
                  class="ma-2"
                  itemprop="memberOf"
                  itemscope
                  itemtype="http://schema.org/GovernmentOrganization"
                  flat
                  outlined
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
                  flat
                  outlined
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
              </v-row>
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
          </div>
        </v-card>
      </v-row>
    </v-col>
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
      collections: {
        Stations: {
          name: this.$t('home.collections.stations'),
          description: 'View our stations',
          link: 'data-stations',
          icon: 'mdi-map-marker-radius-outline',
        },
        Contributors: {
          name: this.$t('banner.contributors'),
          description: 'View our contributors',
          link: 'contributors',
          icon: 'mdi-account-group',
        },
        'Data Records': {
          name: this.$t('home.collections.dataRecords'),
          description: 'View our data records',
          link: 'data-search',
          icon: 'mdi-folder-open-outline',
        },
        Instruments: {
          name: this.$t('home.collections.instruments'),
          description: 'View our instruments',
          link: 'data-instruments',
          icon: 'mdi-thermometer',
        },
      },
    }
  },
  head() {
    return {
      title: 'Home',
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('home.adTitle'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('home.keywords'),
        },
      ],
    }
  },
  computed: {
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
    toggleVuetifyTheme() {
      // Flips the Vuetify framework theme boolean value
      this.$vuetify.theme.themes.dark = !this.$vuetify.theme.themes.dark
    },
  },
}
</script>
