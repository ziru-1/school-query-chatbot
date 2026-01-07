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

const AdminEditDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [department, setDepartment] = useState('')

  useEffect(() => {
    if (open && initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFirstName(initialData.first_name || '')
      setLastName(initialData.last_name || '')
      setDepartment(initialData.department || '')
    }
  }, [open, initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      department: department.trim(),
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

  const isValid = firstName.trim() && lastName.trim() && department.trim()

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className='sm:max-w-[500px]'
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
            <DialogTitle>Edit Admin</DialogTitle>
            <DialogDescription>
              Update admin details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='firstName'>First Name *</Label>
                <Input
                  id='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='John'
                  autoFocus
                  disabled={isSubmitting}
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='lastName'>Last Name *</Label>
                <Input
                  id='lastName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Doe'
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='department'>Department *</Label>
              <Input
                id='department'
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder='Computer Science'
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
              ) : (
                'Save changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AdminEditDialog
