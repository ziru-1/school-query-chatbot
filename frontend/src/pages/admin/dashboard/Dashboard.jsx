import { useAuthStore } from '@/stores/authStore'
import { useEffect } from 'react'
import { useDashboardData } from './hooks/useDashboardData'

const Dashboard = () => {
  const { data = [], isLoading, error } = useDashboardData()
  const { session, loading } = useAuthStore()

  useEffect(() => {
    console.log('data', data)
    console.log('Session:', session)
    console.log('Loading:', loading)
  }, [session, loading, data])

  return <div>Dashboard</div>
}

export default Dashboard
