import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blog'

const Login = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loginUser', JSON.stringify(user)
      )

      const success = {
        success: 'Successful Login'
      }
      setMessage(success)
    } catch (err) {
      const error = {
        error: 'Login Failed',
        err: err
      }
      setMessage(error)
    }
  }

  return (
    <>
      {<form onSubmit={handleLogin}>
        <div>
          Username
      <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
      <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>}
    </>
  )
}

export default Login