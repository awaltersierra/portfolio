import { Mail } from 'lucide-react'
import { GithubIcon } from '@/components/icons'
import { profile } from '@/content/profile'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 dark:text-slate-400">
        {/* El año del HTML pre-renderizado puede quedar viejo: el cliente lo corrige sin warning */}
        <p suppressHydrationWarning>
          © {year} {profile.name}
        </p>
        <div className="flex items-center gap-5">
          <a href={`mailto:${profile.email}`} className="link-muted">
            <Mail className="size-4" aria-hidden="true" />
            {profile.email}
          </a>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="link-muted">
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
