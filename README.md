# woudc-www

> Next version of WOUDC UI using Nuxt and VueJS.

## Build Setup

- Install NodeJS
- Create a **copy** of the `.env.sample` file and **rename** to `.env`
  - `BASE_URL` should be the domain + path to your root app
  - `ROUTER_BASE` should be the path to your root application

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project: https://nuxtjs.org/guide#static-generated-pre-rendering-
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## SPA fallback in deployment

Since not all pages in WOUDC will be pre-generated, a fallback is required to redirect to `200.html` to handle pages with dynamic data.

Apache server mod-rewrite example (deployed to subfolder `/subfolder-name` as the base route):
```xml
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /subfolder-name/
RewriteRule ^subfolder-name/200\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /subfolder-name/200.html [L]
</IfModule>
```

After building your files (`npm run build`), you can copy the `.htaccess` sample to your `/dist` for convenience and modify it to according to your server settings.
``` bash
# modify to your web server specs
vi .htaccess

# build
npm run build

# copy to /dist
cp .htaccess ./dist
```

## Environment variables (.env)

This project includes a `.env.sample` file. **You must rename the file to `.env` and fill in your environment variables so that Nuxt will load it in by default.** If you don't rename or you want to have multiple `.env` files, you must [configure the options of the `dotenv-module`](https://github.com/nuxt-community/dotenv-module#options) module within the `nuxt.config.js` file to match the correct `.env` file accordingly.

## Linting

Linting is incorporated when running `npm run dev` and when you `git commit`.

Your code can be linted by running `npm run lint` to check for validation. You can also run `npm run lintfix` to apply corrections where it can to your code.

## Design

[Vuetify](https://vuetifyjs.com/en/introduction/why-vuetify) was chosen for the styling and theme, which applies the [Material design specification](https://material.io/design/). [UI components](https://vuetifyjs.com/en/components/api-explorer) from Vuetify should be used for any user interactable components. Some of the UI components have `nuxt` support (ie. for routing).

## SEO

SEO is handled by Nuxt in the [`head()` method](https://nuxtjs.org/api/pages-head). 

### Microdata

In addition, [Microdata](https://schema.org/docs/gs.html) is incorporated to give further context to individual pages (ie. including html attributes `itemscope`, `itemprop`, `itemtype`). To validate your Microdata, use [Google's structured data testing tool](https://search.google.com/structured-data/testing-tool); using "View page source" of your page, and copying and pasting into the code snippet.

### i18n

Translation of SEO text is handled by `nuxt-i18n`. Please see the [nuxt-i18n SEO guide](https://nuxt-community.github.io/nuxt-i18n/seo.html) on how it works and other configuration.

## Translation (i18n)

The i18n framework is configured with [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/) and is integrated with `vue-i18n`.

### Routing

Please see the [nuxt-i18n routing guide](https://nuxt-community.github.io/nuxt-i18n/routing.html).

### Translate

To translate text, use [BabelEdit](https://www.codeandweb.com/babeledit/download) and load the `.babel` file in the root of the project. If there are new `.vue` components, they need to be added in (by file or by folder). If translation needs to be sent to a 3rd party translator, BabelEdit can export the translation to a `CSV` which can be sent off to the translator. Once completed, import the `CSV` in to BabelEdit to apply the completed translations.

Alternatively, a FOSS program called [i18n Manager](https://github.com/gilmarsquinelato/i18n-manager) is recommended to manage translation text.

## Testing

Unit testing is done using [Jest](https://jestjs.io/docs/en/expect#content) and can be run by the command: `npm run test`.

Please see the guide on [testing single file components with Jest](https://vue-test-utils.vuejs.org/guides/#testing-single-file-components-with-jest).

**Tip:** Don't write unit test for every single case. Instead, the next time you get an error in your development, write a unit test in the `/test` folder to help validate your code.
