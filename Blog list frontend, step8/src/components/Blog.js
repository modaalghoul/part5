import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, userId, changeLikes }) => {

  const handleLike = () => {
    blog.likes = blog.likes + 1
    blog.user = userId
    blogService.update(blog, blog.id)
    .then(initialValue=> {
      changeLikes()
    })
    .catch(error=> {
      console.log(error.response.data.error)
    })
  }
  
  return (
    <div>
      <div>
        {blog.title} <br/>
        {blog.url} <br/>
        {blog.likes} likes <button onClick={handleLike}>like</button><br/>
        Added By {blog.author} <br/>
      </div>
    </div>
  )

}

export default Blog