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
      // La etiqueta va en el idioma destino, para que quien no lee el actual la entienda
      aria-label={t('language.switch', { lng: next })}
      lang={next}
      className="icon-button w-auto px-2.5 text-sm font-semibold uppercase"
    >
      {next}
    </button>
  )
}
