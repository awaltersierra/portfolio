import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import i18n from '@/i18n'
import App from '@/App'
import type { Language } from '@/types/i18n'

/**
 * Pre-render de Home en build (scripts/prerender.mjs), una vez por idioma: el HTML llega
 * con contenido y no depende del JS para la primera pintura. index.html elige el idioma
 * del visitante antes de pintar y main.tsx hidrata sobre ese HTML.
 */
export async function render(language: Language): Promise<string> {
  await i18n.changeLanguage(language)
  return renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </StrictMode>,
  )
}
