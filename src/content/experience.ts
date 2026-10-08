import type { Education, Experience } from '@/types/content'

// Solo experiencia en IT; orden: más reciente primero
export const experience: Experience[] = [
  {
    id: 'it-manager',
    role: { es: 'IT Manager · Lead Programmer', en: 'IT Manager · Lead Programmer' },
    location: { es: 'Argentina', en: 'Argentina' },
    start: 2017,
    end: 2025,
    summary: {
      es: 'Responsable del área de sistemas: gestión de la infraestructura tecnológica y liderazgo del desarrollo de software.',
      en: 'Head of the IT area: managed the technology infrastructure and led software development.',
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
