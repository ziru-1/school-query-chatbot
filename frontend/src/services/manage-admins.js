import { supabase } from '@/lib/supabase'

export const getAdmins = async () => {
  const { data, error } = await supabase.from('admin_users').select('*')

  if (error) throw error

  return data
}
