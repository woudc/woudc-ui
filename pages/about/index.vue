<template>
  <v-container>
    <h2>{{ $t('about.home.title') }}</h2>
    <p>{{ $t('about.home.blurb.body-intro') }}</p>
    <p>{{ $t('about.home.blurb.body-datasets') }}</p>
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
    <p>{{ $t('about.home.blurb.body-products') }}</p>
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
    <v-row>
      <v-col>
        <v-card
          id="history"
          itemprop="hasPart"
          itemscope
          itemtype="http://schema.org/CreativeWork"
        >
          <v-card-title itemprop="name">
            {{ $t('about.home.history.title') }}
          </v-card-title>
          <v-list
            itemprop="about"
            itemscope
            itemtype="http://schema.org/ItemList"
          >
            <v-list-item itemprop="itemListElement">
              <span>
                <strong>1960</strong>
                : {{ $t('about.home.history.milestones.1960') }}
              </span>
            </v-list-item>
            <v-list-item itemprop="itemListElement">
              <span>
                <strong>1964</strong>
                : {{ $t('about.home.history.milestones.1964') }}
              </span>
            </v-list-item>
            <v-list-item itemprop="itemListElement">
              <span>
                <strong>1992</strong>
                : {{ $t('about.home.history.milestones.1992') }}
              </span>
            </v-list-item>
            <v-list-item itemprop="itemListElement">
              <span>
                <strong>1995</strong>
                : {{ $t('about.home.history.milestones.1995') }}
              </span>
            </v-list-item>
            <v-list-item itemprop="itemListElement">
              <span>
                <strong>1996</strong>
                : {{ $t('about.home.history.milestones.1996') }}
              </span>
            </v-list-item>
            <v-list-item itemprop="itemListElement">
              <span>
                <strong>2006</strong>
                : {{ $t('about.home.history.milestones.2006') }}
              </span>
            </v-list-item>
            <v-list-item itemprop="itemListElement">
              <span>
                <strong>2015</strong>
                : {{ $t('about.home.history.milestones.2015') }}
              </span>
            </v-list-item>
            <v-list-item itemprop="itemListElement">
              <span>
                <strong>2025</strong>
                : {{ $t('about.home.history.milestones.2025') }}
              </span>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('about.home.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('about.home.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('about.keywords'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about',
      fr: '/a-propos',
    },
  },
}
</script>
