import React, { useState } from 'react'

const ToggleBlogInfo = (props) => {
  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => {
    setShowInfo(!showInfo)
	}
	
	const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
		}
		
  if(!showInfo)
    return (
      <div style={blogStyle} onClick={toggleInfo}>
        {props.title}
      </div>
    )
    else
      return (
        <div style={blogStyle} onClick={toggleInfo}>
            {props.children}
        </div>
    )
}
export default ToggleBlogInfo