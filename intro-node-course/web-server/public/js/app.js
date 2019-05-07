console.log('Client side JavaScript file is loaded!')

fetch('/weather?city_name=boston')
  .then((res) => {
    res.json().then(({ error, forecast, location, address }) => {
      if (error) {
        return console.log(error)
      }

      console.log(forecast)
      console.log(location)
    })
  })
