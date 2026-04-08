import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

const fetchChatbotSettings = async () => {
  const { data, error } = await supabase
    .from('chatbot_settings')
    .select('key, value')

  if (error)
    throw new Error(error.message || 'Unable to fetch chatbot settings')

  return Object.fromEntries(data.map((s) => [s.key, s.value]))
}

export const useChatbotSettings = () => {
  return useQuery({
    queryKey: ['chatbot-settings'],
    queryFn: fetchChatbotSettings,
  })
}
