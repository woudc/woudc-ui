import colors from 'vuetify/es5/util/colors'

require('dotenv').config()

const PORT = process.env.npm_config_port || '3000'

export default {
  ssr: false,
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:' + PORT
  },
  router: {
    base: process.env.ROUTER_BASE || '/woudc-ui/'
  },
  generate: {
    exclude: [
      /^\/data\/stations\/[\d]+/,
      /^\/contributors$/,
    ],
    routes: [
      '/contributors/registration',
      '/contributors/submission',
      '/contributors/validation'
    ]
  },
  /*
   ** Global headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || 'WOUDC',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '~/css/globals.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/util.js'
  ],
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
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-i18n',
    'nuxt-leaflet'
  ],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#358ED3',
          secondary: '#9E9E9E',
          success: '#83EF9E',
          info: '#B3E5FC',
          warning: '#FFF59D',
          error: '#EF9A9A',
          accent: '#FFD54F'
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
   ** i18n global options
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
      },
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
    baseUrl: process.env.BASE_URL,
    seo: true
  },
  /*
   ** Build configuration
   */
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
    }
  }
}
