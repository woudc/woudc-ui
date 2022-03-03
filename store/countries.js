import { getDistinct } from '~/plugins/api/wdr.api.processes'
import axios from 'axios'

const state = () => ({
  loadedCountries: false,
  boundaries: {},
  loadedBoundaries: false,
  countriesList: [],
})

const getters = {
  all(state) {
    return state.countriesList
  },
  boundaries(state) {
    return state.boundaries
  },
}

const mutations = {
  setCountries(state, countries) {
    state.countriesList = countries
  },
  setLoaded(state) {
    state.loadedCountries = true
  },
  setLoadedboundaries(state) {
    state.loadedBoundaries = true
  },
  setBoundaries(state, boundaries) {
    state.boundaries = boundaries
  },
}

const actions = {
  async downloadBounds({ commit, state }) {
    if (state.loadedBoundaries) {
      return false
    }

    // /static/countries.json
    const response = await axios.get('countries.json')
    let bounds = response.data

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
          [north, east],
        ]
      }
    })

    commit('setBoundaries', bounds)
    commit('setLoadedboundaries')
  },
  async downloadCountries({ commit, state }) {
    if (state.loadedCountries) {
      return false
    }

    const inputs = {
      index: 'contribution',
      distinct: {
        orderByCode: ['country_id'],
      },
      source: ['country_id', 'country_name_en', 'country_name_fr'],
    }

    const queryParams = { inputs }
    const countriesResponse = await getDistinct(
      this.$config.WOUDC_UI_API_URL,
      queryParams
    )
    const countries = countriesResponse.data.orderByCode

    commit('setCountries', countries)
    commit('setLoaded')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
