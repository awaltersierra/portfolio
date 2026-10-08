import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import type { HomeLocationState } from '@/hooks/useSectionNavigation'
import { jumpToElement } from '@/lib/scroll'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

// El orden debe coincidir con SECTION_IDS (content/navigation.ts)
export function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const scrollTo = (location.state as HomeLocationState)?.scrollTo

  // Al llegar desde otra ruta con destino (navbar, "volver a proyectos"): saltar ahí
  // y limpiar el estado para que recargar la página no repita el salto
  useEffect(() => {
    if (!scrollTo) return
    jumpToElement(scrollTo)
    navigate('.', { replace: true, state: null })
  }, [scrollTo, navigate])

  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
    </>
  )
}
