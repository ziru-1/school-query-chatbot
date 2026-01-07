import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Mail,
  User,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const AdminViewDialog = ({ open, onOpenChange, admin }) => {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [copiedId, setCopiedId] = useState(null)

  if (!admin) return null

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
          <DialogTitle>Admin Details</DialogTitle>
        </DialogHeader>

        <div className='space-y-6 overflow-y-auto pr-2'>
          {/* Name Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground text-sm font-semibold'>
              Full Name
            </h3>
            <div className='bg-muted/50 flex items-center gap-2 rounded-lg border p-4'>
              <User className='text-muted-foreground h-5 w-5' />
              <p className='text-lg font-medium'>
                {admin.first_name} {admin.last_name}
              </p>
            </div>
          </div>

          {/* Email Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground text-sm font-semibold'>
              Email
            </h3>
            <div className='bg-muted/50 flex items-center gap-2 rounded-lg border p-4'>
              <Mail className='text-muted-foreground h-5 w-5' />
              <p className='text-sm'>{admin.email}</p>
            </div>
          </div>

          {/* Department & Role Section */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <h3 className='text-muted-foreground text-sm font-semibold'>
                Department
              </h3>
              <div className='bg-muted/50 rounded-lg border p-4'>
                <p className='text-sm'>{admin.department}</p>
              </div>
            </div>
            <div className='space-y-2'>
              <h3 className='text-muted-foreground text-sm font-semibold'>
                Role
              </h3>
              <div className='bg-muted/50 rounded-lg border p-4'>
                <Badge
                  variant={
                    admin.role === 'superadmin' ? 'default' : 'secondary'
                  }
                >
                  {admin.role}
                </Badge>
              </div>
            </div>
          </div>

          {/* Created Date Section */}
          <div className='space-y-2'>
            <h3 className='text-muted-foreground flex items-center gap-2 text-sm font-semibold'>
              <Calendar className='h-4 w-4' />
              Created
            </h3>
            <div className='space-y-1'>
              <p className='text-sm'>
                {new Date(admin.created_at).toLocaleDateString()}
              </p>
              <p className='text-muted-foreground text-xs'>
                {new Date(admin.created_at).toLocaleTimeString()}
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
                {/* User ID */}
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <p className='text-muted-foreground text-xs font-medium'>
                      User ID
                    </p>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-7 px-2'
                      onClick={() => handleCopy(admin.auth_user_id, 'User ID')}
                    >
                      {copiedId === 'User ID' ? (
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
                    {admin.auth_user_id}
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

export default AdminViewDialog
