require('../src/db/mongoose')

const Task = require('../src/models/task')

Task
  .findByIdAndDelete('5ce5eb36c1c18132fb86f157')
  .then((task) => {
    console.log(task)

    return Task.countDocuments({ completed: false })
  })
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
