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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const AdminAddDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [department, setDepartment] = useState('')
  const [role, setRole] = useState('admin')

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setDepartment('')
      setRole('admin')
    }
  }, [open])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({
      email: email.trim(),
      password: password.trim(),
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      department: department.trim(),
      role: role,
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

  const isValid =
    email.trim() &&
    password.trim() &&
    firstName.trim() &&
    lastName.trim() &&
    department.trim()

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
            <DialogTitle>Add New Admin</DialogTitle>
            <DialogDescription>
              Create a new admin user. Fill in all required fields.
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
              <Label htmlFor='password'>Password *</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password'
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

            <div className='grid gap-2'>
              <Label htmlFor='role'>Role *</Label>
              <Select
                value={role}
                onValueChange={setRole}
                disabled={isSubmitting}
              >
                <SelectTrigger id='role'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='admin'>Admin</SelectItem>
                  <SelectItem value='superadmin'>Superadmin</SelectItem>
                </SelectContent>
              </Select>
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
                  Creating...
                </>
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

export default AdminAddDialog
