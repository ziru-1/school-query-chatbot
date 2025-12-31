import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'

const Dashboard = () => {
  const { session, loading } = useAuthStore()

  useEffect(() => {
    console.log('Session:', session)
    console.log('Loading:', loading)
  }, [session, loading])

  return <div>Dashboard</div>
}

export default Dashboard
