import { APP_NAME } from '@/config/appConfig'
import { useMeta } from '@/hooks/useMeta'
import QAFormDialog from '@/pages/admin/qa/components/QAFormDialog'
import { useQAMutations } from '@/pages/admin/qa/hooks/useQAData'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import DataTable from './components/DataTable'
import SuggestionViewDialog from './components/SuggestionViewDialog'
import {
  useSuggestionMutations,
  useSuggestionsData,
} from './hooks/useSuggestionsData'
import { createSuggestionsTableColumns } from './suggestionsTableColumns'

const SuggestionsPage = () => {
  useMeta({
    title: `Suggestions | Admin | ${APP_NAME}`,
    description: `Review and manage user-submitted suggestions in the ${APP_NAME} admin portal.`,
  })

  const { data = [], isLoading, error } = useSuggestionsData()
  const mutations = useSuggestionMutations()
  const qaMutations = useQAMutations()

  const [viewDialog, setViewDialog] = useState({ open: false, item: null })
  const [qaDialog, setQaDialog] = useState({ open: false, suggestion: null })
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortConfig, setSortConfig] = useState({
    field: 'created_at',
    order: 'desc',
  })

  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return data
    return data.filter((item) => item.status === statusFilter)
  }, [data, statusFilter])

  const sortedData = useMemo(() => {
    if (!filteredData.length) return filteredData
    return [...filteredData].sort((a, b) => {
      const aValue = new Date(a[sortConfig.field]).getTime()
      const bValue = new Date(b[sortConfig.field]).getTime()
      return sortConfig.order === 'desc' ? bValue - aValue : aValue - bValue
    })
  }, [filteredData, sortConfig])

  const handleSort = (field, order) => setSortConfig({ field, order })

  const handleRowClick = (item) => {
    if (mutations.updatingId === item.id) return
    setViewDialog({ open: true, item })
  }

  const handleStatusChange = async (id, newStatus) => {
    if (newStatus === 'accepted') {
      const suggestion = data.find((item) => item.id === id)
      setQaDialog({ open: true, suggestion })
      return
    }

    try {
      await mutations.update({ suggestionId: id, newStatus })
      toast.success(`Suggestion ${newStatus}`)
    } catch (error) {
      toast.error(`Failed to update status: ${error.message || error}`)
    }
  }

  const handleQASubmit = async ({ question, answer }) => {
    try {
      await qaMutations.create({ question, answer })
      await mutations.update({
        suggestionId: qaDialog.suggestion.id,
        newStatus: 'accepted',
      })
      toast.success('QA pair created and suggestion accepted')
      setQaDialog({ open: false, suggestion: null })
    } catch (error) {
      toast.error(error.message || 'Failed to create QA pair')
    }
  }

  const columns = createSuggestionsTableColumns({
    onStatusChange: handleStatusChange,
    sortConfig,
    onSort: handleSort,
    updatingId: mutations.updatingId,
  })

  return (
    <div className='min-w-full space-y-4 p-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-3xl font-bold'>Suggestions Management</h2>
          <p className='text-muted-foreground'>
            Review and manage user suggestions here.
          </p>
        </div>
      </div>

      <DataTable
        data={sortedData}
        columns={columns}
        isLoading={isLoading}
        error={error}
        searchPlaceholder='Filter by ID...'
        searchKey='id'
        onRowClick={handleRowClick}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <SuggestionViewDialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog({ open, item: null })}
        suggestion={viewDialog.item}
      />

      <QAFormDialog
        open={qaDialog.open}
        onOpenChange={(open) => setQaDialog({ open, suggestion: null })}
        onSubmit={handleQASubmit}
        initialData={
          qaDialog.suggestion
            ? { question: qaDialog.suggestion.question, answer: '' }
            : null
        }
        isSubmitting={qaMutations.isCreating}
        forceAdd
      />
    </div>
  )
}

export default SuggestionsPage
