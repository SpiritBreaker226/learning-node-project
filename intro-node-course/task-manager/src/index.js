const express = require('express')

require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()

    res
      .status(201)
      .send(user)
  } catch(error) {
    res
      .status(400)
      .send(error)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find()

    res.send(users)
  } catch(error) {
    res
      .status(500)
      .send()
  }
})

app.get('/users/:id', async (req, res) => {
  const { id: _id } = req.params

  try {
    const user = await User.findById(_id)

    if (user) {
      return res.send(user)
    }

    res
      .status(404)
      .send()
  } catch(error) {
    res
      .status(500)
      .send()
  }
})

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)

  task
    .save()
    .then(() => {
      res
        .status(201)
        .send(task)
    })
    .catch((error) => {
      res
        .status(400)
        .send(error)
    })
})

app.get('/tasks', (req, res) => {
  Task
    .find()
    .then((tasks) => {
      res.send(tasks)
    })
    .catch(() => {
      res
        .status(500)
        .send()
    })

})

app.get('/tasks/:id', (req, res) => {
  const { id: _id } = req.params

  Task
    .findById(_id)
    .then((task) => {
      if (task) {
        return res.send(task)
      }

      res
        .status(404)
        .send()
    })
    .catch(() => {
      res
        .status(500)
        .send()
    })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
