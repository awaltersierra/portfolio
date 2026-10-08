import i18n, { resources, setLanguage } from '@/i18n'

type Tree = { [key: string]: string | Tree }

function keysOf(tree: Tree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([key, value]) =>
    typeof value === 'string' ? [prefix + key] : keysOf(value, `${prefix}${key}.`),
  )
}

describe('i18n', () => {
  it('es y en tienen exactamente las mismas claves', () => {
    expect(keysOf(resources.en.translation).sort()).toEqual(keysOf(resources.es.translation).sort())
  })

  it('setLanguage persiste la elección y sincroniza title y description', async () => {
    await setLanguage('en')
    expect(i18n.resolvedLanguage).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')
    expect(document.title).toBe(resources.en.translation.meta.title)
  })

  it('un cambio no explícito (detección) no se persiste', async () => {
    await i18n.changeLanguage('en')
    expect(localStorage.getItem('lang')).toBeNull()
  })
})
