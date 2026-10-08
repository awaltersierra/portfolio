import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/Badge'
import type { ProjectStatus } from '@/types/content'

export function ProjectStatusBadge({ status }: { status?: ProjectStatus }) {
  const { t } = useTranslation()
  if (status === 'in-progress') return <Badge tone="accent">{t('projects.inProgress')}</Badge>
  if (status === 'in-production') return <Badge tone="success">{t('projects.inProduction')}</Badge>
  return null
}
