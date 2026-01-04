import { createQA, deleteQA, getQA, updateQA } from '@/services/qa'
import { useAuthStore } from '@/stores/authStore'
import { capitalizeFirstLetter } from '@/utils/stringUtils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QA_LOGS_QUERY_KEY } from './useQALogs'

const QA_QUERY_KEY = ['qa']

const formatQAItem = (item) => ({
  ...item,
  question: capitalizeFirstLetter(item.question),
  answer: capitalizeFirstLetter(item.answer),
})

export const useQAData = () => {
  const { session } = useAuthStore()

  return useQuery({
    queryKey: QA_QUERY_KEY,
    queryFn: async () => {
      const data = await getQA(session.access_token)
      return data.map(formatQAItem)
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  })
}

export const useQAMutations = () => {
  const queryClient = useQueryClient()
  const { session } = useAuthStore()

  const createMutation = useMutation({
    mutationFn: (newQA) => createQA(session.access_token, newQA),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QA_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: QA_LOGS_QUERY_KEY })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateQA(session.access_token, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QA_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: QA_LOGS_QUERY_KEY })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (ids) => {
      const idsArray = Array.isArray(ids) ? ids : [ids]

      await Promise.all(
        idsArray.map((id) => deleteQA(session.access_token, id)),
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QA_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: QA_LOGS_QUERY_KEY })
    },
  })

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
