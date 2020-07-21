
import axios from '~/plugins/axios'


const state = () => ({
  loaded: false,
  instrumentModels: []  // List of unique instrument name/model combinations.
})


const getters = {
  // Returns a list of unique instrument name/model combinations.
  modelResolution(state) {
    return state.instrumentModels
  }
}


const mutations = {
  setInstrumentsModelResolution(state, instruments) {
    state.instrumentModels = instruments
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

    const contributionsURL = '/collections/contributions/items'
    const queryParams = 'sortby=instrument_name:A,instrument_model:A&limit=5000'

    const response = await axios.get(contributionsURL + '?' + queryParams)
    const instruments = response.data.features

    const wafRoot = 'https://woudc.org/archive/Archive-NewFormat'
    const shipIDs = [ '146', '188', '212', '440', '521' ]

    // Eventually replace all this manual organization with a pygeoapi endpoint
    // that describes all instrument name/model combinations.
    instruments.forEach((instrument) => {
      instrument.properties.name = instrument.properties.instrument_name
      instrument.properties.model = instrument.properties.instrument_model

      delete instrument.properties.instrument_name
      delete instrument.properties.instrument_model

      const dataset = instrument.properties.dataset
      const network = instrument.properties.name.toLowerCase()

      const stationID = instrument.properties.station_id
      const stationType = stationID in shipIDs ? 'SHP' : 'STN'
      const stationKey = stationType.toLowerCase() + stationID

      const wafURL = `${wafRoot}/${dataset}_1.0_1/${stationKey}/${network}`
      instrument.properties.waf_url = wafURL
    })

    commit('setInstrumentsModelResolution', response.data.features)
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
