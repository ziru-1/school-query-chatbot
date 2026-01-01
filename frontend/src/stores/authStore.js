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

      if (roleError) {
        console.error('Role error:', roleError)
        set({ role: null, loading: false })
        toast.error('Failed to load user role')
        return
      }

      set({ role: roleData.role, loading: false })
    } catch (error) {
      console.error('Error loading role:', error)
      toast.error('Failed to load user role')
      set({ role: null, loading: false })
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
      set({ session: null, role: null, loading: false })
    }
  },

  initAuth: () => {
    get().loadSession()

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      try {
        if (event === 'SIGNED_OUT') {
          set({ session: null, role: null, loading: false })
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          get().loadSession()
        }
      } catch (error) {
        console.error('Error during auth state change:', error)
        toast.error('Error during auth state change')
        set({ loading: false })
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
