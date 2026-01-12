import ConfidenceBadge from '@/components/badges/ConfidenceBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

export const createChatLogsTableColumns = ({ sortConfig, onSort }) => [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'user_query',
    header: 'User Query',
    cell: ({ row }) => (
      <div className='w-xs truncate'>{row.getValue('user_query')}</div>
    ),
  },
  {
    accessorKey: 'matched_question',
    header: 'Matched Question',
    cell: ({ row }) => (
      <div className='text-muted-foreground w-xs truncate text-sm'>
        {row.getValue('matched_question') || '-'}
      </div>
    ),
  },
  {
    accessorKey: 'confidence',
    header: () => {
      const isActive = sortConfig.field === 'confidence'
      const isDesc = sortConfig.order === 'desc'

      return (
        <div className='text-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='hover:bg-accent h-8 px-2'>
                <span>Confidence</span>
                {isActive ? (
                  isDesc ? (
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
                onValueChange={(order) => onSort('confidence', order)}
              >
                <DropdownMenuRadioItem value='desc'>
                  <ArrowDown className='mr-2 h-4 w-4' />
                  Highest First
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value='asc'>
                  <ArrowUp className='mr-2 h-4 w-4' />
                  Lowest First
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    cell: ({ row }) => {
      const confidence = row.getValue('confidence')
      return (
        <div className='flex justify-center'>
          <ConfidenceBadge confidence={confidence} />
        </div>
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
]
