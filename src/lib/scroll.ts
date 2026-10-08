/** Scrollea a un elemento por id. Respeta `scroll-behavior` del CSS (y por ende prefers-reduced-motion). */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView()
}

/** Salto sin animación: al llegar desde otra ruta no tiene sentido animar desde arriba. */
export function jumpToElement(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
}

export function scrollToTop() {
  window.scrollTo({ top: 0 })
}
