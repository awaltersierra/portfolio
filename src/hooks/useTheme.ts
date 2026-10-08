import { useCallback, useEffect, useState } from 'react'
import { readStorage, writeStorage } from '@/lib/storage'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

// El script inline de index.html ya aplicó la clase antes del primer render (evita el flash)
function initialTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  // Sin preferencia guardada, seguimos los cambios del sistema operativo
  useEffect(() => {
    if (readStorage(STORAGE_KEY)) return
    const media = window.matchMedia(DARK_QUERY)
    const onChange = (e: MediaQueryListEvent) => {
      const next: Theme = e.matches ? 'dark' : 'light'
      applyTheme(next)
      setTheme(next)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      writeStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
