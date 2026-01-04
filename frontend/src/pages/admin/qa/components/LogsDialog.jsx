import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  Loader2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useQALogs } from '../hooks/useQALogs'

const LogsDialog = ({ open, onOpenChange }) => {
  const { data: logs = [], isLoading } = useQALogs()
  console.log('hey', logs)

  const [columnVisibility, setColumnVisibility] = useState({
    id: false,
    qa_pair_id: false,
    source_suggestion_id: false,
  })

  const [sortConfig, setSortConfig] = useState({
    field: 'created_at',
    order: 'desc', // newest first
  })

  // Sort logs
  const sortedLogs = useMemo(() => {
    if (!logs?.length) return []

    return [...logs].sort((a, b) => {
      if (sortConfig.field === 'created_at') {
        const aValue = new Date(a.created_at).getTime()
        const bValue = new Date(b.created_at).getTime()
        return sortConfig.order === 'desc' ? bValue - aValue : aValue - bValue
      } else if (sortConfig.field === 'vector_id') {
        const aValue = a.vector_id || ''
        const bValue = b.vector_id || ''
        return sortConfig.order === 'desc'
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue)
      }
      return 0
    })
  }, [logs, sortConfig])

  const handleSort = (field, order) => {
    setSortConfig({ field, order })
  }

  // LogsDialog.jsx - WITH COLUMN MIN WIDTHS

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 120, // ✅ Set column width
      cell: ({ row }) => (
        <div className='truncate font-mono text-xs'>{row.getValue('id')}</div>
      ),
    },
    {
      accessorKey: 'action_type',
      header: 'Action',
      size: 100, // ✅ Set column width
      cell: ({ row }) => {
        const action = row.getValue('action_type')
        const colors = {
          create:
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          update:
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
          delete: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
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
      size: 150, // ✅ Set column width
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
              <Button variant='ghost' className='hover:bg-accent h-8 px-0!'>
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
      size: 130, // ✅ Set column width
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
      size: 120, // ✅ Set column width
      cell: ({ row }) => (
        <div className='truncate font-mono text-xs'>
          {row.getValue('vector_id') || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'qa_pair_id',
      header: 'QA Pair ID',
      size: 120, // ✅ Set column width
      cell: ({ row }) => (
        <div className='truncate font-mono text-xs'>
          {row.getValue('qa_pair_id') || '-'}
        </div>
      ),
    },
    {
      accessorKey: 'old_question',
      header: 'Old Question',
      size: 250, // ✅ Set column width
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
      size: 250, // ✅ Set column width
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
      size: 250, // ✅ Set column width
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
      size: 250, // ✅ Set column width
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
      size: 150, // ✅ Set column width
      cell: ({ row }) => (
        <div className='truncate font-mono text-xs'>
          {row.getValue('source_suggestion_id') || '-'}
        </div>
      ),
    },
  ]

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: sortedLogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    // ✅ Enable column sizing
    enableColumnResizing: false,
    columnResizeMode: 'onChange',
    defaultColumn: {
      minSize: 60,
      size: 150,
      maxSize: 500,
    },
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex max-h-[90vh]! max-w-[90vw]! flex-col'>
        <DialogHeader>
          <DialogTitle>QA Pair Activity Logs</DialogTitle>
          <DialogDescription>
            View all create, update, and delete actions performed on QA pairs.
          </DialogDescription>
        </DialogHeader>

        {/* Controls */}
        <div className='flex items-center justify-between'>
          <div className='text-muted-foreground text-sm'>
            {sortedLogs.length} {sortedLogs.length === 1 ? 'log' : 'logs'}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                <Columns3 className='mr-2 h-4 w-4' />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(e) => e.preventDefault()}
                    >
                      {column.id.replace(/_/g, ' ')}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Table */}
        <div className='flex-1 overflow-auto rounded-md border'>
          <Table className='min-w-max'>
            <TableHeader className='bg-background sticky top-0 z-10'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className='bg-background'
                      style={{ width: `${header.getSize()}px` }} // ✅ Apply width
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    <div className='flex items-center justify-center gap-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      <span>Loading logs...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: `${cell.column.getSize()}px` }} // ✅ Apply width
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='flex items-center justify-between border-t pt-4'>
          <div className='flex items-center gap-2'>
            <p className='text-muted-foreground text-sm'>Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className='h-8 w-[70px]'>
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side='top'>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-6'>
            <p className='text-sm font-medium'>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </p>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to first page</span>
                <ChevronsLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to previous page</span>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to next page</span>
                <ChevronRight className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to last page</span>
                <ChevronsRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LogsDialog
