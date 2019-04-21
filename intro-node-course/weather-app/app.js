const request = require('request')

const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/37.8267,-122.4233`

request({ url }, (error, res) => {
  const data = JSON.parse(res.body)

  console.log(data)
  console.log(data.currently)
})
