const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('textarea')
const $messageFormButton = $messageForm.querySelector('button')

socket.on('message', (message) => {
  console.log(message)
})

$messageForm.addEventListener('submit',  (e) => {
  e.preventDefault()

  $messageFormButton.setAttribute('disabled', 'disabled')

  const message = e.target.elements.message.value

  socket.emit('sendMessage', message, (error) => {
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()

    if (error) {
      return console.log(error)
    }

    console.log('Message delivered!')
  })
})

document.querySelector('#send-location').addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords

    socket.emit('sendLocation', { latitude, longitude }, () => {
      console.log('Location shared!')
    })
  })
})
