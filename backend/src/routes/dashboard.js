import express from 'express'
import { supabase } from '../lib/supabase.js'
import { verifyAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyAdmin, async (req, res) => {
  const { data, error } = await supabase.rpc('get_dashboard_data', {
    suggestions_limit: parseInt(req.query.suggestionsLimit) || 10,
    activity_limit: parseInt(req.query.activityLimit) || 10,
    low_conf_limit: parseInt(req.query.lowConfLimit) || 10,
    confidence_threshold: parseFloat(req.query.threshold) || 0.55,
    chat_days: parseInt(req.query.days) || 30,
  })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

export default router
