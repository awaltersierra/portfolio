import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router'
import { Badge } from '@/components/Badge'
import { ProjectLinks } from '@/components/ProjectLinks'
import { ProjectStatusBadge } from '@/components/ProjectStatusBadge'
import { projects } from '@/content/projects'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/hooks/useLanguage'
import type { HomeLocationState } from '@/hooks/useSectionNavigation'
import { projectCardId } from '@/lib/projects'
import { NotFound } from '@/pages/NotFound'

export function ProjectDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { localize } = useLanguage()
  const navigate = useNavigate()

  const index = projects.findIndex((p) => p.slug === slug)
  const project = index >= 0 ? projects[index] : undefined
  useDocumentTitle(project && localize(project.title))

  if (!project) return <NotFound />

  const previous = projects[index - 1]
  const next = projects[index + 1]

  // Vuelve a Home y deja la card de este proyecto a la vista
  const backToProjects = () =>
    navigate('/', {
      state: { scrollTo: projectCardId(project.slug) } satisfies HomeLocationState,
    })

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <button type="button" onClick={backToProjects} className="btn btn-ghost -ml-4">
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t('detail.back')}
      </button>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {localize(project.title)}
          </h1>
          <ProjectStatusBadge status={project.status} />
        </div>
        <p className="mt-4 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-300">
          {localize(project.summary)}
        </p>
      </header>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_16rem]">
        <div>
          <h2 className="text-xl font-semibold">{t('detail.about')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {localize(project.description)}
          </p>

          {project.images && project.images.length > 0 && (
            <section aria-labelledby="screenshots" className="mt-12">
              <h2 id="screenshots" className="text-xl font-semibold">
                {t('detail.screenshots')}
              </h2>
              <div className="mt-4 grid gap-4">
                {project.images.map((image) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={localize(image.alt)}
                    loading="lazy"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside>
          <dl className="space-y-6 text-sm">
            {project.role && (
              <div>
                <dt className="font-medium text-slate-500 dark:text-slate-400">
                  {t('detail.role')}
                </dt>
                <dd className="mt-1 text-base">{localize(project.role)}</dd>
              </div>
            )}
            <div>
              <dt className="font-medium text-slate-500 dark:text-slate-400">
                {t('detail.period')}
              </dt>
              <dd className="mt-1 text-base">{localize(project.period)}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500 dark:text-slate-400">
                {t('detail.stack')}
              </dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500 dark:text-slate-400">
                {t('detail.links')}
              </dt>
              <dd className="mt-2 flex flex-col gap-2">
                <ProjectLinks project={project} />
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <nav
        aria-label={t('detail.more')}
        className="mt-16 grid gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2 dark:border-slate-800"
      >
        {previous ? (
          <Link
            to={`/projects/${previous.slug}`}
            className="group rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t('detail.previous')}
            </span>
            <span className="mt-1 block font-semibold group-hover:text-accent">
              {localize(previous.title)}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            to={`/projects/${next.slug}`}
            className="group rounded-xl p-4 text-right hover:bg-slate-50 sm:col-start-2 dark:hover:bg-slate-900"
          >
            <span className="flex items-center justify-end gap-1 text-sm text-slate-500 dark:text-slate-400">
              {t('detail.next')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
            <span className="mt-1 block font-semibold group-hover:text-accent">
              {localize(next.title)}
            </span>
          </Link>
        )}
      </nav>
    </article>
  )
}
