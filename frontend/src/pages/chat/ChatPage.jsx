import React from 'react'
import Navbar from './Navbar'
import ChatInterface from './ChatInterface'

const ChatPage = () => {
  return (
    <div className='flex h-screen flex-col overflow-y-auto [scrollbar-gutter:stable]'>
      <Navbar />
      <ChatInterface />
    </div>
  )
}

export default ChatPage
