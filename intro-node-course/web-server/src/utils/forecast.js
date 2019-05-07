const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}?units=si`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback('Unable to connect to weather service!', {})
    } else if (body.error) {
      return callback('Unable to find location', {})
    }

    const { temperature, precipProbability } = body.currently
    const { data } = body.daily

    callback(
      undefined,
      `${data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`
    )
  })
}

module.exports = forecast
