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

export default router
