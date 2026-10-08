import 'i18next'
import type es from './locales/es.json'

// Claves de traducción tipadas: t('nav.typo') es error de compilación
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: { translation: typeof es }
  }
}
