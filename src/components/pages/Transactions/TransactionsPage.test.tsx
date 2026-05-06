import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TransactionsPage } from './TransactionsPage'

const renderTransactionsPage = (view?: 'empty' | 'filled' | 'filtering-open') =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <TransactionsPage view={view} />
    </MemoryRouter>,
  )

const getTable = () => screen.getByRole('table')
const getAllRows = () => within(getTable()).getAllByRole('row')
const getBodyRows = () => getAllRows().slice(1)

const setDateRange = ({ from, to }: { from?: string; to?: string }) => {
  if (from) {
    fireEvent.change(screen.getByLabelText('From date'), { target: { value: from } })
  }

  if (to) {
    fireEvent.change(screen.getByLabelText('To date'), { target: { value: to } })
  }
}

const selectOption = async ({
  triggerName,
  optionName,
}: {
  triggerName: string
  optionName: string
}) => {
  const user = userEvent.setup()
  await user.click(screen.getByRole('combobox', { name: triggerName }))
  await user.click(screen.getByRole('option', { name: optionName }))
}

describe('TransactionsPage', () => {
  it('renders filled state by default', () => {
    renderTransactionsPage()

    expect(screen.queryByText('No Transactions Available')).not.toBeInTheDocument()
    expect(getBodyRows()).toHaveLength(5)
  })

  it('renders heading and table headers', () => {
    renderTransactionsPage('filled')

    expect(screen.getByRole('heading', { name: 'Transaction' })).toBeInTheDocument()
    expect(screen.getByText('View all transactions in your account')).toBeInTheDocument()
    expect(within(getTable()).getAllByRole('columnheader')).toHaveLength(7)
  })

  it('shows empty state for empty view', () => {
    renderTransactionsPage('empty')

    expect(within(getTable()).getByText('No Transactions Available')).toBeInTheDocument()
  })

  it('filters rows by account', async () => {
    renderTransactionsPage('filled')

    await selectOption({ triggerName: 'Select Account', optionName: '389010774' })

    const table = getTable()
    expect(getBodyRows()).toHaveLength(2)
    expect(within(table).queryByText('248294422')).not.toBeInTheDocument()
  })

  it('filters rows by category', async () => {
    renderTransactionsPage('filled')

    await selectOption({ triggerName: 'Category', optionName: 'Credit' })

    const table = getTable()
    expect(getBodyRows()).toHaveLength(2)
    expect(within(table).queryByText('John Doe')).not.toBeInTheDocument()
  })

  it('applies account and category filters together', async () => {
    renderTransactionsPage('filled')

    await selectOption({ triggerName: 'Select Account', optionName: '389010774' })
    await selectOption({ triggerName: 'Category', optionName: 'Credit' })

    const table = getTable()
    expect(getBodyRows()).toHaveLength(1)
    expect(within(table).getByText('Arabella Wixx')).toBeInTheDocument()
  })

  it('resets account filter when all accounts is selected', async () => {
    renderTransactionsPage('filled')

    await selectOption({ triggerName: 'Select Account', optionName: '389010774' })
    expect(getBodyRows()).toHaveLength(2)

    await selectOption({ triggerName: 'Select Account', optionName: 'All Accounts' })
    expect(getBodyRows()).toHaveLength(5)
  })

  it('keeps date range inclusive', () => {
    renderTransactionsPage('filled')

    setDateRange({ from: '2025-01-08', to: '2025-01-08' })
    expect(getBodyRows()).toHaveLength(2)
    expect(within(getTable()).getAllByText('01/08/2025')).toHaveLength(2)
  })

  it('shows empty results for invalid date range', () => {
    renderTransactionsPage('filled')

    setDateRange({ from: '2025-12-31', to: '2025-01-01' })
    expect(within(getTable()).getByText('No Transactions Available')).toBeInTheDocument()
  })

  it('starts with preselected filters in filtering-open view', () => {
    renderTransactionsPage('filtering-open')

    expect(screen.getByRole('combobox', { name: 'Select Account' })).toHaveTextContent('248294422')
    expect(screen.getByRole('combobox', { name: 'Category' })).toHaveTextContent('Investment')
    expect(getBodyRows()).toHaveLength(2)
  })
})
