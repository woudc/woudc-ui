<template>
  <v-app>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawerOpen"
      color="accent"
      temporary
      fixed
      app
    >
      <v-list nav>
        <div v-for="group in navigationLinks" :key="group.id">
          <v-list-item v-if="!group.sections" :to="localePath(group.link)" nuxt>
            <v-list-item-icon>
              <v-icon>{{ group.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ group.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-else color="grey darken-4" :prepend-icon="group.icon">
            <template #activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ group.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <div v-for="section in group.sections" :key="section.id">
              <v-list-item
                v-if="section.type === 'external'"
                :href="section.link"
                target="_blank"
              >
                <v-list-item-content>
                  <v-list-item-title class="ml-2 grey--text text--darken-4">
                    {{ section.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-open-in-new</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item v-else :to="localePath(section.link)" nuxt>
                <v-list-item-content>
                  <v-list-item-title class="ml-2 grey--text text--darken-4">
                    {{ section.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" app hide-on-scroll>
      <h5
        v-if="$vuetify.breakpoint.mdAndUp"
        class="text-md-h6 ml-5 font-weight-regular text-no-wrap"
      >
        <img
          :src="require('~/assets/wmo-logo_on_dark_bg.svg')"
          :alt="$t('home.wmoLogo')"
          class="d-inline-block wmo-logo-banner"
        />
        <nuxt-link
          class="no-underline underline-on-hover white--text d-inline-block"
          :to="localePath('/')"
        >
          {{ $t('common.woudcFull') }}
        </nuxt-link>
      </h5>
      <template v-if="$vuetify.breakpoint.mdAndUp" #extension>
        <v-menu
          v-for="group in navigationLinks"
          :key="group.id"
          offset-y
          open-on-hover
          open-on-focus
          transition="slide-y-transition"
          close-delay="100"
          open-delay="200"
        >
          <template #activator="{ on, attrs }">
            <v-tabs color="accent" fixed-tabs>
              <v-tab v-if="group.sections" v-bind="attrs" v-on="on">
                <v-icon>{{ group.icon }}</v-icon>
                <span class="pl-1">{{ group.title }}</span>
                <v-icon>mdi-chevron-down</v-icon>
              </v-tab>
              <v-tab
                v-else
                :to="localePath(group.link)"
                class="accent--text"
                nuxt
              >
                <v-icon color="accent">
                  {{ group.icon }}
                </v-icon>
                <span class="pl-1">{{ group.title }}</span>
              </v-tab>
            </v-tabs>
          </template>
          <v-list v-if="group.sections" color="accent" nav>
            <div v-for="section in group.sections" :key="section.id">
              <v-list-item
                v-if="section.type === 'external'"
                :href="section.link"
                target="_blank"
              >
                <v-list-item-content>
                  <v-list-item-title class="grey--text text--darken-4">
                    {{ section.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-open-in-new</v-icon>
                </v-list-item-icon>
              </v-list-item>
              <v-list-item v-else :to="localePath(section.link)" nuxt>
                <v-list-item-content>
                  <v-list-item-title class="grey--text text--darken-4">
                    {{ section.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-menu>
      </template>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        color="white"
        @click.stop="drawerOpen = !drawerOpen"
      />
      <h5
        v-if="$vuetify.breakpoint.smAndDown"
        class="text-md-h6 ml-5 font-weight-regular d-inline-block"
      >
        <img
          :src="require('~/assets/wmo-logo_on_dark_bg.svg')"
          :alt="$t('home.wmoLogo')"
          class="d-inline-block wmo-logo-banner"
        />
        <nuxt-link
          class="no-underline underline-on-hover white--text"
          :to="localePath('/')"
        >
          {{ $t('common.woudcFull') }}
        </nuxt-link>
      </h5>
      <v-spacer />
      <nuxt-link
        v-if="$i18n.locale === 'fr'"
        class="white--text"
        :to="switchLocalePath('en')"
      >
        English
      </nuxt-link>
      <nuxt-link
        v-if="$i18n.locale === 'en'"
        class="white--text"
        :to="switchLocalePath('fr')"
      >
        Français
      </nuxt-link>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer color="primary" class="white--text" app absolute>
      <span>
        &copy; {{ $config.appBuildYYYY }}
        <a
          :href="$config.appHomepage"
          target="_blank"
          rel="noreferrer"
          class="accent--text"
        >
          <span>{{ $config.appName }}</span>
        </a>
        {{ $config.appVersion }}
      </span>
      <v-spacer />
      <nuxt-link
        class="white--text mr-10 no-underline"
        :to="localePath('contact')"
      >
        <v-icon class="mr-1 pb-1" color="white">mdi-email</v-icon>
        <span>{{ $t('banner.contact') }}</span>
      </nuxt-link>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawerOpen: false,
      navigationLinks: [
        {
          id: 'data',
          icon: 'mdi-database',
          link: 'data',
          title: this.$t('banner.data'),
          sections: [
            {
              id: 'data-search',
              link: 'data-search',
              title: this.$t('banner.data-search'),
            },
            {
              id: 'data-access',
              link: 'data-data_access',
              title: this.$t('banner.data-access'),
            },
            {
              id: 'data-quality',
              link: 'data-data_quality',
              title: this.$t('banner.data-quality'),
            },
            {
              id: 'data-policy',
              link: 'data-data_policy',
              title: this.$t('banner.data-policy'),
            },
            {
              id: 'data-products',
              link: 'data-products',
              title: this.$t('banner.data-products'),
            },
            {
              id: 'data-info',
              link: 'data-dataset_info',
              title: this.$t('banner.data-info'),
            },
            {
              id: 'data-stations',
              link: 'data-stations',
              title: this.$t('banner.data-stations'),
            },
            {
              id: 'data-instruments',
              link: 'data-instruments',
              title: this.$t('banner.data-instruments'),
            },
          ],
        },
        {
          id: 'contributors',
          icon: 'mdi-account-group',
          link: 'contributors',
          title: this.$t('banner.contributors'),
          sections: [
            {
              id: 'contributors-guide',
              type: 'external',
              link: 'https://guide.woudc.org',
              title: this.$t('banner.contributors-guide'),
            },
            {
              id: 'contributors-registration',
              link: 'contributors-registration',
              title: this.$t('banner.contributors-registration'),
            },
            {
              id: 'contributors-list',
              link: 'contributors',
              title: this.$t('banner.contributors-list'),
            },
            {
              id: 'contributors-submission',
              link: 'contributors-submission',
              title: this.$t('banner.contributors-submission'),
            },
            {
              id: 'contributors-validation',
              link: 'contributors-validation',
              title: this.$t('banner.contributors-validation'),
            },
          ],
        },
        {
          id: 'resources',
          icon: 'mdi-book-open-variant',
          link: 'resources',
          title: this.$t('banner.resources'),
          sections: [
            {
              id: 'resources-sop',
              link: 'resources-sop',
              title: this.$t('banner.resources-sop'),
            },
            {
              id: 'resources-groups',
              link: 'resources-working_groups',
              title: this.$t('banner.resources-groups'),
            },
            {
              id: 'resources-links',
              link: 'resources-links',
              title: this.$t('banner.resources-links'),
            },
            {
              id: 'resources-software',
              type: 'external',
              link: 'https://github.com/woudc/woudc/wiki',
              title: this.$t('banner.resources-software'),
            },
          ],
        },
        {
          id: 'news',
          icon: 'mdi-newspaper',
          link: 'news',
          title: this.$t('banner.news'),
        },
        {
          id: 'about',
          icon: 'mdi-information',
          link: 'about',
          title: this.$t('banner.about'),
          sections: [
            {
              id: 'about-home',
              link: 'about',
              title: this.$t('banner.about-home'),
            },
            {
              id: 'about-standards',
              link: 'about-standards',
              title: this.$t('banner.about-standards'),
            },
            {
              id: 'about-formats',
              link: 'about-formats',
              title: this.$t('banner.about-formats'),
            },
            {
              id: 'about-glossary',
              link: 'about-glossary',
              title: this.$t('banner.about-glossary'),
            },
            {
              id: 'about-faq',
              link: 'about-faq',
              title: this.$t('banner.about-faq'),
            },
          ],
        },
      ],
    }
  },
}
</script>

<style>
.underline-on-hover:hover {
  text-decoration: underline;
}
.no-underline {
  text-decoration: none;
}
.wmo-logo-banner {
  max-height: 40px;
  padding: 0.05em 0px 0.35em 0px;
  vertical-align: middle;
}
</style>
