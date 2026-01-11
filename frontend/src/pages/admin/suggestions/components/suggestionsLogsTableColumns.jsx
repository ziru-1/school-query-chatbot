import StatusBadge from '@/components/badges/StatusBadge'
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

export const createSuggestionsLogsTableColumns = (sortConfig, handleSort) => [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 120,
    cell: ({ row }) => (
      <div className='truncate font-mono text-xs'>{row.getValue('id')}</div>
    ),
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
    accessorKey: 'question_suggestion_id',
    header: 'Suggestion ID',
    size: 150,
    cell: ({ row }) => (
      <div className='truncate font-mono text-xs'>
        {row.getValue('question_suggestion_id') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'question',
    header: 'Question',
    size: 250,
    cell: ({ row }) => (
      <div className='w-[250px]'>
        <div className='truncate text-sm'>{row.getValue('question')}</div>
      </div>
    ),
  },
  {
    accessorKey: 'old_status',
    header: 'Old Status',
    size: 120,
    cell: ({ row }) => {
      const status = row.getValue('old_status')
      return status ? <StatusBadge status={status} /> : <span>-</span>
    },
  },
  {
    accessorKey: 'new_status',
    header: 'New Status',
    size: 120,
    cell: ({ row }) => {
      const status = row.getValue('new_status')
      return status ? <StatusBadge status={status} /> : <span>-</span>
    },
  },

  {
    accessorKey: 'changed_at',
    header: () => {
      const isActive = sortConfig.field === 'changed_at'
      const isNewest = sortConfig.order === 'desc'

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='hover:bg-accent h-8 px-0'>
              <span>Changed At</span>
              {isActive &&
                (isNewest ? (
                  <ArrowDown className='h-4 w-4' />
                ) : (
                  <ArrowUp className='h-4 w-4' />
                ))}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuLabel>Sort by Changed At</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={isActive ? sortConfig.order : ''}
              onValueChange={(order) => handleSort('changed_at', order)}
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
    size: 160,
    cell: ({ row }) => {
      const date = new Date(row.getValue('changed_at'))
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
]
