import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mic, MicOff, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { toast } from 'sonner'

const ChatInput = ({ onSend, messages, isQuerying, inputRef }) => {
  const MAX_CHARS = 200
  const [input, setInput] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth < 768
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (transcript) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInput(transcript)
    }
  }, [transcript])

  const toggleListening = async (e) => {
    e.preventDefault()

    if (!browserSupportsSpeechRecognition) {
      toast.error('Speech recognition is not supported in this browser')
      return
    }

    try {
      if (listening) {
        SpeechRecognition.stopListening()
        return
      }

      await navigator.mediaDevices.getUserMedia({ audio: true })

      resetTranscript()
      await SpeechRecognition.startListening({
        continuous: true,
        language: 'en-US',
      })
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        toast.error(
          'Microphone access denied. Please allow microphone access in your browser settings.',
        )
      } else if (error.name === 'NotFoundError') {
        toast.error('No microphone found')
      } else {
        toast.error('Could not access microphone')
      }
    }
  }

  const isTooLong = input.length > MAX_CHARS
  const isSendDisabled = isQuerying || !input.trim() || isTooLong

  const handleSend = (e) => {
    e.preventDefault()
    if (isTooLong || !input.trim()) return
    onSend(input)
    setInput('')
  }

  const showMicButton = listening || !input.trim()
  const micDisabled =
    isMobile ||
    !browserSupportsSpeechRecognition ||
    !isMicrophoneAvailable ||
    isQuerying
  const micTitle = isMobile
    ? 'Voice input not available on mobile'
    : !browserSupportsSpeechRecognition
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
          <span title={isTooLong ? 'Message is too long' : undefined}>
            <Button
              type='submit'
              className='cursor-pointer rounded-l-xl rounded-r-3xl pr-0.5'
              size='icon'
              disabled={isSendDisabled}
            >
              <Send />
            </Button>
          </span>
        )}
      </form>

      {/* Input bottom cover */}
      <div className='bg-background absolute right-0 bottom-0 left-0 z-10 h-8'></div>
    </div>
  )
}

export default ChatInput
