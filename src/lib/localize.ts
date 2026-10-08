import type { Text } from '@/types/content'
import type { Language, Localized } from '@/types/i18n'

export type Localize = {
  <T>(value: Localized<T>): T
  (value: Text): string
}

/** Resuelve un valor del contenido al idioma dado; los strings planos no se traducen. */
export function localizeIn(language: Language): Localize {
  return ((value: Text | Localized<unknown>) =>
    typeof value === 'string' ? value : value[language]) as Localize
}
