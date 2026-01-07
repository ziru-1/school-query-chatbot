import { supabase } from '@/lib/supabase'

export const getAdmins = async () => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('role', 'admin')

  if (error) throw error

  return data
}
