# Walter Sierra · Portfolio

Portfolio personal bilingüe (español / inglés): **https://awaltersierra.github.io/portfolio/**

SPA con React 19, TypeScript, Vite y Tailwind CSS 4. La home se pre-renderiza en el build en ambos idiomas, así el contenido llega en el HTML sin esperar al JavaScript.

## Desarrollo

Requiere Node 24 y pnpm (la versión está fijada en `package.json`).

```bash
pnpm install
pnpm dev          # servidor de desarrollo
pnpm test         # tests unitarios (Vitest + Testing Library)
pnpm test:e2e     # tests E2E sobre el build (Playwright; correr pnpm build antes)
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

El **CV en PDF** (botón "Descargar CV") se genera desde ese mismo contenido, en ambos idiomas: en el build queda en `dist/cv/` y con `pnpm dev` se genera al vuelo. El diseño está en `src/cv/CvDocument.tsx`.

Los textos de la interfaz están en `src/i18n/locales/{es,en}.json`. Un test verifica que ambos idiomas tengan las mismas claves.

## Cómo funciona

- **Rutas:** `HashRouter` (`#/projects/<slug>`), porque GitHub Pages no tiene fallback para SPAs.
- **Pre-render:** `src/entry-server.tsx` renderiza la home y `scripts/prerender.mjs` la inyecta en `dist/index.html`. Un script inline en `index.html` elige el idioma del visitante antes del primer paint y React hidrata sobre ese HTML.
- **Open Graph:** `og:image`, `og:url` y `canonical` necesitan URLs absolutas; se generan si el build recibe `SITE_URL`. Las imágenes de `public/` se regeneran con `scripts/social-images.html`.
- **CI/CD:** `.github/workflows/deploy.yml` corre lint, formato, tipos, tests unitarios y E2E en cada push y PR, y publica en GitHub Pages en cada push a `main`. Las actions están fijadas por hash.
- **E2E:** `e2e/` (Playwright) prueba el build real: pre-render e hidratación en español e inglés, tema guardado, rutas y descarga del CV. Cualquier error de consola, incluidos los de hidratación, hace fallar el test. Localmente: `pnpm build && pnpm test:e2e`.
- **Dependencias:** Dependabot abre los lunes un PR agrupado para npm y otro para las actions, y el CI los valida.
