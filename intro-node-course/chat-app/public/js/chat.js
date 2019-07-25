const socket = io()

socket.on('message', (message) => {
  console.log(message)
})

document.querySelector('#message-form').addEventListener('submit',  (e) => {
  e.preventDefault()

  const message = e.target.elements.message.value

  socket.emit('sendMessage', message, (serverMessage) => {
    console.log('The message was ', serverMessage)
  })
})

document.querySelector('#send-location').addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords

    socket.emit('sendLocation', { latitude, longitude })
  })
})
