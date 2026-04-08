import {
  fetchChatbotSettings,
  updateChatbotSetting,
} from '@/services/chatbot-settings'
import { useAuthStore } from '@/stores/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CHATBOT_SETTINGS_LOGS_QUERY_KEY } from './useChatbotSettingsLogs'

export const CHATBOT_SETTINGS_QUERY_KEY = ['chatbot-settings']

export const useChatbotSettings = () => {
  return useQuery({
    queryKey: CHATBOT_SETTINGS_QUERY_KEY,
    queryFn: fetchChatbotSettings,
    staleTime: 5 * 60 * 1000,
  })
}

export const useChatbotSettingsMutations = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()

  const updateMutation = useMutation({
    mutationFn: (payload) =>
      updateChatbotSetting({ ...payload, changedBy: user.auth_user_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHATBOT_SETTINGS_QUERY_KEY })
      queryClient.invalidateQueries({
        queryKey: CHATBOT_SETTINGS_LOGS_QUERY_KEY,
      })
    },
  })

  return {
    update: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  }
}
