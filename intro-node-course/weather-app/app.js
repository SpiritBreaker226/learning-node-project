const request = require('request')

const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/37.8267,-122.4233`

request({ url, json: true }, (error, res) => {
  console.log(res.body.currently)
})
