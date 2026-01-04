import { supabase } from '@/lib/supabase'

export const getLogs = async () => {
  const { data, error } = await supabase.from('qa_pair_logs').select(`
      *,
      actor_admin:admin_users (
        first_name,
        last_name
      )
    `)

  if (error) throw error

  const formatted = data.map((row) => ({
    id: row.id,
    action_type: row.action_type,
    vector_id: row.vector_id,
    qa_pair_id: row.qa_pair_id,
    source_suggestion_id: row.source_suggestion_id,
    old_question: row.old_question,
    old_answer: row.old_answer,
    new_question: row.new_question,
    new_answer: row.new_answer,
    created_at: row.created_at,
    updated_at: row.updated_at,
    actor_name: row.actor_admin
      ? `${row.actor_admin.first_name} ${row.actor_admin.last_name}`
      : 'Admin',
  }))

  return formatted
}
