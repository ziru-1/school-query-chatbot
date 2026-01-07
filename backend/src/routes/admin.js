import express from 'express'
import { supabase } from '../lib/supabase.js'
import { verifySuperAdmin } from '../middleware/auth.js'

const router = express.Router()

const ALLOWED_ROLES = ['admin', 'superadmin']

router.get('/', verifySuperAdmin, async (req, res) => {
  const { data, error } = await supabase.from('admin_users').select('*')

  if (error) return res.status(500).json({ error: error.message })

  res.json(data)
})

router.post('/', verifySuperAdmin, async (req, res) => {
  const { email, password, first_name, last_name, role, department } = req.body

  if (
    !email ||
    !password ||
    !first_name ||
    !last_name ||
    !role ||
    !department
  ) {
    return res.status(400).json({
      error:
        'email, password, first_name, last_name, role, and department are required',
    })
  }

  if (!ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({
      error: `Invalid role. Allowed roles: ${ALLOWED_ROLES.join(', ')}`,
    })
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long',
    })
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const { error: dbError } = await supabase.from('admin_users').insert({
    auth_user_id: data.user.id,
    email: data.user.email,
    first_name,
    last_name,
    role,
    department: department,
  })

  if (dbError) {
    // rollback auth user if DB insert fails
    await supabase.auth.admin.deleteUser(data.user.id)
    return res.status(500).json({ error: dbError.message })
  }

  res.status(201).json({
    success: true,
    admin: {
      id: data.user.id,
      email: data.user.email,
      first_name,
      last_name,
      role,
      department,
    },
  })
})

router.patch('/:id/reset-password', verifySuperAdmin, async (req, res) => {
  const { newPassword } = req.body

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({
      error: 'New password must be at least 8 characters long',
    })
  }

  const { error } = await supabase.auth.admin.updateUserById(req.params.id, {
    password: newPassword,
  })

  if (error) return res.status(500).json({ error: error.message })

  res.json({ success: true, message: 'Password reset successfully' })
})

router.patch('/:id', verifySuperAdmin, async (req, res) => {
  const { id } = req.params
  const { first_name, last_name, role, department } = req.body

  if (role && !ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({
      error: `Invalid role. Allowed roles: ${ALLOWED_ROLES.join(', ')}`,
    })
  }

  if (!first_name && !last_name && !role && !department) {
    return res.status(400).json({
      error: 'At least one field must be provided for update',
    })
  }

  // prevent superadmin from demoting themselves
  if (req.user?.id === id && role && role !== 'superadmin') {
    return res.status(400).json({
      error: 'You cannot change your own role',
    })
  }

  const updates = {}
  if (first_name) updates.first_name = first_name
  if (last_name) updates.last_name = last_name
  if (role) updates.role = role
  if (department !== undefined) updates.department = department

  const { data, error } = await supabase
    .from('admin_users')
    .update(updates)
    .eq('auth_user_id', id)
    .select('auth_user_id, first_name, last_name, email, role, department')
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  if (!data) {
    return res.status(404).json({ error: 'Admin not found' })
  }

  res.json({
    success: true,
    admin: data,
  })
})

router.delete('/:id', verifySuperAdmin, async (req, res) => {
  // Prevent superadmin from deleting themselves
  if (req.user?.id === req.params.id) {
    return res.status(400).json({
      error: 'You cannot delete your own account',
    })
  }

  const { error: authError } = await supabase.auth.admin.deleteUser(
    req.params.id
  )

  if (authError) {
    return res.status(500).json({ error: authError.message })
  }

  const { error: dbError } = await supabase
    .from('admin_users')
    .delete()
    .eq('auth_user_id', req.params.id)

  if (dbError) {
    return res.status(500).json({ error: dbError.message })
  }

  res.json({ success: true, message: 'Admin deleted successfully' })
})

export default router
