import { useThemeStore } from '@/stores/themeStore'
import { useEffect } from 'react'

export const ThemeInitializer = ({ children }) => {
  const isDark = useThemeStore((state) => state.isDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return children
}
