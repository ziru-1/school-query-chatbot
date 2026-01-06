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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  Loader2,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSuggestionsLogs } from '../hooks/useSuggestionsLogs'
import { createSuggestionsLogsTableColumns } from './suggestionsLogsTableColumns'

const SuggestionsLogsDialog = ({ open, onOpenChange }) => {
  const { data: logs = [], isLoading } = useSuggestionsLogs()

  const [columnVisibility, setColumnVisibility] = useState({
    id: false,
  })

  const [sortConfig, setSortConfig] = useState({
    field: 'changed_at',
    order: 'desc',
  })

  const sortedLogs = useMemo(() => {
    if (!logs?.length) return []

    return [...logs].sort((a, b) => {
      if (sortConfig.field === 'changed_at') {
        const aValue = new Date(a.changed_at).getTime()
        const bValue = new Date(b.changed_at).getTime()
        return sortConfig.order === 'desc' ? bValue - aValue : aValue - bValue
      }
      return 0
    })
  }, [logs, sortConfig])

  const handleSort = (field, order) => {
    setSortConfig({ field, order })
  }

  const columns = createSuggestionsLogsTableColumns(sortConfig, handleSort)

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
          <DialogTitle>Suggestion Activity Logs</DialogTitle>
          <DialogDescription>
            View all status changes performed on suggestions.
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
                      style={{ width: `${header.getSize()}px` }}
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
                        style={{ width: `${cell.column.getSize()}px` }}
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

export default SuggestionsLogsDialog
