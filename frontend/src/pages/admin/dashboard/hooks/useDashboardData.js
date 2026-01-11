import { getDashboardData } from '@/services/dashboard'
import { useAuthStore } from '@/stores/authStore'
import { useQuery } from '@tanstack/react-query'

export const DASHBOARD_QUERY_KEY = ['dashboard']

export const useDashboardData = () => {
  const { session } = useAuthStore()

  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: () => getDashboardData(session.access_token),
    staleTime: 5 * 60 * 1000,
    enabled: !!session?.access_token,
  })
}
