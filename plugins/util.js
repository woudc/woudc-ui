import Vue from 'vue'

Vue.prototype.$i18nToArray = (i18n) => {
  if (typeof i18n === 'string') {
    return i18n
  } else {
    const array = []
    Object.keys(i18n).forEach((key) => {
      array.push(i18n[key])
    })
    return array
  }
}
