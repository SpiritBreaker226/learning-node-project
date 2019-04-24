const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode('Ottawa', (error, location) => {
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
