import { AlertTriangle } from 'lucide-react'

const DashboardError = () => {
  return (
    <div className='flex h-[calc(100vh-80px)] items-center justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <AlertTriangle className='text-destructive h-8 w-8' />
        <p className='text-destructive text-sm'>
          Failed to load dashboard data
        </p>
      </div>
    </div>
  )
}

export default DashboardError
