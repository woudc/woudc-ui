
import axios from '~/plugins/axios'


const defaultStationList = () => ({
  orderByID: [],
  orderByName: []
})

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

    const stationsURL = '/collections/stations/items'
    const contributionsURL = '/collections/contributions/items'

    // Collect arrays of all stations in both ID and name order.
    let queryParams = 'sortby=woudc_id:A&limit=1000'
    let stationsResponse = await axios.get(stationsURL + '?' + queryParams)
    const stationsIDOrder = stationsResponse.data.features

    queryParams = 'sortby=name:A&limit=1000'
    stationsResponse = await axios.get(stationsURL + '?' + queryParams)
    const stationsNameOrder = stationsResponse.data.features

    // Use a map to let a station's properties all be available using just the ID.
    const stationsByID = {}
    stationsIDOrder.forEach((station) => {
      const stationID = station.properties.woudc_id
      stationsByID[stationID] = station
    })

    // Download all contributions (basically station-dataset pairs) in both orderings.
    queryParams = `sortby=dataset:A,station_id:A&limit=2500`
    let contributionsResponse = await axios.get(contributionsURL + '?' + queryParams)
    const contributionsIDOrder = contributionsResponse.data.features

    queryParams = `sortby=dataset:A,station_name:A&limit=2500`
    contributionsResponse = await axios.get(contributionsURL + '?' + queryParams)
    const contributionsNameOrder = contributionsResponse.data.features

    const featuresByOrdering = {
      orderByID: contributionsIDOrder,
      orderByName: contributionsNameOrder
    }

    // Group lists of stations be dataset in both orderings.
    const stationsByDataset = {}
    for (const [ order, features ] of Object.entries(featuresByOrdering)) {
      for (const feature of features) {
        const dataset = feature.properties.dataset
        const stationID = feature.properties.station_id
        const station = stationsByID[stationID]

        // Instead of using the straight dataset, use a shorter lowercase name.
        let datasetKey
        if (dataset !== 'UmkehrN14') {
          datasetKey = dataset.replace('-', '').toLowerCase()
        } else {
          const level = 1
          datasetKey = 'umkehr' + parseInt(level)
        }

        // Add a station to its group (unless that station is already tracked).
        if (!(datasetKey in stationsByDataset)) {
          stationsByDataset[datasetKey] = defaultStationList()
          stationsByDataset[datasetKey][order] = [ station ]
        } else {
          const duplicate = stationsByDataset[datasetKey][order]
            .some((oldStation) => {
              return oldStation.properties.woudc_id === stationID
            })
          if (!duplicate) {
            stationsByDataset[datasetKey][order].push(station)
          }
        }
      }
    }

    // Adding an empty Umkehr2 list here is temporary until Contributions
    // can identify level 2 Umkehr.
    stationsByDataset.umkehr2 = defaultStationList()

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

    commit('setStations', {
      orderByID: stationsIDOrder,
      orderByName: stationsNameOrder
    })

    const orderingProps = {
      orderByID: 'woudc_id',
      orderByName: 'name'
    }

    // Combine Broad-band and Spectral stations into UV Index for both orderings,
    // being careful to eliminate duplicate stations.
    stationsByDataset.uvindex = {}
    for (const [ order, prop ] of Object.entries(orderingProps)) {
      const uvStations = stationsByDataset.broadband[order].concat(
        stationsByDataset.spectral[order]
      ).sort((station1, station2) => {
        return station1.properties[prop].localeCompare(station2.properties[prop])
      }).filter((station, index, array) => {
        const other = array[index - 1]
        return index === 0
               || station.properties.woudc_id !== other.properties.woudc_id
      })
      stationsByDataset.uvindex[order] = uvStations
    }

    commit('setStationsUVIndex', stationsByDataset.uvindex)
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
