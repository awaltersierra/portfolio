import type { Fact } from '@/types/content'
import type { Localized } from '@/types/i18n'

export const profile = {
  name: 'Walter Sierra',
  initials: 'WS',
  // En public/, con ruta relativa al documento (único, rutas en el hash): misma URL en el
  // HTML pre-renderizado y en el cliente. No usar BASE_URL: en el build SSR vale '/'
  photo: './profile.webp',
  role: {
    es: 'Desarrollador Full Stack',
    en: 'Full Stack Developer',
  } satisfies Localized,
  bio: {
    es: [
      'Más de diez años en IT en Argentina: empecé en soporte e ingeniería de infraestructura cloud de alta disponibilidad, y en Fedea pasé de desarrollar su sistema de gestión en Clarion a liderar el área de IT, donde impulsé Spiga, su nueva plataforma web.',
      'Hoy me enfoco en desarrollo full stack con TypeScript, React, Node.js y Python/Django, construyendo aplicaciones contenerizadas con Docker. Soy Analista Programador por la UNLPam, donde también cursé Ingeniería en Sistemas (tesis pendiente).',
    ],
    en: [
      'Over ten years in IT in Argentina: I started in high-availability cloud infrastructure support and engineering, and at Fedea I went from developing its Clarion management system to leading the IT area, where I promoted Spiga, its new web platform.',
      'Today I focus on full stack development with TypeScript, React, Node.js and Python/Django, building containerized applications with Docker. I hold a Programmer Analyst degree from UNLPam, where I also studied Systems Engineering (thesis pending).',
    ],
  } satisfies Localized<string[]>,
  facts: [
    {
      value: { es: '10+ años', en: '10+ years' },
      label: { es: 'de experiencia en IT', en: 'of IT experience' },
    },
    {
      value: { es: 'ARG · ESP', en: 'ARG · ESP' },
      label: { es: 'ciudadanía', en: 'citizenship' },
    },
    {
      value: { es: 'ES · EN', en: 'ES · EN' },
      label: { es: 'español nativo, inglés', en: 'native Spanish, English' },
    },
  ] satisfies Fact[],
  // Datos que usa el CV en PDF (src/cv)
  citizenship: {
    es: 'Argentina y española',
    en: 'Argentine and Spanish',
  } satisfies Localized,
  languages: [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'nativo', en: 'native' } },
    { name: { es: 'Inglés', en: 'English' } },
  ] satisfies { name: Localized; level?: Localized }[],
  // Solo en el CV (no en las páginas del sitio, para no exponerlos a scrapers)
  location: { es: 'Leipzig, Alemania', en: 'Leipzig, Germany' } satisfies Localized,
  phones: ['+49 1775044428', '+54 2302696553'],
  email: 'aws1912@gmail.com',
  siteUrl: 'https://awaltersierra.github.io/portfolio/',
  socials: {
    github: 'https://github.com/awaltersierra',
  },
} as const
