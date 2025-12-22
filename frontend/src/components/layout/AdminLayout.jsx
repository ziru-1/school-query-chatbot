import React from 'react'
import { useNavigate } from 'react-router'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router'
import Logo from '@/components/ui/Logo'
import {
  Home,
  FileText,
  MessageCircle,
  User2,
  ChevronUp,
  LogOut,
  UserCog,
} from 'lucide-react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const AdminLayout = () => {
  const { session, role, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) return null

  if (!session) return <Navigate to='/login' replace />

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

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

  const messages = {
    '/admin/dashboard': 'Dashboard',
    '/admin/qa': 'QA Pairs',
    '/admin/suggestions': 'Suggestions',
  }

  const message = messages[location.pathname] || ''

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
                    .filter((item) => item.roles.includes(role))
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

            {role === 'superadmin' && (
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
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  <span>{session.user.email}</span>
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-68 md:w-60'>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <main className='flex-1'>
          <div className='flex items-center gap-4 divide-x border-b border-gray-200 p-4'>
            <SidebarTrigger className='md:hidden' />
            <span className='font-semibold'>{message}</span>
          </div>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
