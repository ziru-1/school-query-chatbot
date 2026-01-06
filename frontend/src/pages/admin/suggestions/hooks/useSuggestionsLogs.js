import { getSuggestionsLogs } from '@/services/logs'
import { useQuery } from '@tanstack/react-query'

export const SUGGESTION_LOGS_QUERY_KEY = ['suggestion_logs']

export const useSuggestionsLogs = () => {
  return useQuery({
    queryKey: SUGGESTION_LOGS_QUERY_KEY,
    queryFn: async () => {
      const data = await getSuggestionsLogs()
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}
