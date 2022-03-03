import woudcClient from '~/plugins/woudcClient'
import { unpackageInstrument } from '~/plugins/woudcJsonUtil.js'

function instrumentModelID(instrumentModelObj) {
  const components = [
    instrumentModelObj.properties.name,
    instrumentModelObj.properties.model,
    instrumentModelObj.properties.station_id,
    instrumentModelObj.properties.dataset,
  ]
  return components.join(':')
}

const state = () => ({
  loadedInstrumentModels: false,
  loadedInstrumentNames: false,
  loadedInstrumentFields: false,
  instrumentDistinctFields: {}, // Object of list of unique values for instrument fields.
  instrumentModels: [], // List of unique instrument name/model combinations.
  instrumentNames: [], // List of unique instrument names.
})

const getters = {
  // Returns a list of unique instrument name/model combinations.
  distinctFieldResolution(state) {
    return state.instrumentDistinctFields
  },
  modelResolution(state) {
    return state.instrumentModels
  },
  nameResolution(state) {
    return state.instrumentNames
  },
}

const mutations = {
  setInstrumentsDistinctFieldResolution(state, instruments) {
    state.instrumentDistinctFields = instruments
  },
  setInstrumentsNameResolution(state, instruments) {
    state.instrumentNames = instruments
  },
  setInstrumentsModelResolution(state, instruments) {
    state.instrumentModels = instruments
  },
  setLoaded(state) {
    state.loaded = true
  },
  setLoadedFields(state) {
    state.loadedInstrumentFields = true
  },
  setLoadedModels(state) {
    state.loadedInstrumentModels = true
  },
  setLoadedNames(state) {
    state.loadedInstrumentNames = true
  },
}

const actions = {
  async downloadDistinctModels({ commit, state }) {
    if (state.loaded) {
      return false
    }

    const queryURL =
      this.$config.WOUDC_UI_API_URL +
      '/processes/woudc-data-registry-select-distinct/execution'
    const inputs = {
      index: 'instrument',
      distinct: {
        modelResolution: ['name', 'model', 'station_id', 'dataset'],
      },
      source: [
        'station_name',
        'data_class',
        'contributor_name',
        'waf_url',
        'start_date',
        'end_date',
      ],
    }

    const queryParams = { inputs }
    const response = await woudcClient.post(queryURL, queryParams)
    const instrumentModels = response.data.modelResolution

    for (const model of instrumentModels) {
      const id = instrumentModelID(model)
      model.properties.identifier = id
    }

    commit(
      'setInstrumentsModelResolution',
      instrumentModels.map(unpackageInstrument)
    )
    commit('setLoadedModels', true)
  },
  async downloadDistinctNames({ commit, state }) {
    if (state.loaded) {
      return false
    }

    const queryURL =
      this.$config.WOUDC_UI_API_URL +
      '/processes/woudc-data-registry-select-distinct/execution'
    const inputs = {
      index: 'instrument',
      distinct: {
        nameResolution: ['name'],
      },
      source: [
        'station_name',
        'data_class',
        'country_name_en',
        'country_name_fr',
        'contributor_name',
        'waf_url',
        'start_date',
        'end_date',
      ],
    }

    const queryParams = { inputs }
    const response = await woudcClient.post(queryURL, queryParams)
    const instrumentNames = response.data.nameResolution

    for (const instrumentName of instrumentNames) {
      const id = instrumentName.properties.name
      instrumentName.properties.identifier = id
    }

    commit('setInstrumentsNameResolution', instrumentNames)
    commit('setLoadedNames', true)
  },
  async downloadDistinctFields({ commit, state }) {
    if (state.loaded) {
      return false
    }

    let distinctFields = {}
    const instrumentFields = [
      'name',
      'model',
      'dataset',
      'data_class',
      'station_name',
    ]
    for (const field of instrumentFields) {
      const queryURL =
        this.$config.WOUDC_UI_API_URL +
        '/processes/woudc-data-registry-select-distinct/execution'
      const inputs = {
        index: 'instrument',
        distinct: {
          modelResolution: [field],
        },
        source: [field],
      }
      const queryParams = { inputs }
      const response = await woudcClient.post(queryURL, queryParams)
      const responseArray = response.data.modelResolution

      distinctFields[`${field}`] = {
        value: field,
        array: [],
      }
      for (const item of responseArray) {
        distinctFields[`${field}`]['array'].push(item.properties[`${field}`])
      }
    }
    commit('setInstrumentsDistinctFieldResolution', distinctFields)
    commit('setLoadedFields', true)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
