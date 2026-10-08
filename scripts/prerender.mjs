// Inyecta el HTML de Home (renderizado con src/entry-server.tsx) en dist/index.html.
// Se ejecuta al final de `pnpm build`, después del build de cliente y del de SSR.
//
// Se pre-renderizan los dos idiomas: español dentro de #root y el inglés en un <template>.
// Un script inline justo después elige el del visitante antes de la primera pintura
// (index.html deja el idioma detectado en <html data-lang>).
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const ssrDir = new URL('dist-ssr/', root)
const indexFile = new URL('dist/index.html', root)
const MARKER = '<div id="root"></div>'

const { render, renderCv, cvFileName } = await import(new URL('entry-server.js', ssrDir).href)
const html = await readFile(indexFile, 'utf8')

if (!html.includes(MARKER)) {
  throw new Error(`prerender: no se encontró ${MARKER} en dist/index.html`)
}

const es = await render('es')
const en = await render('en')

const swapScript = `<script>
  ;(function () {
    var html = document.documentElement
    var template = document.getElementById('prerender-en')
    if (html.dataset.lang === 'en') document.getElementById('root').innerHTML = template.innerHTML
    template.remove()
  })()
</script>`

const injected = `<div id="root">${es}</div><template id="prerender-en">${en}</template>${swapScript}`
await writeFile(indexFile, html.replace(MARKER, injected))

// CV en PDF por idioma, generado desde el mismo contenido que muestra el sitio
const cvDir = new URL('dist/cv/', root)
await mkdir(cvDir, { recursive: true })
const cvSizes = []
for (const language of ['es', 'en']) {
  const pdf = await renderCv(language)
  await writeFile(new URL(cvFileName(language), cvDir), pdf)
  cvSizes.push(`${language} ${(pdf.length / 1024).toFixed(1)} KiB`)
}
await rm(ssrDir, { recursive: true, force: true })

const kib = (s) => (s.length / 1024).toFixed(1)
console.log(`prerender: Home inyectada en dist/index.html (es ${kib(es)} KiB, en ${kib(en)} KiB)`)
console.log(`prerender: CV en dist/cv/ (${cvSizes.join(', ')})`)
