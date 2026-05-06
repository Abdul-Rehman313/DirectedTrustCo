import type { TransactionRow } from '@/types/page-data.types'

export const mockTransactionsRows: TransactionRow[] = [
  {
    id: 'txn-1',
    accountNumber: '248294422',
    settleDate: '2025-01-06',
    cash: '$45,200.00',
    investment: '$1,200.00',
    userName: 'Michael Clifton',
    category: 'Investment',
    description: 'Account debit for further investment.',
  },
  {
    id: 'txn-2',
    accountNumber: '248294422',
    settleDate: '2025-01-08',
    cash: '$82,344.00',
    investment: '$2,460.00',
    userName: 'Arabella Wixx',
    category: 'Credit',
    description: 'Money credit from the beneficiary account.',
  },
  {
    id: 'txn-3',
    accountNumber: '389010774',
    settleDate: '2025-01-08',
    cash: '$311.00',
    investment: '$1,200.00',
    userName: 'John Doe',
    category: 'Investment',
    description: 'Account debit for further investment.',
  },
  {
    id: 'txn-4',
    accountNumber: '248294422',
    settleDate: '2025-02-02',
    cash: '$49,200.00',
    investment: '$1,200.00',
    userName: 'Michael Clifton',
    category: 'Investment',
    description: 'Account debit for further investment.',
  },
  {
    id: 'txn-5',
    accountNumber: '389010774',
    settleDate: '2025-02-09',
    cash: '$2,244.00',
    investment: '$460.00',
    userName: 'Arabella Wixx',
    category: 'Credit',
    description: 'Money credit from the beneficiary account.',
  },
]

export const defaultTransactionDateRange = {
  from: '2025-01-01',
  to: '2025-12-31',
}
