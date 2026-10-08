import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  tone?: 'neutral' | 'accent'
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  const toneClass =
    tone === 'accent'
      ? 'bg-accent/10 text-accent ring-accent/30'
      : 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-slate-700'
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${toneClass}`}
    >
      {children}
    </span>
  )
}
