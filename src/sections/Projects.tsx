import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectCard } from '@/components/ProjectCard'
import { Section } from '@/components/Section'
import { projects } from '@/content/projects'
import { filterableTechs } from '@/lib/projects'

const TECHS = filterableTechs(projects)

export function Projects() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<string | null>(null)
  const visible = selected ? projects.filter((p) => p.stack.includes(selected)) : projects

  const chip = (label: string, value: string | null) => {
    const active = selected === value
    return (
      <li key={label}>
        <button
          type="button"
          onClick={() => setSelected(value)}
          aria-pressed={active}
          className={`rounded-full px-3 py-1 text-sm font-medium ring-1 transition-colors ring-inset ${
            active
              ? 'bg-accent text-white ring-accent dark:text-slate-950'
              : 'text-slate-600 ring-slate-300 hover:bg-slate-100 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800'
          }`}
        >
          {label}
        </button>
      </li>
    )
  }

  return (
    <Section id="projects" title={t('nav.projects')}>
      <div className="mb-8">
        <p id="projects-filter" className="sr-only">
          {t('projects.filterLabel')}
        </p>
        <ul aria-labelledby="projects-filter" className="flex flex-wrap gap-2">
          {chip(t('projects.all'), null)}
          {TECHS.map((tech) => chip(tech, tech))}
        </ul>
        <p aria-live="polite" className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {t('projects.results', { count: visible.length })}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} highlight={selected ?? undefined} />
        ))}
      </div>
    </Section>
  )
}
