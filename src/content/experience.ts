import type { Education, Experience } from '@/types/content'

// Solo experiencia en IT; orden: más reciente primero
export const experience: Experience[] = [
  {
    id: 'fedea-it-lead',
    role: { es: 'Líder del área de IT · Lead Programmer', en: 'IT Lead · Lead Programmer' },
    company: 'Fedea',
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
    company: 'Fedea',
    location: { es: 'Argentina', en: 'Argentina' },
    start: 2017,
    end: 2021,
    summary: {
      es: 'Desarrollo y mantenimiento del sistema de gestión empresarial a medida en Clarion IDE sobre MySQL.',
      en: 'Development and maintenance of the custom business management system in Clarion IDE on MySQL.',
    },
  },
  {
    id: 'sysadmin',
    role: { es: 'Administrador de sistemas', en: 'Systems Administrator' },
    location: { es: 'Argentina', en: 'Argentina' },
    start: 2014,
    end: 2017,
    summary: {
      es: 'Administración de servidores y gestión de datos.',
      en: 'Server administration and data management.',
    },
  },
]

export const education: Education[] = [
  {
    id: 'utn',
    title: { es: 'Estudiante de Programación', en: 'Programming student' },
    institution: 'UTN — Universidad Tecnológica Nacional',
    location: { es: 'Buenos Aires, Argentina', en: 'Buenos Aires, Argentina' },
  },
]
