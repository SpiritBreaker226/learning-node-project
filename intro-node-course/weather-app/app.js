const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode('Ottawa', (error, location) => {
  console.log('Error', error)
  console.log('Data', location)

  forecast(location.latitude, location.longitude, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })
})
