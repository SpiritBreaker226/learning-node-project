const request = require('supertest')
const faker = require('faker')

const app = require('../src/app')
const User = require('../src/models/user')
const {
  setupDatabase,
  userOne,
  userOneId,
} = require('./fixtures/db')

beforeEach(setupDatabase)

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

test('Should not signup user with invalid name/email/password', async () => {
  const userInfo = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: '123',
  }

  await request(app)
    .post('/users')
    .send({ ...userInfo })
    .expect(400)

  const user = await User.findOne({ email: userInfo.email })
  expect(user).toBeNull()
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

test('Should update valid user fields', async () => {
  const newName = faker.name.findName()

  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: newName })
    .expect(200)

  const user = await User.findById(userOneId)

  expect(user.name).toBe(newName)
})

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: faker.address.city() })
    .expect(400)
})

test('Should not update user if unauthenticated', async () => {
  await request(app)
    .patch('/users/me')
    .send({ name: faker.name.findName() })
    .expect(401)
})

test('Should not update user with invalid name/email/password', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ password: '321' })
    .expect(400)
})
