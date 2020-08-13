
import axios from '~/plugins/axios'


const defaultStationList = () => ({
  orderByID: [],
  orderByName: []
})


function groupStationsByDataset(features, stationsByID) {
  const stationsByDataset = {}
  const uvIndexDatasets = [ 'Broad-band', 'Spectral' ]

  for (const feature of features) {
    const dataset = feature.properties.dataset
    const stationID = feature.properties.station_id
    const station = stationsByID[stationID]

    // Instead of using the straight dataset, use a shorter lowercase name.
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
      if (!(datasetKey in stationsByDataset)) {
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
  stationsList: defaultStationList(),
  stationsByID: {},
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
    return (station) => {
      if (station in state.stationsByID) {
        return state.stationsByID[station]
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
  setStations(state, stations, order) {
    const mappedByID = {}

    stations.orderByID.forEach((station) => {
      const id = station.properties.woudc_id
      mappedByID[id] = station
    })

    state.stationsList = stations
    state.stationsByID = mappedByID
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
  }
}


const actions = {
  async download({ commit, state }, proc) {
    if (state.loaded) {
      return false
    }

    const queryURL = '/processes/woudc-data-registry-select-distinct/jobs'

    // Collect arrays of all stations in both ID and name order.
    const stationInputs = [
      { id: 'index', type: 'text/plain', value: 'station' },
      { id: 'distinct', type: 'application/json', value: {
        orderByID: [ 'woudc_id' ],
        orderByName: [ 'name' ]
      } }
    ]
    let queryParams = { inputs: stationInputs }

    const stationsResponse = await axios.post(queryURL, queryParams)
    const stationsByOrdering = stationsResponse.data.outputs

    // Download all contributions (basically station-dataset pairs) in both orderings.
    const contributionInputs = [
      { id: 'index', type: 'text/plain', value: 'contribution' },
      { id: 'distinct', type: 'application/json', value: {
        orderByID: [ 'station_id', 'dataset' ],
        orderByName: [ 'station_name', 'dataset' ]
      } },
      { id: 'source', type: 'application/json', value: [ 'station_id' ] }
    ]
    queryParams = { inputs: contributionInputs }

    const contributionsResponse = await axios.post(queryURL, queryParams)
    const featuresByOrdering = contributionsResponse.data.outputs

    // Use a map to let a station's properties all be available using just the ID.
    const stationsByID = {}
    stationsByOrdering.orderByID.forEach((station) => {
      const stationID = station.properties.woudc_id
      stationsByID[stationID] = station
    })

    const groupsOrderedByID = groupStationsByDataset(
      featuresByOrdering.orderByID, stationsByID)
    const groupsOrderedByName = groupStationsByDataset(
      featuresByOrdering.orderByName, stationsByID)

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
