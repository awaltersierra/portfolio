import { useCallback, useSyncExternalStore } from 'react'
import { readStorage, writeStorage } from '@/lib/storage'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

// La fuente de verdad es la clase `dark` de <html>: el script inline de index.html
// la aplica antes del primer paint, así que no hay flash de tema incorrecto.
const listeners = new Set<() => void>()

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  for (const notify of listeners) notify()
}

function subscribe(notify: () => void) {
  listeners.add(notify)
  // Sin preferencia guardada, seguimos los cambios del sistema operativo
  const media = window.matchMedia(DARK_QUERY)
  const onChange = (e: MediaQueryListEvent) => {
    if (!readStorage(STORAGE_KEY)) applyTheme(e.matches ? 'dark' : 'light')
  }
  media.addEventListener('change', onChange)
  return () => {
    listeners.delete(notify)
    media.removeEventListener('change', onChange)
  }
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

// El HTML pre-renderizado se genera en claro; al hidratar React pasa al valor real sin mismatch
const getServerSnapshot = (): Theme => 'light'

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark'
    writeStorage(STORAGE_KEY, next)
    applyTheme(next)
  }, [])

  return { theme, toggleTheme }
}
