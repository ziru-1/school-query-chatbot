import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2 } from 'lucide-react'

const ChatInput = ({ onSend, messages, isQuerying, inputRef }) => {
  const [input, setInput] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    onSend(input)
    setInput('')
  }

  return (
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
          className='cursor-pointer rounded-l-xl rounded-r-3xl pr-0.5'
          size='icon'
          disabled={isQuerying}
        >
          {isQuerying ? <Loader2 className='animate-spin' /> : <Send />}
        </Button>
      </form>
    </div>
  )
}

export default ChatInput
