import { FileText } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui'
import {
  DataTable,
  DateRangeFilter,
  EmptyState,
  FilterBar,
  FilterSelect,
  type DataTableColumn,
  PageScaffold,
} from '@/components/pages/primitives'
import { defaultFeeDateRange, mockFeesRows } from '@/mocks/pages'
import type { FeeRow } from '@/types/page-data.types'

type FeesPageView = 'empty' | 'filled' | 'filtering-open'

interface FeeFilters {
  selectedAccount: string
  fromDate: string
  toDate: string
}

export interface FeesPageProps {
  view?: FeesPageView
  rows?: FeeRow[]
  initialFilters?: Partial<FeeFilters>
  onFiltersChange?: (nextFilters: FeeFilters) => void
  onPayFees?: () => void
}

const tableHeaders = ['ACCOUNT NUMBER', 'DATE', 'CATEGORY', 'DESCRIPTION', 'TYPE', 'AMOUNT'] as const

const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-')
  return `${month}/${day}/${year}`
}

const isInRange = (value: string, from: string, to: string): boolean => value >= from && value <= to

export const FeesPage = ({
  view = 'filled',
  rows = mockFeesRows,
  initialFilters,
  onFiltersChange,
  onPayFees,
}: FeesPageProps) => {
  const fallbackAccount = rows[0]?.accountLabel ?? 'all'
  const [selectedAccount, setSelectedAccount] = useState(
    initialFilters?.selectedAccount ?? (view === 'filtering-open' ? fallbackAccount : 'all'),
  )
  const [fromDate, setFromDate] = useState(initialFilters?.fromDate ?? defaultFeeDateRange.from)
  const [toDate, setToDate] = useState(initialFilters?.toDate ?? defaultFeeDateRange.to)

  const accountOptions = useMemo(
    () => [
      { value: 'all', label: 'All Accounts' },
      ...Array.from(new Set(rows.map((row) => row.accountLabel))).map((accountLabel) => ({
        value: accountLabel,
        label: accountLabel,
      })),
    ],
    [rows],
  )

  const filteredRows = useMemo(() => {
    if (view === 'empty') {
      return []
    }

    return rows.filter(
      (row) =>
        (selectedAccount === 'all' || row.accountLabel === selectedAccount) &&
        isInRange(row.date, fromDate, toDate),
    )
  }, [fromDate, rows, selectedAccount, toDate, view])

  useEffect(() => {
    onFiltersChange?.({ selectedAccount, fromDate, toDate })
  }, [fromDate, onFiltersChange, selectedAccount, toDate])

  const columns: DataTableColumn<FeeRow>[] = useMemo(
    () => [
      {
        key: tableHeaders[0],
        header: tableHeaders[0],
        cell: (row) => row.accountNumber,
      },
      {
        key: tableHeaders[1],
        header: tableHeaders[1],
        cell: (row) => formatDate(row.date),
      },
      {
        key: tableHeaders[2],
        header: tableHeaders[2],
        cell: (row) => row.category,
      },
      {
        key: tableHeaders[3],
        header: tableHeaders[3],
        cell: (row) => row.description,
      },
      {
        key: tableHeaders[4],
        header: tableHeaders[4],
        cell: (row) => row.type,
      },
      {
        key: tableHeaders[5],
        header: tableHeaders[5],
        className: 'px-4 py-4 text-sm font-medium text-text-primary',
        cell: (row) => row.amount,
      },
    ],
    [],
  )

  return (
    <PageScaffold title="Fees" subtitle="View and track any fees linked to your accounts.">
      <div className="rounded-2xl border border-border bg-surface p-3 md:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-[28px] font-semibold text-text-primary">
            <span className="inline-grid h-5 w-5 place-items-center rounded-full border border-text-secondary text-[11px]">$</span>
            Fee Owed
            <span className="text-base font-normal text-text-secondary">$0.00</span>
          </div>
          <Button size="sm" className="h-8 rounded-full px-4 text-xs" onClick={onPayFees}>
            Pay Fees
          </Button>
        </div>

        <FilterBar
          leftSlot={
            <FilterSelect
              value={selectedAccount}
              onChange={setSelectedAccount}
              ariaLabel="Select Account"
              placeholder="Select Account"
              options={accountOptions}
              minWidthClassName="min-w-[230px]"
            />
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

        <DataTable
          columns={columns}
          rows={filteredRows}
          rowKey={(row) => row.id}
          emptyState={
            <EmptyState
              icon={FileText}
              title="No Fees Available"
              description="We'll show fees here when records match your filters."
            />
          }
          minWidthClassName="min-w-[780px]"
        />
      </div>
    </PageScaffold>
  )
}
