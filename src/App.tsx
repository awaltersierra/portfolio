import { useEffect, useRef, type MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation } from 'react-router'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import type { HomeLocationState } from '@/hooks/useSectionNavigation'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { ProjectDetail } from '@/pages/ProjectDetail'

// Mueve el foco al contenido sin tocar el hash (lo usa HashRouter)
function skipToContent(e: MouseEvent) {
  e.preventDefault()
  document.getElementById('main')?.focus()
}

/**
 * Al cambiar de página: arriba de todo (salvo que Home tenga un destino de scroll)
 * y foco en <main> para que los lectores de pantalla anuncien la página nueva.
 */
function useRouteChangeReset() {
  const { pathname, state } = useLocation()
  const hasScrollTarget = Boolean((state as HomeLocationState)?.scrollTo)
  // Comparar contra la ruta anterior (y no un flag de "primer render") es robusto al doble efecto de StrictMode
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    if (!hasScrollTarget) window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('main')?.focus({ preventScroll: true })
    // Solo reacciona a cambios de ruta, no al estado limpiado por Home
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
}

function App() {
  const { t } = useTranslation()
  useRouteChangeReset()
  return (
    <>
      <a href="#main" onClick={skipToContent} className="skip-link">
        {t('a11y.skipToContent')}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
