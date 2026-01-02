/* import { getQA, createQA, updateQA, deleteQA } from '@/services/qa'
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

export const useQAMutations = () => {
  const queryClient = useQueryClient()
  const { session } = useAuthStore()

  const createMutation = useMutation({
    mutationFn: (newQA) => createQA(session.access_token, newQA),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QA_QUERY_KEY })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateQA(session.access_token, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QA_QUERY_KEY })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (ids) => {
  const idsArray = Array.isArray(ids) ? ids : [ids]
  
      await Promise.all(
        idsArray.map(id => deleteQA(session.access_token, id))
      )
},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QA_QUERY_KEY })
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

*/

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
  {
    id: 5,
    vector_id: 'vec_005',
    question: 'What is the virtual DOM?',
    answer:
      'The virtual DOM is a lightweight copy of the actual DOM that React uses to optimize updates.',
    created_at: '2024-01-19T16:00:00Z',
    updated_at: '2024-01-19T16:00:00Z',
  },
  {
    id: 6,
    vector_id: 'vec_006',
    question: 'What is useEffect?',
    answer:
      'useEffect is a Hook that lets you perform side effects in functional components.',
    created_at: '2024-01-20T13:30:00Z',
    updated_at: '2024-01-20T13:30:00Z',
  },
  {
    id: 7,
    vector_id: 'vec_007',
    question: 'What is component composition?',
    answer:
      'Component composition is combining multiple components to create more complex UIs.',
    created_at: '2024-01-21T10:00:00Z',
    updated_at: '2024-01-21T10:00:00Z',
  },
  {
    id: 8,
    vector_id: 'vec_008',
    question: 'What are React hooks?',
    answer:
      'Hooks are functions that let you use state and other React features in functional components.',
    created_at: '2024-01-22T15:20:00Z',
    updated_at: '2024-01-22T15:20:00Z',
  },
  {
    id: 9,
    vector_id: 'vec_009',
    question: 'What is the difference between state and props?',
    answer:
      'State is internal to a component and can change, while props are passed from parent components and are read-only.',
    created_at: '2024-01-23T12:00:00Z',
    updated_at: '2024-01-23T12:00:00Z',
  },
  {
    id: 10,
    vector_id: 'vec_010',
    question: 'What is a controlled component?',
    answer:
      'A controlled component is a form element whose value is controlled by React state.',
    created_at: '2024-01-24T09:30:00Z',
    updated_at: '2024-01-24T09:30:00Z',
  },
  {
    id: 11,
    vector_id: 'vec_011',
    question: 'What is an uncontrolled component?',
    answer:
      'An uncontrolled component is a form element that maintains its own internal state instead of being controlled by React.',
    created_at: '2024-01-25T11:00:00Z',
    updated_at: '2024-01-25T11:00:00Z',
  },
  {
    id: 12,
    vector_id: 'vec_012',
    question: 'What is context in React?',
    answer:
      'Context provides a way to pass data through the component tree without passing props down manually at every level.',
    created_at: '2024-01-26T14:15:00Z',
    updated_at: '2024-01-26T14:15:00Z',
  },
  {
    id: 13,
    vector_id: 'vec_013',
    question: 'What is React Router?',
    answer:
      'React Router is a library for routing in React applications, allowing navigation between views.',
    created_at: '2024-01-27T10:45:00Z',
    updated_at: '2024-01-27T10:45:00Z',
  },
  {
    id: 14,
    vector_id: 'vec_014',
    question: 'What is the difference between class and functional components?',
    answer:
      'Class components use ES6 classes and lifecycle methods, while functional components are simpler and use Hooks.',
    created_at: '2024-01-28T13:30:00Z',
    updated_at: '2024-01-28T13:30:00Z',
  },
  {
    id: 15,
    vector_id: 'vec_015',
    question: 'What is a higher-order component (HOC)?',
    answer:
      'A higher-order component is a function that takes a component and returns a new component with additional props or behavior.',
    created_at: '2024-01-29T09:00:00Z',
    updated_at: '2024-01-29T09:00:00Z',
  },
  {
    id: 16,
    vector_id: 'vec_016',
    question: 'What is React.memo?',
    answer:
      'React.memo is a higher-order component that prevents unnecessary re-renders by memoizing the component output.',
    created_at: '2024-01-30T15:20:00Z',
    updated_at: '2024-01-30T15:20:00Z',
  },
  {
    id: 17,
    vector_id: 'vec_017',
    question: 'What is the difference between useEffect and useLayoutEffect?',
    answer:
      'useEffect runs after the render is committed to the screen, while useLayoutEffect runs synchronously after all DOM mutations but before the browser paints.',
    created_at: '2024-01-31T12:10:00Z',
    updated_at: '2024-01-31T12:10:00Z',
  },
  {
    id: 18,
    vector_id: 'vec_018',
    question: 'What is React Suspense?',
    answer:
      'Suspense allows you to delay rendering a component tree until some condition, like data fetching, is met.',
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 19,
    vector_id: 'vec_019',
    question: 'What is lazy loading in React?',
    answer:
      'Lazy loading allows components to be loaded on demand, which can improve the performance of a React app.',
    created_at: '2024-02-02T11:45:00Z',
    updated_at: '2024-02-02T11:45:00Z',
  },
  {
    id: 20,
    vector_id: 'vec_020',
    question: 'What is the difference between React and ReactDOM?',
    answer:
      'React is the core library for building components, while ReactDOM handles rendering components to the DOM.',
    created_at: '2024-02-03T14:20:00Z',
    updated_at: '2024-02-03T14:20:00Z',
  },
  {
    id: 21,
    vector_id: 'vec_021',
    question: 'What is reconciliation in React?',
    answer:
      'Reconciliation is the process React uses to update the DOM efficiently by comparing the virtual DOM with the real DOM.',
    created_at: '2024-02-04T09:50:00Z',
    updated_at: '2024-02-04T09:50:00Z',
  },
  {
    id: 22,
    vector_id: 'vec_022',
    question: 'What is a key in React lists?',
    answer:
      'Keys are unique identifiers for list items that help React optimize rendering and updates.',
    created_at: '2024-02-05T13:15:00Z',
    updated_at: '2024-02-05T13:15:00Z',
  },
  {
    id: 23,
    vector_id: 'vec_023',
    question: 'What is prop drilling?',
    answer:
      'Prop drilling is the process of passing data from a parent component to deeply nested child components through props.',
    created_at: '2024-02-06T10:40:00Z',
    updated_at: '2024-02-06T10:40:00Z',
  },
  {
    id: 24,
    vector_id: 'vec_024',
    question:
      'What is the difference between stateful and stateless components?',
    answer:
      'Stateful components manage their own state, while stateless components rely only on props for rendering.',
    created_at: '2024-02-07T12:30:00Z',
    updated_at: '2024-02-07T12:30:00Z',
  },
  {
    id: 25,
    vector_id: 'vec_025',
    question: 'What is a React Fragment?',
    answer:
      'A Fragment lets you group multiple elements without adding extra nodes to the DOM.',
    created_at: '2024-02-08T11:00:00Z',
    updated_at: '2024-02-08T11:00:00Z',
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

      const idsToDelete = Array.isArray(ids) ? ids : [ids]

      queryClient.setQueryData(QA_QUERY_KEY, (old = []) =>
        old.filter((item) => !idsToDelete.includes(item.id)),
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
