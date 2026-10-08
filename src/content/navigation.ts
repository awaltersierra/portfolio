// Etiquetas en español hasta la fase 3 (i18n)
export const NAV_ITEMS = [
  { id: 'about', label: 'Sobre mí' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Proyectos' },
] as const

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id)
