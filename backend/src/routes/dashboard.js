import express from 'express'
import { supabase } from '../lib/supabase.js'
import { verifyAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/metrics', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.rpc('get_dashboard_metrics')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

router.get('/recent-suggestions', verifyAdmin, async (req, res) => {
  const rawLimit = parseInt(req.query.limit, 10)
  const limit = Number.isInteger(rawLimit)
    ? Math.min(Math.max(rawLimit, 1), 100)
    : 10

  const { data, error } = await supabase
    .from('question_suggestions')
    .select('id, question, context, status, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

router.get('/recent-qa-activity', verifyAdmin, async (req, res) => {
  const rawLimit = parseInt(req.query.limit, 10)
  const limit = Number.isInteger(rawLimit)
    ? Math.min(Math.max(rawLimit, 1), 100)
    : 10

  const { data, error } = await supabase
    .from('qa_pair_logs')
    .select(
      `
        id,
        action_type,
        new_question,
        created_at,
        admin_users!actor_admin_id (
          first_name,
          last_name
        )
      `
    )
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const formatted = data.map((item) => ({
    id: item.id,
    action_type: item.action_type,
    new_question: item.new_question,
    created_at: item.created_at,
    admin_name: item.admin_users
      ? `${item.admin_users.first_name} ${item.admin_users.last_name}`
      : 'Unknown',
  }))

  console.log(formatted)

  res.json(formatted)
})

export default router
