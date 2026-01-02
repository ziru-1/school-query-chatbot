import { getQA } from '@/services/qa'
import { useAuthStore } from '@/stores/authStore'
import { capitalizeFirstLetter } from '@/utils/stringUtils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const QA_QUERY_KEY = ['qa']

// Format QA data consistently
const formatQAItem = (item) => ({
  ...item,
  question: capitalizeFirstLetter(item.question),
  answer: capitalizeFirstLetter(item.answer),
})

export const useQAData = () => {
  const { session } = useAuthStore()

  return useQuery({
    queryKey: QA_QUERY_KEY,
    queryFn: async () => {
      const data = await getQA(session.access_token)
      return data.map(formatQAItem)
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  })
}

// export const useQAMutations = () => {
//   const queryClient = useQueryClient()
//   const { session } = useAuthStore()

//   const createMutation = useMutation({
//     mutationFn: (newQA) => createQA(session.access_token, newQA),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QA_QUERY_KEY })
//     },
//   })

//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }) => updateQA(session.access_token, id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QA_QUERY_KEY })
//     },
//   })

//   const deleteMutation = useMutation({
//     mutationFn: (ids) => deleteQA(session.access_token, ids),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QA_QUERY_KEY })
//     },
//   })

//   return {
//     create: createMutation.mutate,
//     update: updateMutation.mutate,
//     delete: deleteMutation.mutate,
//     isCreating: createMutation.isPending,
//     isUpdating: updateMutation.isPending,
//     isDeleting: deleteMutation.isPending,
//   }
// }
