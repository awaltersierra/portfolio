import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Home } from '@/pages/Home'

// Mueve el foco al contenido sin tocar el hash (reservado para HashRouter)
function skipToContent(e: MouseEvent) {
  e.preventDefault()
  document.getElementById('main')?.focus()
}

function App() {
  const { t } = useTranslation()
  return (
    <>
      <a href="#main" onClick={skipToContent} className="skip-link">
        {t('a11y.skipToContent')}
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
