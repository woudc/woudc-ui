
import axios from '~/plugins/axios'


const state = () => ({
  loaded: false,
  contributorsList: [],
  contributorsByAcronym: {}
})


const getters = {
  all(state) {
    return state.contributorsList
  },
  getWithAcronym(state) {
    return (acronym) => {
      if (acronym in state.contributorsByAcronym) {
        return state.contributorsByAcronym[acronym]
      } else {
        return null
      }
    }
  }
}


const mutations = {
  setContributors(state, contributors) {
    const byAcronym = {}

    contributors.forEach((contributor) => {
      const acronym = contributor.properties.acronym
      if (!(acronym in byAcronym)) {
        byAcronym[acronym] = [ contributor ]
      } else {
        byAcronym[acronym].push(contributor)
      }
    })

    state.contributorsList = contributors
    state.contributorsByAcronym = byAcronym
  },
  setLoaded(state) {
    state.loaded = true
  }
}


const actions = {
  async download({ commit, state }, proc) {
    if (state.loaded) {
      return false
    }

    const contributorsURL = '/collections/contributors/items'
    const queryParams = 'sortby=acronym:A&limit=1000'

    const response = await axios.get(contributorsURL + '?' + queryParams)

    commit('setContributors', response.data.features)
    commit('setLoaded', true)
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
