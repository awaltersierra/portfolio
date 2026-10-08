import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/hooks/useLanguage'

export function LangToggle() {
  const { t } = useTranslation()
  const { language, toggleLanguage } = useLanguage()
  const next = language === 'es' ? 'en' : 'es'
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      lang={next}
      className="icon-button w-auto px-2.5 text-sm font-semibold"
    >
      {/* Nombre accesible = código visible + descripción en el idioma destino (WCAG 2.5.3) */}
      {next.toUpperCase()}
      <span className="sr-only">, {t('language.switch', { lng: next })}</span>
    </button>
  )
}
