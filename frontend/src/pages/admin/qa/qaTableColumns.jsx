import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'

export const createQATableColumns = ({
  onEdit,
  onDelete,
  sortConfig,
  onSort,
}) => [
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
      <div className='w-3xs truncate'>{row.getValue('question')}</div>
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
    header: () => {
      const isActive = sortConfig.field === 'created_at'
      const isNewest = sortConfig.order === 'desc'

      return (
        <div className='text-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='hover:bg-accent h-8 px-2'>
                <span>Created At</span>
                {isActive ? (
                  isNewest ? (
                    <ArrowDown className='h-4 w-4' />
                  ) : (
                    <ArrowUp className='h-4 w-4' />
                  )
                ) : (
                  <ArrowUpDown className='h-4 w-4 opacity-40' />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuLabel>Sort by Created At</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={isActive ? sortConfig.order : ''}
                onValueChange={(order) => onSort('created_at', order)}
              >
                <DropdownMenuRadioItem value='desc'>
                  <ArrowDown className='mr-2 h-4 w-4' />
                  Newest First
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='asc'>
                  <ArrowUp className='mr-2 h-4 w-4' />
                  Oldest First
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))
      return <div className='text-center'>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'updated_at',
    header: () => {
      const isActive = sortConfig.field === 'updated_at'
      const isNewest = sortConfig.order === 'desc'

      return (
        <div className='text-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='hover:bg-accent h-8 px-2'>
                <span>Updated At</span>
                {isActive ? (
                  isNewest ? (
                    <ArrowDown className='h-4 w-4' />
                  ) : (
                    <ArrowUp className='h-4 w-4' />
                  )
                ) : (
                  <ArrowUpDown className='h-4 w-4 opacity-40' />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              <DropdownMenuLabel>Sort by Updated At</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={isActive ? sortConfig.order : ''}
                onValueChange={(order) => onSort('updated_at', order)}
              >
                <DropdownMenuRadioItem value='desc'>
                  <ArrowDown className='mr-2 h-4 w-4' />
                  Newest First
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='asc'>
                  <ArrowUp className='mr-2 h-4 w-4' />
                  Oldest First
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'))
      return <div className='text-center'>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: 'actions',
    minSize: 30,
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
            <DropdownMenuItem onClick={() => onEdit(item)}>
              <Pencil className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(item.id)}
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
