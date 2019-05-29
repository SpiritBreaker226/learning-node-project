const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
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

router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)

    res.send(user)
  } catch (error) {
    res
      .status(400)
      .send()
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find()

    res.send(users)
  } catch(error) {
    res
      .status(500)
      .send()
  }
})

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
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
    const user = await User.findById(req.params.id)

    updates.forEach(update => user[update] = req.body[update])

    await user.save()

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

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

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

module.exports = router
