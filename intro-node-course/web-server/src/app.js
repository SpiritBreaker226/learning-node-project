const express = require('express')

const app = express()

// add a route for express
app.get('', (req, res) => {
  res.send('Hello express!')
})

app.get('/help', (req, res) => {
  res.send('Help page')
})

// start server and listen on a port
app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
