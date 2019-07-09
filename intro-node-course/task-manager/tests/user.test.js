const request = require('supertest')
const jwt = require('jsonwebtoken')
const faker = require('faker')
const mongoose = require('mongoose')

const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name:faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SERECT)
  }],
}

beforeEach(async () => {
  await User.deleteMany()

  await new User(userOne).save()
})

test('Should signup a new user', async () => {
  const userInfo = {
    name: 'Jason',
    email: 'jason@example.com',
  }
  const password = faker.internet.password()

  const res = await request(app)
    .post('/users')
    .send({ ...userInfo, password })
    .expect(201)

  // Assert that the database was changed correctly
  const user = await User.findById(res.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about the response
  expect(res.body).toMatchObject({
    user: { ...userInfo },
    token: user.tokens[0].token,
  })

  expect(user.password).not.toBe(password)
})

test('Should login existing user', async () => {
  const res = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)

  const user = await User.findById(res.body.user._id)
  expect(user).not.toBeNull()

  expect(res.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })
    .expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthorizcated user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  user = await User.findById(userOneId)

  expect(user).toBeNull()
})

test('Should not delete account for unauthorizcated user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)

   user = await User.findById(userOneId)

   expect(user).not.toBeNull()
})

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

  const user = await User.findById(userOneId)

  expect(user.avatar).toEqual(expect.any(Buffer))
})
