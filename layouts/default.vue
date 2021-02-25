<template>
  <v-app>
    <v-navigation-drawer v-if="$vuetify.breakpoint.smAndDown" v-model="drawerOpen" temporary fixed app>
      <v-list>
        <div v-for="(group, groupTag) in links" :key="groupTag">
          <v-list-item
            v-if="group.sections == undefined"
            :to="localePath(group.link)"
            nuxt
          >
            <v-list-item-icon>
              <v-icon>{{ group.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t('banner.' + groupTag)" />
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-else :prepend-icon="group.icon">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="$t('banner.' + groupTag)" />
              </v-list-item-content>
            </template>
            <div v-for="(section, textTag) in group.sections" :key="textTag">
              <v-list-item v-if="section.type === 'external'">
                <v-list-item-action>
                  <v-icon>{{ group.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <a :href="section.link">{{ $t('banner.' + textTag) }}</a>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-else :to="localePath(section.link)" nuxt>
                <v-list-item-action>
                  <v-icon>{{ group.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="$t('banner.' + textTag)" />
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <div v-if="$vuetify.breakpoint.mdAndUp" class="text-center">
        <v-menu v-for="(group, groupTag) in links" :key="groupTag" offset-y open-on-hover transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="group.sections" elevation="0" v-bind="attrs" :to="localePath(group.link)" nuxt v-on="on">
              <v-icon>{{ group.icon }}</v-icon>
              {{ $t('banner.' + groupTag) }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn v-else elevation="0" :to="localePath(group.link)" nuxt>
              <v-icon>{{ group.icon }}</v-icon>
              {{ $t('banner.' + groupTag) }}
            </v-btn>
          </template>
          <v-list v-if="group.sections">
            <div v-for="(section, textTag) in group.sections" :key="textTag">
              <v-list-item v-if="section.type === 'external'">
                <v-list-item-content>
                  <a :href="section.link">{{ $t('banner.' + textTag) }}</a>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-else :to="localePath(section.link)" nuxt>
                <v-list-item-content>
                  <v-list-item-title v-text="$t('banner.' + textTag)" />
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-menu>
      </div>
      <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="drawerOpen = !drawerOpen" />
      <v-spacer />
      <nuxt-link v-if="locale === 'fr'" :to="switchLocalePath('en')">
        English
      </nuxt-link>
      <nuxt-link v-if="locale === 'en'" :to="switchLocalePath('fr')">
        Français
      </nuxt-link>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer app>
      <span>&copy; 2020</span>
      <h5 class="text-md-h6 ml-3" style="font-weight:normal">
        <nuxt-link class="no-underline underline-on-hover black--text" :to="localePath('/')">
          {{ $t('common.woudcFull') }}
        </nuxt-link>
      </h5>
      <v-spacer />
      <nuxt-link class="mr-10 no-underline" :to="localePath('contact')">
        <v-icon class="mr-1 pb-1">
          mdi-email
        </v-icon>
        {{ $t('banner.contact') }}
      </nuxt-link>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawerOpen: false,
      baseURL: process.env.BASE_URL,
      links: {
        data: {
          icon: 'mdi-database',
          link: 'data',
          sections: {
            'data-search': { link: 'data-search' },
            'data-products': { link: 'data-products' },
            'data-info': { link: 'data-dataset_info' },
            'data-stations': { link: 'data-stations' },
            'data-instruments': { link: 'data-instruments' }
          }
        },
        contributors: {
          icon: 'mdi-account-group',
          link: 'contributors',
          sections: {
            'contributors-guide': {
              type: 'external',
              link: 'https://guide.woudc.org'
            },
            'contributors-registration': { link: 'contributors-registration' },
            'contributors-list': { link: 'contributors' },
            'contributors-submission': { link: 'contributors-submission' },
            'contributors-validation': { link: 'contributors-validation' }
          }
        },
        resources: {
          icon: 'mdi-book-open-variant',
          link: 'resources',
          sections: {
            'resources-sop': { link: 'resources-sop' },
            'resources-groups': { link: 'resources-working_groups' },
            'resources-links': { link: 'resources-links' },
            'resources-software': {
              type: 'external',
              link: 'https://github.com/woudc/woudc/wiki'
            }
          }
        },
        news: {
          icon: 'mdi-newspaper',
          link: 'news'
        },
        about: {
          icon: 'mdi-information',
          link: 'about',
          sections: {
            'about-home': { link: 'about' },
            'about-quality': { link: 'about-data_quality' },
            'about-policy': { link: 'about-data_policy' },
            'about-standards': { link: 'about-standards' },
            'about-access': { link: 'about-data_access' },
            'about-formats': { link: 'about-formats' },
            'about-glossary': { link: 'about-glossary' },
            'about-faq': { link: 'about-faq' }
          }
        }
      }
    }
  },
  computed: {
    locale() {
      return this.$i18n.locale
    }
  }
}
</script>

<style>
.underline-on-hover:hover {
  text-decoration: underline;
}
.no-underline {
  text-decoration: none;
}
</style>
