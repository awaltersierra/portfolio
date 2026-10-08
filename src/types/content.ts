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
}

export type SkillGroup = {
  id: string
  title: Localized
  items: Text[]
}

export type ProjectStatus = 'in-progress' | 'completed'

export type Project = {
  slug: string
  title: Localized
  year: number
  status?: ProjectStatus
  featured?: boolean
  summary: Localized
  /** Descripción larga para la página de detalle (fase 5). */
  description: Localized
  stack: string[]
  repoUrl?: string // solo si el repo es público
  demoUrl?: string
}

export type Fact = {
  value: Localized
  label: Localized
}
