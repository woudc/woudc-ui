<template>
  <v-container>
    <h2>{{ $t('resources.title') }}</h2>
    <v-row>
      <v-col>
        <ul>
          <li>
            <nuxt-link :to="localePath('resources-sop')">
              <span>{{ $t('resources.links.sop') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('resources-working_groups')">
              <span>{{ $t('resources.links.working_groups') }}</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('resources-links')">
              <span>{{ $t('resources.links.links') }}</span>
            </nuxt-link>
          </li>
          <li>
            <a :href="softwareURL" target="_blank">
              <span>
                {{ $t('resources.links.software') }}
                <v-icon x-small>mdi-open-in-new</v-icon>
              </span>
            </a>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      softwareURL: 'https://github.com/woudc/woudc/wiki',
    }
  },
  head() {
    return {
      title: this.$t('resources.title'),
      titleTemplate: this.$titleTemplate(
        this.$t('common.woudc'),
        this.$t('common.woudcFull')
      ),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('resources.description'),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.$t('resources.keywords'),
        },
      ],
    }
  },
  nuxtI18n: {
    paths: {
      en: '/resources',
      fr: '/ressources',
    },
  },
}
</script>
