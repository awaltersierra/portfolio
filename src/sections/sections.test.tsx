import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { experience } from '@/content/experience'
import { projects } from '@/content/projects'
import { profile } from '@/content/profile'
import { filterableTechs } from '@/lib/projects'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'
import { renderWithRouter } from '@/test/render'

describe('Hero', () => {
  it('muestra foto, rol, bio y contacto', () => {
    render(<Hero />)
    expect(screen.getByRole('img', { name: `Foto de ${profile.name}` })).toBeInTheDocument()
    expect(screen.getByText(profile.bio.es[0])).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Contactame/ })).toHaveAttribute(
      'href',
      `mailto:${profile.email}`,
    )
    // CV en el idioma activo
    const cv = screen.getByRole('link', { name: /Descargar CV/ })
    expect(cv).toHaveAttribute('href', './cv/walter-sierra-cv-es.pdf')
    expect(cv).toHaveAttribute('download', 'walter-sierra-cv-es.pdf')
  })
})

describe('Experience', () => {
  it('lista solo la experiencia cargada, de la más reciente a la más antigua', () => {
    render(<Experience />)
    const roles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(roles.slice(0, experience.length)).toEqual(experience.map((e) => e.role.es))
    expect(screen.getAllByText('UNLPam — Universidad Nacional de La Pampa')).toHaveLength(2)
    expect(screen.getByText('Tesis pendiente')).toBeInTheDocument()
    expect(screen.getByText('Título obtenido')).toBeInTheDocument()
  })
})

describe('Skills', () => {
  it('traduce las competencias y deja fijos los nombres de tecnologías', () => {
    render(<Skills />)
    expect(screen.getByText('Liderazgo técnico')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })
})

describe('Projects', () => {
  it('filterableTechs ignora tecnologías de un solo proyecto y ordena por uso', () => {
    const techs = filterableTechs(projects)
    expect(techs).not.toContain('Celery')
    expect(techs).toContain('Django')
    // ordenadas de más a menos usadas
    const uses = techs.map((tech) => projects.filter((p) => p.stack.includes(tech)).length)
    expect(uses).toEqual([...uses].sort((a, b) => b - a))
    expect(techs).toContain('React')
  })

  it('filtra por tecnología y vuelve a mostrar todos', async () => {
    renderWithRouter(<Projects />)
    const cards = () => screen.getAllByRole('article')
    expect(cards()).toHaveLength(projects.length)

    await userEvent.click(screen.getByRole('button', { name: 'React' }))
    expect(screen.getByRole('button', { name: 'React' })).toHaveAttribute('aria-pressed', 'true')
    const withReact = projects.filter((p) => p.stack.includes('React'))
    expect(cards()).toHaveLength(withReact.length)
    expect(screen.getByText(`${withReact.length} proyectos`)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Todos' }))
    expect(cards()).toHaveLength(projects.length)
  })

  it('indica código privado cuando no hay repoUrl', () => {
    renderWithRouter(<Projects />)
    const card = screen.getByRole('article', { name: 'Puntualin' })
    expect(within(card).getByText('Código privado')).toBeInTheDocument()
    expect(within(card).getByText('En desarrollo')).toBeInTheDocument()
  })

  it('muestra período, rol y estado en producción', () => {
    renderWithRouter(<Projects />)
    const card = screen.getByRole('article', { name: 'Spiga' })
    expect(within(card).getByText('2023 — actualidad')).toBeInTheDocument()
    expect(within(card).getByText('Líder del proyecto y desarrollador')).toBeInTheDocument()
    expect(within(card).getByText('En producción')).toBeInTheDocument()
  })
})
