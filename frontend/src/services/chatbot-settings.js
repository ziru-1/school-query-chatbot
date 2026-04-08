import { supabase } from '@/lib/supabase'

export const getChatbotSettings = async () => {
  const { data, error } = await supabase
    .from('chatbot_settings')
    .select('key, value, label')

  if (error)
    throw new Error(error.message || 'Unable to fetch chatbot settings')

  return data
}
