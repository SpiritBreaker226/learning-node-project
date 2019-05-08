console.log('Client side JavaScript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  fetch(`/weather?city_name=${location}`)
    .then((res) => {
      res.json().then(({ error, forecast, location, address }) => {
        if (error) {
          return console.log(error)
        }

        console.log(forecast)
        console.log(location)
      })
    })
})
