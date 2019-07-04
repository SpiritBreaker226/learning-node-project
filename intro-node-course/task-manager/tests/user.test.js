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
  await request(app)
    .post('/users')
    .send({
      name: 'Jason',
      email: 'jason@example.com',
      password: 'mypass777!',
    })
    .expect(201)
})

test('Should login existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200)
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
