import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import i18n from '@/i18n'

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

// jsdom reporta navigator.language = 'en-US'; los tests parten de español
beforeEach(async () => {
  await i18n.changeLanguage('es')
})

afterEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
  document.documentElement.lang = ''
})
