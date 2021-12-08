function standardizedCountryName(geoJSON) {
  return {
    en: geoJSON.properties.country_name_en,
    fr: geoJSON.properties.country_name_fr
  }
}

function standardizedGeometry(geoJSON) {
  return {
    type: geoJSON.geometry.type,
    coordinates: [
      geoJSON.geometry.coordinates[1],
      geoJSON.geometry.coordinates[0]
    ]
  }
}

function stripProperties(geoJSON) {
  const properties = Object.assign({}, geoJSON.properties)

  if ('geometry' in geoJSON) {
    properties.geometry = standardizedGeometry(geoJSON)
  }

  return properties
}

function unpackageStation(geoJSON) {
  const station = stripProperties(geoJSON)
  station.country_name = standardizedCountryName(geoJSON)

  station.identifier = station.woudc_id
  station.last_validated_datetime = station.last_validated_datetime.substring(
    0,
    10
  )

  return station
}

function unpackageBareStation(geoJSON) {
  const station = stripProperties(geoJSON)

  station.identifier = station.woudc_id || station.station_id
  return station
}

function unpackageInstrument(geoJSON) {
  const instrument = stripProperties(geoJSON)
  instrument.country_name = standardizedCountryName(geoJSON)

  return instrument
}

function unpackageContributor(geoJSON) {
  const contributor = stripProperties(geoJSON)
  contributor.country_name = standardizedCountryName(geoJSON)

  return contributor
}

function unpackageDeployment(geoJSON) {
  const deployment = stripProperties(geoJSON)
  deployment.country_name = standardizedCountryName(geoJSON)

  return deployment
}

// compare function for sorting by obj[key]
const compareOnKey = function(key) {
  return function(a, b) {
    // compare
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }
    // a === b
    return 0
  }
}

// compare function for sorting by obj[key] with locale (accented characters)
const compareLocaleOnKey = function(key) {
  return function(a, b) {
    return a[key].localeCompare(b[key])
  }
}

export {
  stripProperties,
  unpackageStation,
  unpackageBareStation,
  unpackageContributor,
  unpackageInstrument,
  unpackageDeployment,
  compareOnKey,
  compareLocaleOnKey
}
