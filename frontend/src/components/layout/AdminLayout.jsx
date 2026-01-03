import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Logo from '@/components/ui/Logo'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import {
  ChevronUp,
  FileText,
  Home,
  LogOut,
  MessageCircle,
  Moon,
  Sun,
  User2,
  UserCog,
} from 'lucide-react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router'
import { toast } from 'sonner'

const navItemsCommon = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: <Home />,
    roles: ['admin', 'superadmin'],
  },
  {
    label: 'QA Pairs',
    href: '/admin/qa',
    icon: <FileText />,
    roles: ['admin', 'superadmin'],
  },
  {
    label: 'Suggestions',
    href: '/admin/suggestions',
    icon: <MessageCircle />,
    roles: ['admin', 'superadmin'],
  },
]

const navItemsSuperadmin = [
  {
    label: 'Manage Admins',
    href: '/admin/manage',
    icon: <UserCog />,
    roles: ['superadmin'],
  },
]

const AdminLayout = () => {
  const { session, user, loading, signOut } = useAuthStore()
  const { isDark, toggleDark } = useThemeStore()
  const navigate = useNavigate()

  if (loading || !user) return null

  if (!session) return <Navigate to='/login' replace />

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.log('Sign out failed: ', error)
      toast.error('Could not sign out. Please try again.')
    }
  }

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
        <Sidebar>
          <SidebarHeader>
            <div className='flex items-center gap-2 px-2 py-2'>
              <Logo />
              <span className='text-lg font-bold'>Vivy AI</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItemsCommon
                    .filter((item) => item.roles.includes(user.role))
                    .map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.href}
                            className='flex items-center gap-2'
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {user.role === 'superadmin' && (
              <SidebarGroup>
                <SidebarGroupLabel>Admin Management</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navItemsSuperadmin.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.href}
                            className='flex items-center gap-2'
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='cursor-pointer'>
                <SidebarMenuButton className='h-auto py-2'>
                  <User2 className='h-5 w-5 shrink-0' />
                  <div className='flex min-w-0 flex-1 flex-col items-start gap-0.5 overflow-hidden'>
                    <span className='w-full truncate text-sm font-medium'>
                      {user.first_name} {user.last_name}
                    </span>
                    <span className='text-muted-foreground w-full truncate text-xs'>
                      {user.email}
                    </span>
                  </div>
                  <ChevronUp className='ml-auto h-4 w-4 shrink-0' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-68 md:w-60'>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className='text-destructive! hover:bg-destructive/10!'
                >
                  <LogOut className='text-destructive' />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <main className='bg-sidebar min-h-0 flex-1 overflow-y-auto'>
          <div className='bg-sidebar border-sidebar-border sticky top-0 z-10 flex items-center gap-4 divide-x border-b p-4'>
            <SidebarTrigger className='hover:bg-accent! hover:cursor-pointer' />
            <Button
              onClick={toggleDark}
              variant='ghost'
              className='hover:bg-accent ml-auto rounded-md p-2 transition-colors'
              aria-label='Toggle dark mode'
            >
              {isDark ? (
                <Sun className='size-5' />
              ) : (
                <Moon className='size-5' />
              )}
            </Button>
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
