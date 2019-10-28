import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import loginService from './services/login'

const App =() => {
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(()=>{
    blogsService
      .getAll()
      .then(initialBlogs =>{
        setBlogs(initialBlogs)
      })
      .catch(error =>{
        console.log(error)
      })
  },[])

  const handleLogin = (event) => {
    event.preventDefault()
    loginService.login({username, password})
      .then((response)=>{
        setUser(response)
        setUsername('')
        setPassword('')

      }).catch((error)=>{
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    
  }

  const loginForm = () => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>username
          <input type="text" onChange={({target})=>setUsername(target.value)} value={username}/>
        </div>
        <div>password
          <input type="text" onChange={({target})=>setPassword(target.value)} value={password}/>
        </div>
        <button type="submit" onClick={handleLogin}>login</button>
      </form>
    </div>
    )
  }

  const listOfBlogs = () => {
    return blogs.map(blog=><Blog key={blog.id} blog={blog} />)
  }

  return (
    <div>
      {
        user === null ? 
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <h2>blogs</h2>
          {listOfBlogs()}
        </div>
      }
      
    </div>
  )
}

export default App
