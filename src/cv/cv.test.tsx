// @vitest-environment node
import { renderCv } from '@/cv/renderCv'

describe('CV en PDF', () => {
  it.each(['es', 'en'] as const)('genera un PDF válido en %s', async (language) => {
    const pdf = await renderCv(language)
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-')
    expect(pdf.length).toBeGreaterThan(5_000)
  })
})
