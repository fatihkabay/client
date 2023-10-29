import React from 'react'

function Chat({socket, username, room}) {
  return (
    <div>
        <div className='chat-header'></div>
        <div className='chat-body'></div>
        <div className='chat-footer'></div>
    </div>
  )
}

export default Chat