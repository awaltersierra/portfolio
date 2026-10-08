import { useLanguage } from '@/hooks/useLanguage'

export function LangToggle() {
  const { language, toggleLanguage } = useLanguage()
  const next = language === 'es' ? 'en' : 'es'
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={next === 'en' ? 'Switch to English' : 'Cambiar a español'}
      className="icon-button w-auto px-2.5 text-sm font-semibold uppercase"
    >
      {next}
    </button>
  )
}
