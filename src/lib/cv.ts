import type { Language } from '@/types/i18n'

// Sin dependencias de @react-pdf: lo importa el bundle del cliente (botón de descarga)

/** Nombre del PDF del CV por idioma; se genera en el build en dist/cv/ (ver scripts/prerender.mjs). */
export const cvFileName = (language: Language) => `walter-sierra-cv-${language}.pdf`

/** Ruta relativa al documento, igual que el resto de los assets de public/. */
export const cvPath = (language: Language) => `./cv/${cvFileName(language)}`
