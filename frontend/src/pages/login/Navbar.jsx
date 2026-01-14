import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/Logo'
import { useThemeStore } from '@/stores/themeStore'
import { Link } from 'react-router'
import { Moon, Sun } from 'lucide-react'

const Navbar = () => {
  const { isDark, toggleDark } = useThemeStore()

  return (
    <nav className='bg-background/80 border-border sticky top-0 right-0 left-0 z-50 border-b px-6 py-4 backdrop-blur-md'>
      <div className='flex max-w-full items-center justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <Logo />
          <span className='text-xl font-bold tracking-tight'>Vivy AI</span>
        </Link>

        <Button
          onClick={toggleDark}
          variant='ghost'
          size='icon'
          className='rounded-full'
          aria-label='Toggle dark mode'
        >
          {isDark ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
