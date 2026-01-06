import { getQALogs } from '@/services/logs'
import { useQuery } from '@tanstack/react-query'

export const QA_LOGS_QUERY_KEY = ['logs']

export const useQALogs = () => {
  return useQuery({
    queryKey: QA_LOGS_QUERY_KEY,
    queryFn: async () => {
      const data = await getQALogs()
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}
