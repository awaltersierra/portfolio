export const LANGUAGES = ['es', 'en'] as const

export type Language = (typeof LANGUAGES)[number]

/** Valor con una variante por idioma; se usa para el contenido de `src/content`. */
export type Localized<T = string> = Record<Language, T>

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language)
}
