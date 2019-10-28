import React from 'react'
const Message = ({ message }) => {
    if(message) 
    return <div className="message">
        {message}
    </div>
    return null
  }

export default Message