/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Open Graph y canonical necesitan URLs absolutas: se agregan solo si se define SITE_URL
 * (p. ej. SITE_URL=https://usuario.github.io/portfolio/ en el workflow de deploy).
 */
function absoluteUrlMeta(): Plugin {
  const raw = process.env.SITE_URL
  const siteUrl = raw ? raw.replace(/\/?$/, '/') : undefined
  return {
    name: 'absolute-url-meta',
    transformIndexHtml() {
      if (!siteUrl) return []
      const image = `${siteUrl}og-image.jpg`
      const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({
        tag: 'meta',
        attrs,
        injectTo: 'head',
      })
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: siteUrl }, injectTo: 'head' },
        meta({ property: 'og:url', content: siteUrl }),
        meta({ property: 'og:image', content: image }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: 'Walter Sierra · Desarrollador Full Stack' }),
        meta({ name: 'twitter:image', content: image }),
      ]
    },
  }
}

/**
 * En desarrollo genera el CV al vuelo en /cv/walter-sierra-cv-<es|en>.pdf, siempre con el
 * contenido actual. En el build lo genera scripts/prerender.mjs en dist/cv/.
 */
function cvDevServer(): Plugin {
  return {
    name: 'cv-dev-server',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/cv\/walter-sierra-cv-(es|en)\.pdf$/)
        if (!match) return next()
        try {
          const { renderCv } = await server.ssrLoadModule('/src/cv/renderCv.tsx')
          const pdf = await renderCv(match[1])
          res.setHeader('Content-Type', 'application/pdf')
          res.end(pdf)
        } catch (error) {
          next(error)
        }
      })
    },
  }
}

// base relativo: funciona en GitHub Pages sin importar el nombre del repo (usamos HashRouter)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), absoluteUrlMeta(), cvDevServer()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
