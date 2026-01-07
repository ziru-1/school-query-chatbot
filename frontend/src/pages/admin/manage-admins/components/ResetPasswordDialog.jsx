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
import { Input } from '@/components/ui/input'
import { KeyRound } from 'lucide-react'

const ResetPasswordDialog = ({
  open,
  onOpenChange,
  onSubmit,
  admin = null,
  isSubmitting = false,
}) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewPassword('')
      setConfirmPassword('')
    }
  }, [open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword === confirmPassword) {
      await onSubmit(newPassword.trim())
    }
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

  const isValid =
    newPassword.trim() &&
    confirmPassword.trim() &&
    newPassword === confirmPassword

  const passwordsMatch = !confirmPassword || newPassword === confirmPassword

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className='sm:max-w-[450px]'
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
            <div className='flex items-center gap-2'>
              <div className='bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full'>
                <KeyRound className='h-5 w-5' />
              </div>
              <DialogTitle>Reset Password</DialogTitle>
            </div>
            <DialogDescription className='pt-2'>
              {admin && (
                <span>
                  Reset password for{' '}
                  <strong>
                    {admin.first_name} {admin.last_name}
                  </strong>{' '}
                  ({admin.email})
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='newPassword'>New Password *</Label>
              <Input
                id='newPassword'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Enter new password'
                autoFocus
                disabled={isSubmitting}
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='confirmPassword'>Confirm Password *</Label>
              <Input
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm new password'
                disabled={isSubmitting}
                className={!passwordsMatch ? 'border-destructive' : ''}
              />
              {!passwordsMatch && (
                <p className='text-destructive text-xs'>
                  Passwords do not match
                </p>
              )}
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
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ResetPasswordDialog
