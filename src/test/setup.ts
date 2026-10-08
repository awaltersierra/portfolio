import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import i18n from '@/i18n'

// Los tests con `@vitest-environment node` (pre-render) no tienen DOM: solo stubs de navegador acá
if (typeof window !== 'undefined') {
  // jsdom no implementa estas APIs del navegador
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)

  vi.stubGlobal(
    'matchMedia',
    (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList,
  )

  Element.prototype.scrollIntoView = vi.fn()
  window.scrollTo = vi.fn() as typeof window.scrollTo

  afterEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.lang = ''
  })
}

// jsdom reporta navigator.language = 'en-US'; los tests parten de español
beforeEach(async () => {
  await i18n.changeLanguage('es')
})
