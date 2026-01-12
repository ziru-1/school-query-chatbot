import { Loader2 } from 'lucide-react'

const DashboardLoading = () => {
  return (
    <div className='flex h-[calc(100vh-80px)] items-center justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin' />
        <p className='text-muted-foreground text-sm'>Loading dashboard...</p>
      </div>
    </div>
  )
}

export default DashboardLoading
