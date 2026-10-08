import type { Education, Experience } from '@/types/content'

// Solo experiencia en IT; orden: más reciente primero
export const experience: Experience[] = [
  {
    id: 'fedea-it-lead',
    role: { es: 'Líder del área de IT · Lead Programmer', en: 'IT Lead · Lead Programmer' },
    company: 'Fedea SA',
    location: { es: 'Argentina', en: 'Argentina' },
    start: 2022,
    summary: {
      es: 'A cargo del área de sistemas: gestión de la infraestructura tecnológica y del sistema de gestión en Clarion. Impulsé y lidero el desarrollo de Spiga, la nueva plataforma web de la empresa, participando también como desarrollador.',
      en: 'Head of the IT area: managing the technology infrastructure and the Clarion management system. I promoted and lead the development of Spiga, the company’s new web platform, also contributing as a developer.',
    },
  },
  {
    id: 'fedea-developer',
    role: { es: 'Desarrollador', en: 'Developer' },
    company: 'Fedea SA',
    location: { es: 'Argentina', en: 'Argentina' },
    start: 2017,
    end: 2021,
    summary: {
      es: 'Desarrollo y mantenimiento del sistema de gestión empresarial a medida en Clarion IDE sobre MySQL.',
      en: 'Development and maintenance of the custom business management system in Clarion IDE on MySQL.',
    },
  },
  {
    id: 'project-engineer',
    role: { es: 'Project Engineer', en: 'Project Engineer' },
    company: 'Nubity SRL',
    location: { es: 'Argentina', en: 'Argentina' },
    start: 2015,
    end: 2017,
    summary: {
      es: 'Diseño y soporte de infraestructuras cloud de alto rendimiento y alta disponibilidad, en entornos AWS, Google Cloud, Azure y Rackspace.',
      en: 'Design and support of high-performance, high-availability cloud infrastructure on AWS, Google Cloud, Azure and Rackspace.',
    },
  },
  {
    id: 'night-support-engineer',
    role: { es: 'Night Support Engineer', en: 'Night Support Engineer' },
    company: 'Nubity SRL',
    location: { es: 'Argentina', en: 'Argentina' },
    start: 2014,
    end: 2015,
    summary: {
      es: 'Soporte nocturno a proyectos de alta disponibilidad en la nube, en entornos AWS, Google Cloud, Azure y Rackspace.',
      en: 'Night-shift support for high-availability cloud projects on AWS, Google Cloud, Azure and Rackspace.',
    },
  },
]

// Orden: la de mayor nivel primero
export const education: Education[] = [
  {
    id: 'unlpam-ingenieria',
    title: { es: 'Ingeniería en Sistemas', en: 'Systems Engineering' },
    institution: 'UNLPam — Universidad Nacional de La Pampa',
    location: { es: 'La Pampa, Argentina', en: 'La Pampa, Argentina' },
    status: { es: 'Tesis pendiente', en: 'Thesis pending' },
  },
  {
    id: 'unlpam-analista',
    title: { es: 'Analista Programador', en: 'Programmer Analyst' },
    institution: 'UNLPam — Universidad Nacional de La Pampa',
    location: { es: 'La Pampa, Argentina', en: 'La Pampa, Argentina' },
    status: { es: 'Título obtenido', en: 'Degree completed' },
  },
]
