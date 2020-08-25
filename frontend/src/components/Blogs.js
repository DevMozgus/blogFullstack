import React from 'react'
import blogService from '../services/blog'
import Togglable from './Togglable'

const Blogs = ({ blogs, setBlogs, user, setMessage }) => {
  const style = {
    border: "3px solid",
    borderRadius: "3px",
    margin: "1vh",
    padding: "1vh"
  }

  const addLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes + 1),
    }
    try {
      const returnedBlog = await blogService.updateBlog(id, newBlog)
      const index = blogs.findIndex(blog => blog.id === id)
      //const newBlogs = await blogService.getAll()
      returnedBlog.user = {
        id: returnedBlog.user,
        username: user.username,
        name: user.name
      }
      const newBlogs = [...blogs]
      newBlogs[index] = returnedBlog
      setBlogs(newBlogs)
    } catch (err) {
      const error = {
        error: 'Failed to update blog',
        err: err
      }
      setMessage(error)
    }
  }

  const deleteBlog = async (id, title) => {
    if (window.confirm(`Remove blog '${title}'?`)) {
      try {
        await blogService.deleteBlog(id)
        const updatedBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(updatedBlogs)
      } catch (err) {
        const error = {
          error: 'Failed to delete blog',
          err: err
        }
        setMessage(error)
      }
    }
  }

  const sortedBlogs = blogs.sort((curr, next) => next.likes - curr.likes)
  return (
    <>
      {sortedBlogs.map(blog => {
        return (
          <div className='blogs' style={style} key={blog.id}>
            <Blog blog={blog}
              addLike={addLike}
              deleteBlog={deleteBlog}
              user={user} />
          </div>
        )
      })}
    </>
  )
}

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  return (
    <>
      <h4>{blog.title}</h4>
      <Togglable label1={"show blog"} label2={"hide blog"}>
        <p>Author: {blog.author}</p>
        <p>Link: {blog.url}</p>
        {user ?
          <>
            <p>Likes: {blog.likes}</p>
            <button onClick={() => addLike(blog.id)}>like</button>
          </>
          : null
        }
        {
          user && (user.username === blog.user.username || blog.user) ?
            <button onClick={() => deleteBlog(blog.id, blog.title)}>delete</button>
            : null
        }
      </Togglable>
    </>
  )
}

export default { Blogs, Blog }