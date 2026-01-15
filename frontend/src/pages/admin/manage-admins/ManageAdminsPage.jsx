import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/config/appConfig'
import { useMeta } from '@/hooks/useMeta'
import DeleteConfirmationDialog from '@/pages/admin/qa/components/DeleteConfirmationDialog'
import { UserPlus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { createAdminsTableColumns } from './adminsTableColumns'
import AdminAddDialog from './components/AdminAddDialog'
import AdminEditDialog from './components/AdminEditDialog'
import AdminViewDialog from './components/AdminViewDialog'
import DataTable from './components/DataTable'
import ResetPasswordDialog from './components/ResetPasswordDialog'
import { useAdminsData, useAdminsMutations } from './hooks/useAdminsData'

const ManageAdminsPage = () => {
  useMeta({
    title: `Manage Admins | Admin | ${APP_NAME}`,
    description: `Add, edit, and remove admin users in the ${APP_NAME} admin portal.`,
  })

  const { data = [], isLoading, error } = useAdminsData()
  const mutations = useAdminsMutations()

  const [formDialog, setFormDialog] = useState({ open: false })
  const [editDialog, setEditDialog] = useState({ open: false, item: null })
  const [resetPasswordDialog, setResetPasswordDialog] = useState({
    open: false,
    item: null,
  })
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null })
  const [viewDialog, setViewDialog] = useState({ open: false, item: null })

  const [sortConfig, setSortConfig] = useState({
    field: 'created_at',
    order: 'desc',
  })

  const sortedData = useMemo(() => {
    if (!data.length) return data

    return [...data].sort((a, b) => {
      const aValue = new Date(a[sortConfig.field]).getTime()
      const bValue = new Date(b[sortConfig.field]).getTime()

      if (sortConfig.order === 'desc') {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })
  }, [data, sortConfig])

  const handleSort = (field, order) => {
    setSortConfig({ field, order })
  }

  const handleAdd = () => {
    setFormDialog({ open: true })
  }

  const handleEdit = (item) => {
    setEditDialog({ open: true, item })
  }

  const handleResetPassword = (item) => {
    setResetPasswordDialog({ open: true, item })
  }

  const handleRowClick = (item) => {
    setViewDialog({ open: true, item })
  }

  const handleFormSubmit = async (formData) => {
    try {
      await mutations.create(formData)
      toast.success('Admin created successfully')
      setFormDialog({ open: false })
    } catch (error) {
      toast.error(`Failed: ${error.message || error}`)
    }
  }

  const handleEditSubmit = async (formData) => {
    try {
      await mutations.update({
        id: editDialog.item.auth_user_id,
        updates: formData,
      })
      toast.success('Admin updated successfully')
      setEditDialog({ open: false, item: null })
    } catch (error) {
      toast.error(`Failed: ${error.message || error}`)
    }
  }

  const handleResetPasswordSubmit = async (newPassword) => {
    try {
      await mutations.resetPassword({
        id: resetPasswordDialog.item.auth_user_id,
        newPassword,
      })
      toast.success('Password reset successfully')
      setResetPasswordDialog({ open: false, item: null })
    } catch (error) {
      toast.error(`Failed: ${error.message || error}`)
    }
  }

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, id })
  }

  const handleConfirmDelete = async () => {
    try {
      await mutations.delete(deleteDialog.id)
      toast.success('Admin deleted successfully')
      setDeleteDialog({ open: false, id: null })
    } catch (error) {
      toast.error(`Failed to delete: ${error.message || error}`)
    }
  }

  const columns = createAdminsTableColumns({
    onEdit: handleEdit,
    onResetPassword: handleResetPassword,
    onDelete: handleDelete,
    sortConfig,
    onSort: handleSort,
  })

  return (
    <div className='min-w-full space-y-4 p-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-3xl font-bold'>Manage Admins</h2>
          <p className='text-muted-foreground'>
            Add, edit, or remove admin users here.
          </p>
        </div>
        <Button onClick={handleAdd}>
          Add Admin <UserPlus />
        </Button>
      </div>

      <DataTable
        data={sortedData}
        columns={columns}
        isLoading={isLoading}
        error={error}
        searchPlaceholder='Search by last name...'
        searchKey='last_name'
        onRowClick={handleRowClick}
        initialColumnVisibility={{
          auth_user_id: false,
        }}
      />

      <AdminAddDialog
        open={formDialog.open}
        onOpenChange={() => setFormDialog({ open: false })}
        onSubmit={handleFormSubmit}
        isSubmitting={mutations.isCreating}
      />

      <AdminEditDialog
        open={editDialog.open}
        onOpenChange={() => setEditDialog({ open: false, item: null })}
        onSubmit={handleEditSubmit}
        initialData={editDialog.item}
        isSubmitting={mutations.isUpdating}
      />

      <ResetPasswordDialog
        open={resetPasswordDialog.open}
        onOpenChange={() => setResetPasswordDialog({ open: false, item: null })}
        onSubmit={handleResetPasswordSubmit}
        admin={resetPasswordDialog.item}
        isSubmitting={mutations.isResettingPassword}
      />

      <AdminViewDialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog({ open, item: null })}
        admin={viewDialog.item}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, id: null })}
        onConfirm={handleConfirmDelete}
        title='Delete Admin'
        description='You are about to permanently delete this admin user. This action cannot be undone.'
        isDeleting={mutations.isDeleting}
      />
    </div>
  )
}

export default ManageAdminsPage
