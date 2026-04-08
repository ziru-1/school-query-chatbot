import { supabase } from '@/lib/supabase'

export const fetchChatbotSettings = async () => {
  const { data, error } = await supabase
    .from('chatbot_settings')
    .select('key, value, label')

  if (error)
    throw new Error(error.message || 'Unable to fetch chatbot settings')

  return Object.fromEntries(data.map((s) => [s.key, s]))
}

export const updateChatbotSetting = async ({
  key,
  oldValue,
  newValue,
  changedBy,
}) => {
  const { error: updateError } = await supabase
    .from('chatbot_settings')
    .update({ value: newValue })
    .eq('key', key)

  if (updateError) throw new Error(updateError.message)

  const { error: logError } = await supabase
    .from('chatbot_settings_logs')
    .insert({
      setting_key: key,
      old_value: oldValue,
      new_value: newValue,
      changed_by: changedBy,
    })

  if (logError) throw new Error(logError.message)
}
