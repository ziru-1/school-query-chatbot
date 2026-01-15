import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/config/appConfig'
import { CornerDownRight, Sparkles, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import TextTypewriter from './TextTypewriter'

const LoadingDots = () => (
  <div className='flex space-x-1'>
    <div
      className='h-1.5 w-1.5 animate-bounce rounded-full bg-gray-600'
      style={{ animationDelay: '0ms' }}
    ></div>
    <div
      className='h-1.5 w-1.5 animate-bounce rounded-full bg-gray-600'
      style={{ animationDelay: '150ms' }}
    ></div>
    <div
      className='h-1.5 w-1.5 animate-bounce rounded-full bg-gray-600'
      style={{ animationDelay: '300ms' }}
    ></div>
  </div>
)

const BotMessage = ({
  msg,
  isLastMessage,
  setIsQuerying,
  sendMessage,
  messageEndRef,
}) => {
  const [animationDone, setAnimationDone] = useState(false)

  const handleTypewriterDone = () => {
    setAnimationDone(true)

    requestAnimationFrame(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    })

    if (isLastMessage) setIsQuerying(false)
  }

  return (
    <div>
      <TextTypewriter text={msg.text} onDone={handleTypewriterDone} />
      {animationDone && msg.suggestions && (
        <div className='mt-2 flex flex-col'>
          {msg.suggestions.map((suggestion, i) => (
            <Button
              key={i}
              onClick={() => sendMessage(suggestion)}
              className='h-auto! min-h-0! w-full cursor-pointer items-start justify-start rounded-none border-t border-black/30 bg-transparent p-2! text-left text-sm leading-snug font-normal whitespace-normal text-black hover:bg-gray-100 hover:text-blue-500'
            >
              <CornerDownRight className='h-5 w-5' />
              {suggestion.charAt(0).toUpperCase() + suggestion.slice(1) + '?'}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

const ChatMessages = ({ sendMessage, messages, setIsQuerying, isQuerying }) => {
  const messageEndRef = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [messages, isQuerying])

  return (
    <div className='flex-1 px-4 pt-4'>
      {messages.map((msg, index) => {
        const isLastMessage = index === messages.length - 1

        return (
          <div
            key={msg.id}
            className={`mb-4 flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex gap-2 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <Avatar className='border-background h-10 w-10 border-2 shadow-xl'>
                {msg.sender === 'user' ? (
                  <AvatarFallback className='bg-blue-500 text-white'>
                    <User className='h-5 w-5' />
                  </AvatarFallback>
                ) : (
                  <AvatarFallback className='bg-gray-100'>
                    <Sparkles className='h-5 w-5 text-black' />
                  </AvatarFallback>
                )}
              </Avatar>

              <div
                className={`max-w-70 rounded-lg p-3 wrap-break-word shadow-lg md:max-w-md ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {msg.sender === 'user' ? (
                  msg.text
                ) : (
                  <BotMessage
                    msg={msg}
                    isLastMessage={isLastMessage}
                    setIsQuerying={setIsQuerying}
                    sendMessage={sendMessage}
                    messageEndRef={messageEndRef}
                  />
                )}
              </div>
            </div>
          </div>
        )
      })}

      {/* Loading state - show bot avatar with loading dots */}
      {isQuerying && (
        <div className='mb-4 flex justify-start'>
          <div className='flex gap-2'>
            <Avatar className='border-background h-10 w-10 border-2 shadow-xl'>
              <AvatarFallback className='bg-gray-100'>
                <Sparkles className='h-5 w-5 text-black' />
              </AvatarFallback>
            </Avatar>

            <div className='max-w-70 rounded-lg bg-gray-200 px-3 pt-4 shadow-lg md:max-w-md'>
              <LoadingDots />
            </div>
          </div>
        </div>
      )}

      <div ref={messageEndRef} />

      {messages.length === 0 && (
        <div className='text-foreground absolute top-1/2 right-0 left-0 -translate-y-[13vh] text-center font-mono text-3xl font-bold md:-translate-y-[20vh] md:text-4xl'>
          Welcome to {APP_NAME}
        </div>
      )}
    </div>
  )
}

export default ChatMessages
