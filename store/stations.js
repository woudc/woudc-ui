import { getDistinct } from '~/plugins/api/wdr.api.processes'

const defaultStationList = () => ({
  orderByID: [],
  orderByName: []
})

const groupStationsByDataset = (stnDataPairs, stationsByID) => {
  const stationsByDataset = {}
  const uvIndexDatasets = [ 'Broad-band', 'Spectral' ]

  for (const stnDataPair of stnDataPairs) {
    const dataset = stnDataPair.properties.dataset_id
    const stationID = stnDataPair.properties.station_id
    const station = stationsByID[stationID]

    // Instead of using the straight dataset key name, use a shorter lowercase name.
    const datasetKeys = []
    if (dataset === 'UmkehrN14') {
      const level = 1
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
      if (Object.prototype.hasOwnProperty.call(stationsByDataset, datasetKey) === false) {
        stationsByDataset[datasetKey] = [ station ]
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

  // Adding an empty Umkehr2 list here is temporary until Contributions
  // can identify level 2 Umkehr.
  stationsByDataset.umkehr2 = defaultStationList()

  return stationsByDataset
}

const state = () => ({
  loaded: false,
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
      if (Object.prototype.hasOwnProperty.call(state.stationsByID, stationID)) { // check if exist
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
  setLoaded(state, loaded) {
    state.loaded = loaded
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
    if (state.loadedStations) { // prevent duplicate XHR
      return false
    }

    // Collect arrays of all stations in both ID and name order.
    const stationInputs = [
      { id: 'index', type: 'text/plain', value: 'station' },
      { id: 'distinct', type: 'application/json',
        value: {
          orderByID: [ 'woudc_id' ]
        }
      }
    ]
    const queryParams = { inputs: stationInputs }

    const stationsResponse = await getDistinct(queryParams)
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
    if (state.loadedStnDataPairs) { // prevent duplicate XHR
      return false
    }

    // Download all contributions (basically station-dataset pairs)
    const contributionInputs = [
      { id: 'index', type: 'text/plain', value: 'contribution' },
      { id: 'distinct', type: 'application/json', value: {
        orderByID: [ 'station_id', 'dataset_id' ]
      } },
      { id: 'source', type: 'application/json', value: [ 'station_id' ] }
    ]
    const queryParams = { inputs: contributionInputs }

    const contributionsResponse = await getDistinct(queryParams)
    const stnDataPairs = contributionsResponse.data.outputs.orderByID

    commit('setStnDataPairs', stnDataPairs)
    commit('setLoadedStnDataPairs', true)
  },
  async downloadStationsByDataset({ dispatch, commit, state }) {
    if (state.loaded) { // prevent duplicate XHR
      return false
    }

    // Get the data
    await dispatch('downloadStations')
    await dispatch('downloadStnDataPairs')

    // Group station data by dataset
    const stationsByDataset = groupStationsByDataset(state.stnDataPairs, state.stationsByID)

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
    commit('setLoaded', true)
  },
  async download({ commit, state }) { // TO BE DEPRECATED; replace with downloadStationsByDataset
    if (state.loaded) { // prevent duplicate XHR
      return false
    }

    // Collect arrays of all stations in both ID and name order.
    const stationInputs = [
      { id: 'index', type: 'text/plain', value: 'station' },
      { id: 'distinct', type: 'application/json', value: {
        orderByID: [ 'woudc_id' ],
        orderByName: [ 'name' ]
      } }
    ]
    let queryParams = { inputs: stationInputs }

    const stationsResponse = await getDistinct(queryParams)
    const stationsByOrdering = stationsResponse.data.outputs

    // Use a map to let a station's properties all be available using just the ID.
    const stationsByID = {}
    stationsByOrdering.orderByID.forEach((station) => {
      const stationID = station.properties.woudc_id
      stationsByID[stationID] = station
    })

    // Download all contributions (basically station-dataset pairs) in both orderings.
    const contributionInputs = [
      { id: 'index', type: 'text/plain', value: 'contribution' },
      { id: 'distinct', type: 'application/json', value: {
        orderByID: [ 'station_id', 'dataset_id' ],
        orderByName: [ 'station_name', 'dataset_id' ]
      } },
      { id: 'source', type: 'application/json', value: [ 'station_id' ] }
    ]
    queryParams = { inputs: contributionInputs }

    const contributionsResponse = await getDistinct(queryParams)
    const featuresByOrdering = contributionsResponse.data.outputs

    const groupsOrderedByID = groupStationsByDataset(featuresByOrdering.orderByID, stationsByID)
    const groupsOrderedByName = groupStationsByDataset(featuresByOrdering.orderByName, stationsByID)

    const allDatasets = Object.keys(groupsOrderedByID)
    const stationsByDataset = {}

    allDatasets.forEach((datasetKey) => {
      stationsByDataset[datasetKey] = {
        orderByID: groupsOrderedByID[datasetKey],
        orderByName: groupsOrderedByName[datasetKey]
      }
    })

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

    commit('setStations', stationsByOrdering)
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
