import { useTranslation } from 'react-i18next'
import { Section } from '@/components/Section'
import { SECTION_IDS } from '@/content/navigation'
import { profile } from '@/content/profile'
import { useLanguage } from '@/hooks/useLanguage'

// Placeholders: cada sección se reemplaza por su componente real en la fase 4
export function Home() {
  const { t } = useTranslation()
  const { localize } = useLanguage()
  return (
    <>
      {SECTION_IDS.map((id) =>
        id === 'about' ? (
          <Section key={id} id={id}>
            <div className="flex min-h-[60vh] flex-col justify-center">
              <p className="font-medium text-accent">{t('hero.greeting')}</p>
              <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
              <p className="mt-4 text-xl text-slate-600 dark:text-slate-400">
                {localize(profile.role)}
              </p>
            </div>
          </Section>
        ) : (
          <Section key={id} id={id} title={t(`nav.${id}`)}>
            <div className="h-64 rounded-xl border border-dashed border-slate-300 dark:border-slate-700" />
          </Section>
        ),
      )}
    </>
  )
}
