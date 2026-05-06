import { ArrowRightLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/utils/cn'
import {
  DataTable,
  DateRangeFilter,
  EmptyState,
  FilterBar,
  FilterSelect,
  type DataTableColumn,
  PageScaffold,
} from '@/components/pages/primitives'
import { defaultTransactionDateRange, mockTransactionsRows } from '@/mocks/pages'
import type { TransactionRow } from '@/types/page-data.types'

type TransactionsPageView = 'filled' | 'empty' | 'filtering-open'

interface TransactionFilters {
  selectedAccount: string
  selectedCategory: 'all' | TransactionRow['category']
  fromDate: string
  toDate: string
}

export interface TransactionsPageProps {
  view?: TransactionsPageView
  rows?: TransactionRow[]
  initialFilters?: Partial<TransactionFilters>
  onFiltersChange?: (nextFilters: TransactionFilters) => void
}

const headers = ['ACCOUNT NUMBER', 'SETTLE DATE', 'CASH', 'INVESTMENT', 'ISSUER NAME', 'TRANSACTION CATEGORY', 'DESCRIPTION'] as const

const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-')
  return `${month}/${day}/${year}`
}

const inRange = (value: string, from: string, to: string): boolean => value >= from && value <= to

const MobileTransactionCard = ({
  initials,
  colorClass,
  row,
}: {
  initials: string
  colorClass: string
  row: TransactionRow
}) => (
  <div className="rounded-xl border border-border bg-surface p-3">
    <div className="mb-2 flex items-center justify-between">
      <span
        className={cn(
          'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold text-white',
          colorClass,
        )}
      >
        {initials}
      </span>
      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-text-secondary">{row.category}</span>
    </div>
    <p className="text-[11px] text-text-primary">{row.accountNumber}</p>
    <p className="mt-0.5 text-[10px] text-text-secondary">{row.userName}</p>
    <div className="mt-2 flex items-center justify-between text-[10px]">
      <span className="text-text-secondary">Invest:</span>
      <span className="font-semibold text-text-primary">{row.investment}</span>
    </div>
    <div className="mt-1 flex items-center justify-between text-[10px]">
      <span className="text-text-secondary">Cash:</span>
      <span className="font-semibold text-text-primary">{row.cash}</span>
    </div>
  </div>
)

export const TransactionsPage = ({
  view = 'filled',
  rows = mockTransactionsRows,
  initialFilters,
  onFiltersChange,
}: TransactionsPageProps) => {
  const [selectedAccount, setSelectedAccount] = useState(
    initialFilters?.selectedAccount ?? (view === 'filtering-open' ? '248294422' : 'all'),
  )
  const [selectedCategory, setSelectedCategory] = useState<TransactionFilters['selectedCategory']>(
    initialFilters?.selectedCategory ?? (view === 'filtering-open' ? 'Investment' : 'all'),
  )
  const [fromDate, setFromDate] = useState(initialFilters?.fromDate ?? defaultTransactionDateRange.from)
  const [toDate, setToDate] = useState(initialFilters?.toDate ?? defaultTransactionDateRange.to)

  const accountOptions = useMemo(
    () => [
      { value: 'all', label: 'All Accounts' },
      ...Array.from(new Set(rows.map((row) => row.accountNumber))).map((accountNumber) => ({
        value: accountNumber,
        label: accountNumber,
      })),
    ],
    [rows],
  )
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Investment', label: 'Investment' },
    { value: 'Credit', label: 'Credit' },
  ] as const

  const filteredRows = useMemo(() => {
    if (view === 'empty') {
      return []
    }

    return rows.filter(
      (row) =>
        (selectedAccount === 'all' || row.accountNumber === selectedAccount) &&
        (selectedCategory === 'all' || row.category === selectedCategory) &&
        inRange(row.settleDate, fromDate, toDate),
    )
  }, [fromDate, rows, selectedAccount, selectedCategory, toDate, view])

  useEffect(() => {
    onFiltersChange?.({ selectedAccount, selectedCategory, fromDate, toDate })
  }, [fromDate, onFiltersChange, selectedAccount, selectedCategory, toDate])

  const columns: DataTableColumn<TransactionRow>[] = useMemo(
    () => [
      { key: headers[0], header: headers[0], cell: (row) => row.accountNumber, className: 'px-3 py-3 text-xs text-text-primary' },
      { key: headers[1], header: headers[1], cell: (row) => formatDate(row.settleDate), className: 'px-3 py-3 text-xs text-text-primary' },
      { key: headers[2], header: headers[2], cell: (row) => row.cash, className: 'px-3 py-3 text-xs text-text-primary' },
      { key: headers[3], header: headers[3], cell: (row) => row.investment, className: 'px-3 py-3 text-xs text-text-primary' },
      { key: headers[4], header: headers[4], cell: (row) => row.userName, className: 'px-3 py-3 text-xs text-text-primary' },
      { key: headers[5], header: headers[5], cell: (row) => row.category, className: 'px-3 py-3 text-xs text-text-primary' },
      { key: headers[6], header: headers[6], cell: (row) => row.description, className: 'px-3 py-3 text-xs text-text-primary' },
    ],
    [],
  )

  return (
    <PageScaffold title="Transaction" subtitle="View all transactions in your account">
      <div className="rounded-2xl border border-border bg-surface p-3">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
          <ArrowRightLeft className="h-4 w-4 text-text-secondary" />
          Transaction
        </div>

        <FilterBar
          leftSlot={
            <div className="flex flex-wrap items-center gap-2">
              <FilterSelect
                value={selectedAccount}
                onChange={setSelectedAccount}
                ariaLabel="Select Account"
                placeholder="Select Account"
                options={accountOptions}
                minWidthClassName="min-w-[160px]"
              />
              <FilterSelect
                value={selectedCategory}
                onChange={(nextValue) => setSelectedCategory(nextValue as TransactionFilters['selectedCategory'])}
                ariaLabel="Category"
                placeholder="Category"
                options={categoryOptions}
                minWidthClassName="min-w-[120px]"
              />
            </div>
          }
          rightSlot={
            <DateRangeFilter
              fromLabel="From date"
              toLabel="To date"
              fromValue={fromDate}
              toValue={toDate}
              onFromChange={setFromDate}
              onToChange={setToDate}
            />
          }
        />

        <div className="hidden md:block">
          <DataTable
            columns={columns}
            rows={filteredRows}
            rowKey={(row) => row.id}
            emptyState={
              <div className="text-center">
                <p className="text-sm font-semibold text-text-primary">No Transactions Available</p>
                <p className="mt-1 text-xs text-text-secondary">Transactions will appear here after account activity.</p>
              </div>
            }
            minWidthClassName="min-w-[960px]"
          />
        </div>

        <div className="space-y-2 md:hidden">
          {filteredRows.slice(0, 4).map((row, index) => (
            <MobileTransactionCard
              key={`${row.id}-mobile`}
              row={row}
              initials={index === 0 ? 'MC' : index === 1 ? 'AW' : 'JD'}
              colorClass={index === 0 ? 'bg-primary' : index === 1 ? 'bg-info' : 'bg-success'}
            />
          ))}
          {filteredRows.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface p-6">
              <EmptyState title="No Transactions Available" description="Transactions will appear here after account activity." />
            </div>
          ) : null}
        </div>
      </div>
    </PageScaffold>
  )
}
