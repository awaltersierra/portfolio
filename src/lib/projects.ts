import type { Project } from '@/types/content'

/** Tecnologías presentes en al menos 2 proyectos, de más a menos usadas (las únicas no sirven para filtrar). */
export function filterableTechs(list: Project[]): string[] {
  const counts = new Map<string, number>()
  for (const tech of list.flatMap((p) => p.stack)) {
    counts.set(tech, (counts.get(tech) ?? 0) + 1)
  }
  return [...counts]
    .filter(([, count]) => count >= 2)
    .sort(([a, ca], [b, cb]) => cb - ca || a.localeCompare(b))
    .map(([tech]) => tech)
}

/** id del DOM de la card de un proyecto, para volver a ella desde el detalle. */
export const projectCardId = (slug: string) => `card-${slug}`
