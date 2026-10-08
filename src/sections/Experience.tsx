import { GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { TimelineItem } from '@/components/TimelineItem'
import { education, experience } from '@/content/experience'
import { useLanguage } from '@/hooks/useLanguage'

export function Experience() {
  const { t } = useTranslation()
  const { localize } = useLanguage()
  return (
    <Section id="experience" title={t('nav.experience')}>
      <ol>
        {experience.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </ol>

      <h3 className="mt-16 mb-6 text-xl font-semibold">{t('experience.education')}</h3>
      <ul className="grid gap-4 sm:grid-cols-2">
        {education.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 rounded-xl border border-slate-200 p-5 dark:border-slate-800"
          >
            <GraduationCap className="mt-0.5 size-6 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="font-semibold">{localize(item.title)}</p>
              <p className="text-slate-600 dark:text-slate-300">{item.institution}</p>
              {item.status && (
                <p className="mt-1 text-sm font-medium text-accent">{localize(item.status)}</p>
              )}
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {localize(item.location)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
