import { useAuthStore } from '@/stores/authStore'
import { Navigate, Outlet } from 'react-router'

const PublicLayout = () => {
  const { session, loading } = useAuthStore()

  if (loading) return null

  if (session) return <Navigate to='/admin/dashboard' replace />

  return <Outlet />
}

export default PublicLayout
