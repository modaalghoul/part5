import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])


  const handleLogin = (event) => {
    event.preventDefault()
    loginService.login({username, password})
      .then((user)=>{
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogsService.setToken(user.token)
        setUser(user)
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

  const handleLogout = (event) => {
    window.localStorage.clear()
    blogsService.setToken(null)
    setUser(null)
  }

  const listOfBlogs = () => {
    return blogs.map(blog=><Blog key={blog.id} blog={blog} />)
  }

  return (
    
    <div>
      <Message message={errorMessage}/>
      {
        user === null ? 
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          {listOfBlogs()}
        </div>
      }
      
    </div>
  )
}

export default App
