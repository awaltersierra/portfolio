import { Section } from '@/components/Section'
import { NAV_ITEMS } from '@/content/navigation'
import { profile } from '@/content/profile'

// Placeholders: cada sección se reemplaza por su componente real en la fase 4
export function Home() {
  return (
    <>
      {NAV_ITEMS.map(({ id, label }) =>
        id === 'about' ? (
          <Section key={id} id={id}>
            <div className="flex min-h-[60vh] flex-col justify-center">
              <p className="font-medium text-accent">Hola, soy</p>
              <h1 className="mt-2 text-5xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
            </div>
          </Section>
        ) : (
          <Section key={id} id={id} title={label}>
            <div className="h-64 rounded-xl border border-dashed border-slate-300 dark:border-slate-700" />
          </Section>
        ),
      )}
    </>
  )
}
