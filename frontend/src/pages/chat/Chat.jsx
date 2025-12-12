import React from 'react'
import Navbar from './Navbar'
import ChatInterface from './ChatInterface'
import { Toaster } from 'sonner'

const Chat = () => {
  return (
    <div className='flex h-screen flex-col overflow-y-auto [scrollbar-gutter:stable]'>
      <Toaster
        toastOptions={{
          className: 'flex justify-center',
        }}
        position='top-center'
        richColors
      />
      <Navbar />
      <ChatInterface />
    </div>
  )
}

export default Chat
