// @vitest-environment node
import { render } from '@/entry-server'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'

// Sin DOM: detecta cualquier acceso a window/document/localStorage durante el render
describe('pre-render de Home', () => {
  it('renderiza en Node, en español y con todas las secciones', async () => {
    const html = await render('es')
    expect(html).toContain(profile.name)
    expect(html).toContain('Desarrollador Full Stack')
    for (const id of ['about', 'experience', 'skills', 'projects']) {
      expect(html).toContain(`id="${id}"`)
    }
    for (const project of projects) expect(html).toContain(project.title.es)
  })

  it('renderiza en inglés', async () => {
    const html = await render('en')
    expect(html).toContain('Full Stack Developer')
    // renderToString escapa `&` (p. ej. "Node.js & MySQL REST API")
    for (const project of projects)
      expect(html).toContain(project.title.en.replaceAll('&', '&amp;'))
  })

  it('la foto queda en el HTML (la descubre el navegador sin esperar al JS)', async () => {
    expect(await render('es')).toContain('src="./profile.webp"')
  })
})
