import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '@/App'

describe('App', () => {
  it('renderiza el nombre y la navegación principal', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: 'Walter Sierra' })).toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    for (const label of ['Sobre mí', 'Experiencia', 'Skills', 'Proyectos']) {
      expect(nav).toHaveTextContent(label)
    }
  })

  it('alterna el tema y lo persiste', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'Activar tema oscuro' }))
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    await userEvent.click(screen.getByRole('button', { name: 'Activar tema claro' }))
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('alterna el idioma, actualiza <html lang> y lo persiste', async () => {
    localStorage.setItem('lang', 'es')
    render(<App />)
    expect(document.documentElement.lang).toBe('es')

    await userEvent.click(screen.getByRole('button', { name: 'Switch to English' }))
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')
  })

  it('el link de la navbar scrollea a la sección sin cambiar el hash', async () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: 'Principal' })
    const link = Array.from(nav.querySelectorAll('a')).find((a) => a.textContent === 'Proyectos')!
    await userEvent.click(link)
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
    expect(window.location.hash).toBe('')
  })

  it('abre y cierra el menú mobile', async () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: 'Abrir menú' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(toggle)
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(document.getElementById('mobile-menu')).toBeInTheDocument()
  })
})
