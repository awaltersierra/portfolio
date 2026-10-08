import type { Localized } from '@/types/i18n'

// Datos mínimos para el layout; se completa en la fase 4
export const profile = {
  name: 'Walter Sierra',
  initials: 'WS',
  role: {
    es: 'Desarrollador de software',
    en: 'Software Developer',
  } satisfies Localized,
  socials: {
    github: 'https://github.com/awaltersierra',
  },
} as const
