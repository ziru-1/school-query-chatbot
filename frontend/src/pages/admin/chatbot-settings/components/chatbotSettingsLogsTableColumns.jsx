import ConfidenceBadge from '@/components/badges/ConfidenceBadge'
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

export const createChatbotSettingsLogsTableColumns = (
  sortConfig,
  handleSort,
  highThreshold,
  lowThreshold,
) => [
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
    header: 'Changed By',
    size: 150,
    cell: ({ row }) => (
      <div className='truncate text-sm'>{row.getValue('actor_name')}</div>
    ),
  },
  {
    accessorKey: 'setting_key',
    header: 'Setting',
    size: 180,
    cell: ({ row }) => {
      const value = row.getValue('setting_key')

      const formatted = value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())

      return <div className='truncate text-sm'>{formatted}</div>
    },
  },
  {
    accessorKey: 'old_value',
    header: 'Old Value',
    size: 120,
    cell: ({ row }) => (
      <ConfidenceBadge
        confidence={row.getValue('old_value')}
        highThreshold={highThreshold}
        lowThreshold={lowThreshold}
      />
    ),
  },
  {
    accessorKey: 'new_value',
    header: 'New Value',
    size: 120,
    cell: ({ row }) => (
      <ConfidenceBadge
        confidence={row.getValue('new_value')}
        highThreshold={highThreshold}
        lowThreshold={lowThreshold}
      />
    ),
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
