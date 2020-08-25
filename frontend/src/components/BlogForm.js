import React, { useState } from 'react'
import blogService from '../services/blog'

const BlogForm = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()
    const newEntry = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }
    try {
      const addedBlog = await blogService.createBlog(newEntry)
      setBlogs(blogs.concat(addedBlog))
      const success = {
        success: "Successfuly added blog!"
      }
      setMessage(success)
    } catch (err) {
      const error = {
        error: "Blog entry failed",
        err: err
      }
      setMessage(error)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }



  return (
    <>
      <h3>New Blog Entry</h3>
      {<form onSubmit={handleNewBlog}>
        <div>
          Author
        <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Title
        <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Url
        <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>}
    </>
  )
}

export default BlogForm