import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderApp } from '@/test/render'

describe('App', () => {
  it('renderiza el nombre y la navegación principal', () => {
    renderApp()
    expect(screen.getByRole('heading', { level: 1, name: 'Walter Sierra' })).toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    for (const label of ['Sobre mí', 'Experiencia', 'Skills', 'Proyectos']) {
      expect(nav).toHaveTextContent(label)
    }
  })

  it('alterna el tema y lo persiste', async () => {
    renderApp()
    await userEvent.click(screen.getByRole('button', { name: 'Activar tema oscuro' }))
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    await userEvent.click(screen.getByRole('button', { name: 'Activar tema claro' }))
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('cambia a inglés: traduce la UI y el contenido, actualiza el documento y lo persiste', async () => {
    renderApp()
    expect(document.documentElement.lang).toBe('es')
    expect(screen.getByText('Desarrollador Full Stack')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /Switch to English/ }))

    const nav = screen.getByRole('navigation', { name: 'Main' })
    for (const label of ['About', 'Experience', 'Skills', 'Projects']) {
      expect(nav).toHaveTextContent(label)
    }
    expect(screen.getByText("Hi, I'm")).toBeInTheDocument()
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Night Support Engineer' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')

    // y vuelve a español
    await userEvent.click(screen.getByRole('button', { name: /Cambiar a español/ }))
    expect(screen.getByRole('navigation', { name: 'Principal' })).toHaveTextContent('Sobre mí')
    expect(localStorage.getItem('lang')).toBe('es')
  })

  it('el link de la navbar scrollea a la sección en Home', async () => {
    renderApp()
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    const link = Array.from(nav.querySelectorAll('a')).find((a) => a.textContent === 'Proyectos')!
    await userEvent.click(link)
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })

  it('abre y cierra el menú mobile', async () => {
    renderApp()
    const toggle = screen.getByRole('button', { name: 'Abrir menú' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(document.getElementById('mobile-menu')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveFocus()
  })
})
