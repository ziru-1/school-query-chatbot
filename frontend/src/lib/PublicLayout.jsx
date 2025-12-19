import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from './AuthContext'

const PublicLayout = () => {
  const { session, loading } = useAuth()

  if (loading) return null

  if (session) return <Navigate to='/admin' replace />

  return <Outlet />
}

export default PublicLayout
