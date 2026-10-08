import { ExternalLink, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/Badge'
import { GithubIcon } from '@/components/icons'
import { useLanguage } from '@/hooks/useLanguage'
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
      aria-labelledby={titleId}
      className={`flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 ${
        project.featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 id={titleId} className="text-xl font-semibold">
          {localize(project.title)}
        </h3>
        {project.status === 'in-progress' && (
          <Badge tone="accent">{t('projects.inProgress')}</Badge>
        )}
        {project.status === 'in-production' && (
          <Badge tone="success">{t('projects.inProduction')}</Badge>
        )}
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
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className="link-muted">
            <GithubIcon className="size-4" />
            {t('projects.code')}
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Lock className="size-4" aria-hidden="true" />
            {t('projects.privateRepo')}
          </span>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="link-muted">
            <ExternalLink className="size-4" aria-hidden="true" />
            {t('projects.demo')}
          </a>
        )}
      </div>
    </article>
  )
}
