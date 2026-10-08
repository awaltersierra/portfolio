import { ExternalLink, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GithubIcon } from '@/components/icons'
import type { Project } from '@/types/content'

/** Links a código y demo; sin repo público muestra "Código privado". `relative z-10` los deja por encima del link de la card. */
export function ProjectLinks({ project }: { project: Project }) {
  const { t } = useTranslation()
  return (
    <>
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="link-muted relative z-10"
        >
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
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="link-muted relative z-10"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          {t('projects.demo')}
        </a>
      )}
    </>
  )
}
