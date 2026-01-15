import { APP_NAME } from '@/config/appConfig'
import { useMeta } from '@/hooks/useMeta'
import ChatInterface from './ChatInterface'
import Navbar from './Navbar'

const ChatPage = () => {
  useMeta({
    title: `Chat | ${APP_NAME}`,
    description: `Ask school-related questions instantly with ${APP_NAME} and get accurate, admin-verified answers.`,
  })

  return (
    <div className='flex h-screen flex-col overflow-y-auto [scrollbar-gutter:stable]'>
      <Navbar />
      <ChatInterface />
    </div>
  )
}

export default ChatPage
