const path = require('path')
const express = require('express')

const app = express()

// shows the path of the current folder
console.log(__dirname)

// shows the path of the current file
console.log(__filename)

// shows how to change the path
console.log(path.join(__dirname, '..'))

// shows how to change the path to another folder
console.log(path.join(__dirname, '../public'))

// add a route for express
app.get('', (req, res) => {
  res.send('<h1>Welcome</h1>')
})

app.get('/help', (req, res) => {
  res.send('Help Page')
})

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>')
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
