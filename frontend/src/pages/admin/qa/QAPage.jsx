import DataTable from '@/components/features/data-table/DataTable'
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
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

// Mock data
const mockData = [
  {
    id: 1,
    vector_id: 'vec_001',
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces.',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    vector_id: 'vec_002',
    question: 'How does useState work?',
    answer:
      'useState is a Hook that lets you add state to functional components.',
    created_at: '2024-01-16T14:20:00Z',
    updated_at: '2024-01-16T14:20:00Z',
  },
  {
    id: 3,
    vector_id: 'vec_003',
    question: 'What is JSX?',
    answer:
      'JSX is a syntax extension for JavaScript that looks similar to HTML.',
    created_at: '2024-01-17T09:15:00Z',
    updated_at: '2024-01-17T09:15:00Z',
  },
  {
    id: 4,
    vector_id: 'vec_004',
    question: 'What are props in React?',
    answer:
      'Props are arguments passed into React components, similar to function parameters.',
    created_at: '2024-01-18T11:45:00Z',
    updated_at: '2024-01-18T11:45:00Z',
  },
  {
    id: 5,
    vector_id: 'vec_005',
    question: 'What is the virtual DOM?',
    answer:
      'The virtual DOM is a lightweight copy of the actual DOM that React uses to optimize updates.',
    created_at: '2024-01-19T16:00:00Z',
    updated_at: '2024-01-19T16:00:00Z',
  },
  {
    id: 6,
    vector_id: 'vec_006',
    question: 'What is useEffect?',
    answer:
      'useEffect is a Hook that lets you perform side effects in functional components.',
    created_at: '2024-01-20T13:30:00Z',
    updated_at: '2024-01-20T13:30:00Z',
  },
  {
    id: 7,
    vector_id: 'vec_007',
    question: 'What is component composition?',
    answer:
      'Component composition is combining multiple components to create more complex UIs.',
    created_at: '2024-01-21T10:00:00Z',
    updated_at: '2024-01-21T10:00:00Z',
  },
  {
    id: 8,
    vector_id: 'vec_008',
    question: 'What are React hooks?',
    answer:
      'Hooks are functions that let you use state and other React features in functional components.',
    created_at: '2024-01-22T15:20:00Z',
    updated_at: '2024-01-22T15:20:00Z',
  },
  {
    id: 9,
    vector_id: 'vec_009',
    question: 'What is the difference between state and props?',
    answer:
      'State is internal to a component and can change, while props are passed from parent components and are read-only.',
    created_at: '2024-01-23T12:00:00Z',
    updated_at: '2024-01-23T12:00:00Z',
  },
  {
    id: 10,
    vector_id: 'vec_010',
    question: 'What is a controlled component?',
    answer:
      'A controlled component is a form element whose value is controlled by React state.',
    created_at: '2024-01-24T09:30:00Z',
    updated_at: '2024-01-24T09:30:00Z',
  },
  {
    id: 11,
    vector_id: 'vec_011',
    question: 'What is an uncontrolled component?',
    answer:
      'An uncontrolled component is a form element that maintains its own internal state instead of being controlled by React.',
    created_at: '2024-01-25T11:00:00Z',
    updated_at: '2024-01-25T11:00:00Z',
  },
  {
    id: 12,
    vector_id: 'vec_012',
    question: 'What is context in React?',
    answer:
      'Context provides a way to pass data through the component tree without passing props down manually at every level.',
    created_at: '2024-01-26T14:15:00Z',
    updated_at: '2024-01-26T14:15:00Z',
  },
  {
    id: 13,
    vector_id: 'vec_013',
    question: 'What is React Router?',
    answer:
      'React Router is a library for routing in React applications, allowing navigation between views.',
    created_at: '2024-01-27T10:45:00Z',
    updated_at: '2024-01-27T10:45:00Z',
  },
  {
    id: 14,
    vector_id: 'vec_014',
    question: 'What is the difference between class and functional components?',
    answer:
      'Class components use ES6 classes and lifecycle methods, while functional components are simpler and use Hooks.',
    created_at: '2024-01-28T13:30:00Z',
    updated_at: '2024-01-28T13:30:00Z',
  },
  {
    id: 15,
    vector_id: 'vec_015',
    question: 'What is a higher-order component (HOC)?',
    answer:
      'A higher-order component is a function that takes a component and returns a new component with additional props or behavior.',
    created_at: '2024-01-29T09:00:00Z',
    updated_at: '2024-01-29T09:00:00Z',
  },
  {
    id: 16,
    vector_id: 'vec_016',
    question: 'What is React.memo?',
    answer:
      'React.memo is a higher-order component that prevents unnecessary re-renders by memoizing the component output.',
    created_at: '2024-01-30T15:20:00Z',
    updated_at: '2024-01-30T15:20:00Z',
  },
  {
    id: 17,
    vector_id: 'vec_017',
    question: 'What is the difference between useEffect and useLayoutEffect?',
    answer:
      'useEffect runs after the render is committed to the screen, while useLayoutEffect runs synchronously after all DOM mutations but before the browser paints.',
    created_at: '2024-01-31T12:10:00Z',
    updated_at: '2024-01-31T12:10:00Z',
  },
  {
    id: 18,
    vector_id: 'vec_018',
    question: 'What is React Suspense?',
    answer:
      'Suspense allows you to delay rendering a component tree until some condition, like data fetching, is met.',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 19,
    vector_id: 'vec_019',
    question: 'What is lazy loading in React?',
    answer:
      'Lazy loading allows components to be loaded on demand, which can improve the performance of a React app.',
    created_at: '2024-02-02T11:45:00Z',
    updated_at: '2024-02-02T11:45:00Z',
  },
  {
    id: 20,
    vector_id: 'vec_020',
    question: 'What is the difference between React and ReactDOM?',
    answer:
      'React is the core library for building components, while ReactDOM handles rendering components to the DOM.',
    created_at: '2024-02-03T14:20:00Z',
    updated_at: '2024-02-03T14:20:00Z',
  },
  {
    id: 21,
    vector_id: 'vec_021',
    question: 'What is reconciliation in React?',
    answer:
      'Reconciliation is the process React uses to update the DOM efficiently by comparing the virtual DOM with the real DOM.',
    created_at: '2024-02-04T09:50:00Z',
    updated_at: '2024-02-04T09:50:00Z',
  },
  {
    id: 22,
    vector_id: 'vec_022',
    question: 'What is a key in React lists?',
    answer:
      'Keys are unique identifiers for list items that help React optimize rendering and updates.',
    created_at: '2024-02-05T13:15:00Z',
    updated_at: '2024-02-05T13:15:00Z',
  },
  {
    id: 23,
    vector_id: 'vec_023',
    question: 'What is prop drilling?',
    answer:
      'Prop drilling is the process of passing data from a parent component to deeply nested child components through props.',
    created_at: '2024-02-06T10:40:00Z',
    updated_at: '2024-02-06T10:40:00Z',
  },
  {
    id: 24,
    vector_id: 'vec_024',
    question:
      'What is the difference between stateful and stateless components?',
    answer:
      'Stateful components manage their own state, while stateless components rely only on props for rendering.',
    created_at: '2024-02-07T12:30:00Z',
    updated_at: '2024-02-07T12:30:00Z',
  },
  {
    id: 25,
    vector_id: 'vec_025',
    question: 'What is a React Fragment?',
    answer:
      'A Fragment lets you group multiple elements without adding extra nodes to the DOM.',
    created_at: '2024-02-08T11:00:00Z',
    updated_at: '2024-02-08T11:00:00Z',
  },
]

export default function QAPage() {
  const [data, setData] = useState(mockData)
  const [editingRow, setEditingRow] = useState(null)
  const [editQuestion, setEditQuestion] = useState('')
  const [editAnswer, setEditAnswer] = useState('')

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

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

  const handleDeleteSelected = (ids) => {
    setData(data.filter((item) => !ids.includes(item.id)))
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
                onClick={() => handleDelete(item.id)}
                className='text-red-600'
              >
                <Trash2 className='mr-2 h-4 w-4' />
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

  return (
    <div className='min-w-full space-y-4 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Q&A Management</h1>
      </div>

      <DataTable
        data={data}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDeleteSelected={handleDeleteSelected}
        searchPlaceholder='Filter questions...'
        searchKey='question'
        renderEditDialog={renderEditDialog}
        initialColumnVisibility={{
          id: false,
          vector_id: false,
        }}
      />
    </div>
  )
}
