import DataTable from '@/components/features/data-table/DataTable'
import DeleteConfirmationDialog from '@/components/ui/DeleteConfirmationDialog '
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { capitalizeFirstLetter } from '@/utils/stringUtils'
import { FilePlusCorner, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useQAData } from './hooks/useQAData'

const QAPage = () => {
  const { data: qaData = [] } = useQAData()

  const [data, setData] = useState(qaData)
  const [qaDialog, setQaDialog] = useState({
    open: false,
    mode: null,
    item: null,
  })
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [deleteDialog, setDeleteDialog] = useState({ open: false, ids: [] })

  const handleAddClick = () => {
    setQaDialog({ open: true, mode: 'add', item: null })
    setQuestion('')
    setAnswer('')
  }

  const handleEditClick = (item) => {
    setQaDialog({ open: true, mode: 'edit', item })
    setQuestion(item.question)
    setAnswer(item.answer)
  }

  const handleSaveQA = () => {
    if (qaDialog.mode === 'add') {
      // Add new QA
      const newQA = {
        id: Date.now(),
        vector_id: `vec_${Date.now()}`,
        question: capitalizeFirstLetter(question),
        answer: capitalizeFirstLetter(answer),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setData([newQA, ...data])
    } else {
      // Edit existing QA
      setData(
        data.map((item) =>
          item.id === qaDialog.item.id
            ? {
                ...item,
                question,
                answer,
                updated_at: new Date().toISOString(),
              }
            : item,
        ),
      )
    }

    setQaDialog({ open: false, mode: null, item: null })
  }

  const handleCloseDialog = () => {
    setQaDialog({ open: false, mode: null, item: null })
    setQuestion('')
    setAnswer('')
  }

  const handleDeleteClick = (id) => {
    setDeleteDialog({ open: true, ids: [id] })
  }

  const handleDeleteSelectedClick = (ids) => {
    setDeleteDialog({ open: true, ids })
  }

  const handleConfirmDelete = () => {
    setData(data.filter((item) => !deleteDialog.ids.includes(item.id)))
    setDeleteDialog({ open: false, ids: [] })
  }

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'vector_id',
      header: 'Vector ID',
    },
    {
      accessorKey: 'question',
      header: 'Question',
      cell: ({ row }) => (
        <div className='w-2xs truncate'>{row.getValue('question')}</div>
      ),
    },
    {
      accessorKey: 'answer',
      header: 'Answer',
      cell: ({ row }) => (
        <div className='w-md truncate'>{row.getValue('answer')}</div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => {
        const date = new Date(row.getValue('created_at'))
        return date.toLocaleDateString()
      },
    },
    {
      accessorKey: 'updated_at',
      header: 'Updated At',
      cell: ({ row }) => {
        const date = new Date(row.getValue('updated_at'))
        return date.toLocaleDateString()
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const item = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEditClick(item)}>
                <Pencil className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteClick(item.id)}
                className='text-destructive! hover:bg-destructive/10!'
              >
                <Trash2 className='text-destructive mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSaveQA()
    }
  }

  const renderQADialog = () => (
    <Dialog open={qaDialog.open} onOpenChange={handleCloseDialog}>
      <DialogContent className='sm:max-w-[600px]'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSaveQA()
          }}
          onKeyDown={handleKeyDown}
        >
          <DialogHeader>
            <DialogTitle>
              {qaDialog.mode === 'add' ? 'Add New Q&A' : 'Edit Q&A'}
            </DialogTitle>
            <DialogDescription>
              {qaDialog.mode === 'add'
                ? "Create a new question and answer pair. Click save when you're done."
                : "Make changes to the question and answer. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='question'>Question</Label>
              <Textarea
                id='question'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className='min-h-20'
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='answer'>Answer</Label>
              <Textarea
                id='answer'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className='min-h-[120px]'
              />
            </div>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type='submit' disabled={!question.trim() || !answer.trim()}>
              {qaDialog.mode === 'add' ? 'Add Q&A' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )

  const itemCount = deleteDialog.ids.length

  return (
    <div className='min-w-full space-y-4 p-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-3xl font-bold'>QA Management</h2>
          <p className='text-muted-foreground'>
            Manage question and answer pairs here.
          </p>
        </div>
        <Button onClick={handleAddClick}>
          Add QA <FilePlusCorner />
        </Button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        onDeleteSelected={handleDeleteSelectedClick}
        searchPlaceholder='Filter questions...'
        searchKey='question'
        renderEditDialog={renderQADialog}
        initialColumnVisibility={{
          id: false,
          vector_id: false,
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, ids: [] })}
        onConfirm={handleConfirmDelete}
        title={
          itemCount === 1 ? 'Delete Q&A Pair' : 'Delete Multiple Q&A Pairs'
        }
        description={
          itemCount === 1
            ? 'You are about to permanently delete this Q&A pair. This action cannot be undone.'
            : `You are about to permanently delete ${itemCount} Q&A pairs. This action cannot be undone.`
        }
        itemCount={itemCount}
        requireTyping={itemCount > 1}
      />
    </div>
  )
}

export default QAPage
