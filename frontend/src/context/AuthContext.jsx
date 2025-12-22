/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadRole = async (userId) => {
    try {
      const { data: roleData, error: roleError } = await supabase
        .from('admin_users')
        .select('role')
        .eq('auth_user_id', userId)
        .single()

      if (roleError) throw roleError

      setRole(roleData.role)
    } catch (error) {
      console.error('Error loading role:', error)
      toast.error('Failed to load user role')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) throw error

        if (session) {
          setSession(session)
          loadRole(session.user.id)
        } else {
          setSession(null)
          setRole(null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching session:', error)
        toast.error('Failed to fetch session')
        setLoading(false)
      }
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      try {
        setSession(session)
        if (session?.user) {
          loadRole(session.user.id)
        } else {
          setRole(null)
        }
      } catch (error) {
        console.error('Error during auth state change:', error)
        toast.error('Error during auth state change')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, role, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
