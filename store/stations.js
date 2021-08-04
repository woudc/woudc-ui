import { getDistinct } from '~/plugins/api/wdr.api.processes'

const defaultStationList = () => ({
  orderByID: [],
  orderByName: []
})

const groupStationsByDataset = (stnDataPairs, stationsByID) => {
  const stationsByDataset = {}
  const uvIndexDatasets = ['Broad-band', 'Spectral']

  for (const stnDataPair of stnDataPairs) {
    const dataset = stnDataPair.properties.dataset_id
    const stationID = stnDataPair.properties.station_id
    const station = stationsByID[stationID]

    // Instead of using the straight dataset key name, use a shorter lowercase name.
    const datasetKeys = []
    if (dataset === 'UmkehrN14_1.0') {
      const level = 1
      const key = 'umkehr' + parseInt(level)
      datasetKeys.push(key)
    } else if (dataset === 'UmkehrN14_2.0') {
      const level = 2
      const key = 'umkehr' + parseInt(level)
      datasetKeys.push(key)
    } else {
      const key = dataset.replace('-', '').toLowerCase()
      datasetKeys.push(key)
    }

    if (uvIndexDatasets.includes(dataset)) {
      datasetKeys.push('uvindex')
    }

    // Add a station to its group (unless that station is already tracked).
    for (const datasetKey of datasetKeys) {
      if (
        Object.prototype.hasOwnProperty.call(stationsByDataset, datasetKey) ===
        false
      ) {
        stationsByDataset[datasetKey] = [station]
      } else {
        const duplicate = stationsByDataset[datasetKey].some((oldStation) => {
          return oldStation.properties.woudc_id === stationID
        })
        if (!duplicate) {
          stationsByDataset[datasetKey].push(station)
        }
      }
    }
  }

  return stationsByDataset
}

const state = () => ({
  loadedStations: false,
  loadedStnDataPairs: false,
  stationsList: defaultStationList(),
  stationsByID: {},
  stnDataPairs: [],
  ozonesonde: defaultStationList(),
  totalozone: defaultStationList(),
  totalozoneobs: defaultStationList(),
  broadband: defaultStationList(),
  multiband: defaultStationList(),
  spectral: defaultStationList(),
  umkehr1: defaultStationList(),
  umkehr2: defaultStationList(),
  rocketsonde: defaultStationList(),
  lidar: defaultStationList(),
  uvindex: defaultStationList()
})

const getters = {
  all(state) {
    return state.stationsList
  },
  getWithID(state) {
    return (stationID) => {
      if (Object.prototype.hasOwnProperty.call(state.stationsByID, stationID)) {
        // check if exist
        return state.stationsByID[stationID]
      } else {
        return null
      }
    }
  },
  ozonesonde(state) {
    return state.ozonesonde
  },
  totalozone(state) {
    return state.totalozone
  },
  totalozoneobs(state) {
    return state.totalozoneobs
  },
  broadband(state) {
    return state.broadband
  },
  multiband(state) {
    return state.multiband
  },
  spectral(state) {
    return state.spectral
  },
  umkehr1(state) {
    return state.umkehr1
  },
  umkehr2(state) {
    return state.umkehr2
  },
  rocketsonde(state) {
    return state.rocketsonde
  },
  lidar(state) {
    return state.lidar
  },
  uvindex(state) {
    return state.uvindex
  }
}

