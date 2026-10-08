import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Home } from '@/pages/Home'

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main">
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
