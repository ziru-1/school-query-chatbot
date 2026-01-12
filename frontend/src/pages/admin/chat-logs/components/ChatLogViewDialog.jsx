import ConfidenceBadge from '@/components/badges/ConfidenceBadge'
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

const ChatLogViewDialog = ({ open, onOpenChange, chatLog }) => {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  if (!chatLog) return null

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
      <DialogContent
        className='flex max-h-[90vh] max-w-2xl flex-col'
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Chat Log Details</DialogTitle>
        </DialogHeader>

        <div className='space-y-6 overflow-y-auto pr-2'>
          {/* Confidence Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground text-sm font-semibold'>
              Confidence Score
            </h3>
            <div>
              <ConfidenceBadge confidence={chatLog.confidence} />
            </div>
          </div>

          {/* User Query Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground text-sm font-semibold'>
              User Query
            </h3>
            <div className='bg-muted/50 rounded-lg border p-4'>
              <p className='text-sm leading-relaxed'>{chatLog.user_query}</p>
            </div>
          </div>

          {/* Matched Question Section */}
          {chatLog.matched_question && (
            <div className='space-y-2'>
              <h3 className='text-muted-foreground text-sm font-semibold'>
                Matched Question
              </h3>
              <div className='bg-muted/50 rounded-lg border p-4'>
                <p className='text-sm leading-relaxed'>
                  {chatLog.matched_question}
                </p>
              </div>
            </div>
          )}

          {/* Matched Answer Section */}
          {chatLog.matched_answer && (
            <div className='space-y-2'>
              <h3 className='text-muted-foreground text-sm font-semibold'>
                Matched Answer
              </h3>
              <div className='bg-muted/50 rounded-lg border p-4'>
                <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                  {chatLog.matched_answer}
                </p>
              </div>
            </div>
          )}

          {/* Response Section */}
          {chatLog.response && (
            <div className='space-y-2'>
              <h3 className='text-muted-foreground text-sm font-semibold'>
                Bot Response
              </h3>
              <div className='bg-muted/50 rounded-lg border p-4'>
                <p className='text-sm leading-relaxed whitespace-pre-wrap'>
                  {chatLog.response}
                </p>
              </div>
            </div>
          )}

          {/* Suggestions Section */}
          {chatLog.suggestions && chatLog.suggestions.length > 0 && (
            <div className='space-y-2'>
              <h3 className='text-muted-foreground text-sm font-semibold'>
                Suggestions Provided
              </h3>
              <div className='bg-muted/50 space-y-2 rounded-lg border p-4'>
                {chatLog.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className='bg-background rounded-md border px-3 py-2'
                  >
                    <p className='text-sm'>{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Created Date Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground flex items-center gap-2 text-sm font-semibold'>
              <Calendar className='h-4 w-4' />
              Created
            </h3>
            <div className='space-y-1'>
              <p className='text-sm'>
                {new Date(chatLog.created_at).toLocaleDateString()}
              </p>
              <p className='text-muted-foreground text-xs'>
                {new Date(chatLog.created_at).toLocaleTimeString()}
              </p>
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
                      onClick={() => handleCopy(String(chatLog.id), 'ID')}
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
                  <p className='bg-background rounded px-2 py-1.5 font-mono text-xs'>
                    {chatLog.id}
                  </p>
                </div>

                {/* Raw Confidence Score */}
                <div className='space-y-2'>
                  <p className='text-muted-foreground text-xs font-medium'>
                    Raw Confidence Score
                  </p>
                  <p className='bg-background rounded px-2 py-1.5 font-mono text-xs'>
                    {chatLog.confidence}
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

export default ChatLogViewDialog
