import React, { useRef, useState } from 'react'
import chatService from '@/services/chat'
import { toast } from 'sonner'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'

const ChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [isQuerying, setIsQuerying] = useState(false)
  const inputRef = useRef(null)

  const sendMessage = async (message) => {
    if (isQuerying || !message.trim()) return

    setIsQuerying(true)

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
    }

    setMessages((prev) => [...prev, newMessage])

    try {
      const data = await chatService.askChatbot({ message })

      //Mock chatbot response

      // const data = await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve({
      //       answer: 'Hey',
      //       suggestions: [
      //         'Where is the college of information and computer studies located guys okay?',
      //         'Test 2 adasd ad asd ',
      //       ],
      //     })
      //   }, 1000)
      // })

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: data.answer,
          sender: 'bot',
          ...(data.suggestions?.length > 0 && {
            suggestions: data.suggestions,
          }),
        },
      ])
    } catch (err) {
      toast.error(err?.message || 'Something went wrong')
    } finally {
      setIsQuerying(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className='relative flex flex-1 flex-col md:mx-[20vw]'>
      <ChatMessages
        sendMessage={sendMessage}
        setIsQuerying={setIsQuerying}
        messages={messages}
      />

      <ChatInput
        onSend={sendMessage}
        isQuerying={isQuerying}
        messages={messages}
        inputRef={inputRef}
      />
    </div>
  )
}

export default ChatInterface
