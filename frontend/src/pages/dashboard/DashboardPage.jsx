import React, { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router'

const DashboardPage = () => {
  const navigate = useNavigate()

  const handleClick = async () => {
    await supabase.auth.signOut()
    console.log('signed out')
    navigate('/login')
  }

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log(session)
    }

    getSession()
  }, [])

  return (
    <div>
      DashboardPage
      <button onClick={handleClick}>Sign out</button>
    </div>
  )
}

export default DashboardPage
