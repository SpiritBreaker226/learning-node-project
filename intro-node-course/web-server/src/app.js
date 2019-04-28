const path = require('path')
const express = require('express')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jason Stathopulos',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jason Stathopulos',
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'It is currently 50 degrees out',
    localion: 'New York',
  })
})

// start server and listen on a port
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
