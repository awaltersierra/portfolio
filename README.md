# Walter Sierra · Portfolio

Portfolio personal bilingüe (español / inglés): **https://awaltersierra.github.io/portfolio/**

SPA con React 19, TypeScript, Vite y Tailwind CSS 4. La home se pre-renderiza en el build en ambos idiomas, así el contenido llega en el HTML sin esperar al JavaScript.

## Desarrollo

Requiere Node 24 y pnpm (la versión está fijada en `package.json`).

```bash
pnpm install
pnpm dev          # servidor de desarrollo
pnpm test         # tests (Vitest + Testing Library)
pnpm lint         # ESLint
pnpm build        # build de producción + pre-render de la home
pnpm preview      # sirve el build
```

## Editar el contenido

Todo el contenido vive en `src/content/`, separado de la UI. Los textos que cambian por idioma se escriben como `{ es: '…', en: '…' }`:

| Archivo         | Contenido                               |
| --------------- | --------------------------------------- |
| `profile.ts`    | Nombre, rol, bio, datos clave, contacto |
| `experience.ts` | Experiencia y formación                 |
| `skills.ts`     | Skills agrupadas                        |
| `projects.ts`   | Proyectos (card y página de detalle)    |

Los textos de la interfaz están en `src/i18n/locales/{es,en}.json`. Un test verifica que ambos idiomas tengan las mismas claves.

## Cómo funciona

- **Rutas:** `HashRouter` (`#/projects/<slug>`), porque GitHub Pages no tiene fallback para SPAs.
- **Pre-render:** `src/entry-server.tsx` renderiza la home y `scripts/prerender.mjs` la inyecta en `dist/index.html`. Un script inline en `index.html` elige el idioma del visitante antes del primer paint y React hidrata sobre ese HTML.
- **Open Graph:** `og:image`, `og:url` y `canonical` necesitan URLs absolutas; se generan si el build recibe `SITE_URL`. Las imágenes de `public/` se regeneran con `scripts/social-images.html`.
- **Deploy:** `.github/workflows/deploy.yml` corre lint, formato, tipos y tests en cada push y PR, y publica en GitHub Pages en cada push a `main`.
