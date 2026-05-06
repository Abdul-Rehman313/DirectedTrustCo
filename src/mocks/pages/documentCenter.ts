import type { StatementRow, TaxFormRow } from '@/types/page-data.types'

export const mockStatementRows: StatementRow[] = [
  {
    id: 'stm-1',
    accountNumber: '248294422',
    initials: 'PR',
    displayName: 'Patricia Rivera',
    location: '401(k) Roth',
    description: 'Customer Statement',
    from: '2025-01-08',
    to: '2025-03-08',
  },
  {
    id: 'stm-2',
    accountNumber: '248294422',
    initials: 'MR',
    displayName: 'Mike Rutherford',
    location: '401(k) Roth',
    description: 'Customer Statement',
    from: '2025-02-08',
    to: '2025-03-08',
  },
  {
    id: 'stm-3',
    accountNumber: '389010774',
    initials: 'PR',
    displayName: 'Peter Rivers',
    location: 'ROTH IRA',
    description: 'Customer Statement',
    from: '2025-03-08',
    to: '2025-03-08',
  },
]

export const mockTaxFormRows: TaxFormRow[] = [
  {
    id: 'tax-1',
    accountNumber: '248294422',
    fileName: '1099-R_2023.pdf',
    year: '2023',
    issuedDate: '2025-01-08',
    description: 'IRA Distribution',
  },
  {
    id: 'tax-2',
    accountNumber: '389010774',
    fileName: 'FMV_Report_2023.pdf',
    year: '2023',
    issuedDate: '2025-02-08',
    description: 'Fair Market Valuation',
  },
]

export const defaultDocumentDateRange = {
  from: '2025-01-01',
  to: '2025-12-31',
}
