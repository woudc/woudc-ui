import axios from 'axios'

// Client setup for API use
// Only to be used for API or very custom HTTP request to woudc-api.
// Try utilizing ./api/*.js or create an appropriate API call

const woudcClient = axios.create({
  timeout: 9000,
  headers: {
    'content-Type': 'application/json'
  }
})

export default woudcClient
