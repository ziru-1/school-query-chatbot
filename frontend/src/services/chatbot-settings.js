import { supabase } from '@/lib/supabase'

export const fetchChatbotSettings = async () => {
  const { data, error } = await supabase
    .from('chatbot_settings')
    .select('key, value, label')

  if (error)
    throw new Error(error.message || 'Unable to fetch chatbot settings')

  return Object.fromEntries(data.map((s) => [s.key, s]))
}

export const updateChatbotSetting = async ({ key, oldValue, newValue }) => {
  const { error } = await supabase
    .from('chatbot_settings')
    .update({ value: newValue })
    .eq('key', key)

  if (error) throw new Error(error.message)
}
