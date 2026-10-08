import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFound() {
  const { t } = useTranslation()
  useDocumentTitle(t('notFound.title'))
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-start justify-center px-4 py-20 sm:px-6">
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t('notFound.title')}</h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{t('notFound.message')}</p>
      <Link to="/" className="btn btn-primary mt-8">
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t('notFound.back')}
      </Link>
    </div>
  )
}
