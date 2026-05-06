export interface FeeRow {
  id: string
  accountNumber: string
  accountLabel: string
  date: string
  category: string
  description: string
  type: string
  amount: string
}

export interface TransactionRow {
  id: string
  accountNumber: string
  settleDate: string
  cash: string
  investment: string
  userName: string
  category: 'Investment' | 'Credit'
  description: string
}

export interface StatementRow {
  id: string
  accountNumber: string
  initials: string
  displayName: string
  location: string
  description: string
  from: string
  to: string
}

export interface TaxFormRow {
  id: string
  accountNumber: string
  fileName: string
  year: string
  issuedDate: string
  description: string
}
