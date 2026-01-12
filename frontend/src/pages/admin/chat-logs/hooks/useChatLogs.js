import { getChatLogs } from '@/services/logs'
import { useQuery } from '@tanstack/react-query'

export const CHAT_LOGS_QUERY_KEY = ['chat-logs']

export const useChatLogs = () => {
  return useQuery({
    queryKey: CHAT_LOGS_QUERY_KEY,
    queryFn: async () => {
      const data = await getChatLogs()
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}
