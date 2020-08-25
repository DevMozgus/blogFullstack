const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { resource } = require('../app')

beforeEach(async () => {
  await Blog.deleteMany({})

  const login = {
    username: 'root',
    password: 'test'
  }

  let token = await api
    .post('/api/login')
    .send(login)

  token = token.body
  const blog = {
    title: 'This is a legit post',
    author: 'sike',
    url: 'gotcha.com',
    likes: 2,
    userId: token.id
  }

  const post = await api
    .post('/api/blogs')
    .send(blog)
    .set('Authorization', `Bearer ${token.token}`)
    .expect(201)
  //console.log(post.body)
})

describe('get requests', () => {
  test('id property exists', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    const id = blogs.map(blog => blog.id)

    expect(id).toBeDefined()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })
})

describe('put, delete and post request', () => {
  test('put request updates blog', async () => {
    const login = {
      username: 'root',
      password: 'test'
    }

    let token = await api
      .post('/api/login')
      .send(login)

    token = token.body

    const newBlog = {
      title: 'Updated Blog',
      author: 'Santa',
      url: 'idfk.com',
      likes: 22,
    }

    const post = await helper.blogsInDb()
    expect(post.length).toEqual(1)
    const blog = await api
      .put(`/api/blogs/${post[0].id}`)
      .send(newBlog)
      .set('Authorization', `Bearer ${token.token}`)
      .expect(201)

    console.log(blog.text)
    const updatedpost = await helper.blogsInDb()
    expect(updatedpost.length).toEqual(1)
  })

  test('blog without content not added', async () => {
    const blogsBefore = await helper.blogsInDb()
    expect(blogsBefore.length).toEqual(1)

    const login = {
      username: 'root',
      password: 'test'
    }

    let token = await api
      .post('/api/login')
      .send(login)

    token = token.body
    const newBlog = {
      author: 'npm go ERRRRR',
      likes: 2,
    }

    const blog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token.token}`)
      .expect(400)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toEqual(1)
  })

  test('valid blog added', async () => {
    const login = {
      username: 'root',
      password: 'test'
    }

    let token = await api
      .post('/api/login')
      .send(login)

    token = token.body
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 2,
      userId: token.id
    }

    const blog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(blog.body.title).toContain(newBlog.title)
  })


  test('a note can be deleted', async () => {
    const login = {
      username: 'root',
      password: 'test'
    }

    let token = await api
      .post('/api/login')
      .send(login)

    token = token.body

    const post = await helper.blogsInDb()
    expect(post.length).toEqual(1)
    const blog = await api
      .delete(`/api/blogs/${post[0].id}`)
      .set('Authorization', `Bearer ${token.token}`)
      .expect(204)
    console.log(blog.text)
    const blogs = await helper.blogsInDb()
    expect(blogs.length).toEqual(0)
  })
})


afterAll(() => {
  mongoose.connection.close()
})