import React from 'react'
import logo from '../../assets/temp-logo.png'
import { Link } from 'react-router'
import { Lightbulb } from 'lucide-react'

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between border-b border-black/10 bg-white/80 px-6 py-4 backdrop-blur-md'>
      <Link to='/' className='transition-opacity hover:opacity-80'>
        <img src={logo} alt='Logo' className='h-10 w-10 rounded-2xl shadow' />
      </Link>

      <button className='text-muted-foreground transition-color cursor-pointer rounded-2xl p-2 shadow hover:bg-gray-100 hover:text-blue-500'>
        <Lightbulb className='h-6 w-6' />
      </button>
    </header>
  )
}

export default Navbar
