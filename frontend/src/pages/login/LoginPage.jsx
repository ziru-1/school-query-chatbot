import { APP_NAME } from '@/config/appConfig'
import { useMeta } from '@/hooks/useMeta'
import LoginForm from './LoginForm'
import Navbar from './Navbar'

const LoginPage = () => {
  useMeta({
    title: `Login | ${APP_NAME}`,
    description: `Login to the ${APP_NAME} admin portal to manage Q&A, user suggestions, and chat logs.`,
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
