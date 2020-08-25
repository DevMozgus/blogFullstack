const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { resource } = require('../app')
const bcrypt = require('bcrypt')
const { request } = require('express')
const User = require('../models/user')


beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('test', 10)
  const user = new User({ username: 'root', name: 'root', passwordHash })

  await user.save()
})

describe('user creation', () => {
  test('correctly formatted user is created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user creation fails with non unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with malformatted password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'tester',
      name: 'Shaniqua',
      password: 'ha',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('token authentication', () => {
  test('valid input creates token', async () => {
    const login = {
      username: 'root',
      password: 'test'
    }

    const response = await api
      .post('/api/login')
      .send(login)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const result = response.body
    expect(result.token).toBeDefined()
  })

  test('incorrect input returns error', async () => {
    const login = {
      username: 'root',
      password: 'wrong'
    }

    const response = await api
      .post('/api/login')
      .send(login)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const result = response.body.error
    expect(result).toContain('invalid username or password')
  })
})

afterAll(() => {
  mongoose.connection.close()
})