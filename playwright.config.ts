import { defineConfig, devices } from '@playwright/test'

const CI = Boolean(process.env.CI)

/**
 * Tests E2E sobre el build de producción (pre-render + hidratación, rutas, CV).
 * Requieren `pnpm build` antes: sirven dist/ con `vite preview`.
 */
export default defineConfig({
  testDir: 'e2e',
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    locale: 'es-ES',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      // En local usa el Chrome instalado; en CI, el Chromium que instala el workflow
      use: { ...devices['Desktop Chrome'], channel: CI ? undefined : 'chrome' },
    },
  ],
  webServer: {
    command: 'pnpm exec vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !CI,
  },
})
