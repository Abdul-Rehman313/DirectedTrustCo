import type { Account } from '../../../types/account.types'
import { AccountCard } from '../AccountCard/AccountCard'
import { Card } from '../../ui'

interface AccountListProps {
  title: string
  accounts: Account[]
  onView?: (accountId: string) => void
}

export const AccountList = ({ title, accounts, onView }: AccountListProps) => (
  <section className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      <p className="text-sm text-text-secondary">{accounts.length} account(s)</p>
    </div>
    {accounts.length === 0 ? (
      <Card className="grid place-items-center py-12 text-center">
        <div>
          <p className="text-base font-medium text-text-primary">No accounts yet</p>
          <p className="mt-1 text-sm text-text-secondary">Open your first account to begin investing.</p>
        </div>
      </Card>
    ) : (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} onView={onView} />
        ))}
      </div>
    )}
  </section>
)
