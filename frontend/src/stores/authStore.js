import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export const useAuthStore = create((set, get) => ({
  session: null,
  user: null,
  loading: true,

  loadUser: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('first_name, last_name, email, role')
        .eq('auth_user_id', userId)
        .single()

      if (error) throw error

      set({ user: data, loading: false })
    } catch (err) {
      console.error('User load failed:', err)
      toast.error('Failed to load user data')
      set({ user: null, loading: false })
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
        await get().loadUser(session.user.id)
      } else {
        set({ session: null, user: null, loading: false })
      }
    } catch (error) {
      console.error('Error fetching session:', error)
      toast.error('Failed to fetch session')
      set({ session: null, user: null, loading: false })
    }
  },

  initAuth: () => {
    get().loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      try {
        if (event === 'SIGNED_OUT') {
          set({ session: null, user: null, loading: false })
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          get().loadSession()
        }
      } catch (error) {
        console.error('Auth state change error:', error)
        toast.error('Error during auth state change')
        set({ loading: false })
      }
    })

    return () => subscription.unsubscribe()
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ session: null, user: null })
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Failed to sign out')
      throw error
    }
  },
}))
