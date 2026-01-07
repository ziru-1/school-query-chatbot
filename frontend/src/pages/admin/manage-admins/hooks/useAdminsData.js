import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  resetAdminPassword,
  updateAdmin,
} from '@/services/manage-admins'
import { useAuthStore } from '@/stores/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const ADMINS_QUERY_KEY = ['admins']

export const useAdminsData = () => {
  const { session } = useAuthStore()

  return useQuery({
    queryKey: ADMINS_QUERY_KEY,
    queryFn: () => getAdmins(session.access_token),
    staleTime: 5 * 60 * 1000,
    enabled: !!session?.access_token,
  })
}

export const useAdminsMutations = () => {
  const queryClient = useQueryClient()
  const { session } = useAuthStore()

  const invalidateAdmins = () =>
    queryClient.invalidateQueries({ queryKey: ADMINS_QUERY_KEY })

  const createMutation = useMutation({
    mutationFn: (adminData) => createAdmin(session.access_token, adminData),
    onSuccess: invalidateAdmins,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }) =>
      updateAdmin(session.access_token, id, updates),
    onSuccess: invalidateAdmins,
  })

  const resetPasswordMutation = useMutation({
    mutationFn: ({ id, newPassword }) =>
      resetAdminPassword(session.access_token, id, newPassword),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAdmin(session.access_token, id),
    onSuccess: invalidateAdmins,
  })

  return {
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
