import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useRef, useState } from 'react'

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
              className={`rounded-lg p-3 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div>
        <form onSubmit={handleSend}>
          <Input
            type='text'
            placeholder='HELLO'
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
