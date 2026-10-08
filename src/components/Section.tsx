import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title?: string
  children: ReactNode
}

export function Section({ id, title, children }: SectionProps) {
  const headingId = title ? `${id}-title` : undefined
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {title && (
          <h2 id={headingId} className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  )
}
