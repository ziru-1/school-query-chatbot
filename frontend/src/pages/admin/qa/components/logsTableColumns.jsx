import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowDown, ArrowUp } from 'lucide-react'

export const createLogsTableColumns = (sortConfig, handleSort) => [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 120,
    cell: ({ row }) => (
      <div className='truncate font-mono text-xs'>{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'action_type',
    header: 'Action',
    size: 100,
    cell: ({ row }) => {
      const action = row.getValue('action_type')
      const colors = {
        create:
          'bg-green-300 text-green-800 dark:bg-green-900 dark:text-green-200',
        update: 'bg-blue-300 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        delete: 'bg-red-300 text-red-800 dark:bg-red-900 dark:text-red-200',
      }
      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${colors[action] || 'bg-gray-100 text-gray-800'}`}
        >
          {action}
        </span>
      )
    },
  },
  {
    accessorKey: 'actor_name',
    header: 'Actor Name',
    size: 150,
    cell: ({ row }) => (
      <div className='w-[150px]'>
        <div className='truncate text-sm'>{row.getValue('actor_name')}</div>
      </div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: () => {
      const isActive = sortConfig.field === 'created_at'
      const isNewest = sortConfig.order === 'desc'

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='hover:bg-accent h-8 px-0'>
              <span>Created At</span>
              {isActive &&
                (isNewest ? (
                  <ArrowDown className='h-4 w-4' />
                ) : (
                  <ArrowUp className='h-4 w-4' />
                ))}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuLabel>Sort by Created At</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={isActive ? sortConfig.order : ''}
              onValueChange={(order) => handleSort('created_at', order)}
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
      )
    },
    size: 130,
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))
      return (
        <div className='text-sm'>
          <div>{date.toLocaleDateString()}</div>
          <div className='text-muted-foreground text-xs'>
            {date.toLocaleTimeString()}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'vector_id',
    header: 'Vector ID',
    size: 120,
    cell: ({ row }) => (
      <div className='truncate font-mono text-xs'>
        {row.getValue('vector_id') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'qa_pair_id',
    header: 'QA Pair ID',
    size: 120,
    cell: ({ row }) => (
      <div className='truncate font-mono text-xs'>
        {row.getValue('qa_pair_id') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'old_question',
    header: 'Old Question',
    size: 250,
    cell: ({ row }) => (
      <div className='w-[250px]'>
        <div className='truncate text-sm'>
          {row.getValue('old_question') || '-'}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'new_question',
    header: 'New Question',
    size: 250,
    cell: ({ row }) => (
      <div className='w-[250px]'>
        <div className='truncate text-sm'>
          {row.getValue('new_question') || '-'}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'old_answer',
    header: 'Old Answer',
    size: 250,
    cell: ({ row }) => (
      <div className='w-[250px]'>
        <div className='truncate text-sm'>
          {row.getValue('old_answer') || '-'}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'new_answer',
    header: 'New Answer',
    size: 250,
    cell: ({ row }) => (
      <div className='w-[250px]'>
        <div className='truncate text-sm'>
          {row.getValue('new_answer') || '-'}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'source_suggestion_id',
    header: 'Source Suggestion ID',
    size: 150,
    cell: ({ row }) => (
      <div className='truncate font-mono text-xs'>
        {row.getValue('source_suggestion_id') || '-'}
      </div>
    ),
  },
]
