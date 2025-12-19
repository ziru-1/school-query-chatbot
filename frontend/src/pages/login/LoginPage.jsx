import React, { useState } from 'react'
import Navbar from '../chat/Navbar'
import logo from '@/assets/temp-logo.png'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) return

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      navigate('/admin')
    } catch {
      toast.error('Invalid email or password')
    }
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex flex-1 items-center justify-center'>
        <div className='mb-30 space-y-2 rounded-lg p-12 shadow-lg'>
          <div className='flex justify-center'>
            <img
              src={logo}
              alt='Logo'
              className='h-10 w-10 rounded-2xl shadow'
            />
          </div>
          <h1 className='text-center text-2xl font-medium'>
            Log in to your account
          </h1>
          <p className='text-muted-foreground mb-5 text-center'>
            Welcome back! Please enter your details
          </p>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type='submit' className='mt-2 min-w-full'>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
