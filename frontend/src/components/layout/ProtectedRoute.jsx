import { useAuthStore } from '@/stores/authStore'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuthStore()

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to='/admin/dashboard' replace />
  }

  return children
}

export default ProtectedRoute
