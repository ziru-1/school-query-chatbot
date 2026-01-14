import { useMeta } from '@/hooks/useMeta'
import ChatInterface from './ChatInterface'
import Navbar from './Navbar'

const ChatPage = () => {
  useMeta({
    title: 'Chat | Vivy AI',
    description:
      'Ask school-related questions instantly with Vivy AI and get accurate, admin-verified answers.',
  })

  return (
    <div className='flex h-screen flex-col overflow-y-auto [scrollbar-gutter:stable]'>
      <Navbar />
      <ChatInterface />
    </div>
  )
}

export default ChatPage
