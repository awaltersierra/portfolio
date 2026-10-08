import { useCallback, useEffect, useState } from 'react'
import { readStorage, writeStorage } from '@/lib/storage'

// Estado de idioma provisorio: en la fase 3 se conecta con i18next
export type Language = 'es' | 'en'

const STORAGE_KEY = 'lang'

function initialLanguage(): Language {
  const stored = readStorage(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next: Language = prev === 'es' ? 'en' : 'es'
      writeStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  return { language, toggleLanguage }
}
