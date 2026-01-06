import { supabase } from '@/lib/supabase'

export const getQALogs = async () => {
  const { data, error } = await supabase.from('qa_pair_logs').select(`
      *,
      actor_admin:admin_users (
        first_name,
        last_name
      )
    `)

  if (error) throw error

  const formatted = data.map(({ actor_admin, ...row }) => ({
    ...row,
    actor_name: actor_admin
      ? `${actor_admin.first_name} ${actor_admin.last_name}`
      : 'Admin',
  }))

  return formatted
}

export const getSuggestionsLogs = async () => {
  const { data, error } = await supabase.from('question_suggestion_status_logs')
    .select(`
      id,
      question_suggestion_id,
      old_status,
      new_status,
      changed_at,
      question_suggestions!question_suggestion_id (
        question
      ),
      admin_users!changed_by (
        first_name,
        last_name
      )
    `)

  if (error) throw error

  const formatted = data.map((row) => ({
    id: row.id,
    question_suggestion_id: row.question_suggestion_id,
    question: row.question_suggestions?.question ?? null,
    old_status: row.old_status,
    new_status: row.new_status,
    actor_name: row.admin_users
      ? `${row.admin_users.first_name} ${row.admin_users.last_name}`
      : 'Admin',
    changed_at: row.changed_at,
  }))

  return formatted
}
