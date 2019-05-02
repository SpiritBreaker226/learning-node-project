const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
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

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is some helpful text.',
    title: 'Help',
    name: 'Jason Stathopulos',
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'It is currently 50 degrees out',
    localion: 'New York',
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query)

  res.send({
    proudcts: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404 Help',
    name: 'Jason Stathopulos',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'Jason Stathopulos',
  })
})

// start server and listen on a port
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
