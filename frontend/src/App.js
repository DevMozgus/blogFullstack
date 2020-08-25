import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blog'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem('loginUser')
    if (loginUserJSON) {
      const user = JSON.parse(loginUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    const usersBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs([...blogs])
      } catch (err) {
        const error = {
          error: 'Failed to get blogs',
          err: err
        }
        setMessage(error)
      }
    }
    usersBlogs()
  }, [])

  const handleSignout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const BlogFormRef = useRef()

  return (
    <>
      <h2>Blogs</h2>
      {message ?
        <Message message={message} setMessage={setMessage} />
        : null
      }
      {
        user
          ?
          <>
            <p>logged in as <b>{user.username}</b></p>
            <button onClick={() => handleSignout()}>Sign Out</button>
            <Togglable
              label1={'Create Blog'}
              label2={'cancel'}
              ref={BlogFormRef}>
              <BlogForm
                setBlogs={setBlogs}
                blogs={blogs}
                setMessage={setMessage} />
            </Togglable>
          </>
          :
          <Togglable
            label1={'login'}
            label2={'cancel'}>
            <Login
              setUser={setUser}
              setMessage={setMessage} />
          </Togglable>
      }
      <Blogs blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        setMessage={setMessage}
      />
    </>
  )
}


const Message = ({ message, setMessage }) => {

  const messageStyle = {
    border: "2px solid",
    borderColor: message.error ? "red" : "green",
    borderRadius: "4px",
    padding: "1vw"
  }
  //console.log(message.err)
  setTimeout(() => {
    setMessage(null)
  }, 4000)

  return (
    <>
      <div>
        <p style={messageStyle} >{message.error ? message.error : message.success}</p>
      </div>
    </>
  )
}

export default App