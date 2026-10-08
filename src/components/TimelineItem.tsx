import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/hooks/useLanguage'
import type { Experience } from '@/types/content'

export function TimelineItem({ item }: { item: Experience }) {
  const { t } = useTranslation()
  const { localize } = useLanguage()
  const highlights = item.highlights ? localize(item.highlights) : []
  return (
    <li className="relative pb-10 pl-8 last:pb-0">
      {/* línea vertical + punto */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-0 left-[5px] w-px bg-slate-200 dark:bg-slate-800"
      />
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-accent bg-white dark:bg-slate-950"
      />
      <p className="text-sm font-medium text-accent">
        <time dateTime={String(item.start)}>{item.start}</time>
        {' — '}
        {item.end ? <time dateTime={String(item.end)}>{item.end}</time> : t('experience.present')}
      </p>
      <h3 className="mt-1 text-lg font-semibold">{localize(item.role)}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {[item.company, localize(item.location)].filter(Boolean).join(' · ')}
      </p>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{localize(item.summary)}</p>
      {highlights.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
    </li>
  )
}
