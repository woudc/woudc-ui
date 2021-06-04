import woudcClient from '../woudcClient'

const END_POINT_PROCESSES = '/processes'
const PROCESS_DISTINCT = '/woudc-data-registry-select-distinct'
const PROCESS_METRICS = '/woudc-data-registry-metrics'
const PROCESS_EXPLORE = '/woudc-data-registry-explore'

const getDistinct = (baseURL, queryParams) =>
  woudcClient.post(
    baseURL + END_POINT_PROCESSES + PROCESS_DISTINCT + '/jobs',
    queryParams
  )
const getMetrics = (baseURL, queryParams) =>
  woudcClient.post(
    baseURL + END_POINT_PROCESSES + PROCESS_METRICS + '/jobs',
    queryParams
  )
const getExplore = (baseURL, queryParams) =>
  woudcClient.post(
    baseURL + END_POINT_PROCESSES + PROCESS_EXPLORE + '/jobs',
    queryParams
  )

export { getDistinct, getMetrics, getExplore }
