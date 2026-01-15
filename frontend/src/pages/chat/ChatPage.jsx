import { APP_NAME } from '@/config/appConfig'
import { useMeta } from '@/hooks/useMeta'
import ChatInterface from './ChatInterface'
import Navbar from './Navbar'
import { useEffect } from 'react'

const ChatPage = () => {
  useMeta({
    title: `Chat | ${APP_NAME}`,
    description: `Ask school-related questions instantly with ${APP_NAME} and get accurate, admin-verified answers.`,
  })

  useEffect(() => {
    // Override the html overflow: hidden for landing page only
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'

    return () => {
      // Restore on cleanup
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className='flex h-screen flex-col overflow-y-auto [scrollbar-gutter:stable]'>
      <Navbar />
      <ChatInterface />
    </div>
  )
}

export default ChatPage
