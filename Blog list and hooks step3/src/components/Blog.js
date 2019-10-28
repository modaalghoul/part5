import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, changeLikes, removeBlog }) => {

  const loggedInUser = JSON.parse(window.localStorage.loggedBlogappUser)

  const handleLike = () => {
    const newBlog = {...blog, likes: blog.likes+1}
    blogService.update(newBlog)
    .then(initialValue=> {
      console.log('v2')
      changeLikes()
    })
    .catch(error=> {
      console.log(error.response.data.error)
    })
  
}

  const handleRemove = () => {
    if(window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id)
      .then(initialValue=> {
        console.log('removed')
        removeBlog()
      })
      .catch(error=> {
        console.log(error.response.data.error)
      })
    }
}

  const showRemove = () => {
    if(loggedInUser.id === blog.user.id) return <button onClick={handleRemove}>remove</button>
    return null
  }

  return (
    <div>
      <div>
        {blog.title} {blog.author} <br/>
        {blog.url} <br/>
        {blog.likes} likes <button onClick={handleLike}>like</button><br/>
        Added By {blog.user.name} <br/>
        {showRemove()}
      </div>
    </div>
  )

}

export default Blog