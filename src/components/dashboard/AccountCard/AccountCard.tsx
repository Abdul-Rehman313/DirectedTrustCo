import type { Account } from '../../../types/account.types'
import { Badge, Button, Card } from '../../ui'

interface AccountCardProps {
  account: Account
  onView?: (accountId: string) => void
}

const statusVariantMap = {
  Active: 'success',
  Pending: 'warning',
  Review: 'info',
  Closed: 'error',
} as const

export const AccountCard = ({ account, onView }: AccountCardProps) => (
  <Card hoverable className="flex h-full flex-col justify-between">
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-text-primary">{account.name}</h3>
          <p className="mt-1 text-sm text-text-secondary">{account.accountNumber}</p>
        </div>
        <Badge variant={statusVariantMap[account.status]}>{account.status}</Badge>
      </div>
      <p className="text-xl font-semibold text-text-primary">{account.balanceLabel}</p>
    </div>
    <Button
      variant="secondary"
      size="sm"
      className="mt-4"
      onClick={() => onView?.(account.id)}
      aria-label={`View ${account.name}`}
    >
      View
    </Button>
  </Card>
)
