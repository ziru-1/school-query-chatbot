import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/Logo'
import { useThemeStore } from '@/stores/themeStore'
import { useState } from 'react'
import { Link } from 'react-router'
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Menu, Moon, Sun, X } from 'lucide-react'

const Navbar = () => {
  const { isDark, toggleDark } = useThemeStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <nav className='bg-background/80 border-border fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md'>
      <div className='flex h-20 max-w-full items-center justify-between px-6'>
        <Link to='/' className='flex items-center gap-2'>
          <Logo />
          <span className='text-xl font-bold tracking-tight'>Vivy AI</span>
        </Link>

        {/* Desktop Links */}
        <div className='hidden items-center gap-8 md:flex'>
          <a
            href='#features'
            className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
          >
            Features
          </a>
          <a
            href='#how-it-works'
            className='text-muted-foreground hover:text-foreground text-sm font-medium transition-colors'
          >
            How it Works
          </a>
          <Button
            onClick={toggleDark}
            variant='ghost'
            size='icon'
            className='rounded-full'
            aria-label='Toggle dark mode'
          >
            {isDark ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
          <Link to='/chat'>
            <Button className='gap-2'>
              Start Asking
              <ChevronRight className='h-4 w-4' />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='flex items-center gap-2 md:hidden'>
          <Button
            onClick={toggleDark}
            variant='ghost'
            size='icon'
            className='rounded-full'
          >
            {isDark ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
          <button
            className='text-muted-foreground hover:text-foreground'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='bg-background border-border overflow-hidden border-b md:hidden'
          >
            <div className='flex flex-col gap-4 px-6 py-4'>
              <a
                href='#features'
                className='text-muted-foreground hover:text-foreground'
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href='#how-it-works'
                className='text-muted-foreground hover:text-foreground'
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </a>
              <div className='bg-border my-2 h-px'></div>
              <Link to='/chat' onClick={() => setIsMenuOpen(false)}>
                <Button className='w-full'>Start Asking</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
