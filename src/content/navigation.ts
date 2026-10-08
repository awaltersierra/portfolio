// El orden define el de la navbar y el de las secciones en Home; las etiquetas salen de `nav.<id>`
export const SECTION_IDS = ['about', 'experience', 'skills', 'projects'] as const

export type SectionId = (typeof SECTION_IDS)[number]
