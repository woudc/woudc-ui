
import woudcClient from '~/plugins/woudcClient'


function instrumentModelID(instrumentModelObj) {
  const components = [
    instrumentModelObj.properties.name, instrumentModelObj.properties.model,
    instrumentModelObj.properties.station_id, instrumentModelObj.properties.dataset
  ]
  return components.join(':')
}


const state = () => ({
  loaded: false,
  instrumentModels: [],  // List of unique instrument name/model combinations.
  instrumentNames: []  // List of unique instrument names.
})


const getters = {
  // Returns a list of unique instrument name/model combinations.
  modelResolution(state) {
    return state.instrumentModels
  },
  nameResolution(state) {
    return state.instrumentNames
  }
}


const mutations = {
  setInstrumentsNameResolution(state, instruments) {
    state.instrumentNames = instruments
  },
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

    const queryURL = '/processes/woudc-data-registry-select-distinct/jobs'
    const inputs = [
      { id: 'index', type: 'text/plain', value: 'instrument' },
      { id: 'distinct', type: 'application/json', value: {
        nameResolution: [ 'name' ],
        modelResolution: [ 'name', 'model', 'station_id', 'dataset' ]
      } },
      { id: 'source', type: 'application/json', value: [
        'station_name', 'data_class', 'country_name_en', 'country_name_fr',
        'contributor_name', 'waf_url', 'start_date', 'end_date'
      ] }
    ]

    const queryParams = { inputs }
    const response = await woudcClient.post(queryURL, queryParams)
    const instruments = response.data.outputs

    for (const instrumentName of instruments.nameResolution) {
      const id = instrumentName.properties.name
      instrumentName.properties.identifier = id
    }

    for (const instrumentModel of instruments.modelResolution) {
      const id = instrumentModelID(instrumentModel)
      instrumentModel.properties.identifier = id
    }

    commit('setInstrumentsNameResolution', instruments.nameResolution)
    commit('setInstrumentsModelResolution', instruments.modelResolution)
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
