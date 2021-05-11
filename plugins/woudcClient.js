import axios from 'axios'

// Client setup for API use
const woudcClient = axios.create({
  baseURL: process.env.PYGEOAPI_HOSTNAME,
  timeout: 9000,
  headers: {
    'content-Type': 'application/json'
  }
})

export default woudcClient
