import { Button } from '@/components/ui/button'
import DeleteConfirmationDialog from '@/pages/admin/qa/components/DeleteConfirmationDialog'
import { FilePlusCorner } from 'lucide-react'
import { useMemo, useState } from 'react'
import DataTable from './components/DataTable'
import QABulkActions from './components/QABulkActions'
import QAFormDialog from './components/QAFormDialog'
import { useQAData, useQAMutations } from './hooks/useQAData'
import { createQATableColumns } from './qaTableColumns'

const QAPage = () => {
  const { data = [], isLoading, error } = useQAData()
  const mutations = useQAMutations()

  const [formDialog, setFormDialog] = useState({ open: false, item: null })
  const [deleteDialog, setDeleteDialog] = useState({ open: false, ids: [] })

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
    setFormDialog({ open: true, item: null })
  }

  const handleEdit = (item) => {
    setFormDialog({ open: true, item })
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (formDialog.item) {
        await mutations.update({ id: formDialog.item.id, data: formData })
      } else {
        await mutations.create(formData)
      }
      setFormDialog({ open: false, item: null })
    } catch (error) {
      console.error('Failed to save QA:', error)
    }
  }

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, ids: [id] })
  }

  const handleDeleteSelected = (ids) => {
    setDeleteDialog({ open: true, ids })
  }

  const handleConfirmDelete = async () => {
    try {
      await mutations.delete(deleteDialog.ids)
      setDeleteDialog({ open: false, ids: [] })
    } catch (error) {
      console.error('Failed to delete QA:', error)
    }
  }

  const columns = createQATableColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    sortConfig,
    onSort: handleSort,
  })

  if (error) {
    return (
      <div className='min-w-full space-y-4 p-6'>
        <div className='border-destructive bg-destructive/10 rounded-lg border p-4'>
          <h3 className='text-destructive font-semibold'>
            Error Loading QA Data
          </h3>
          <p className='text-destructive/80 text-sm'>{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-w-full space-y-4 p-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-3xl font-bold'>QA Management</h2>
          <p className='text-muted-foreground'>
            Manage question and answer pairs here.
          </p>
        </div>
        <Button onClick={handleAdd}>
          Add QA <FilePlusCorner />
        </Button>
      </div>

      <DataTable
        data={sortedData}
        columns={columns}
        isLoading={isLoading}
        searchPlaceholder='Filter questions...'
        searchKey='question'
        initialColumnVisibility={{
          id: false,
          vector_id: false,
        }}
      >
        {({ selectedRows, clearSelection }) => (
          <QABulkActions
            selectedRows={selectedRows}
            onDelete={handleDeleteSelected}
            onClear={clearSelection}
          />
        )}
      </DataTable>

      <QAFormDialog
        open={formDialog.open}
        onOpenChange={() => setFormDialog({ open: false, item: null })}
        onSubmit={handleFormSubmit}
        initialData={formDialog.item}
        isSubmitting={mutations.isCreating || mutations.isUpdating}
      />

      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, ids: [] })}
        onConfirm={handleConfirmDelete}
        title={
          deleteDialog.ids.length === 1
            ? 'Delete QA Pair'
            : 'Delete Multiple QA Pairs'
        }
        description={
          deleteDialog.ids.length === 1
            ? 'You are about to permanently delete this QA pair. This action cannot be undone.'
            : `You are about to permanently delete ${deleteDialog.ids.length} QA pairs. This action cannot be undone.`
        }
        itemCount={deleteDialog.ids.length}
        requireTyping={deleteDialog.ids.length > 1}
        isDeleting={mutations.isDeleting}
      />
    </div>
  )
}

export default QAPage
