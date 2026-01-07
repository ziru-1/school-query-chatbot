import { getAdmins } from '@/services/manage-admins'
import { useQuery } from '@tanstack/react-query'

export const ADMINS_QUERY_KEY = ['admins']

export const useAdminsData = () => {
  return useQuery({
    queryKey: ADMINS_QUERY_KEY,
    queryFn: async () => {
      const data = await getAdmins()
      return data
    },
    staleTime: 5 * 60 * 1000,
  })
}
