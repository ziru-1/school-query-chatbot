import express from 'express'
import { supabase } from '../lib/supabase.js'
import { verifySuperAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifySuperAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('admin_users')
    .select('auth_user_id, email, role, created_at')

  if (error) return res.status(500).json({ error: error.message })

  res.json(data)
})

router.post('/', verifySuperAdmin, async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) return res.status(500).json({ error: error.message })

  await supabase.from('admin_users').insert({
    auth_user_id: data.user.id,
    email: data.user.email,
    role: 'admin',
  })

  res.json({ success: true, admin: data.user })
})

router.patch('/:id/reset-password', verifySuperAdmin, async (req, res) => {
  const { newPassword } = req.body

  const { data, error } = await supabase.auth.admin.updateUserById(
    req.params.id,
    { password: newPassword }
  )

  if (error) return res.status(500).json({ error: error.message })

  res.json({ success: true, message: 'Password reset' })
})

router.delete('/:id', verifySuperAdmin, async (req, res) => {
  const { error: authError } = await supabase.auth.admin.deleteUser(
    req.params.id
  )

  if (authError) return res.status(500).json({ error: authError.message })

  await supabase.from('admin_users').delete().eq('auth_user_id', req.params.id)

  res.json({ success: true, message: 'Admin deleted' })
})

export default router
