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
import { useAuth } from '@/context/AuthContext'
import { getQA } from '@/services/qa'
import { capitalizeFirstLetter } from '@/utils/stringUtils'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const QAPage = () => {
  const [data, setData] = useState([])
  const [editingRow, setEditingRow] = useState(null)
  const [editQuestion, setEditQuestion] = useState('')
  const [editAnswer, setEditAnswer] = useState('')
  const [deleteDialog, setDeleteDialog] = useState({ open: false, ids: [] })
  const { session } = useAuth()

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const data = await getQA(session.access_token)

        const formattedData = data.map((item) => ({
          ...item,
          question: capitalizeFirstLetter(item.question),
          answer: capitalizeFirstLetter(item.answer),
        }))

        setData(formattedData)
      } catch (err) {
        console.log(err)
      }
    }

    fetchQA()
  }, [session.access_token])

  const handleEdit = (item) => {
    setEditingRow(item)
    setEditQuestion(item.question)
    setEditAnswer(item.answer)
  }

  const handleSaveEdit = () => {
    setData(
      data.map((item) =>
        item.id === editingRow.id
          ? {
              ...item,
              question: editQuestion,
              answer: editAnswer,
              updated_at: new Date().toISOString(),
            }
          : item,
      ),
    )
    setEditingRow(null)
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
        <div className='max-w-2xs truncate'>{row.getValue('question')}</div>
      ),
    },
    {
      accessorKey: 'answer',
      header: 'Answer',
      cell: ({ row }) => (
        <div className='max-w-md truncate'>{row.getValue('answer')}</div>
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
              <DropdownMenuItem onClick={() => handleEdit(item)}>
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

  const renderEditDialog = () => (
    <Dialog open={!!editingRow} onOpenChange={() => setEditingRow(null)}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Edit Q&A</DialogTitle>
          <DialogDescription>
            Make changes to the question and answer. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='question'>Question</Label>
            <Textarea
              id='question'
              value={editQuestion}
              onChange={(e) => setEditQuestion(e.target.value)}
              className='min-h-20'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='answer'>Answer</Label>
            <Textarea
              id='answer'
              value={editAnswer}
              onChange={(e) => setEditAnswer(e.target.value)}
              className='min-h-[120px]'
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setEditingRow(null)}>
            Cancel
          </Button>
          <Button onClick={handleSaveEdit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const itemCount = deleteDialog.ids.length

  return (
    <div className='min-w-full space-y-4 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Q&A Management</h1>
      </div>

      <DataTable
        data={data}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onDeleteSelected={handleDeleteSelectedClick}
        searchPlaceholder='Filter questions...'
        searchKey='question'
        renderEditDialog={renderEditDialog}
        initialColumnVisibility={{
          id: false,
          vector_id: false,
        }}
      />

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
