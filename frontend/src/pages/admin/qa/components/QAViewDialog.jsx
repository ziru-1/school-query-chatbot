import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Calendar, Check, ChevronDown, ChevronUp, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const QAViewDialog = ({ open, onOpenChange, qaItem }) => {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  if (!qaItem) return null

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(label)
      toast.success(`${label} copied to clipboard`)

      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>QA Pair Details</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Question Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground text-sm font-semibold'>
              Question
            </h3>
            <div className='bg-muted/50 rounded-lg border p-4'>
              <p className='text-sm leading-relaxed'>{qaItem.question}</p>
            </div>
          </div>

          {/* Answer Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground text-sm font-semibold'>
              Answer
            </h3>
            <div className='bg-muted/50 rounded-lg border p-4'>
              <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                {qaItem.answer}
              </p>
            </div>
          </div>

          {/* Dates Section */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <h3 className='text-muted-foreground flex items-center gap-2 text-sm font-semibold'>
                <Calendar className='h-4 w-4' />
                Created
              </h3>
              <div className='space-y-1'>
                <p className='text-sm'>
                  {new Date(qaItem.created_at).toLocaleDateString()}
                </p>
                <p className='text-muted-foreground text-xs'>
                  {new Date(qaItem.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className='space-y-2'>
              <h3 className='text-muted-foreground flex items-center gap-2 text-sm font-semibold'>
                <Calendar className='h-4 w-4' />
                Updated
              </h3>
              <div className='space-y-1'>
                <p className='text-sm'>
                  {new Date(qaItem.updated_at).toLocaleDateString()}
                </p>
                <p className='text-muted-foreground text-xs'>
                  {new Date(qaItem.updated_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Details Toggle */}
          <div className='border-t pt-4'>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className='text-muted-foreground hover:text-foreground flex cursor-pointer! items-center gap-1 text-xs transition-colors'
            >
              <span>Advanced details</span>
              {showAdvanced ? (
                <ChevronUp className='h-3 w-3' />
              ) : (
                <ChevronDown className='h-3 w-3' />
              )}
            </button>

            {/* Collapsible Advanced Section */}
            {showAdvanced && (
              <div className='bg-muted/30 mt-3 space-y-3 rounded-lg border px-3 pt-2 pb-3'>
                {/* ID */}
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <p className='text-muted-foreground text-xs font-medium'>
                      ID
                    </p>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-7 px-2'
                      onClick={() => handleCopy(qaItem.id, 'ID')}
                    >
                      {copiedId === 'ID' ? (
                        <>
                          <Check className='mr-1 h-3 w-3' />
                          <span className='text-xs'>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className='mr-1 h-3 w-3' />
                          <span className='text-xs'>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className='bg-background rounded px-2 py-1.5 font-mono text-xs break-all'>
                    {qaItem.id}
                  </p>
                </div>

                {/* Vector ID */}
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <p className='text-muted-foreground text-xs font-medium'>
                      Vector ID
                    </p>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-7 px-2'
                      onClick={() => handleCopy(qaItem.vector_id, 'Vector ID')}
                    >
                      {copiedId === 'Vector ID' ? (
                        <>
                          <Check className='mr-1 h-3 w-3' />
                          <span className='text-xs'>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className='mr-1 h-3 w-3' />
                          <span className='text-xs'>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className='bg-background rounded px-2 py-1.5 font-mono text-xs break-all'>
                    {qaItem.vector_id}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QAViewDialog
