const checker = require('i18n-checker')
const reporter = checker.reporters.standard

const options = {
  baseDir: __dirname,
  dirs: [
    {
      localeDir: 'locales',
      core: true
    }
  ],
  verifyOptions: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    rules: [
      'all-locales-present',
      'valid-json-file',
      'no-duplicate-with-core',
      'all-keys-translated',
      'key-trimmed',
      'no-duplicate-among-modules',
      'default-locale-translate'
    ]
  }
}

checker(options, (err, report) => {
  reporter(report)
})
