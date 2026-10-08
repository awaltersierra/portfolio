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
      'Más de diez años en IT en Argentina: empecé como administrador de sistemas y en Fedea pasé de desarrollar su sistema de gestión en Clarion a liderar el área de IT, donde impulsé Spiga, su nueva plataforma web.',
      'Hoy me enfoco en desarrollo full stack con TypeScript, React, Node.js y Python/Django, construyendo aplicaciones contenerizadas con Docker. Estudio programación en la UTN.',
    ],
    en: [
      'Over ten years in IT in Argentina: I started as a systems administrator, and at Fedea I went from developing its Clarion management system to leading the IT area, where I promoted Spiga, its new web platform.',
      'Today I focus on full stack development with TypeScript, React, Node.js and Python/Django, building containerized applications with Docker. I study programming at UTN.',
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
  email: 'aws1912@gmail.com',
  socials: {
    github: 'https://github.com/awaltersierra',
  },
  // Sin CV descargable hasta tener una versión orientada a IT
  cvUrl: undefined as string | undefined,
} as const
