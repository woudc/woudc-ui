import axios from 'axios'

const state = () => ({
  availableList: {},
  loaded: {},
})

const getters = {
  getAvailableListByPathId(state) {
    return (pathId) => {
      if (Object.prototype.hasOwnProperty.call(state.availableList, pathId)) {
        // check if exist
        return state.availableList[pathId]
      } else {
        return null
      }
    }
  },
  getLoadedByPathId(state) {
    return (pathId) => {
      if (Object.prototype.hasOwnProperty.call(state.loaded, pathId)) {
        return state.loaded[pathId]
      } else {
        return false
      }
    }
  },
}

const mutations = {
  setLoaded(state, payload) {
    state.loaded[payload.pathId] = payload.loaded
  },
  setAvailableList(state, payload) {
    state.availableList[payload.pathId] = payload.availableList
  },
}

const actions = {
  async retrieveAvailableListByPathId({ commit, getters }, pathId) {
    if (getters.getLoadedByPathId(pathId)) {
      return false
    }

    const response = await axios.get(
      `${this.$config.WOUDC_UI_WAF_URL}/px-testing/ozone_maps/${pathId}/index.json`
    )
    commit('setAvailableList', {
      pathId: pathId,
      availableList: response.data.available,
    })
    commit('setLoaded', { pathId: pathId, loaded: true })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
