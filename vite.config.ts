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

// base relativo: funciona en GitHub Pages sin importar el nombre del repo (usamos HashRouter)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), absoluteUrlMeta()],
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
