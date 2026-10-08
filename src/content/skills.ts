import type { SkillGroup } from '@/types/content'

// Tecnologías tomadas de los proyectos reales (ver projects.ts) y competencias del CV
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: { es: 'Lenguajes', en: 'Languages' },
    items: ['TypeScript', 'JavaScript', 'Python', 'Clarion'],
  },
  {
    id: 'frontend',
    title: { es: 'Frontend', en: 'Frontend' },
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Ant Design'],
  },
  {
    id: 'backend',
    title: { es: 'Backend', en: 'Backend' },
    items: ['Node.js', 'Express', 'Django', 'Django REST Framework', 'Celery'],
  },
  {
    id: 'data',
    title: { es: 'Bases de datos', en: 'Databases' },
    items: ['MySQL'],
  },
  {
    id: 'devops',
    title: { es: 'DevOps e infraestructura', en: 'DevOps & infrastructure' },
    items: ['Docker', 'Docker Compose', 'Nginx', 'Caddy', 'Git', 'GitHub Actions'],
  },
  {
    id: 'it',
    title: { es: 'IT y gestión', en: 'IT & management' },
    items: [
      { es: 'Administración de servidores', en: 'Server administration' },
      { es: 'Gestión de datos', en: 'Data management' },
      { es: 'Gestión de sistemas', en: 'Systems management' },
      { es: 'Liderazgo técnico', en: 'Technical leadership' },
      { es: 'Comunicación', en: 'Communication' },
      { es: 'Trabajo bajo presión', en: 'Working under pressure' },
    ],
  },
]
