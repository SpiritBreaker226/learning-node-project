// Callbacks Examples

// Use with Node API

setTimeout(() => {
  console.log('Two seconds are up')
}, 2000)

// Native JavaScript

const names = ['Jason', 'Jen', 'Jess']

const shortName = names.filter((name) => name.length <= 4)

// Callback within another callback

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0,
    }

    callback(data)
  }, 2000)
}

geocode('Toronto', (data) => {
  console.log(data)
})
