const request = require('supertest')
const faker = require('faker')

const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
  name:faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
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
    ,expect(200)
})
