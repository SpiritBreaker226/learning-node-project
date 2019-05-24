require('../src/db/mongoose')

const User = require('../src/models/user')

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })

  return count
}

updateAgeAndCount('5ce33015635279c7ebd1bff6', 2)
  .then((count) => {
    console.log(count)
  })
  .catch((error) => {
    console.log(error)
  })
