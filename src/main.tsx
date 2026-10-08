import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import '@/index.css'
import '@/i18n'
import App from '@/App'
import { RevealWhenMounted } from '@/components/RevealWhenMounted'

const container = document.getElementById('root')!

// HashRouter: GitHub Pages no tiene fallback de SPA, las rutas viven en el hash (#/projects/...)
const app = (
  <StrictMode>
    <HashRouter>
      <RevealWhenMounted>
        <App />
      </RevealWhenMounted>
    </HashRouter>
  </StrictMode>
)

// El build pre-renderiza Home (en el idioma del visitante, ver index.html y scripts/prerender.mjs).
// En otras rutas index.html marca `data-csr`: no hay HTML útil y se renderiza de cero.
const canHydrate = container.hasChildNodes() && !document.documentElement.hasAttribute('data-csr')

if (canHydrate) hydrateRoot(container, app)
else createRoot(container).render(app)
