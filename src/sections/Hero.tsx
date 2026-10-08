import { ArrowDown, Download, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GithubIcon } from '@/components/icons'
import { Section } from '@/components/Section'
import { profile } from '@/content/profile'
import { useLanguage } from '@/hooks/useLanguage'
import { cvFileName, cvPath } from '@/lib/cv'
import { scrollToSection } from '@/lib/scroll'

export function Hero() {
  const { t } = useTranslation()
  const { localize, language } = useLanguage()
  return (
    <Section id="about">
      <div className="grid items-center gap-10 md:min-h-[calc(100vh-14rem)] md:grid-cols-[1fr_auto] md:gap-16">
        <img
          src={profile.photo}
          alt={t('hero.photoAlt', { name: profile.name })}
          width={342}
          height={512}
          fetchPriority="high"
          className="aspect-[2/3] w-36 rounded-2xl object-cover shadow-lg ring-1 ring-slate-900/5 sm:w-44 md:order-last md:w-64 dark:ring-white/10"
        />

        <div>
          <p className="font-medium text-accent">{t('hero.greeting')}</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-xl font-medium text-slate-600 sm:text-2xl dark:text-slate-300">
            {localize(profile.role)}
          </p>

          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {localize(profile.bio).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <Mail className="size-4" aria-hidden="true" />
              {t('hero.contact')}
            </a>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
            {/* PDF generado en el build desde src/content, en el idioma activo */}
            <a
              href={cvPath(language)}
              download={cvFileName(language)}
              type="application/pdf"
              className="btn btn-secondary"
            >
              <Download className="size-4" aria-hidden="true" />
              {t('hero.downloadCv')}
            </a>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="btn btn-ghost"
            >
              {t('hero.viewProjects')}
              <ArrowDown className="size-4" aria-hidden="true" />
            </button>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3 dark:border-slate-800">
            {profile.facts.map((fact) => (
              <div key={fact.label.en} className="flex flex-col-reverse">
                <dt className="text-sm text-slate-500 dark:text-slate-400">
                  {localize(fact.label)}
                </dt>
                <dd className="text-lg font-semibold">{localize(fact.value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
