export type AccountStatus = 'Active' | 'Pending' | 'Review' | 'Closed'

export interface Account {
  id: string
  name: string
  accountNumber: string
  balanceLabel: string
  status: AccountStatus
  category: 'user' | 'other'
}

export interface UserProfile {
  fullName: string
  email: string
  initials: string
}
