require('../src/db/mongoose')

const Task = require('../src/models/task')

const deleteTaskAndCount = async (id, completed) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed })

  return count
}

deleteTaskAndCount('5ce73fcfa7182c660524d17e', false)
  .then((count) => {
    console.log(count)
  })
  .catch((error) => {
    console.log(error)
  })
