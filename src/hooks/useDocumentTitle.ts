import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/** Título de pestaña propio de una página (`<título> · <base>`); al salir vuelve al título base. */
export function useDocumentTitle(title: string | undefined) {
  const { t } = useTranslation()
  const base = t('meta.title')

  useEffect(() => {
    if (!title) return
    document.title = `${title} · ${base}`
    return () => {
      document.title = base
    }
  }, [title, base])
}
