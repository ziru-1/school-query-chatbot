import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      toggleDark: () => set((state) => ({ isDark: !state.isDark })),
    }),
    { name: 'theme' },
  ),
)
