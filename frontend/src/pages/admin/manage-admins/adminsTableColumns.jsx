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
import { Badge } from '@/components/ui/badge'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  KeyRound,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'

export const createAdminsTableColumns = ({
  onEdit,
  onResetPassword,
  onDelete,
  sortConfig,
  onSort,
}) => [
  {
    accessorKey: 'auth_user_id',
    header: 'User ID',
    cell: ({ row }) => (
      <div className='truncate font-mono text-xs'>
        {row.getValue('auth_user_id')}
      </div>
    ),
  },
  {
    accessorKey: 'first_name',
    header: 'First Name',
    cell: ({ row }) => (
      <div className='w-40 truncate font-medium'>
        {row.getValue('first_name')}
      </div>
    ),
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
    cell: ({ row }) => (
      <div className='w-40 truncate font-medium'>
        {row.getValue('last_name')}
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className='w-40 truncate text-sm'>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => (
      <div className='w-40 truncate text-sm'>{row.getValue('department')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role')
      return (
        <Badge
          className={
            role === 'superadmin'
              ? 'bg-black text-white dark:bg-black dark:text-white'
              : role === 'admin'
                ? 'bg-gray-300 text-black dark:bg-gray-300 dark:text-black'
                : 'bg-gray-200 text-black dark:bg-gray-200 dark:text-black'
          }
        >
          {role}
        </Badge>
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
      return (
        <div className='text-center text-sm'>{date.toLocaleDateString()}</div>
      )
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
            <DropdownMenuItem onClick={() => onEdit(item)}>
              <Pencil className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onResetPassword(item)}>
              <KeyRound className='mr-2 h-4 w-4' />
              Reset Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(item.auth_user_id)}
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
