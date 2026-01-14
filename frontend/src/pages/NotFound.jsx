import { useMeta } from '@/hooks/useMeta'
import { AlertCircle } from 'lucide-react'
import { Link } from 'react-router'

const NotFound = () => {
  useMeta({
    title: '404 Page Not Found',
    description:
      'Oops! The page you are looking for does not exist. Return to Home or Chat.',
  })

  return (
    <div className='bg-background flex min-h-screen w-full items-center justify-center'>
      <div className='shadow-foreground/10 mx-4 mb-20 w-full max-w-md rounded-2xl shadow-lg'>
        <div className='p-6'>
          <div className='mb-4 flex justify-start gap-3'>
            <AlertCircle className='text-destructive h-8 w-8' />
            <h1 className='text-foreground text-2xl font-bold'>
              404 Page Not Found
            </h1>
          </div>

          <p className='text-muted-foreground mt-4 text-sm'>
            The page you’re looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <div className='mt-6 flex flex-col gap-3'>
            <Link
              to='/'
              className='w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700'
            >
              Go to Home
            </Link>

            <Link
              to='/chat'
              className='w-full rounded-lg bg-gray-200 px-4 py-2 text-center text-gray-800 transition hover:bg-gray-300'
            >
              Go to Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
