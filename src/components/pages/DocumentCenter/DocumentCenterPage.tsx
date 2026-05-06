import { ArrowUpRight, Download, FileText, Files } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/utils/cn'
import {
  DataTable,
  DateRangeFilter,
  FilterBar,
  FilterSelect,
  type DataTableColumn,
  PageScaffold,
} from '@/components/pages/primitives'
import { defaultDocumentDateRange, mockStatementRows, mockTaxFormRows } from '@/mocks/pages'
import type { StatementRow, TaxFormRow } from '@/types/page-data.types'

type DocumentCenterView = 'selector' | 'statements' | 'tax-forms'

interface StatementsFilters {
  selectedAccount: string
  fromDate: string
  toDate: string
}

interface TaxFormFilters {
  selectedAccount: string
  fromDate: string
  toDate: string
}

export interface DocumentCenterPageProps {
  view?: DocumentCenterView
  onViewChange?: (nextView: DocumentCenterView) => void
  statementRows?: StatementRow[]
  taxFormRows?: TaxFormRow[]
  initialStatementsFilters?: Partial<StatementsFilters>
  initialTaxFormFilters?: Partial<TaxFormFilters>
}

const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-')
  return `${month}/${day}/${year}`
}

const inRange = (value: string, from: string, to: string): boolean => value >= from && value <= to

const badgeStyle = (initials: string): string => {
  if (initials === 'PR') {
    return 'bg-info-light text-info'
  }
  if (initials === 'MR') {
    return 'bg-error-light text-error'
  }
  return 'bg-success-light text-success'
}

