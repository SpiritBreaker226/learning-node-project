// Since Callbacks are basic Promises show the callback
// then what the Promise would lo look like

// Callback

const doWorkCallback = (callback) => {
  setTimeout(() => {
    console.log('When using callback on error')

    callback('This is my error')

    console.log('When using callback for results')

    callback(undefined, [1, 4, 7])
  }, 2000)
}

doWorkCallback((error, result) => {
  if (error) {
    return console.log(error)
  }

  console.log(result)
})

// Promise

const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // if call then 'then' Callback is run
    // if resulve is call then the function does not go any further
    // same with reject once call the function returns
    // resolve([7, 4, 1])

    // if call then catch Callback is run
    reject('Things went wrong!')
  }, 2000)
})

doWorkPromise
  .then((result) => { console.log('Success!', result) })
  // catch is the new syntc for Promise so that you do not have two
  // arguments in one then making them easier to read
  .catch((error) => { console.log('Error!', error) })


// Visually of How Promises Works
//
//                                        fulfilled
//                                       /
// Promise        -- know as pending -->
//                                       \
//                                        rejected
//

// Chainning Promises

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 2000)
  })
}

// The long way

add(1, 2)
  .then((sum) => {
    console.log(sum)

    add(sum, 5)
      .then((sum) => {
        console.log(sum)
      })
      .catch((error) => {
        console.log(error)
      })
  })
  .catch((error) => {
    console.log(error)
  })

// The short way

add(1, 1)
  .then((sum) => {
    console.log(sum)

    return add(sum, 2)
  })
  .then((sum) => {
    console.log(sum)
  })
  .catch((error) => {
    console.log(error)
  })
