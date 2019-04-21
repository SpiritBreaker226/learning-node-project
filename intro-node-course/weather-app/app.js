const request = require('request')

const darkskyUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/37.8267,-122.4233?units=si`
const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${process.env.MAPBOX_API_KEY}`

request({ url: darkskyUrl, json: true }, (error, res) => {
  const { temperature, precipProbability } = res.body.currently
  const { data } = res.body.daily

  console.log(`${data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
})

request({ url: mapboxUrl, json: true }, (error, res) => {
  const [ longitude, latitude ] = res.body.features[0].center

  console.log(`Longitude: ${longitude}, Latitude: ${latitude}`)
})
