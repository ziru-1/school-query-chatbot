import { supabase } from '../lib/supabase.js'

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ error: 'No token provided' })

    const token = authHeader.split(' ')[1]

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) return res.status(401).json({ error: 'Invalid token' })

    // check if user exists in admin_users table
    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single()

    if (adminError || !admin)
      return res.status(403).json({ error: 'Not an admin' })

    req.admin = admin // attach admin info to request
    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

export const verifySuperAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ error: 'No token provided' })

    const token = authHeader.split(' ')[1]

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) return res.status(401).json({ error: 'Invalid token' })

    // check if user exists in admin_users table and is superadmin
    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single()

    if (adminError || !admin || admin.role !== 'super_admin') {
      return res.status(403).json({ error: 'Not allowed' })
    }

    req.admin = admin // attach admin info to request
    next()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
