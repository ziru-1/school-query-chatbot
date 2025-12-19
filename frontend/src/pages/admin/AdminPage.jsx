import React, { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router'
import { useAuth } from '@/lib/AuthContext'

const AdminPage = () => {
  const { session, loading } = useAuth()
  const navigate = useNavigate()

  const handleClick = async () => {
    await supabase.auth.signOut()
    console.log('signed out')
    navigate('/login')
  }

  useEffect(() => {
    console.log('Session:', session)
    console.log('Loading:', loading)
  }, [session, loading])

  return (
    <div>
      Admin
      <button onClick={handleClick}>Sign out</button>
    </div>
  )
}

export default AdminPage
