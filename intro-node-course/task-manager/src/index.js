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

app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedFields = ['name', 'email', 'password', 'age']
  const isValid = updates.every(update => allowedFields.includes(update))

  if (!isValid) {
    return (
      res
        .status(400)
        .send({ error: 'Invalid updates!' })
    )
  }

  try {
    const user = (
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true , runValidators: true }
      )
    )

    if (user) {
      return res.send(user)
    }

    res
      .status(404)
      .send()
  } catch(error) {
    res
      .status(400)
      .send(error)
  }
})

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body)

  try {
    await task.save()

    res
      .status(201)
      .send(task)
  } catch(error) {
    res
      .status(400)
      .send(error)
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()

    res.send(tasks)
  } catch(error) {
    res
      .status(500)
      .send()
  }
})

app.get('/tasks/:id', async (req, res) => {
  const { id: _id } = req.params

  try {
    const task = await Task.findById(_id)

    if (task) {
      return res.send(task)
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

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedFields = ['description', 'completed']
  const isValid = updates.every(update => allowedFields.includes(update))

  if (!isValid) {
    return (
      res
        .status(400)
        .send({ error: 'Invalid updates!' })
    )
  }

  try {
    const task = (
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
    )

    if (task) {
      return res.send(task)
    }

    res
      .status(404)
      .send()
  } catch(error) {
    res
      .status(400)
      .send(error)
  }
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
