import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { DocumentCenterPage } from './DocumentCenterPage'

const renderDocumentCenterPage = (
  props?: Partial<{
    view: 'selector' | 'statements' | 'tax-forms'
    onViewChange: (nextView: 'selector' | 'statements' | 'tax-forms') => void
  }>,
) =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <DocumentCenterPage {...props} />
    </MemoryRouter>,
  )

const getTable = () => screen.getByRole('table')
const getAllRows = () => within(getTable()).getAllByRole('row')
const getBodyRows = () => getAllRows().slice(1)

const selectAccount = async (optionName: string) => {
  const user = userEvent.setup()
  await user.click(screen.getByRole('combobox', { name: /select account/i }))
  await user.click(screen.getByRole('option', { name: optionName }))
}

describe('DocumentCenterPage', () => {
  it('renders selector view by default', () => {
    renderDocumentCenterPage()

    expect(screen.getByRole('heading', { name: 'Document Center' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /statements/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tax forms/i })).toBeInTheDocument()
  })

  it('switches from selector to statements in uncontrolled mode', async () => {
    renderDocumentCenterPage()
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /statements/i }))

    expect(screen.getByRole('heading', { name: 'Statements' })).toBeInTheDocument()
    expect(screen.getByText('Customer Statements')).toBeInTheDocument()
    expect(getBodyRows()).toHaveLength(3)
  })

  it('switches from selector to tax forms in uncontrolled mode', async () => {
    renderDocumentCenterPage()
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /tax forms/i }))

    expect(screen.getByRole('heading', { name: 'Tax Forms' })).toBeInTheDocument()
    expect(screen.getByText('Customer Tax Forms')).toBeInTheDocument()
    expect(getBodyRows()).toHaveLength(2)
  })

  it('calls onViewChange in controlled mode', async () => {
    const onViewChange = vi.fn()
    renderDocumentCenterPage({ view: 'selector', onViewChange })
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /statements/i }))

    expect(onViewChange).toHaveBeenCalledWith('statements')
    expect(screen.getByRole('heading', { name: 'Document Center' })).toBeInTheDocument()
  })

  it('filters statement rows by account', async () => {
    renderDocumentCenterPage({ view: 'statements' })

    await selectAccount('389010774')

    const table = getTable()
    expect(getBodyRows()).toHaveLength(1)
    expect(within(table).getByText('Peter Rivers')).toBeInTheDocument()
    expect(within(table).queryByText('Patricia Rivera')).not.toBeInTheDocument()
  })

  it('applies statement date filters and handles invalid range', () => {
    renderDocumentCenterPage({ view: 'statements' })

    fireEvent.change(screen.getByLabelText('Statements from date'), { target: { value: '2025-03-08' } })
    fireEvent.change(screen.getByLabelText('Statements to date'), { target: { value: '2025-03-08' } })
    expect(getBodyRows()).toHaveLength(1)
    expect(within(getTable()).getByText('Peter Rivers')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Statements from date'), { target: { value: '2025-12-31' } })
    fireEvent.change(screen.getByLabelText('Statements to date'), { target: { value: '2025-01-01' } })
    expect(within(getTable()).getByText('No statements found for the selected filters.')).toBeInTheDocument()
  })

  it('filters tax forms by account and date range', async () => {
    renderDocumentCenterPage({ view: 'tax-forms' })

    await selectAccount('389010774')

    const table = getTable()
    expect(getBodyRows()).toHaveLength(1)
    expect(within(table).getByText('FMV_Report_2023.pdf')).toBeInTheDocument()
    expect(within(table).queryByText('1099-R_2023.pdf')).not.toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Tax forms from date'), { target: { value: '2025-01-08' } })
    fireEvent.change(screen.getByLabelText('Tax forms to date'), { target: { value: '2025-01-08' } })
    expect(within(getTable()).getByText('No tax forms found for the selected filters.')).toBeInTheDocument()
  })

  it('shows tax-form empty state for invalid date range', () => {
    renderDocumentCenterPage({ view: 'tax-forms' })

    fireEvent.change(screen.getByLabelText('Tax forms from date'), { target: { value: '2025-12-31' } })
    fireEvent.change(screen.getByLabelText('Tax forms to date'), { target: { value: '2025-01-01' } })

    expect(within(getTable()).getByText('No tax forms found for the selected filters.')).toBeInTheDocument()
  })
})
