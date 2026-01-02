// components/features/qa/QAFormDialog.jsx - CLEANEST SOLUTION
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const QAFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) => {
  // ✅ Initialize once from initialData - no useEffect needed!
  const [question, setQuestion] = useState(initialData?.question || '')
  const [answer, setAnswer] = useState(initialData?.answer || '')

  const isEdit = Boolean(initialData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({
      question: question.trim(),
      answer: answer.trim(),
    })
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false)
    }
  }

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !isSubmitting) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const isValid = question.trim() && answer.trim()

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className='sm:max-w-[600px]'
        onInteractOutside={(e) => {
          if (isSubmitting) {
            e.preventDefault()
          }
        }}
        onEscapeKeyDown={(e) => {
          if (isSubmitting) {
            e.preventDefault()
          }
        }}
      >
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Edit Q&A' : 'Add New Q&A'}</DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Make changes to the question and answer. Click save when you're done."
                : "Create a new question and answer pair. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='question'>Question</Label>
              <Textarea
                id='question'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className='min-h-20'
                autoFocus
                disabled={isSubmitting}
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='answer'>Answer</Label>
              <Textarea
                id='answer'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className='min-h-[120px]'
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={!isValid || isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                  Saving...
                </>
              ) : isEdit ? (
                'Save changes'
              ) : (
                'Add Q&A'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default QAFormDialog
