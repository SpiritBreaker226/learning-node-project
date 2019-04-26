const https = require('https')

const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/40,-75?units=si`

const request = https.request(url, (res) => {
  let data = ''

  res.on('data', (chuck) => { data = data + chuck.toString() })

  res.on('end', () => {
    const body = JSON.parse(data)
    console.log(body)
  })
})

request.on('error', (error) => {
  console.log('An error', error)
})

request.end()
