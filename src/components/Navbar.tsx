import { useState, type MouseEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SECTION_IDS } from '@/content/navigation'
import { profile } from '@/content/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useSectionNavigation } from '@/hooks/useSectionNavigation'
import { LangToggle } from '@/components/LangToggle'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Navbar() {
  const { t } = useTranslation()
  const { isHome, goToSection, goHome } = useSectionNavigation()
  const activeId = useActiveSection(SECTION_IDS, isHome)
  const [menuOpen, setMenuOpen] = useState(false)

  // preventDefault: el hash de la URL es del HashRouter; los href apuntan a Home como fallback
  const goTo = (e: MouseEvent, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    goToSection(id)
  }

  const goTop = (e: MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    goHome()
  }

  const links = SECTION_IDS.map((id) => {
    const isActive = activeId === id
    return (
      <li key={id}>
        <a
          href="#/"
          onClick={(e) => goTo(e, id)}
          aria-current={isActive ? 'location' : undefined}
          className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            isActive
              ? 'text-accent'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
        >
          {t(`nav.${id}`)}
        </a>
      </li>
    )
  })

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80">
      <nav
        aria-label={t('nav.label')}
        className="mx-auto flex h-16 max-w-5xl items-center gap-2 px-4 sm:px-6"
      >
        <a
          href="#/"
          onClick={goTop}
          className="mr-auto text-lg font-bold tracking-tight"
          aria-label={t('nav.home', { name: profile.name })}
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">{links}</ul>

        <div className="flex items-center gap-1 md:ml-2">
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="icon-button md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul
          id="mobile-menu"
          className="border-t border-slate-200 px-4 py-2 md:hidden dark:border-slate-800"
        >
          {links}
        </ul>
      )}
    </header>
  )
}
