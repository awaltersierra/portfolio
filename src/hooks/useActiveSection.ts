import { useEffect, useState } from 'react'

/**
 * Scroll-spy: devuelve el id de la sección que cruza la línea media del viewport.
 * Recibir `ids` como array estable (constante de módulo) evita re-suscribir el observer.
 * `enabled` re-suscribe al volver a la página que contiene las secciones.
 */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids, enabled])

  return enabled ? activeId : null
}
