import { renderToBuffer } from '@react-pdf/renderer'
import { CvDocument } from '@/cv/CvDocument'
import type { Language } from '@/types/i18n'

/** Genera el PDF del CV. Solo corre en Node (build y servidor de desarrollo), nunca en el cliente. */
export function renderCv(language: Language): ReturnType<typeof renderToBuffer> {
  return renderToBuffer(<CvDocument language={language} />)
}
