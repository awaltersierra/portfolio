/** Scrollea a una sección por id. Respeta `scroll-behavior` del CSS (y por ende prefers-reduced-motion). */
export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView()
}

export function scrollToTop() {
  window.scrollTo({ top: 0 })
}
