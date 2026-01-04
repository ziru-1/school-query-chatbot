import { getLogs } from '@/services/logs'
import { useQuery } from '@tanstack/react-query'

const QA_LOGS_QUERY_KEY = ['logs']

export const useQALogs = () => {
  return useQuery({
    queryKey: QA_LOGS_QUERY_KEY,
    queryFn: async () => {
      const data = await getLogs()
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}
