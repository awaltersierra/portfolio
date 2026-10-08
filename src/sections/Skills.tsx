import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/Badge'
import { Section } from '@/components/Section'
import { skillGroups } from '@/content/skills'
import { useLanguage } from '@/hooks/useLanguage'

export function Skills() {
  const { t } = useTranslation()
  const { localize } = useLanguage()
  return (
    <Section id="skills" title={t('nav.skills')}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.id}
            className="rounded-xl border border-slate-200 p-5 dark:border-slate-800"
          >
            <h3 className="mb-3 font-semibold">{localize(group.title)}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => {
                const label = localize(item)
                return (
                  <li key={label}>
                    <Badge>{label}</Badge>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
