import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '@/i18n'
import { localizeIn } from '@/lib/localize'
import { isLanguage, type Language } from '@/types/i18n'

export function useLanguage() {
  const { i18n } = useTranslation()
  const language: Language = isLanguage(i18n.resolvedLanguage) ? i18n.resolvedLanguage : 'es'

  const toggleLanguage = useCallback(() => {
    void setLanguage(language === 'es' ? 'en' : 'es')
  }, [language])

  /** Elige la variante del idioma activo de un valor del contenido (`Localized` o string plano). */
  const localize = useMemo(() => localizeIn(language), [language])

  return { language, toggleLanguage, localize }
}
