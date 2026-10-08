import type { Project } from '@/types/content'

// repoUrl solo para repos públicos. Los `featured` ocupan el ancho completo.
export const projects: Project[] = [
  {
    slug: 'spiga',
    title: { es: 'Spiga', en: 'Spiga' },
    period: { es: '2023 — actualidad', en: '2023 — present' },
    role: { es: 'Líder del proyecto y desarrollador', en: 'Project lead & developer' },
    status: 'in-production',
    featured: true,
    summary: {
      es: 'Sistema de gestión integral para Fedea, empresa de productos y servicios para el agro: contabilidad, tesorería, inventario, impuestos y pagos, con integraciones a ARCA, ARBA y SENASA.',
      en: 'Comprehensive management system for Fedea, a provider of agricultural products and services: accounting, treasury, inventory, taxes and payments, integrated with ARCA, ARBA and SENASA.',
    },
    description: {
      es: 'Impulsé Spiga como evolución del sistema de gestión en Clarion y lidero su desarrollo con un equipo de 5 desarrolladores. API con Django y Django REST Framework, tareas programadas con Celery y MySQL como base de datos; frontend con Next.js, React y Ant Design, con acceso mediante cuentas de Google de la empresa. Integra web services de ARCA, ARBA y SENASA. Corre en Docker, con CI/CD en GitHub Actions que valida migraciones y build en cada pull request y despliega a testing y producción.',
      en: 'I promoted Spiga as the evolution of the Clarion management system and lead its development with a team of 5 developers. Django and Django REST Framework API, scheduled jobs with Celery and a MySQL database; Next.js, React and Ant Design frontend, with sign-in through company Google accounts. It integrates ARCA, ARBA and SENASA web services. Runs on Docker, with GitHub Actions CI/CD that validates migrations and the build on every pull request and deploys to testing and production.',
    },
    stack: [
      'Django',
      'Django REST Framework',
      'Python',
      'Celery',
      'MySQL',
      'Next.js',
      'React',
      'TypeScript',
      'Ant Design',
      'Tailwind CSS',
      'Docker',
      'GitHub Actions',
    ],
  },
  {
    slug: 'erp-clarion',
    title: {
      es: 'Sistema de gestión empresarial a medida',
      en: 'Custom business management system',
    },
    period: { es: '+16 años en producción', en: '16+ years in production' },
    role: { es: 'Desarrollador y luego líder del área', en: 'Developer, later IT lead' },
    status: 'in-production',
    featured: true,
    summary: {
      es: 'ERP a medida desarrollado en Clarion sobre MySQL, en producción hace más de 16 años y en continuo crecimiento, con integraciones a ARCA, ARBA y SENASA.',
      en: 'Custom ERP built in Clarion on MySQL, in production for over 16 years and continuously growing, integrated with ARCA, ARBA and SENASA.',
    },
    description: {
      es: 'Sistema de gestión empresarial desarrollado en Clarion IDE 11 con MySQL como base de datos e integraciones con los web services de ARCA, ARBA y SENASA. Entre 2017 y 2021 trabajé como desarrollador sobre este sistema, y desde 2022 está bajo mi responsabilidad como líder del área de IT.',
      en: 'Business management system built with Clarion IDE 11 and a MySQL database, integrated with ARCA, ARBA and SENASA web services. From 2017 to 2021 I worked on it as a developer, and since 2022 it has been under my responsibility as head of the IT area.',
    },
    stack: ['Clarion', 'MySQL'],
  },
  {
    slug: 'puntualin',
    title: { es: 'Puntualin', en: 'Puntualin' },
    period: '2026',
    status: 'in-progress',
    summary: {
      es: 'Plataforma multi-tenant de turnos y pagos con Mercado Pago, donde cada profesional opera en su propio subdominio.',
      en: 'Multi-tenant scheduling and payments platform with Mercado Pago, where each professional runs on their own subdomain.',
    },
    description: {
      es: 'Arquitectura en capas: frontend con Next.js 16, refine y Ant Design; API con Django 5.2 y Django REST Framework; MySQL 8.4 como base de datos y Caddy como reverse proxy. Los tipos de TypeScript del frontend se generan desde el esquema OpenAPI de la API, y todo el stack se levanta con Docker Compose.',
      en: 'Layered architecture: Next.js 16 frontend with refine and Ant Design; Django 5.2 and Django REST Framework API; MySQL 8.4 database and Caddy as reverse proxy. Frontend TypeScript types are generated from the API OpenAPI schema, and the whole stack runs with Docker Compose.',
    },
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Ant Design',
      'Django',
      'Python',
      'MySQL',
      'Caddy',
      'Docker',
    ],
  },
  {
    slug: 'integration-web-service',
    title: { es: 'Web service de integración a medida', en: 'Custom integration web service' },
    period: '2026',
    role: { es: 'Líder del proyecto y desarrollador', en: 'Project lead & developer' },
    summary: {
      es: 'Web service a medida en Node.js que conecta un sistema propio con uno de terceros: para cada transacción del sistema externo expone los datos asociados del sistema propio.',
      en: 'Custom Node.js web service that connects an in-house system with a third-party one: for each transaction of the external system it exposes the related in-house data.',
    },
    description: {
      es: 'API REST con Node.js y Express sobre la base MySQL del sistema propio. A partir del identificador de una transacción del sistema de terceros devuelve el remito asociado, su fecha y el kilometraje del vehículo, con validación de parámetros y consultas parametrizadas. Se despliega con Docker Compose detrás de Nginx como reverse proxy, con healthchecks y el código montado en solo lectura.',
      en: 'REST API built with Node.js and Express on top of the in-house system MySQL database. Given a third-party transaction ID it returns the related delivery note, its date and the vehicle mileage, with parameter validation and parameterized queries. Deployed with Docker Compose behind an Nginx reverse proxy, with healthchecks and the source mounted read-only.',
    },
    stack: ['Node.js', 'Express', 'JavaScript', 'MySQL', 'Nginx', 'Docker'],
  },
  {
    slug: 'portfolio',
    title: { es: 'Este portfolio', en: 'This portfolio' },
    period: '2026',
    status: 'in-production',
    summary: {
      es: 'SPA bilingüe con tema claro/oscuro, contenido tipado y tests automatizados.',
      en: 'Bilingual SPA with light/dark theme, typed content and automated tests.',
    },
    description: {
      es: 'Construido con React 19, TypeScript, Vite y Tailwind CSS 4. Textos en español e inglés con i18next y claves tipadas; el contenido vive en archivos TypeScript separados del código de UI. La home se pre-renderiza en el build en ambos idiomas. Tests unitarios con Vitest y Testing Library, E2E con Playwright sobre el build, y CI/CD con GitHub Actions que publica en GitHub Pages.',
      en: 'Built with React 19, TypeScript, Vite and Tailwind CSS 4. Spanish and English texts with i18next and typed keys; content lives in TypeScript files separate from the UI code. The home page is pre-rendered at build time in both languages. Unit tests with Vitest and Testing Library, E2E tests with Playwright on the build, and GitHub Actions CI/CD deploying to GitHub Pages.',
    },
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'i18next',
      'Vitest',
      'Playwright',
      'GitHub Actions',
    ],
    repoUrl: 'https://github.com/awaltersierra/portfolio',
    demoUrl: 'https://awaltersierra.github.io/portfolio/',
  },
]
