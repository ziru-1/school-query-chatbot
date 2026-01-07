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

const AdminFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) => {
  const [email, setEmail] = useState(initialData?.email || '')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState(initialData?.first_name || '')
  const [lastName, setLastName] = useState(initialData?.last_name || '')
  const [department, setDepartment] = useState(initialData?.department || '')

  const isEdit = Boolean(initialData)

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail(initialData?.email || '')
      setPassword('')
      setFirstName(initialData?.first_name || '')
      setLastName(initialData?.last_name || '')
      setDepartment(initialData?.department || '')
    }
  }, [open, initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      email: email.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      department: department.trim(),
    }

    // Only include password if it's provided (for both create and edit)
    if (password.trim()) {
      formData.password = password.trim()
    }

    await onSubmit(formData)
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
    email.trim() &&
    firstName.trim() &&
    lastName.trim() &&
    department.trim() &&
    (!isEdit ? password.trim() : true) // Password required for create, optional for edit

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
            <DialogTitle>{isEdit ? 'Edit Admin' : 'Add New Admin'}</DialogTitle>
            <DialogDescription>
              {isEdit
                ? 'Update admin details. Leave password blank to keep current password.'
                : 'Create a new admin user. Fill in all required fields.'}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email *</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='admin@example.com'
                autoFocus
                disabled={isSubmitting}
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='password'>
                Password {isEdit ? '(leave blank to keep current)' : '*'}
              </Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  isEdit ? 'Leave blank to keep current' : 'Enter password'
                }
                disabled={isSubmitting}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='firstName'>First Name *</Label>
                <Input
                  id='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='John'
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
              ) : isEdit ? (
                'Save changes'
              ) : (
                'Add Admin'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AdminFormDialog
