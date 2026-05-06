import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountList, OpenAccountBanner } from '@/components/dashboard'
import { PageWrapper } from '@/components/layout'
import type { Account } from '@/types/account.types'

interface DashboardPageProps {
  accountsData: Account[]
  onViewAccount?: (accountId: string) => void
  onStartNewAccount?: () => void
}

export const DashboardPage = ({ accountsData, onViewAccount, onStartNewAccount }: DashboardPageProps) => {
  const navigate = useNavigate()

  const userAccounts = useMemo(() => accountsData.filter((account) => account.category === 'user'), [accountsData])
  const otherAccounts = useMemo(() => accountsData.filter((account) => account.category === 'other'), [accountsData])

  const handleViewAccount = (accountId: string): void => {
    if (onViewAccount) {
      onViewAccount(accountId)
      return
    }

    navigate(`/accounts/${accountId}`)
  }

  const handleStartNewAccount = (): void => {
    if (onStartNewAccount) {
      onStartNewAccount()
      return
    }
    navigate('/create-account')
  }

  return (
    <PageWrapper title="Dashboard" subtitle="Manage your self-directed and crypto investment accounts.">
      <div className="space-y-6">
        <OpenAccountBanner onStartNew={() => handleStartNewAccount()} />

        <AccountList title="Your Accounts" accounts={userAccounts} onView={handleViewAccount} />
        <AccountList title="Other Accounts" accounts={otherAccounts} onView={handleViewAccount} />
      </div>
    </PageWrapper>
  )
}
