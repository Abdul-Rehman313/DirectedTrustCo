import type { FeeRow } from '@/types/page-data.types'

export const mockFeesRows: FeeRow[] = [
  {
    id: 'fee-1',
    accountNumber: '248294422',
    accountLabel: '248294422 - Patricia Rivieras',
    date: '2025-01-08',
    category: 'Account Establishment Fee',
    description: 'Account Establishment Fee',
    type: 'Fee',
    amount: '$50.00',
  },
  {
    id: 'fee-2',
    accountNumber: '248294422',
    accountLabel: '248294422 - Patricia Rivieras',
    date: '2025-01-08',
    category: 'First Year Annual Account Fee',
    description: 'Annual Account Fee',
    type: 'Fee',
    amount: '$295.00',
  },
  {
    id: 'fee-3',
    accountNumber: '389010774',
    accountLabel: '389010774 - Sally Smith',
    date: '2025-02-11',
    category: 'Custody Fee',
    description: 'Monthly Custody Fee',
    type: 'Fee',
    amount: '$95.00',
  },
]

export const defaultFeeDateRange = {
  from: '2025-01-01',
  to: '2025-12-31',
}
