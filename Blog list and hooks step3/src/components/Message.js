import React from 'react'
const Message = ({ message }) => {
    if(message.content) 
    return <div className={message.type}>
        {message.content}
    </div>
    return null
  }

export default Message