import express from 'express'
import { supabase } from '../lib/supabase.js'
import { verifyAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyAdmin, async (req, res) => {
  const { data: settings } = await supabase
    .from('chatbot_settings')
    .select('key, value')

  const thresholds = Object.fromEntries(
    (settings || []).map((s) => [s.key, s.value]),
  )

  const { data, error } = await supabase.rpc('get_dashboard_data', {
    suggestions_limit: parseInt(req.query.suggestionsLimit) || 10,
    activity_limit: parseInt(req.query.activityLimit) || 10,
    low_conf_limit: parseInt(req.query.lowConfLimit) || 10,
    confidence_threshold: thresholds.high_threshold ?? 0.55,
    chat_days: parseInt(req.query.days) || 30,
    faq_threshold: thresholds.high_threshold ?? 0.55,
    faq_limit: parseInt(req.query.faqLimit) || 10,
  })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

export default router
