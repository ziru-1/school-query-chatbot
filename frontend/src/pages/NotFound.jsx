import React from 'react'
import { AlertCircle } from 'lucide-react'

const NotFound = () => {
  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-gray-50'>
      <div className='mx-4 mb-20 w-full max-w-md rounded-2xl shadow-lg'>
        <div className='p-6'>
          <div className='mb-4 flex justify-start gap-3'>
            <AlertCircle className='h-8 w-8 text-red-500' />
            <h1 className='text-2xl font-bold text-gray-900'>
              404 Page Not Found
            </h1>
          </div>

          <p className='mt-4 text-sm text-gray-600'>
            The page you’re looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
