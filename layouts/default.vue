<template>
  <v-app>
    <v-navigation-drawer v-model="drawerOpen" temporary fixed app>
      <v-list>
        <div v-for="(group, groupTag) in links" :key="groupTag">
          <v-list-item
            v-if="group.link !== undefined"
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
      <v-app-bar-nav-icon @click.stop="drawerOpen = !drawerOpen" />
      <v-toolbar-title v-text="$t('common.woudcFull')" />
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
      links: {
        home: {
          icon: 'mdi-apps',
          link: 'index'
        },
        data: {
          icon: 'mdi-database',
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
.no-underline {
  text-decoration: none;
}
</style>
