import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

export const AuthInitializer = ({ children }) => {
  const initAuth = useAuthStore((state) => state.initAuth)

  useEffect(() => {
    const cleanup = initAuth()
    return cleanup
  }, [initAuth])

  return children
}
