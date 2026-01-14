import { useMeta } from '@/hooks/useMeta'
import { useMemo, useState } from 'react'
import { createChatLogsTableColumns } from './chatLogsTableColumns'
import ChatLogViewDialog from './components/ChatLogViewDialog'
import ChatLogsDataTable from './components/ChatLogsDataTable'
import { useChatLogs } from './hooks/useChatLogs'

const HIGH_THRESHOLD = 0.55
const LOW_THRESHOLD = 0.35

const ChatLogsPage = () => {
  useMeta({
    title: 'Chat Logs | Admin | Vivy AI',
    description:
      'View and manage all user chat logs in the Vivy AI admin portal.',
  })

  const { data = [], isLoading, error } = useChatLogs()

  const [viewDialog, setViewDialog] = useState({ open: false, item: null })
  const [confidenceFilter, setConfidenceFilter] = useState('all')

  const [sortConfig, setSortConfig] = useState({
    field: 'created_at',
    order: 'desc',
  })

  // Filter by confidence level
  const filteredData = useMemo(() => {
    if (confidenceFilter === 'all') return data

    return data.filter((item) => {
      const confidence = item.confidence

      if (confidenceFilter === 'high') {
        return confidence >= HIGH_THRESHOLD
      } else if (confidenceFilter === 'medium') {
        return confidence >= LOW_THRESHOLD && confidence < HIGH_THRESHOLD
      } else if (confidenceFilter === 'low') {
        return confidence < LOW_THRESHOLD
      }

      return true
    })
  }, [data, confidenceFilter])

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!filteredData.length) return filteredData

    return [...filteredData].sort((a, b) => {
      if (sortConfig.field === 'confidence') {
        const aValue = a.confidence
        const bValue = b.confidence

        if (sortConfig.order === 'desc') {
          return bValue - aValue
        } else {
          return aValue - bValue
        }
      } else if (sortConfig.field === 'created_at') {
        const aValue = new Date(a.created_at).getTime()
        const bValue = new Date(b.created_at).getTime()

        if (sortConfig.order === 'desc') {
          return bValue - aValue
        } else {
          return aValue - bValue
        }
      }

      return 0
    })
  }, [filteredData, sortConfig])

  const handleSort = (field, order) => {
    setSortConfig({ field, order })
  }

  const handleRowClick = (item) => {
    setViewDialog({ open: true, item })
  }

  const columns = createChatLogsTableColumns({
    sortConfig,
    onSort: handleSort,
  })

  return (
    <div className='min-w-full space-y-4 p-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-3xl font-bold'>Chat Logs</h2>
          <p className='text-muted-foreground'>
            View and analyze chatbot interaction logs.
          </p>
        </div>
      </div>

      <ChatLogsDataTable
        data={sortedData}
        columns={columns}
        isLoading={isLoading}
        error={error}
        searchPlaceholder='Search by user query...'
        searchKey='user_query'
        onRowClick={handleRowClick}
        confidenceFilter={confidenceFilter}
        onConfidenceFilterChange={setConfidenceFilter}
      />

      <ChatLogViewDialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog({ open, item: null })}
        chatLog={viewDialog.item}
      />
    </div>
  )
}

export default ChatLogsPage
