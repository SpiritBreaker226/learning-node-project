const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_API_KEY}`

  request({ url, json: true }, (error, res) => {
    if (error) {
      return callback('Unable to connect to location server!')
    } else if (res.body.features.length === 0) {
      return callback('Unable to find location')
    }

    callback(undefined, {
      latitude: res.body.features[0].center[1],
      longitude: res.body.features[0].center[0],
      location: res.body.features[0].place_name,
    })
  })
}

module.exports = geocode
