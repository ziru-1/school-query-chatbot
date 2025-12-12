import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sparkles, User } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import TextTypewriter from './TextTypewriter'

const ChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const messageEndRef = useRef(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    }

    setMessages((prev) => [...prev, newMessage])
    setInput('')

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'This is a simulated response.',
          sender: 'bot',
        },
      ])
    }, 800)
  }

  return (
    <div>
      {messages.length === 0 && <div>What is your question</div>}
      <div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div
                className={`max-w-3xs rounded-lg p-3 wrap-break-word shadow-lg md:max-w-md ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {msg.sender === 'user' ? (
                  msg.text
                ) : (
                  <TextTypewriter text={msg.text} />
                )}
              </div>
              <Avatar className='h-10 w-10 border-2 border-white shadow-xl'>
                {msg.sender === 'user' ? (
                  <AvatarFallback className='text-primary-foreground bg-blue-500'>
                    <User className='h-5 w-5' />
                  </AvatarFallback>
                ) : (
                  <AvatarFallback className='bg-gray-100'>
                    <Sparkles className='h-5 w-5' />
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div>
        <form onSubmit={handleSend}>
          <Input
            type='text'
            placeholder='Ask some questions...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type='submit'>Send</Button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface
