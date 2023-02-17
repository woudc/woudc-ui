/* vuex file with the purpose of extracting and storing news data */
import woudcClient from '~/plugins/woudcClient'

const state = () => ({
  newsItems: [],
})

const getters = {
  newsItemsDateSorted: (state) => {
    return state.newsItems.sort((a, b) =>
      a.properties.published_date.slice(0, 10) <
      b.properties.published_date.slice(0, 10)
        ? 1
        : -1
    )
  },
}

const mutations = {
  setNewsItems(state, json) {
    state.newsItems = json
  },
}

const actions = {
  async loadNews({ commit }) {
    // TODO once pygeoapi updated: &sortby=-published_date
    const URL =
      this.$config.WOUDC_UI_API_URL + '/collections/notifications/items?f=json'
    try {
      const response = await woudcClient.get(URL)
      commit('setNewsItems', {
        json: response.data,
      })
    } catch (error) {
      console.error(error)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
