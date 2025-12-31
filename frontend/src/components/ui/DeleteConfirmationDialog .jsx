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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle } from 'lucide-react'

const DeleteConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title = 'Confirm Deletion',
  description,
  itemCount = 1,
  requireTyping = false,
}) => {
  const [confirmText, setConfirmText] = useState('')

  const handleConfirm = () => {
    if (!requireTyping || confirmText === 'DELETE') {
      onConfirm()
      setConfirmText('')
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    setConfirmText('')
    onOpenChange(false)
  }

  const isConfirmValid = !requireTyping || confirmText === 'DELETE'

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <div className='flex items-center gap-2'>
            <div className='bg-destructive/10 text-destructive flex h-10 w-10 items-center justify-center rounded-full'>
              <AlertTriangle className='h-5 w-5' />
            </div>
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className='pt-2'>
            {description ||
              `You are about to delete ${itemCount} ${itemCount === 1 ? 'item' : 'items'}. This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        {requireTyping && (
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='confirm-text'>
                Type <span className='font-mono font-bold'>DELETE</span> to
                confirm
              </Label>
              <Input
                id='confirm-text'
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder='DELETE'
                className='font-mono'
                autoComplete='off'
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant='outline' onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleConfirm}
            disabled={!isConfirmValid}
          >
            Delete {itemCount > 1 ? `${itemCount} Items` : 'Item'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmationDialog
