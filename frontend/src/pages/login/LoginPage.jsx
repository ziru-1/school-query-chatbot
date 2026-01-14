import { useMeta } from '@/hooks/useMeta'
import LoginForm from './LoginForm'
import Navbar from './Navbar'

const LoginPage = () => {
  useMeta({
    title: 'Login | Vivy AI',
    description:
      'Login to the Vivy AI admin portal to manage Q&A, user suggestions, and chat logs.',
  })

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex flex-1 items-center justify-center'>
        <LoginForm />
      </main>
    </div>
  )
}

export default LoginPage
