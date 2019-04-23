const request = require('request')

const geocode = require('./utils/geocode')

geocode('Ottawa', (error, data) => {
  if (error) {
    console.log(error)
    return
  }

  console.log(data)
})
