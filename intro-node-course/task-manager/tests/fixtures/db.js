const faker = require('faker')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../../src/models/user')

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

const setupDatabase = async () => {
  await User.deleteMany()

  await new User(userOne).save()
}

module.exports = {
  setupDatabase,
  userOne,
  userOneId,
}
