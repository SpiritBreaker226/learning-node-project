const faker = require('faker')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Task = require('../../src/models/task')
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

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name:faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SERECT)
  }],
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: faker.random.word(),
  complete: false,
  owner: userOneId,
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: faker.random.word(),
  complete: false,
  owner: userOneId,
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: faker.random.word(),
  complete: false,
  owner: userTwoId,
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Task.deleteMany()

  await new User(userOne).save()
  await new User(userTwo).save()

  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

module.exports = {
  setupDatabase,
  taskOne,
  userOne,
  userOneId,
  userTwo,
}
