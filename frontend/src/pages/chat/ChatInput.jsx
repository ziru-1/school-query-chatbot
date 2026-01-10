import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2, Mic, MicOff } from 'lucide-react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

const ChatInput = ({ onSend, messages, isQuerying, inputRef }) => {
  const [input, setInput] = useState('')

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  useEffect(() => {
    if (transcript) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInput(transcript)
    }
  }, [transcript])

  const toggleListening = (e) => {
    e.preventDefault()
    if (listening) {
      SpeechRecognition.stopListening()
    }
    resetTranscript()
    SpeechRecognition.startListening({ continuous: true })
  }

  const handleSend = (e) => {
    e.preventDefault()
    onSend(input)
    setInput('')
  }

  const showMicButton = listening || !input.trim()
  const micDisabled =
    !(browserSupportsSpeechRecognition && isMicrophoneAvailable) || isQuerying
  const micTitle = !browserSupportsSpeechRecognition
    ? 'Speech recognition not supported in this browser'
    : !isMicrophoneAvailable
      ? 'Microphone access is blocked'
      : undefined

  return (
    <div
      className={`px-4 pt-4 pb-4 ${messages.length === 0 ? 'md:sticky md:-translate-y-[40vh]' : 'sticky bottom-0'}`}
    >
      <form
        onSubmit={handleSend}
        className='border-foreground/50 bg-background relative z-20 flex items-center justify-center gap-3 rounded-3xl border pr-2 shadow-lg'
      >
        <Input
          ref={inputRef}
          type='text'
          placeholder='Ask some questions...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='text-md border-0 bg-transparent! py-6 pl-6 shadow-none focus-visible:ring-0'
        />
        {showMicButton ? (
          <span title={micTitle}>
            <Button
              type='button'
              onClick={toggleListening}
              className={`cursor-pointer rounded-l-xl rounded-r-3xl pr-0.5 ${listening ? 'bg-red-600 hover:bg-red-700' : ''}`}
              size='icon'
              disabled={micDisabled}
            >
              {listening ? <MicOff className='animate-pulse' /> : <Mic />}
            </Button>
          </span>
        ) : (
          <Button
            type='submit'
            className='cursor-pointer rounded-l-xl rounded-r-3xl pr-0.5'
            size='icon'
            disabled={isQuerying || !input.trim()}
          >
            {isQuerying ? <Loader2 className='animate-spin' /> : <Send />}
          </Button>
        )}
      </form>

      {/* Input bottom cover */}
      <div className='bg-background absolute right-0 bottom-0 left-0 z-10 h-8'></div>
    </div>
  )
}

export default ChatInput
