import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { FeesPage } from './FeesPage'

// Small reusable render helper so every test mounts the page in a router context.
// We use MemoryRouter because tests do not need a real browser URL bar/history.
// `view` lets each test choose which page mode it wants to verify.
const renderFeesPage = (view?: 'empty' | 'filled' | 'filtering-open') =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <FeesPage view={view} />
    </MemoryRouter>,
  )

// Helper: get the rendered table element.
const getTable = () => screen.getByRole('table')
// Helper: all table rows (header + body rows).
const getAllRows = () => within(getTable()).getAllByRole('row')
// Helper: only body rows (skip first row because first row is header).
const getBodyRows = () => getAllRows().slice(1)

// Helper for date filtering.
// We intentionally use fireEvent for native input value changes.
// (Typing simulation is more important for text fields; for date fields this is enough.)
const setDateRange = ({ from, to }: { from?: string; to?: string }) => {
  if (from) {
    fireEvent.change(screen.getByLabelText('From date'), { target: { value: from } })
  }

  if (to) {
    fireEvent.change(screen.getByLabelText('To date'), { target: { value: to } })
  }
}

// Helper for selecting an account in the Radix/select dropdown.
// Step 1: open combobox.
// Step 2: click the option by visible text.
const selectAccount = async (optionText: string) => {
  const user = userEvent.setup()
  await user.click(screen.getByRole('combobox', { name: /select account/i }))
  await user.click(screen.getByRole('option', { name: optionText }))
}

describe('FeesPage', () => {
  it('renders filled view by default with all rows', () => {
    // Arrange: render without passing view, so default behavior is used.
    renderFeesPage()

    // Assert:
    // 1) empty state should NOT appear
    // 2) all fee rows should be visible (3 rows in fixture data)
    expect(screen.queryByText('No Fees Available')).not.toBeInTheDocument()
    expect(getBodyRows()).toHaveLength(3)
  })

  it('renders heading and action controls', () => {
    // Arrange: render explicit filled view.
    renderFeesPage('filled')

    // Assert main UI contract for this page:
    // - heading exists
    // - summary info exists
    // - primary action button exists
    expect(screen.getByRole('heading', { name: 'Fees' })).toBeInTheDocument()
    expect(screen.getByText('Fee Owed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pay Fees' })).toBeInTheDocument()
  })

  it('calls onPayFees when action button is clicked', async () => {
    // Arrange: spy function lets us verify callback behavior.
    const onPayFees = vi.fn()
    const user = userEvent.setup()

    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <FeesPage onPayFees={onPayFees} />
      </MemoryRouter>,
    )

    // Act: user clicks pay button.
    await user.click(screen.getByRole('button', { name: 'Pay Fees' }))
    // Assert: callback fired exactly once.
    expect(onPayFees).toHaveBeenCalledTimes(1)
  })

  it('shows empty state when view is empty', () => {
    // Arrange: force empty view mode.
    renderFeesPage('empty')

    // Assert:
    // - empty state copy is visible
    // - body has one row because DataTable renders an empty-state row
    expect(screen.getByText('No Fees Available')).toBeInTheDocument()
    expect(getBodyRows()).toHaveLength(1)
  })

  it('filters by selected account', async () => {
    // Arrange
    renderFeesPage('filled')

    // Act: choose one account from dropdown.
    await selectAccount('248294422 - Patricia Rivieras')

    // Assert:
    // - only rows of selected account remain
    // - other account id should disappear
    const table = getTable()
    expect(getBodyRows()).toHaveLength(2)
    expect(within(table).queryByText('389010774')).not.toBeInTheDocument()
  })

  it('resets to all accounts', async () => {
    // Arrange
    renderFeesPage('filled')

    // Act 1: filter down to one account.
    await selectAccount('248294422 - Patricia Rivieras')
    expect(getBodyRows()).toHaveLength(2)

    // Act 2: return to all accounts.
    await selectAccount('All Accounts')
    // Assert: full dataset appears again.
    expect(getBodyRows()).toHaveLength(3)
  })

  it('keeps date boundaries inclusive', () => {
    // Arrange
    renderFeesPage('filled')

    // Act: set same start/end date.
    // "Inclusive boundary" means records exactly on that date should still match.
    setDateRange({ from: '2025-01-08', to: '2025-01-08' })

    // Assert:
    // - two rows exist on boundary date
    // - both belong to expected account
    const table = getTable()
    expect(getBodyRows()).toHaveLength(2)
    expect(within(table).getAllByText('248294422')).toHaveLength(2)
  })

  it('shows empty state when date range has no matches', () => {
    // Arrange
    renderFeesPage('filled')

    // Act: choose future range where fixture has no rows.
    setDateRange({ from: '2026-01-01', to: '2026-12-31' })

    // Assert: no matches => empty state shown.
    expect(screen.getByText('No Fees Available')).toBeInTheDocument()
  })

  it('shows empty state when from-date is later than to-date', () => {
    // Arrange
    renderFeesPage('filled')

    // Act: invalid range (from > to).
    setDateRange({ from: '2025-12-31', to: '2025-01-01' })

    // Assert: invalid range results in no rows.
    expect(screen.getByText('No Fees Available')).toBeInTheDocument()
  })

  it('applies account and date filters together', async () => {
    // Arrange
    renderFeesPage('filled')

    // Act:
    // 1) narrow by account
    // 2) narrow by date
    // Together these conditions should be ANDed (both must match).
    await selectAccount('248294422 - Patricia Rivieras')
    setDateRange({ from: '2025-02-01', to: '2025-02-28' })

    // Assert: if no row satisfies both filters, show empty state.
    expect(screen.getByText('No Fees Available')).toBeInTheDocument()
  })

  it('keeps empty mode empty even when filters change', async () => {
    // Arrange: page-level empty mode should dominate local filter state.
    renderFeesPage('empty')

    // Act: try changing filters anyway.
    setDateRange({ from: '2025-01-08', to: '2025-01-08' })
    await selectAccount('All Accounts')

    // Assert: still empty regardless of filter interactions.
    expect(screen.getByText('No Fees Available')).toBeInTheDocument()
    expect(getBodyRows()).toHaveLength(1)
  })

  it('preselects account in filtering-open view', () => {
    // Arrange: special view where UI starts with account preselected.
    renderFeesPage('filtering-open')

    // Assert:
    // - selected text in combobox should show that account/user
    // - row count should reflect that initial prefilter
    expect(screen.getByRole('combobox', { name: 'Select Account' })).toHaveTextContent('Patricia Rivieras')
    expect(getBodyRows()).toHaveLength(2)
  })
})
