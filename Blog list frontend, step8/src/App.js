import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import blogsService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import ToggleBlogInfo from './components/ToggleBlogInfo'


const App =() => {
  const [message, setMessage] = useState({content:'', type: ''})
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [likesChange, setLikesChange] = useState(false)

  const blogFormRef = React.createRef()


  useEffect(()=>{
    blogsService
      .getAll()
      .then(initialBlogs =>{
        initialBlogs.sort((b1,b2)=>b2.likes-b1.likes)
        setBlogs(initialBlogs)
      })
      .catch(error =>{
        setMessage({content:`${error.response.data.error}`, type:'error'})
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
        setMessage({content:`${user.name} logged in`, type:'success'})

      }).catch((error)=>{
        setMessage({content:`${error.response.data.error}`, type:'error'})
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
        <button type="submit">login</button>
      </form>
    </div>
    )
  }

  const handleLogout = (event) => {
    window.localStorage.clear()
    blogsService.setToken(null)
    setUser(null)
    setMessage({content:`logged out`, type:'success'})
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    blogsService.create({title, author, url})
      .then(initialBlog =>{
        setBlogs(blogs.concat(initialBlog))
        setMessage({content:`a new blog ${initialBlog.title} by ${initialBlog.author} added`, type:'success'})
        
      })
      .catch(error=>{
        setMessage({content:`${error.response.data.error}`, type:'error'})
      })
  }

  const createBlogForm = () => {
    return <div>
      <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
        <div>title
          <input type="text" onChange={({target})=>setTitle(target.value)} value={title}/>
        </div>
        <div>author
          <input type="text" onChange={({target})=>setAuthor(target.value)} value={author}/>
        </div>
        <div>url
          <input type="text" onChange={({target})=>setUrl(target.value)} value={url}/>
        </div>
          <button type="submit">create</button>
        </form>
      </div>
  }

  if(message.content) setTimeout(() => {
    setMessage({content:'', type: ''})
  }, 5000)

  const handleLikesChange = () => {
    setLikesChange(!likesChange)
    const sortedBlogs = blogs.sort((b1,b2)=>b2.likes-b1.likes)
    setBlogs(sortedBlogs)
  }

  const listOfBlogs = () => {
    return blogs.map(blog=>
      <ToggleBlogInfo title={blog.title} key={blog.id}>
        <Blog blog={blog} userId={user.id} changeLikes={handleLikesChange}/>
      </ToggleBlogInfo>
    )
  }

  
  return (
    <div>
      <Message message={message}/>
      {
        user === null ? 
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            {createBlogForm()}
          </Togglable>
          
          {listOfBlogs()}
        </div>
      }
    </div>
  )
}

export default App
