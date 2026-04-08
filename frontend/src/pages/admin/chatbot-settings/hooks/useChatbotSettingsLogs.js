import { fetchChatbotSettingsLogs } from '@/services/logs'
import { useQuery } from '@tanstack/react-query'

export const CHATBOT_SETTINGS_LOGS_QUERY_KEY = ['chatbot-settings-logs']

export const useChatbotSettingsLogs = () => {
  return useQuery({
    queryKey: CHATBOT_SETTINGS_LOGS_QUERY_KEY,
    queryFn: fetchChatbotSettingsLogs,
    staleTime: 5 * 60 * 1000,
  })
}
