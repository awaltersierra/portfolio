import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Badge } from '@/components/Badge'
import { ProjectLinks } from '@/components/ProjectLinks'
import { ProjectStatusBadge } from '@/components/ProjectStatusBadge'
import { useLanguage } from '@/hooks/useLanguage'
import { projectCardId } from '@/lib/projects'
import type { Project } from '@/types/content'

type ProjectCardProps = {
  project: Project
  /** Tecnología del filtro activo, se resalta en el stack. */
  highlight?: string
}

export function ProjectCard({ project, highlight }: ProjectCardProps) {
  const { t } = useTranslation()
  const { localize } = useLanguage()
  const titleId = `project-${project.slug}`
  return (
    <article
      id={projectCardId(project.slug)}
      aria-labelledby={titleId}
      className={`group relative flex scroll-mt-24 flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:border-accent/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 id={titleId} className="text-xl font-semibold">
          {/* Link "estirado": su ::after cubre toda la card */}
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {localize(project.title)}
          </Link>
        </h3>
        <ProjectStatusBadge status={project.status} />
        <span className="ml-auto text-sm text-slate-500 dark:text-slate-400">
          {localize(project.period)}
        </span>
      </div>
      {project.role && (
        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
          {localize(project.role)}
        </p>
      )}

      <p className="mt-3 text-slate-600 dark:text-slate-300">{localize(project.summary)}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Badge tone={tech === highlight ? 'accent' : 'neutral'}>{tech}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-4 pt-5 text-sm">
        <ProjectLinks project={project} />
        <span
          aria-hidden="true"
          className="ml-auto flex items-center gap-1 font-medium text-accent transition-transform group-hover:translate-x-0.5"
        >
          {t('projects.viewDetails')}
          <ArrowRight className="size-4" />
        </span>
      </div>
    </article>
  )
}
