import React from 'react'
const Blog = ({ blog }) => {
  
  return (
    <div>
      <div onClick={() => console.log('clicked')}>
        {blog.title} <br/>
        {blog.url} <br/>
        {blog.likes} likes <button onClick={()=>{console.log('liked')}}>like</button><br/>
        Added By {blog.author} <br/>
      </div>
    </div>
  )

}

export default Blog