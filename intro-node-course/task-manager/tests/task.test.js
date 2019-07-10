const request = require('supertest')
const faker = require('faker')

const app = require('../src/app')
const Task = require('../src/models/task')

const {
  setupDatabase,
  userOne,
  userOneId,
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
  const taskInfo = { description: faker.random.word() }

  const res = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send(taskInfo)
    .expect(201)

  const task = await Task.findById(res.body._id)
  expect(task).not.toBeNull()
  expect(task.completed).toBe(false)

  expect(res.body).toMatchObject({ ...taskInfo, owner: userOneId.toString() })
})

test('Should get all tasks for user one', async () => {
  const res = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  expect(res.body.length).toBe(2)
})
