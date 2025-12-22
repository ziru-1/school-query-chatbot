import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

const Dashboard = () => {
  const { session, loading } = useAuth()

  useEffect(() => {
    console.log('Session:', session)
    console.log('Loading:', loading)
  }, [session, loading])

  return <div>Dashboard</div>
}

export default Dashboard
