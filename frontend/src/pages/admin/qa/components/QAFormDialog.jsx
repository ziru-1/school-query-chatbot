import { useEffect, useState } from 'react'
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
  forceAdd = false,
  existingQAPairs = [], // add this
}) => {
  const [question, setQuestion] = useState(initialData?.question || '')
  const [answer, setAnswer] = useState(initialData?.answer || '')

  const isEdit = Boolean(initialData) && !forceAdd

  // Check if question already exists, ignoring the current item being edited
  const isDuplicate =
    question.trim().length > 0 &&
    existingQAPairs.some(
      (qa) =>
        qa.question.toLowerCase().trim() === question.toLowerCase().trim() &&
        qa.id !== initialData?.id,
    )

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuestion(initialData?.question || '')
      setAnswer(initialData?.answer || '')
    }
  }, [open])

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
            <DialogTitle>{isEdit ? 'Edit QA' : 'Add New QA'}</DialogTitle>
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
                className={`min-h-20 ${isDuplicate ? 'border-yellow-500 focus-visible:ring-yellow-500' : ''}`}
                autoFocus
                disabled={isSubmitting}
              />
              {isDuplicate && (
                <p className='flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400'>
                  <span>⚠</span>A QA pair with this question already exists.
                </p>
              )}
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
            <Button
              type='submit'
              disabled={!isValid || isSubmitting || isDuplicate}
            >
              {isSubmitting ? (
                <>
                  <span className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                  Saving...
                </>
              ) : isEdit ? (
                'Save changes'
              ) : (
                'Add QA'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default QAFormDialog
