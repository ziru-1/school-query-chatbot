import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sparkles, User, Send } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import TextTypewriter from './TextTypewriter'

const ChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const messageEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    inputRef.current?.focus()
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
    <div className='relative flex flex-1 flex-col md:mx-[20vw]'>
      <div className='flex-1 px-4 pt-4'>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className='h-10 w-10 border-2 border-white shadow-xl'>
                {msg.sender === 'user' ? (
                  <AvatarFallback className='bg-blue-500 text-white'>
                    <User className='h-5 w-5' />
                  </AvatarFallback>
                ) : (
                  <AvatarFallback className='bg-gray-100'>
                    <Sparkles className='h-5 w-5' />
                  </AvatarFallback>
                )}
              </Avatar>
              <div
                className={`max-w-70 rounded-lg p-3 wrap-break-word shadow-lg md:max-w-md ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {msg.sender === 'user' ? (
                  msg.text
                ) : (
                  <TextTypewriter text={msg.text} />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
        {messages.length === 0 && (
          <div className='absolute top-1/2 right-0 left-0 -translate-y-[13vh] text-center font-mono text-3xl font-bold text-black/80 md:-translate-y-[20vh] md:text-4xl'>
            Welcome to Vivy AI
          </div>
        )}
      </div>

      <div
        className={`bg-white px-4 pt-4 pb-4 ${messages.length === 0 ? 'md:sticky md:-translate-y-[40vh] ' : 'sticky bottom-0'}`}
      >
        <form
          onSubmit={handleSend}
          className='flex items-center justify-center gap-3 rounded-3xl border border-black/50 bg-white pr-2 shadow-lg'
        >
          <Input
            ref={inputRef}
            type='text'
            placeholder='Ask some questions...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='text-md border-0 bg-transparent py-6 pl-6 shadow-none focus-visible:ring-0'
          />
          <Button
            type='submit'
            className='rounded-l-xl rounded-r-3xl pr-0.5'
            size='icon'
          >
            <Send />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface
