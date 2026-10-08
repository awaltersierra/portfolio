import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { MemoryRouter } from 'react-router'
import App from '@/App'

/** Renderiza dentro de un router en memoria (los componentes usan Link/useNavigate). */
export function renderWithRouter(ui: ReactElement, route = '/') {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>)
}

export function renderApp(route = '/') {
  return renderWithRouter(<App />, route)
}
