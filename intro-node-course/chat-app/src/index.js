const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const Filter = require('bad-words')

const {
  generateMessage,
  generateLocationMessage,
} = require('./utils/messages')

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ socketId: socket.id, ...options })

    if(error) {
      return callback(error)
    }

    socket.join(user.room)

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.to(user.room).emit(
      'message',
      generateMessage(`${user.username} has joined!`)
    )

    callback()
  })

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()

    if (filter.isProfane(message)) {
      return callback('profane is not allowed!')
    }

    const user = getUser(socket.id)

    io.to(user.room).emit('message', generateMessage(message))

    callback()
  })

  socket.on('sendLocation', ({ latitude, longitude }, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit(
      'locationMessage',
      generateLocationMessage(
        user.username,
        `http://maps.google.com?q=${latitude},${longitude}`
      )
    )

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if(user) {
      io.to(user.room).emit(
        'message',
        generateMessage(`${user.username} has left!`)
      )
    }
  })
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`)
})
