import React from 'react'
import Logo from '@/components/ui/Logo'
import { Link } from 'react-router'
import SuggestionModal from './SuggestionModal'

const Navbar = () => {
  return (
    <header className='bg-background border-foreground/10 sticky top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md'>
      <Link to='/' className='transition-opacity hover:opacity-80'>
        <Logo />
      </Link>

      <SuggestionModal />
    </header>
  )
}

export default Navbar
