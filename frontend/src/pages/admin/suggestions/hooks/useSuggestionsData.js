import { getSuggestions } from '@/services/suggestions'
import { useQuery } from '@tanstack/react-query'

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
