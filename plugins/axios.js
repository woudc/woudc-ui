import axios from 'axios'

const woudcClient = axios.create({
  baseURL: process.env.PYGEOAPI_HOSTNAME,
  timeout: 9000,
  headers: {
    'content-Type': 'application/json'
  }
})

export default woudcClient
