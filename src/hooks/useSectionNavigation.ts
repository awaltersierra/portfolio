import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { scrollToSection, scrollToTop } from '@/lib/scroll'

/** Estado de navegación hacia Home: id del elemento al que hay que llevar el scroll. */
export type HomeLocationState = { scrollTo?: string } | null

/**
 * Navegación a secciones de Home desde cualquier ruta: en Home scrollea directo;
 * desde otra página navega a `/` y Home hace el scroll al montar (ver pages/Home).
 */
export function useSectionNavigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const goToSection = useCallback(
    (id: string) => {
      if (isHome) scrollToSection(id)
      else navigate('/', { state: { scrollTo: id } satisfies HomeLocationState })
    },
    [isHome, navigate],
  )

  const goHome = useCallback(() => {
    if (isHome) scrollToTop()
    else navigate('/')
  }, [isHome, navigate])

  return { isHome, goToSection, goHome }
}
