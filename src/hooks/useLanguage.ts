import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '@/i18n'
import { isLanguage, type Language, type Localized } from '@/types/i18n'

export function useLanguage() {
  const { i18n } = useTranslation()
  const language: Language = isLanguage(i18n.resolvedLanguage) ? i18n.resolvedLanguage : 'es'

  const toggleLanguage = useCallback(() => {
    void setLanguage(language === 'es' ? 'en' : 'es')
  }, [language])

  /** Elige la variante del idioma activo de un valor `Localized` del contenido. */
  const localize = useCallback(<T>(value: Localized<T>): T => value[language], [language])

  return { language, toggleLanguage, localize }
}
