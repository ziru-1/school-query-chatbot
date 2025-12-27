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
import { supabase } from '@/lib/supabase'

const SuggestionModal = () => {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [context, setContext] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const questionMaxLength = 200

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedQuestion = question.trim()
    if (!trimmedQuestion) return
    if (trimmedQuestion.length > questionMaxLength) {
      toast.error(
        `Question cannot be longer than ${questionMaxLength} characters`,
      )
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('question_suggestions').insert({
        question: trimmedQuestion,
        context,
      })

      if (error) throw error

      setQuestion('')
      setContext('')
      setOpen(false)

      toast.success('Successfully submitted your question')
    } catch (err) {
      console.error(err.message)
      toast.error('Failed to submit your question')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='text-muted-foreground bg-background transition-color hover:bg-accent cursor-pointer rounded-2xl p-2 shadow hover:text-blue-500'>
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
              maxLength={questionMaxLength}
              required
            />
            <p className='text-muted-foreground text-sm'>
              {question.length}/{questionMaxLength} characters
            </p>
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
            <Button
              type='submit'
              disabled={isSubmitting || !question.trim()}
              className='gap-2'
            >
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
