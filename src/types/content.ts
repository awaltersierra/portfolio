import type { Localized } from '@/types/i18n'

/** Texto que no se traduce (nombres de tecnologías) o que tiene variante por idioma. */
export type Text = string | Localized

export type Experience = {
  id: string
  role: Localized
  company?: string
  location: Localized
  start: number
  end?: number // sin `end` = actualidad
  summary: Localized
  highlights?: Localized<string[]>
}

export type Education = {
  id: string
  title: Localized
  institution: string
  location: Localized
  /** P. ej. título obtenido o tesis pendiente. */
  status?: Localized
}

export type SkillGroup = {
  id: string
  title: Localized
  items: Text[]
}

export type ProjectStatus = 'in-progress' | 'in-production'

export type Project = {
  slug: string
  title: Localized
  /** Período o año, p. ej. '2026' o { es: '2023 — actualidad', en: '2023 — present' }. */
  period: Text
  /** Mi rol en el proyecto, cuando fue en equipo. */
  role?: Localized
  status?: ProjectStatus
  featured?: boolean
  summary: Localized
  /** Descripción larga para la página de detalle (fase 5). */
  description: Localized
  stack: string[]
  repoUrl?: string // solo si el repo es público
  demoUrl?: string
  /** Capturas para la página de detalle (importar desde src/assets). */
  images?: ProjectImage[]
}

export type ProjectImage = {
  src: string
  alt: Localized
}

export type Fact = {
  value: Localized
  label: Localized
}
