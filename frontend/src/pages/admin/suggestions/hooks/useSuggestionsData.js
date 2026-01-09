import { getSuggestions, updateSuggestionStatus } from '@/services/suggestions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SUGGESTION_LOGS_QUERY_KEY } from './useSuggestionsLogs'
import { useState } from 'react'

export const SUGGESTIONS_QUERY_KEY = ['suggestions']

export const useSuggestionsData = () => {
  return useQuery({
    queryKey: SUGGESTIONS_QUERY_KEY,
    queryFn: async () => {
      const data = await getSuggestions()
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useSuggestionMutations = () => {
  const queryClient = useQueryClient()
  const [updatingId, setUpdatingId] = useState(null)

  const updateMutation = useMutation({
    mutationFn: async ({ suggestionId, newStatus }) => {
      setUpdatingId(suggestionId)
      return await updateSuggestionStatus(suggestionId, newStatus)
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: SUGGESTIONS_QUERY_KEY })
      await queryClient.refetchQueries({ queryKey: SUGGESTION_LOGS_QUERY_KEY })
      setUpdatingId(null)
    },
    onError: () => {
      setUpdatingId(null)
    },
  })

  return {
    update: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    updatingId,
  }
}
