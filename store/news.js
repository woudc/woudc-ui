/* vuex file with the purpose of extracting and storing news data */
import axios from '~/plugins/axios'

const URL = process.env.PYGEOAPI_HOSTNAME + '/collections/notifications/items?f=json'

const state = () => ({
  newsItems: []
})

const getters = {
  newsItems: (state) => {
    return state.newsItems
  }
}

const mutations = {
  setNewsItems(state, json){
    state.newsItems = json
  }
}

const actions = {
  async loadNews({commit,getters}) {
    try{
      const response = await axios.get(URL)
      commit('setNewsItems', {
        json: response.data
      })
    } catch (error) {
      console.error(error)
    }
  }
}

     
    
    




export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
