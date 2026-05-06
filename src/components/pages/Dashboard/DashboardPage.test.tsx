import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { DashboardPage } from './DashboardPage'
import type { Account } from '../../../types/account.types'

const sampleAccounts: Account[] = [
  {
    id: 'user-1',
    name: 'Self-Directed Roth IRA',
    accountNumber: '**** 1023',
    balanceLabel: '$143,402.15',
    status: 'Active',
    category: 'user',
  },
  {
    id: 'user-2',
    name: 'Self-Directed Traditional IRA',
    accountNumber: '**** 4412',
    balanceLabel: '$91,290.74',
    status: 'Pending',
    category: 'user',
  },
  {
    id: 'other-1',
    name: 'Solo 401(k)',
    accountNumber: '**** 3345',
    balanceLabel: '$0.00',
    status: 'Review',
    category: 'other',
  },
]

const LocationDisplay = () => {
  const location = useLocation()
  return <p data-testid="location">{location.pathname}</p>
}

const renderDashboard = (props?: Partial<ComponentProps<typeof DashboardPage>>) =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <DashboardPage accountsData={sampleAccounts} {...props} />
    </MemoryRouter>,
  )

describe('DashboardPage', () => {
  it('renders dashboard heading, banner, and grouped account sections', () => {
    renderDashboard({ accountsData: sampleAccounts })

    expect(screen.getByRole('heading', { name: 'Open a New Account' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Your Accounts' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Other Accounts' })).toBeInTheDocument()

    // Verifies grouping logic: 2 user accounts, 1 other account.
    expect(screen.getByText('2 account(s)')).toBeInTheDocument()
    expect(screen.getByText('1 account(s)')).toBeInTheDocument()
  })

  it('calls onViewAccount callback when provided', async () => {
    const onViewAccount = vi.fn()
    renderDashboard({ accountsData: sampleAccounts, onViewAccount })
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /view self-directed roth ira/i }))

    expect(onViewAccount).toHaveBeenCalledWith('user-1')
  })

  it('navigates to account detail route when no onViewAccount callback is provided', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <DashboardPage accountsData={sampleAccounts} />
                <LocationDisplay />
              </>
            }
          />
          <Route path="/accounts/:id" element={<LocationDisplay />} />
          <Route path="/create-account" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /view self-directed roth ira/i }))
    expect(screen.getByTestId('location')).toHaveTextContent('/accounts/user-1')
  })

  it('navigates to create-account when "Start New Account" is clicked', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <DashboardPage accountsData={sampleAccounts} />
                <LocationDisplay />
              </>
            }
          />
          <Route path="/accounts/:id" element={<LocationDisplay />} />
          <Route path="/create-account" element={<LocationDisplay />} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /start new account/i }))
    expect(screen.getByTestId('location')).toHaveTextContent('/create-account')
  })

  it('shows empty-state cards when no accounts are available', () => {
    renderDashboard({ accountsData: [] })

    expect(screen.getAllByText('No accounts yet')).toHaveLength(2)
    expect(screen.getAllByText('Open your first account to begin investing.')).toHaveLength(2)
  })
})
