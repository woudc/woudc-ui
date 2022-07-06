import woudcClient from '../woudcClient'

const END_POINT_PROCESSES = '/processes'
const PROCESS_DISTINCT = '/woudc-data-registry-select-distinct'
const PROCESS_METRICS = '/woudc-data-registry-metrics'
const PROCESS_EXPLORE = '/woudc-data-registry-explore'
const PROCESS_VALIDATE = '/woudc-data-registry-validate'

const getDistinct = (WOUDC_UI_BASE_URL, queryParams) =>
  woudcClient.post(
    WOUDC_UI_BASE_URL + END_POINT_PROCESSES + PROCESS_DISTINCT + '/execution',
    queryParams
  )
const getMetrics = (WOUDC_UI_BASE_URL, queryParams) =>
  woudcClient.post(
    WOUDC_UI_BASE_URL + END_POINT_PROCESSES + PROCESS_METRICS + '/execution',
    queryParams
  )
const getExplore = (WOUDC_UI_BASE_URL, queryParams) =>
  woudcClient.post(
    WOUDC_UI_BASE_URL + END_POINT_PROCESSES + PROCESS_EXPLORE + '/execution',
    queryParams
  )
const getValidate = (WOUDC_UI_BASE_URL, queryParams) =>
  woudcClient.post(
    WOUDC_UI_BASE_URL + END_POINT_PROCESSES + PROCESS_VALIDATE + '/execution',
    queryParams
  )

export { getDistinct, getMetrics, getExplore, getValidate }
