import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'

const QABulkActions = ({ selectedRows, onDelete, onClear }) => {
  const selectedCount = selectedRows.length
  const selectedIds = selectedRows.map((row) => row.original.id)

  return (
    <div className='fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl shadow-xl transition-all duration-300 ease-out'>
      <div className='bg-background/95 flex items-center gap-2 rounded-xl border p-2 backdrop-blur-lg'>
        <Button
          variant='outline'
          size='icon'
          onClick={onClear}
          className='h-6 w-6 rounded-full'
        >
          <X className='h-4 w-4' />
        </Button>
        <div className='bg-border h-5 w-px' />
        <div className='flex items-center gap-2 text-sm'>
          <Badge variant='default' className='rounded-lg'>
            {selectedCount}
          </Badge>
          <span>Q&A pair{selectedCount > 1 ? 's' : ''} selected</span>
        </div>
        <div className='bg-border h-5 w-px' />
        <Button
          variant='destructive'
          size='sm'
          onClick={() => {
            onDelete(selectedIds)
            onClear()
          }}
          className='h-8'
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Delete Selection
        </Button>
      </div>
    </div>
  )
}

export default QABulkActions
