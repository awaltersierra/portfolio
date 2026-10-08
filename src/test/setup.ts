import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

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

afterEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
  document.documentElement.lang = ''
})
