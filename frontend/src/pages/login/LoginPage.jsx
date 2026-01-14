import React from 'react'
import Navbar from './Navbar'
import LoginForm from './LoginForm'

const LoginPage = () => {
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
