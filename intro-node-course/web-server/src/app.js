const express = require('express')

const app = express()

// add a route for express
app.get('', (req, res) => {
  res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
  res.send({
    name: 'Jason',
    age: 27,
  })
})

app.get('/about', (req, res) => {
  res.send([
    {
      name: 'Jason',
    },
    {
      name: 'Jackie',
    },
  ])
})

app.get('/weather', (req, res) => {
  res.send('Show Wather')
})

// start server and listen on a port
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
