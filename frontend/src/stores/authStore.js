import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export const useAuthStore = create((set, get) => ({
  session: null,
  role: null,
  loading: true,

  loadRole: async (userId) => {
    try {
      const { data: roleData, error: roleError } = await supabase
        .from('admin_users')
        .select('role')
        .eq('auth_user_id', userId)
        .single()

      if (roleError) throw roleError

      set({ role: roleData.role })
    } catch (error) {
      console.error('Error loading role:', error)
      toast.error('Failed to load user role')
    } finally {
      set({ loading: false })
    }
  },

  loadSession: async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) throw error

      if (session) {
        set({ session })
        await get().loadRole(session.user.id)
      } else {
        set({ session: null, role: null, loading: false })
      }
    } catch (error) {
      console.error('Error fetching session:', error)
      toast.error('Failed to fetch session')
      set({ loading: false })
    }
  },

  initAuth: () => {
    // Load initial session
    get().loadSession()

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        set({ session })
        if (session?.user) {
          await get().loadRole(session.user.id)
        } else {
          set({ role: null })
        }
      } catch (error) {
        console.error('Error during auth state change:', error)
        toast.error('Error during auth state change')
      }
    })

    // Return cleanup function
    return () => subscription.unsubscribe()
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ session: null, role: null })
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Failed to sign out')
      throw error
    }
  },
}))
