const request = require('request')

const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/37.8267,-122.4233?units=si`

request({ url, json: true }, (error, res) => {
  const { temperature, precipProbability } = res.body.currently
  const { data } = res.body.daily

  console.log(`${data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
})
