import type { SkillGroup } from '@/types/content'

// Tecnologías de los proyectos reales (ver projects.ts), de la experiencia y competencias del CV
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
    items: ['CI/CD', 'GitHub Actions', 'Docker', 'Docker Compose', 'Nginx', 'Caddy', 'Git'],
  },
  {
    id: 'cloud',
    title: { es: 'Cloud', en: 'Cloud' },
    items: [
      'AWS',
      'Google Cloud',
      'Azure',
      'Rackspace',
      { es: 'Alta disponibilidad', en: 'High availability' },
    ],
  },
  {
    id: 'testing',
    title: { es: 'Testing', en: 'Testing' },
    items: ['Vitest', 'Testing Library', 'Playwright'],
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
