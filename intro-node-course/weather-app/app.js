const request = require('request')

const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/37.8267,-122.4233?units=si`

request({ url, json: true }, (error, res) => {
  const { temperature, precipProbability } = res.body.currently

  console.log(`It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
})
