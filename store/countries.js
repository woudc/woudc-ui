import { getDistinct } from '~/plugins/api/wdr.api.processes'

import bounds from '~/static/countries.json'

// Change International Waters country code from XZ to XY
bounds.XY = bounds.XZ
delete bounds.XZ

Object.keys(bounds).forEach((countryCode) => {
  if (bounds[countryCode][1] === null) {
    bounds[countryCode] = null
  } else {
    const [west, south, east, north] = bounds[countryCode][1]
    bounds[countryCode] = [
      [south, west],
      [north, east]
    ]
  }
})

const state = () => ({
  loaded: false,
  boundaries: bounds,
  countriesList: []
})

const getters = {
  all(state) {
    return state.countriesList
  },
  boundaries(state) {
    return state.boundaries
  }
}

const mutations = {
  setCountries(state, countries) {
    state.countriesList = countries
  },
  setLoaded(state) {
    state.loaded = true
  }
}

const actions = {
  async download({ commit, state }) {
    if (state.loaded) {
      return false
    }

    const inputs = [
      { id: 'index', type: 'text/plain', value: 'contribution' },
      {
        id: 'distinct',
        type: 'application/json',
        value: {
          orderByCode: ['country_id']
        }
      },
      {
        id: 'source',
        type: 'application/json',
        value: ['country_id', 'country_name_en', 'country_name_fr']
      }
    ]

    const queryParams = { inputs }
    const countriesResponse = await getDistinct(
      this.$config.WOUDC_UI_API,
      queryParams
    )
    const countries = countriesResponse.data.outputs.orderByCode

    commit('setCountries', countries)
    commit('setLoaded')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
