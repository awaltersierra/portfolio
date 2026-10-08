import { useLayoutEffect, type ReactNode } from 'react'

/** Quita la marca `data-csr` de <html> (que oculta #root, ver index.html) apenas React pinta. */
export function RevealWhenMounted({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.removeAttribute('data-csr')
  }, [])
  return children
}