export const DocumentCenterPage = ({
  view,
  onViewChange,
  statementRows = mockStatementRows,
  taxFormRows = mockTaxFormRows,
  initialStatementsFilters,
  initialTaxFormFilters,
}: DocumentCenterPageProps) => {
  const [internalView, setInternalView] = useState<DocumentCenterView>('selector')
  const [selectedStatementAccount, setSelectedStatementAccount] = useState(initialStatementsFilters?.selectedAccount ?? 'all')
  const [selectedTaxAccount, setSelectedTaxAccount] = useState(initialTaxFormFilters?.selectedAccount ?? 'all')
  const [statementFromDate, setStatementFromDate] = useState(initialStatementsFilters?.fromDate ?? defaultDocumentDateRange.from)
  const [statementToDate, setStatementToDate] = useState(initialStatementsFilters?.toDate ?? defaultDocumentDateRange.to)
  const [taxFromDate, setTaxFromDate] = useState(initialTaxFormFilters?.fromDate ?? defaultDocumentDateRange.from)
  const [taxToDate, setTaxToDate] = useState(initialTaxFormFilters?.toDate ?? defaultDocumentDateRange.to)

  const activeView = view ?? internalView

  const statementAccountOptions = useMemo(
    () => [
      { value: 'all', label: 'All Accounts' },
      ...Array.from(new Set(statementRows.map((row) => row.accountNumber))).map((accountNumber) => ({
        value: accountNumber,
        label: accountNumber,
      })),
    ],
    [statementRows],
  )

  const taxAccountOptions = useMemo(
    () => [
      { value: 'all', label: 'All Accounts' },
      ...Array.from(new Set(taxFormRows.map((row) => row.accountNumber))).map((accountNumber) => ({
        value: accountNumber,
        label: accountNumber,
      })),
    ],
    [taxFormRows],
  )

  const filteredStatements = useMemo(
    () =>
      statementRows.filter(
        (row) =>
          (selectedStatementAccount === 'all' || row.accountNumber === selectedStatementAccount) &&
          inRange(row.from, statementFromDate, statementToDate),
      ),
    [selectedStatementAccount, statementFromDate, statementRows, statementToDate],
  )

  const filteredTaxForms = useMemo(
    () =>
      taxFormRows.filter(
        (row) =>
          (selectedTaxAccount === 'all' || row.accountNumber === selectedTaxAccount) &&
          inRange(row.issuedDate, taxFromDate, taxToDate),
      ),
    [selectedTaxAccount, taxFormRows, taxFromDate, taxToDate],
  )

  const switchView = (nextView: DocumentCenterView): void => {
    if (view === undefined) {
      setInternalView(nextView)
    }
    onViewChange?.(nextView)
  }

  const statementColumns: DataTableColumn<StatementRow>[] = [
    { key: 'account', header: 'ACCOUNT NUMBER', cell: (row) => row.accountNumber, className: 'px-3 py-3 text-xs text-text-primary' },
    {
      key: 'display',
      header: 'DISPLAY NAME',
      className: 'px-3 py-3 text-xs text-text-primary',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold',
              badgeStyle(row.initials),
            )}
          >
            {row.initials}
          </span>
          <span>
            <span className="block font-semibold text-text-primary">{row.displayName}</span>
            <span className="block text-[10px] text-text-secondary">{row.location}</span>
          </span>
        </div>
      ),
    },
    { key: 'description', header: 'DESCRIPTION', cell: (row) => row.description, className: 'px-3 py-3 text-xs text-text-primary' },
    { key: 'from', header: 'DATE FROM', cell: (row) => formatDate(row.from), className: 'px-3 py-3 text-xs text-text-primary' },
    { key: 'to', header: 'DATE TO', cell: (row) => formatDate(row.to), className: 'px-3 py-3 text-xs text-text-primary' },
    {
      key: 'action',
      header: 'ACTION',
      className: 'px-3 py-3 text-xs text-text-primary',
      cell: () => (
        <button type="button" className="inline-flex items-center gap-1 text-error hover:text-error/80">
          <Download className="h-3.5 w-3.5" />
          Download
        </button>
      ),
    },
  ]

  const taxFormColumns: DataTableColumn<TaxFormRow>[] = [
    { key: 'fileName', header: 'FILE NAME', cell: (row) => row.fileName, className: 'px-3 py-3 text-xs text-text-primary' },
    { key: 'year', header: 'YEAR', cell: (row) => row.year, className: 'px-3 py-3 text-xs text-text-primary' },
    { key: 'description', header: 'DESCRIPTION', cell: (row) => row.description, className: 'px-3 py-3 text-xs text-text-primary' },
    {
      key: 'action',
      header: 'ACTION',
      className: 'px-3 py-3 text-xs text-text-primary',
      cell: () => (
        <button type="button" className="inline-flex items-center gap-1 text-error hover:text-error/80">
          <Download className="h-3.5 w-3.5" />
          Download
        </button>
      ),
    },
  ]

  const title = activeView === 'selector' ? 'Document Center' : activeView === 'statements' ? 'Statements' : 'Tax Forms'
  const subtitle =
    activeView === 'selector'
      ? 'View your statements and tax form all in one place'
      : activeView === 'statements'
        ? 'View all account statements'
        : 'View tax forms for all your accounts'

  return (
    <PageScaffold title={title} subtitle={subtitle}>
      <div className="border-b border-border pb-4">
        <p className="text-[11px] text-text-secondary">
          Document Center
          {activeView !== 'selector' ? (
            <>
              <span className="mx-1">{'>'}</span>
              <span className="font-semibold text-text-primary">{activeView === 'statements' ? 'Statements' : 'Tax Forms'}</span>
            </>
          ) : null}
        </p>
      </div>

      {activeView === 'selector' ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() => switchView('statements')}
            className="rounded-xl bg-primary p-4 text-left text-text-inverse transition-opacity hover:opacity-95"
          >
            <div className="mb-4 flex items-center justify-between">
              <FileText className="h-4 w-4" />
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <p className="text-lg font-semibold">Statements</p>
            <p className="mt-1 text-xs text-white/90">Click here to access your account statements</p>
          </button>

          <button
            type="button"
            onClick={() => switchView('tax-forms')}
            className="rounded-xl border border-border bg-error-light p-4 text-left text-error transition-colors hover:bg-error-light/80"
          >
            <div className="mb-4 flex items-center justify-between">
              <Files className="h-4 w-4" />
            </div>
            <p className="text-lg font-semibold">Tax Forms</p>
            <p className="mt-1 text-xs">Click here to view tax forms for all your accounts</p>
          </button>
        </div>
      ) : null}

      {activeView === 'statements' ? (
        <div className="mt-4 rounded-2xl border border-border bg-surface p-3">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <FileText className="h-4 w-4 text-text-secondary" />
            Customer Statements
          </div>

          <FilterBar
            leftSlot={
              <FilterSelect
                value={selectedStatementAccount}
                onChange={setSelectedStatementAccount}
                ariaLabel="Select Account"
                placeholder="Select Account"
                options={statementAccountOptions}
              />
            }
            rightSlot={
              <DateRangeFilter
                fromLabel="Statements from date"
                toLabel="Statements to date"
                fromValue={statementFromDate}
                toValue={statementToDate}
                onFromChange={setStatementFromDate}
                onToChange={setStatementToDate}
              />
            }
          />

          <DataTable
            columns={statementColumns}
            rows={filteredStatements}
            rowKey={(row) => row.id}
            emptyState={
              <div className="text-center text-sm text-text-secondary">No statements found for the selected filters.</div>
            }
            minWidthClassName="min-w-[920px]"
          />
        </div>
      ) : null}

      {activeView === 'tax-forms' ? (
        <div className="mt-4 rounded-2xl border border-border bg-surface p-3">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Files className="h-4 w-4 text-text-secondary" />
            Customer Tax Forms
          </div>

          <FilterBar
            leftSlot={
              <FilterSelect
                value={selectedTaxAccount}
                onChange={setSelectedTaxAccount}
                ariaLabel="Select Account"
                placeholder="Select Account"
                options={taxAccountOptions}
              />
            }
            rightSlot={
              <DateRangeFilter
                fromLabel="Tax forms from date"
                toLabel="Tax forms to date"
                fromValue={taxFromDate}
                toValue={taxToDate}
                onFromChange={setTaxFromDate}
                onToChange={setTaxToDate}
              />
            }
          />

          <DataTable
            columns={taxFormColumns}
            rows={filteredTaxForms}
            rowKey={(row) => row.id}
            emptyState={
              <div className="text-center text-sm text-text-secondary">No tax forms found for the selected filters.</div>
            }
            minWidthClassName="min-w-[760px]"
          />
        </div>
      ) : null}
    </PageScaffold>
  )
}
