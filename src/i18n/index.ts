import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { readStorage, writeStorage } from '@/lib/storage'
import { isLanguage, LANGUAGES, type Language } from '@/types/i18n'
import es from './locales/es.json'
import en from './locales/en.json'

const STORAGE_KEY = 'lang'
const FALLBACK: Language = 'es'

export const resources = {
  es: { translation: es },
  en: { translation: en },
} as const

// En el pre-render (Node) no hay documento: se genera en el idioma por defecto
const isBrowser = typeof document !== 'undefined'

// Preferencia guardada > idioma del navegador > español
// (index.html replica esta lógica para decidir si hidratar el HTML pre-renderizado)
function detectLanguage(): Language {
  if (!isBrowser) return FALLBACK
  const stored = readStorage(STORAGE_KEY)
  if (isLanguage(stored)) return stored
  return navigator.language.toLowerCase().startsWith('en') ? 'en' : FALLBACK
}

// Sincroniza el documento con el idioma activo (lang, title, description)
function syncDocument(language: string) {
  if (!isBrowser) return
  document.documentElement.lang = language
  document.title = i18n.t('meta.title')
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'))
}

i18n.on('languageChanged', syncDocument)

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: FALLBACK,
  supportedLngs: LANGUAGES,
  interpolation: { escapeValue: false }, // React ya escapa
  initAsync: false, // recursos embebidos: init síncrono, sin render vacío
})

/** Cambio explícito del usuario: se persiste (la detección automática no). */
export function setLanguage(language: Language) {
  writeStorage(STORAGE_KEY, language)
  return i18n.changeLanguage(language)
}

export default i18n
