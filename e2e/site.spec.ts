import { expect, test as base, type Page } from '@playwright/test'

// Cualquier error de consola o excepción falla el test: así se detectan, entre otros,
// los errores de hidratación entre el HTML pre-renderizado y el cliente.
const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = []
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })
      page.on('pageerror', (error) => errors.push(error.message))
      await use(errors)
      expect(errors, 'errores de consola').toEqual([])
    },
    { auto: true },
  ],
})

async function readDownload(page: Page, trigger: () => Promise<void>) {
  const [download] = await Promise.all([page.waitForEvent('download'), trigger()])
  const chunks: Buffer[] = []
  for await (const chunk of await download.createReadStream()) chunks.push(chunk as Buffer)
  return { name: download.suggestedFilename(), bytes: Buffer.concat(chunks) }
}

/** La página quedó hidratada si un control de React responde. */
async function expectInteractive(page: Page, resultsPattern: RegExp) {
  const filter = page.locator('#projects').getByRole('button', { name: 'React', exact: true })
  await filter.click()
  await expect(filter).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('#projects [aria-live]')).toHaveText(resultsPattern)
}

test.describe('Home en español', () => {
  test('llega pre-renderizada en el HTML y se hidrata', async ({ page, request }) => {
    const html = await (await request.get('/')).text()
    expect(html).toContain('id="about"')
    expect(html).toContain('Walter Sierra')

    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Walter Sierra')
    await expect(page.getByText('Hola, soy')).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.locator('html')).not.toHaveAttribute('data-csr', /.*/)
    await expectInteractive(page, /^\d+ proyectos?$/)
  })

  test('respeta el tema oscuro guardado al hidratar', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect(page.getByRole('button', { name: 'Activar tema claro' })).toBeVisible()
  })
})

test.describe('Home con el navegador en inglés', () => {
  test.use({ locale: 'en-US' })

  test('muestra el pre-render en inglés y se hidrata', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText("Hi, I'm")).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expectInteractive(page, /^\d+ projects?$/)
  })
})

test.describe('Rutas', () => {
  test('el detalle abre por URL directa y vuelve a su card', async ({ page }) => {
    await page.goto('/#/projects/spiga')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Spiga')
    await expect(page).toHaveTitle('Spiga · Walter Sierra · Portfolio')

    await page.getByRole('button', { name: 'Volver a proyectos' }).click()
    await expect(page).toHaveURL(/#\/$/)
    await expect(page.locator('#card-spiga')).toBeInViewport()
  })

  test('una ruta inexistente muestra la 404', async ({ page }) => {
    await page.goto('/#/no-existe')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página no encontrada')
  })
})

test('el CV se descarga como PDF en el idioma activo', async ({ page }) => {
  await page.goto('/')

  const es = await readDownload(page, () =>
    page.getByRole('link', { name: 'Descargar CV' }).click(),
  )
  expect(es.name).toBe('walter-sierra-cv-es.pdf')
  expect(es.bytes.subarray(0, 5).toString()).toBe('%PDF-')

  await page.getByRole('button', { name: /Switch to English/ }).click()
  const en = await readDownload(page, () => page.getByRole('link', { name: 'Download CV' }).click())
  expect(en.name).toBe('walter-sierra-cv-en.pdf')
  expect(en.bytes.subarray(0, 5).toString()).toBe('%PDF-')
})
