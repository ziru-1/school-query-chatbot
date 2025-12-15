import React, { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sparkles, User } from 'lucide-react'
import TextTypewriter from './TextTypewriter'

const ChatMessages = ({ sendMessage, messages, setIsQuerying }) => {
  const messageEndRef = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [messages])

  return (
    <div className='flex-1 px-4 pt-4'>
      {messages.map((msg, index) => {
        const isLastMessage = index === messages.length - 1
        return (
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
                className={`max-w-70 rounded-lg p-3 shadow-lg md:max-w-md ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {msg.sender === 'user' ? (
                  msg.text
                ) : (
                  <div>
                    <TextTypewriter
                      text={msg.text}
                      onDone={
                        isLastMessage ? () => setIsQuerying(false) : undefined
                      }
                    />
                    {msg.suggestions && (
                      <div className='mt-2 flex flex-col'>
                        {msg.suggestions.map((suggestion, i) => (
                          <Button
                            key={i}
                            onClick={() => sendMessage(suggestion)}
                            className='h-auto! min-h-0! w-full cursor-pointer items-start justify-start rounded-none border-t border-black/30 bg-transparent p-2! text-left text-sm leading-snug font-normal whitespace-normal text-black hover:bg-gray-100 hover:text-blue-500'
                          >
                            → {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
      <div ref={messageEndRef} />

      {messages.length === 0 && (
        <div className='absolute top-1/2 right-0 left-0 -translate-y-[13vh] text-center font-mono text-3xl font-bold text-black/80 md:-translate-y-[20vh] md:text-4xl'>
          Welcome to Vivy AI
        </div>
      )}
    </div>
  )
}

export default ChatMessages
