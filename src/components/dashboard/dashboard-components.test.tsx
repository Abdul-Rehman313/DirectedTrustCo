import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AccountCard } from './AccountCard/AccountCard'
import { AccountList } from './AccountList/AccountList'
import { OpenAccountBanner } from './OpenAccountBanner/OpenAccountBanner'

const account = {
  id: 'acct-001',
  name: 'Self-Directed Roth IRA',
  accountNumber: '**** 1023',
  balanceLabel: '$143,402.15',
  status: 'Active' as const,
  category: 'user' as const,
}

describe('Dashboard Components', () => {
  it('renders AccountCard and calls onView when view button is clicked', async () => {
    const onView = vi.fn()
    const user = userEvent.setup()

    render(<AccountCard account={account} onView={onView} />)
    await user.click(screen.getByRole('button', { name: /view self-directed roth ira/i }))

    expect(onView).toHaveBeenCalledWith('acct-001')
  })

  it('renders AccountList with account count and empty state', () => {
    const { rerender } = render(<AccountList title="Your Accounts" accounts={[account]} />)

    expect(screen.getByText('1 account(s)')).toBeInTheDocument()
    expect(screen.getByText('Self-Directed Roth IRA')).toBeInTheDocument()

    rerender(<AccountList title="Your Accounts" accounts={[]} />)
    expect(screen.getByText('No accounts yet')).toBeInTheDocument()
  })

  it('renders OpenAccountBanner and calls action callback', async () => {
    const onStartNew = vi.fn()
    const user = userEvent.setup()

    render(<OpenAccountBanner onStartNew={onStartNew} />)

    expect(screen.getByRole('heading', { name: 'Open a New Account' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /start new account/i }))
    expect(onStartNew).toHaveBeenCalledTimes(1)
  })
})
