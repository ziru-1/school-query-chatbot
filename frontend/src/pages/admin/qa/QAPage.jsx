import { Button } from '@/components/ui/button'
import DeleteConfirmationDialog from '@/pages/admin/qa/components/DeleteConfirmationDialog'
import { FilePlusCorner } from 'lucide-react'
import { useState } from 'react'
import DataTable from './components/DataTable'
import QAFormDialog from './components/QAFormDialog'
import { useQAData, useQAMutations } from './hooks/useQAData'
import { createQATableColumns } from './qaTableColumns'

const QAPage = () => {
  // Data layer - no more manual state management!
  const { data = [], isLoading, error } = useQAData()
  const mutations = useQAMutations()

  // UI state - minimal, focused
  const [formDialog, setFormDialog] = useState({ open: false, item: null })
  const [deleteDialog, setDeleteDialog] = useState({ open: false, ids: [] })

  // Handlers - now just orchestration
  const handleAdd = () => {
    setFormDialog({ open: true, item: null })
  }

  const handleEdit = (item) => {
    setFormDialog({ open: true, item })
  }

  const handleFormSubmit = (formData) => {
    if (formDialog.item) {
      mutations.update({ id: formDialog.item.id, data: formData })
    } else {
      mutations.create(formData)
    }
    setFormDialog({ open: false, item: null })
  }

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, ids: [id] })
  }

  const handleDeleteSelected = (ids) => {
    setDeleteDialog({ open: true, ids })
  }

  const handleConfirmDelete = () => {
    mutations.delete(deleteDialog.ids)
    setDeleteDialog({ open: false, ids: [] })
  }

  // Column configuration - extracted for clarity
  const columns = createQATableColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  })

  if (error) {
    return <div>Error loading QA data: {error.message}</div>
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
        data={data}
        columns={columns}
        isLoading={isLoading}
        onDeleteSelected={handleDeleteSelected}
        searchPlaceholder='Filter questions...'
        searchKey='question'
        initialColumnVisibility={{
          id: false,
          vector_id: false,
        }}
      />

      <QAFormDialog
        open={formDialog.open}
        onOpenChange={(open) => setFormDialog({ open, item: null })}
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
            ? 'Delete Q&A Pair'
            : 'Delete Multiple Q&A Pairs'
        }
        description={
          deleteDialog.ids.length === 1
            ? 'You are about to permanently delete this Q&A pair. This action cannot be undone.'
            : `You are about to permanently delete ${deleteDialog.ids.length} Q&A pairs. This action cannot be undone.`
        }
        itemCount={deleteDialog.ids.length}
        requireTyping={deleteDialog.ids.length > 1}
      />
    </div>
  )
}

export default QAPage