const mutations = {
  setStations(state, stations) {
    const mappedByID = {}

    stations.orderByID.forEach((station) => {
      const id = station.properties.woudc_id
      mappedByID[id] = station
    })

    state.stationsList = stations
    state.stationsByID = mappedByID
  },
  setStationsList(state, stationsList) {
    state.stationsList = stationsList
  },
  setStationsById(state, stationsByID) {
    state.stationsByID = stationsByID
  },
  setStnDataPairs(state, stnDataPairs) {
    state.stnDataPairs = stnDataPairs
  },
  setStationsOzoneSonde(state, stations) {
    state.ozonesonde = stations
  },
  setStationsTotalOzone(state, stations) {
    state.totalozone = stations
  },
  setStationsTotalOzoneObs(state, stations) {
    state.totalozoneobs = stations
  },
  setStationsBroadband(state, stations) {
    state.broadband = stations
  },
  setStationsMultiband(state, stations) {
    state.multiband = stations
  },
  setStationsSpectral(state, stations) {
    state.spectral = stations
  },
  setStationsUmkehr1(state, stations) {
    state.umkehr1 = stations
  },
  setStationsUmkehr2(state, stations) {
    state.umkehr2 = stations
  },
  setStationsRocketSonde(state, stations) {
    state.rocketsonde = stations
  },
  setStationsLidar(state, stations) {
    state.lidar = stations
  },
  setStationsUVIndex(state, stations) {
    state.uvindex = stations
  },
  setLoadedStationsById(state, loaded) {
    state.loadedStationsById = loaded
  },
  setLoadedStnDataPairs(state, loaded) {
    state.loadedStnDataPairs = loaded
  }
}

const actions = {
  async downloadStations({ commit, state }) {
    if (state.loadedStations) {
      // prevent duplicate XHR
      return false
    }

    // Collect arrays of all stations in both ID and name order.
    const stationInputs = {
      index: 'station',
      distinct: {
        orderByID: ['woudc_id']
      }
    }
    const queryParams = { inputs: stationInputs }

    const stationsResponse = await getDistinct(
      this.$config.WOUDC_UI_API,
      queryParams
    )
    const stationsList = stationsResponse.data.outputs.orderByID

    // Use a map to let a station's properties all be available using just the ID.
    const stationsByID = {}
    stationsList.forEach((station) => {
      const stationID = station.properties.woudc_id
      stationsByID[stationID] = station
    })

    commit('setStationsById', stationsByID)
    commit('setStationsList', stationsList)
    commit('setLoadedStationsById', true)
  },
  async downloadStnDataPairs({ commit, state }) {
    if (state.loadedStnDataPairs) {
      // prevent duplicate XHR
      return false
    }

    // Download all contributions (basically station-dataset pairs)
    const contributionInputs = {
      index: 'contribution',
      distinct: {
        orderByID: ['station_id', 'dataset_id']
      },
      source: ['station_id']
    }
    const queryParams = { inputs: contributionInputs }

    const contributionsResponse = await getDistinct(
      this.$config.WOUDC_UI_API,
      queryParams
    )
    const stnDataPairs = contributionsResponse.data.outputs.orderByID

    commit('setStnDataPairs', stnDataPairs)
    commit('setLoadedStnDataPairs', true)
  },
  async downloadStationsByDataset({ dispatch, commit, state }) {
    if (!state.loadedStnDataPairs) {
      // prevent duplicate XHR
      await dispatch('downloadStnDataPairs')
    }
    if (!state.loadedStations) {
      // prevent duplicate XHR
      await dispatch('downloadStations')
    }

    // Group station data by dataset
    const stationsByDataset = groupStationsByDataset(
      state.stnDataPairs,
      state.stationsByID
    )

    commit('setStationsOzoneSonde', stationsByDataset.ozonesonde)
    commit('setStationsTotalOzone', stationsByDataset.totalozone)
    commit('setStationsTotalOzoneObs', stationsByDataset.totalozoneobs)
    commit('setStationsBroadband', stationsByDataset.broadband)
    commit('setStationsMultiband', stationsByDataset.multiband)
    commit('setStationsSpectral', stationsByDataset.spectral)
    commit('setStationsUmkehr1', stationsByDataset.umkehr1)
    commit('setStationsUmkehr2', stationsByDataset.umkehr2)
    commit('setStationsRocketSonde', stationsByDataset.rocketsonde)
    commit('setStationsLidar', stationsByDataset.lidar)
    commit('setStationsUVIndex', stationsByDataset.uvindex)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
