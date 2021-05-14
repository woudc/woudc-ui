import woudcClient from '../woudcClient'

const END_POINT_PROCESSES = '/processes'
const PROCESS_DISTINCT = '/woudc-data-registry-select-distinct'
const PROCESS_METRICS = '/woudc-data-registry-metrics'
const PROCESS_EXPLORE = '/woudc-data-registry-explore'

const getDistinct = (queryParams) => woudcClient.post(END_POINT_PROCESSES + PROCESS_DISTINCT + '/jobs', queryParams)
const getMetrics = (queryParams) => woudcClient.post(END_POINT_PROCESSES + PROCESS_METRICS + '/jobs', queryParams)
const getExplore = (queryParams) => woudcClient.post(END_POINT_PROCESSES + PROCESS_EXPLORE + '/jobs', queryParams)

export {
  getDistinct,
  getMetrics,
  getExplore
}
