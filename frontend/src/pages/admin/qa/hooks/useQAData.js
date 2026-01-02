// import { getQA, createQA, updateQA, deleteQA } from '@/services/qa'
// import { useAuthStore } from '@/stores/authStore'
// import { capitalizeFirstLetter } from '@/utils/stringUtils'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// const QA_QUERY_KEY = ['qa']

// // Format QA data consistently
// const formatQAItem = (item) => ({
//   ...item,
//   question: capitalizeFirstLetter(item.question),
//   answer: capitalizeFirstLetter(item.answer),
// })

// export const useQAData = () => {
//   const { session } = useAuthStore()

//   return useQuery({
//     queryKey: QA_QUERY_KEY,
//     queryFn: async () => {
//       const data = await getQA(session.access_token)
//       return data.map(formatQAItem)
//     },
//     staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
//   })
// }

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

import { getQA, createQA, updateQA, deleteQA } from '@/services/qa'
import { useAuthStore } from '@/stores/authStore'
import { capitalizeFirstLetter } from '@/utils/stringUtils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const mockQAData = [
  {
    id: 1,
    vector_id: 'vec_001',
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces.',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    vector_id: 'vec_002',
    question: 'How does useState work?',
    answer:
      'useState is a Hook that lets you add state to functional components.',
    created_at: '2024-01-16T14:20:00Z',
    updated_at: '2024-01-16T14:20:00Z',
  },
  {
    id: 3,
    vector_id: 'vec_003',
    question: 'What is JSX?',
    answer:
      'JSX is a syntax extension for JavaScript that looks similar to HTML.',
    created_at: '2024-01-17T09:15:00Z',
    updated_at: '2024-01-17T09:15:00Z',
  },
  {
    id: 4,
    vector_id: 'vec_004',
    question: 'What are props in React?',
    answer:
      'Props are arguments passed into React components, similar to function parameters.',
    created_at: '2024-01-18T11:45:00Z',
    updated_at: '2024-01-18T11:45:00Z',
  },
]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const QA_QUERY_KEY = ['qa']

// Toggle this when backend is ready
const USE_MOCK_DATA = true

// Format QA data consistently
const formatQAItem = (item) => ({
  ...item,
  question: capitalizeFirstLetter(item.question),
  answer: capitalizeFirstLetter(item.answer),
})

/* =======================
   QUERY
======================= */
export const useQAData = () => {
  const { session } = useAuthStore()

  return useQuery({
    queryKey: QA_QUERY_KEY,
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        return mockQAData.map(formatQAItem)
      }

      const data = await getQA(session.access_token)
      return data.map(formatQAItem)
    },
    initialData: USE_MOCK_DATA ? mockQAData.map(formatQAItem) : undefined,
    staleTime: 5 * 60 * 1000,
  })
}

/* =======================
   MUTATIONS (MOCK)
======================= */
export const useQAMutations = () => {
  const queryClient = useQueryClient()
  const { session } = useAuthStore()

  const createMutation = useMutation({
    mutationFn: async (newQA) => {
      if (!USE_MOCK_DATA) {
        return createQA(session.access_token, newQA)
      }

      await sleep(2000)

      const newItem = {
        ...newQA,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      queryClient.setQueryData(QA_QUERY_KEY, (old = []) => [
        ...old,
        formatQAItem(newItem),
      ])

      return newItem
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      if (!USE_MOCK_DATA) {
        return updateQA(session.access_token, id, data)
      }

      await sleep(2000)

      queryClient.setQueryData(QA_QUERY_KEY, (old = []) =>
        old.map((item) =>
          item.id === id
            ? formatQAItem({
                ...item,
                ...data,
                updated_at: new Date().toISOString(),
              })
            : item,
        ),
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (ids) => {
      if (!USE_MOCK_DATA) {
        return deleteQA(session.access_token, ids)
      }

      queryClient.setQueryData(QA_QUERY_KEY, (old = []) =>
        old.filter((item) => !ids.includes(item.id)),
      )
    },
  })

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
