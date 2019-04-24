const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const cityName = process.argv[2]

if (!cityName) {
  return console.log('City name must be provided')
}

geocode(cityName, (error, location) => {
  if (error) {
    return console.log(error)
  }

  forecast(location.latitude, location.longitude, (error, forecast) => {
    if (error) {
      return console.log(error)
    }

    console.log(location.name)
    console.log(forecast)
  })
})
