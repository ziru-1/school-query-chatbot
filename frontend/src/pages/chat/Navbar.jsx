import React from 'react'
import logo from '../../assets/temp-logo.png'
import { Link } from 'react-router'
import SuggestionModal from './SuggestionModal'

const Navbar = () => {
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between border-b border-black/10 bg-white/80 px-6 py-4 backdrop-blur-md'>
      <Link to='/' className='transition-opacity hover:opacity-80'>
        <img src={logo} alt='Logo' className='h-10 w-10 rounded-2xl shadow' />
      </Link>

      <SuggestionModal />
    </header>
  )
}

export default Navbar
