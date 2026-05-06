import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

const renderAppAt = (entry: string) =>
  render(
    <MemoryRouter initialEntries={[entry]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>,
  )

describe('App Routes', () => {
  it('renders dashboard on root route', async () => {
    renderAppAt('/')
    expect(await screen.findByRole('heading', { name: 'Open a New Account' }, { timeout: 5000 })).toBeInTheDocument()
  })

  it('renders support page on /support route', async () => {
    renderAppAt('/support')
    expect(await screen.findByRole('heading', { name: 'Support Center' })).toBeInTheDocument()
  })

  it('redirects unknown route to dashboard', async () => {
    renderAppAt('/not-found')
    expect(await screen.findByRole('heading', { name: 'Open a New Account' }, { timeout: 5000 })).toBeInTheDocument()
  })
})
