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

const add = (x, y, callback) => {
  setTimeout(() => {
    const sum = x + y

    callback(sum)
  }, 2000)
}

add(1, 4, (sum) => {
  console.log(sum) // Should print: 5
})
