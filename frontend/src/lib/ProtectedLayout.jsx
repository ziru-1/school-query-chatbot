import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from './AuthContext'

const ProtectedLayout = () => {
  const { session, loading } = useAuth()

  if (loading) return null

  if (!session) return <Navigate to='/login' replace />

  return <Outlet />
}

export default ProtectedLayout
