import React, { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/AuthContext'
import { Link } from 'react-router'
import Logo from '@/components/ui/Logo'
import { Home, FileText, MessageCircle, User2, ChevronUp } from 'lucide-react'
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

const AdminPage = () => {
  const { session, loading } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    console.log('signed out')
    navigate('/login')
  }

  useEffect(() => {
    console.log('Session:', session)
    console.log('Loading:', loading)
  }, [session, loading])

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <Home /> },
    { label: 'QA Pairs', href: '/admin/qa', icon: <FileText /> },
    {
      label: 'Suggestions',
      href: '/admin/suggestions',
      icon: <MessageCircle />,
    },
  ]

  return (
    <SidebarProvider>
      <div className='flex h-screen'>
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
                  {navItems.map((item) => (
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
          </SidebarContent>

          <SidebarFooter>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  <span>Username</span>
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side='top' className='w-68 md:w-60'>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <main className='flex-1 p-6'>
          <SidebarTrigger className='mb-4 md:hidden' />
          <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
          <p>Welcome to the admin panel!</p>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AdminPage
