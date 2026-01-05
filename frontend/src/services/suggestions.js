import { supabase } from '@/lib/supabase'

export const getSuggestions = async () => {
  const { data, error } = await supabase
    .from('question_suggestions')
    .select('*')

  if (error) throw error

  return data
}
