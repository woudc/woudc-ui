<template>
  <v-layout justify-center column align-content-center>
    <h2>{{ $t('common.welcome') }}</h2>
    <v-card itemscope itemtype="http://schema.org/GovernmentOrganization">
      <v-card-title itemprop="name">
        WOUDC
      </v-card-title>
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
          <template v-slot:wmo>
            <a :href="wmoURL" target="_blank">
              {{ $t('common.wmo') }}
            </a>
          </template>
          <template v-slot:gaw>
            <a :href="gawURL" target="_blank">
              {{ $t('common.gaw') }}
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
  </v-layout>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      gawURL: 'http://www.wmo.int/gaw',
      wmoURL: 'http://www.wmo.int'
    }
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
