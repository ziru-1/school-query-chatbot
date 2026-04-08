import {
  fetchChatbotSettings,
  updateChatbotSetting,
} from '@/services/chatbot-settings'
import { useAuthStore } from '@/stores/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CHATBOT_SETTINGS_QUERY_KEY }),
  })

  return {
    update: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  }
}
