import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'success'
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  const toneClass =
    tone === 'accent'
      ? 'bg-accent/10 text-accent ring-accent/30'
      : tone === 'success'
        ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/30'
        : 'bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-slate-700'
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${toneClass}`}
    >
      {children}
    </span>
  )
}
