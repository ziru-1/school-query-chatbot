import { supabase } from '@/lib/supabase'

export const getSuggestions = async () => {
  const { data, error } = await supabase
    .from('question_suggestions')
    .select('*')

  if (error) throw error

  return data
}

export const updateSuggestionStatus = async (suggestionId, newStatus) => {
  const { data, error } = await supabase
    .from('question_suggestions')
    .update({ status: newStatus })
    .eq('id', suggestionId)
    .select()
    .single()

  if (error) throw error

  return data
}
