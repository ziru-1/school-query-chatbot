import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Lightbulb, Send } from 'lucide-react'
import { toast } from 'sonner'

const SuggestionModal = () => {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [context, setContext] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!question.trim()) return

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log({ question, context, email })

    setQuestion('')
    setContext('')
    setEmail('')
    setIsSubmitting(false)
    setOpen(false)

    toast.success('Successfully submitted your question')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='text-muted-foreground transition-color cursor-pointer rounded-2xl p-2 shadow hover:bg-gray-100 hover:text-blue-500'>
        <Lightbulb className='h-6 w-6' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suggest a Question</DialogTitle>
          <DialogDescription>
            Submit questions you think the chatbot should be able to answer.
            Approved suggestions will be added to help future users.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='question'>
              Question <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='question'
              className='md:text-md text-sm'
              placeholder='What question should Vivy AI be able to answer?'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='context'>Additional Context (Optional)</Label>
            <Textarea
              id='context'
              className='md:text-md min-h-40 text-sm'
              placeholder='Provide any additional details...'
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={4}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' disabled={isSubmitting} className='gap-2'>
              {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
              <Send />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SuggestionModal
