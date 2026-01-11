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

export default router
