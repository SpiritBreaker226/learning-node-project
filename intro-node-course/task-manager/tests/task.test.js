const request = require('supertest')
const faker = require('faker')

const app = require('../src/app')
const Task = require('../src/models/task')

const {
  setupDatabase,
  taskOne,
  userOne,
  userOneId,
  userTwo,
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

test('Should not create task with invalid description/completed', async () => {
  const res = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({})
    .expect(400)

  const task = await Task.findById(res.body._id)
  expect(task).toBeNull()
})

test('Should not update other users task', async () => {
  const newDescription = faker.random.word()

  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({ description: newDescription })
    .expect(404)

  task = await Task.findById(taskOne._id)

  expect(task.description).not.toBe(newDescription)
})

test('Should not update task with invalid description/completed', async () => {
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({})
    .expect(404)
})

test('Should get all tasks for user one', async () => {
  const res = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)


  expect(res.body.length).toBe(2)
})

test('Should fetch only completed tasks', async () => {
  const res = await request(app)
    .get('/tasks?completed=true')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  expect(res.body.length).toBe(0)
})

test('Should fetch only incomplete tasks', async () => {
  const res = await request(app)
    .get('/tasks?completed=false')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  expect(res.body.length).toBe(2)
})

test('Should fetch page of tasks', async () => {
  const res = await request(app)
    .get('/tasks?limit=1&skip=0')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  expect(res.body.length).toBe(1)
})

test('Should sort tasks by description/completed/createdAt/updatedAt', async () => {
  const res = await request(app)
    .get('/tasks?sortBy=description:asc')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  tasks = await Task.find({ owner: userOneId }).sort({ description: 'asc' })

  expect(res.body[0].description).toBe(tasks[0].description)
  expect(res.body[1].description).toBe(tasks[1].description)
})

test('Should fetch user task by id', async () => {
  const res = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  task = await Task.findById(taskOne._id)

  expect(res.body.description).toBe(task.description)
})

test('Should not fetch user task by id if unauthenticated', async () => {
  const res = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .send()
    .expect(401)
})

test('Should not fetch other users task by id', async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)
})

test('Should not delete other users tasks', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

  task = await Task.findById(taskOne._id)

  expect(task).not.toBeNull()
})

test('Should delete user task', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  task = await Task.findById(taskOne._id)

  expect(task).toBeNull()
})

test('Should not delete task for unauthorizcated user', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .send()
    .expect(401)

   task = await Task.findById(taskOne._id)

   expect(task).not.toBeNull()
})
