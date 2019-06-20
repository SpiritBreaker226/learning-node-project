const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail } = require('../emails/account')

const router = new express.Router()

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()

    sendWelcomeEmail(user)

    const token = await user.generateAuthToken()

    res
      .status(201)
      .send({ user, token })
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
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (error) {
    res
      .status(400)
      .send()
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = (
      req.user.tokens.filter(token => req.token !== token.token)
    )

    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500)
       .send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500)
       .send()
  }
})

const upload = multer({
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(undefined, true)
    }

    cb(new Error('Please upload an image'))
  }
})

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = (
      await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer()
    )

    req.user.avatar = buffer

    await req.user.save()

    res.send()
  },
  (error, req, res, next) => {
    res
      .status(400)
      .send({ error: error.message })
  }
)

router.get('/users/me', auth, async (req, res) => { res.send(req.user) })

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (user && user.avatar) {
      return (
        res
          .set('Content-Type', 'image/jpg')
          .send(user.avatar)
      )
    }

    throw new Error()
  } catch (error) {
    res
      .status(404)
      .send()
  }
})

router.patch('/users/me', auth, async (req, res) => {
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
    updates.forEach(update => req.user[update] = req.body[update])

    await req.user.save()

    res.send(req.user)
  } catch(error) {
    res
      .status(400)
      .send(error)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()

    res.send(req.user)
  } catch(error) {
    res
      .status(500)
      .send()
  }
})

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined

    await req.user.save()

    res.send()
  } catch(error) {
    res
      .status(500)
      .send()
  }
})

module.exports = router
