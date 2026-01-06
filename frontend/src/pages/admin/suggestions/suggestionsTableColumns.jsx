// pages/admin/suggestions/suggestionsTableColumns.jsx
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowDown, ArrowUp, ArrowUpDown, Loader2 } from 'lucide-react'
import StatusBadge from './components/StatusBadge'

export const createSuggestionsTableColumns = ({
  onStatusChange,
  sortConfig,
  onSort,
  updatingId,
}) => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'question',
    header: 'Question',
    cell: ({ row }) => (
      <div className='max-w-md truncate'>{row.getValue('question')}</div>
    ),
  },
  {
    accessorKey: 'context',
    header: 'Context',
    cell: ({ row }) => (
      <div className='text-muted-foreground max-w-sm truncate text-sm'>
        {row.getValue('context') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const item = row.original
      const status = row.getValue('status')
      const isUpdating = updatingId === item.id

      return (
        <Select
          value={status}
          onValueChange={(value) => onStatusChange(item.id, value)}
          disabled={isUpdating}
        >
          <SelectTrigger className='w-[130px]'>
            {isUpdating ? (
              <div className='flex items-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                <span className='text-sm'>Updating...</span>
              </div>
            ) : (
              <SelectValue>
                <StatusBadge status={status} />
              </SelectValue>
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='pending'>
              <StatusBadge status='pending' />
            </SelectItem>
            <SelectItem value='accepted'>
              <StatusBadge status='accepted' />
            </SelectItem>
            <SelectItem value='rejected'>
              <StatusBadge status='rejected' />
            </SelectItem>
          </SelectContent>
        </Select>
      )
    },
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
]
