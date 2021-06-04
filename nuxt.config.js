import colors from 'vuetify/es5/util/colors'
// import config from "./base.config";

import pkg from './package.json'

export default {
  router: {
    base: process.env.ROUTER_BASE || '/woudc-ui/'
  },
  /*
   ** Global headers of the page
   */
  head: {
    titleTemplate: '%s - ' + pkg.name,
    title: pkg.name || 'WOUDC',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          pkg.description ||
          'A World Meteorological Organization (WMO) data centre supporting the Global Atmosphere Watch (GAW) program operated by Environment and Climate Change Canada.'
      }
    ]
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/css/globals.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', { filename: '.env' }]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', 'nuxt-i18n', 'nuxt-leaflet'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#085eab',
          secondary: '#1bb4d4',
          success: '#83EF9E',
          info: '#B3E5FC',
          warning: '#FFF59D',
          error: '#EF9A9A',
          accent: '#faa52e'
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** nuxt-i18n module global options
   */
  i18n: {
    locales: [
      {
        code: 'fr',
        iso: 'fr-CA',
        name: 'Français'
      },
      {
        code: 'en',
        iso: 'en-CA',
        name: 'English'
      }
    ],
    strategy: 'prefix',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: ['en', 'fr'],
      messages: {
        en: require('./locales/en.json'),
        fr: require('./locales/fr.json')
      }
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'woudc_default_language'
    },
    baseUrl: process.env.BASE_URL || 'https://woudc.org'
  },
  /*
   ** Build configuration
   */
  ssr: true, // false for SPA mode, true for full static mode
  target: 'static', // static hosting
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // vue-i18n-loader for <i18n> blocks
      config.module.rules.push({
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: ['@intlify/vue-i18n-loader']
      })

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    filenames: {
      // app: '[name].js'
    }
  },
  generate: {
    fallback: '200.html',
    exclude: [
      // dynamically generated pages to use SPA fallback
      /\/data\/stations\/[\d]+$/,
      /\/donnees\/stations\/[\d]+$/,
      /\/contributors\/[\d\w-_]{1,8}$/,
      /\/contributeurs\/[\d\w-_]{1,8}$/,
      /\/data\/dataset-information/,
      /\/donnees\/information-sur-les-jeux-de-donnees/
    ]
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
    woudcAPI: process.env.WOUDC_API,
    emailAddress: process.env.EMAIL_ADDRESS,
    wafURL: process.env.WAF_URL,
    wmoRegionsURL: process.env.WMO_REGIONS_URL,
    appBuildYYYY: new Date().getFullYear(),
    appVersion: pkg.version,
    appName: pkg.name,
    appHomepage: pkg.homepage
  }
}
