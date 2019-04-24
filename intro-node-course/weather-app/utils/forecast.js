const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}?units=si`

  request({ url, json: true }, (error, res) => {
    if (error) {
      return callback('Unable to connect to weather service!')
    } else if (res.body.error) {
      return callback('Unable to find location')
    }

    const { temperature, precipProbability } = res.body.currently
    const { data } = res.body.daily

    callback(
      undefined,
      `${data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
    )
  })
}

module.exports = forecast
