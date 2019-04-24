const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_API_KEY}`

  request({ url, json: true }, (error, { body = { features: [] } }) => {
    const { features } = body

    if (error) {
      return callback('Unable to connect to location server!', {})
    } else if (features.length === 0) {
      return callback('Unable to find location', {})
    }

    const [ longitude, latitude ] = features[0].center

    callback(undefined, {
      latitude,
      longitude,
      name: features[0].place_name,
    })
  })
}

module.exports = geocode
