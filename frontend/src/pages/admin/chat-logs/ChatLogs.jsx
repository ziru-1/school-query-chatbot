import React from 'react'
import { useChatLogs } from './hooks/useChatLogs'

const ChatLogs = () => {
  const { data = [] } = useChatLogs()
  console.log(data)
  return <div>ChatLogs</div>
}

export default ChatLogs
