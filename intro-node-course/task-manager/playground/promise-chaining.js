require('../src/db/mongoose')

const User = require('../src/models/user')

User
  .findByIdAndUpdate('5ce33015635279c7ebd1bff6', { age: 1 })
  .then((user) => {
    console.log(user)

    return User.countDocuments({ age: 1 })
  })
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
