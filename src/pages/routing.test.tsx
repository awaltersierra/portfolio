import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { projects } from '@/content/projects'
import { renderApp } from '@/test/render'

const spiga = projects.find((p) => p.slug === 'spiga')!

describe('Navegación entre rutas', () => {
  beforeEach(() => {
    vi.mocked(Element.prototype.scrollIntoView).mockClear()
  })

  it('click en una card abre el detalle del proyecto', async () => {
    renderApp()
    const card = screen.getByRole('article', { name: 'Spiga' })
    await userEvent.click(within(card).getByRole('link', { name: 'Spiga' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Spiga' })).toBeInTheDocument()
    expect(screen.getByText(spiga.description.es)).toBeInTheDocument()
    expect(screen.getByText('Líder del proyecto y desarrollador')).toBeInTheDocument()
    expect(document.title).toBe('Spiga · Walter Sierra · Portfolio')
  })

  it('el detalle muestra navegación al proyecto siguiente', async () => {
    renderApp('/projects/spiga')
    const more = await screen.findByRole('navigation', { name: 'Más proyectos' })
    await userEvent.click(within(more).getByRole('link', { name: /Siguiente/ }))
    expect(
      screen.getByRole('heading', { level: 1, name: projects[1].title.es }),
    ).toBeInTheDocument()
  })

  it('"Volver a proyectos" vuelve a Home y lleva a la card del proyecto', async () => {
    renderApp('/projects/spiga')
    await userEvent.click(await screen.findByRole('button', { name: 'Volver a proyectos' }))

    expect(screen.getByRole('heading', { level: 1, name: 'Walter Sierra' })).toBeInTheDocument()
    const scrolledTo = vi.mocked(Element.prototype.scrollIntoView).mock.contexts
    expect(scrolledTo).toContain(document.getElementById('card-spiga'))
    expect(document.title).toBe('Walter Sierra · Portfolio')
  })

  it('un link de la navbar desde el detalle vuelve a Home y lleva a la sección', async () => {
    renderApp('/projects/spiga')
    await screen.findByRole('heading', { level: 1, name: 'Spiga' })
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    const link = Array.from(nav.querySelectorAll('a')).find((a) => a.textContent === 'Skills')!
    await userEvent.click(link)

    expect(document.getElementById('skills')).toBeInTheDocument()
    const scrolledTo = vi.mocked(Element.prototype.scrollIntoView).mock.contexts
    expect(scrolledTo).toContain(document.getElementById('skills'))
  })

  it('un proyecto inexistente muestra 404', async () => {
    renderApp('/projects/no-existe')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Página no encontrada' }),
    ).toBeInTheDocument()
  })

  it('una ruta inexistente muestra 404 con link al inicio', async () => {
    renderApp('/cualquier-cosa')
    expect(await screen.findByText('404')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('link', { name: 'Volver al inicio' }))
    expect(screen.getByRole('heading', { level: 1, name: 'Walter Sierra' })).toBeInTheDocument()
  })
})
