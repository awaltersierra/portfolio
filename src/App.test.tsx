import { render, screen } from '@testing-library/react'
import App from '@/App'

describe('App', () => {
  it('renderiza el nombre', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Walter Sierra' })).toBeInTheDocument()
  })
})
