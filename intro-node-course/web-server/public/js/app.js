console.log('Client side JavaScript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'loading'
  messageTwo.textContent = ''

  fetch(`/weather?city_name=${location}`)
    .then((res) => {
      res.json().then(({ error, forecast, location, address }) => {
        if (error) {
          messageOne.textContent = error
          messageTwo.textContent = ''

          return
        }

        messageOne.textContent = location
        messageTwo.textContent = forecast
      })
    })
})
