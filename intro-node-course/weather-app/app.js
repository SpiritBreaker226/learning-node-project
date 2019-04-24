const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const cityName = process.argv[2]

if (!cityName) {
  return console.log('City name must be provided')
}

geocode(cityName, (error, { latitude, longitude, name: locationName }) => {
  if (error) {
    return console.log(error)
  }

  forecast(latitude, longitude, (error, forecast) => {
    if (error) {
      return console.log(error)
    }

    console.log(locationName)
    console.log(forecast)
  })
})
