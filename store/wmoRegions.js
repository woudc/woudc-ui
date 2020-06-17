
import axios from 'axios'


const state = () => ({
  regions: {},
  loaded: false
})

const getters = {
  all(state) {
    return state.regions
  },
  africa(state) {
    return state.loaded ? state.regions.I : null
  },
  asia(state) {
    return state.loaded ? state.regions.II : null
  },
  europe(state) {
    return state.loaded ? state.regions.VI : null
  },
  northAmerica(state) {
    return state.loaded ? state.regions.IV : null
  },
  southAmerica(state) {
    return state.loaded ? state.regions.III : null
  },
  southWestPacific(state) {
    return state.loaded ? state.regions.V : null
  }
}

const mutations = {
  setBoundaryPoints(state, regions) {
    state.regions = regions
  },
  setLoaded(state, loaded) {
    state.loaded = loaded
  }
}

const actions = {
  async download({ commit, state }, proc) {
    if (state.loaded) {
      return false
    }

    const response = await axios.get(process.env.WMO_REGIONS_URL)
    const regionShapes = {}

    for (const region of response.data.features) {
      const regionID = region.properties.roman_num
      regionShapes[regionID] = region
    }

    commit('setBoundaryPoints', regionShapes)
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
