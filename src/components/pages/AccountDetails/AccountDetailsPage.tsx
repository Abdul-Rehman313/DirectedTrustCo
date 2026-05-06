import { BriefcaseBusiness, Coins, FileCheck2, Landmark, MoveRight, PiggyBank, PlusCircle, TrendingUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { accounts } from '../../../data/mockData'
import { cn } from '../../../utils/cn'
import { PageWrapper } from '../../layout'
import { Button, Card, Modal } from '../../ui'

interface AssetRow {
  name: string
  gain: string
  gainPositive: boolean
  investment: string
  units: string
  tokens: string
  value: string
}

const selfDirectedAssets: AssetRow[] = [
  { name: 'Equities', gain: '+1.8%', gainPositive: true, investment: '$4,800', units: '12', tokens: '-', value: '$3,500' },
  { name: 'Precious Metals', gain: '+3.5%', gainPositive: true, investment: '$150', units: '5', tokens: '-', value: '$2,100' },
  { name: 'Real Estate', gain: '+2.9%', gainPositive: true, investment: '$4,800', units: '8', tokens: '-', value: '$3,600' },
  { name: 'Private Equity', gain: '-1.4%', gainPositive: false, investment: '$2,850', units: '3', tokens: '-', value: '$2,000' },
  { name: 'Debt Instruments', gain: '+4.6%', gainPositive: true, investment: '$1,420', units: '7', tokens: '-', value: '$2,500' },
]

const cryptoAssets: AssetRow[] = [
  { name: 'Omni Trading Account', gain: '+2.9%', gainPositive: true, investment: '$9,600', units: '6', tokens: '5', value: '$1,200' },
  { name: 'Stock', gain: '+2.9%', gainPositive: true, investment: '$4,800', units: '1', tokens: '-', value: '$3,500' },
]

const manageOptions = [
  {
    id: 'account-forms',
    title: 'Account Forms',
    description: 'Access and manage all necessary forms related to your account setup, updates, or maintenance.',
    icon: FileCheck2,
  },
  {
    id: 'invest',
    title: 'Invest',
    description: 'Explore available investment options and start growing your savings with tailored strategies.',
    icon: TrendingUp,
  },
  {
    id: 'manage-invest',
    title: 'Manage Investments',
    description: 'Access forms to manage existing investments, valuations, deposits, and payoff requests.',
    icon: BriefcaseBusiness,
  },
  {
    id: 'rollover',
    title: 'Rollover/Transfer',
    description: 'Move funds from an existing retirement account or financial institution into your current account.',
    icon: MoveRight,
  },
  {
    id: 'contribute',
    title: 'Contribute',
    description: 'Make a new contribution to your account to stay on track with your financial goals.',
    icon: PlusCircle,
  },
] as const

export const AccountDetailsPage = () => {
  const navigate = useNavigate()
  const { accountId } = useParams()
  const [manageOpen, setManageOpen] = useState(false)

  const account = useMemo(() => accounts.find((entry) => entry.id === accountId), [accountId])
  const isCrypto = account?.name.toLowerCase().includes('crypto') ?? false
  const assets = isCrypto ? cryptoAssets : selfDirectedAssets
  const donutClass = isCrypto ? 'dc-donut-crypto' : 'dc-donut-self'

  const handleManageOption = (optionId: (typeof manageOptions)[number]['id']): void => {
    if (optionId === 'account-forms') {
      setManageOpen(false)
      if (account?.id) {
        navigate(`/accounts/${account.id}/manage/account-forms`)
      }
      return
    }

    if (optionId === 'invest') {
      setManageOpen(false)
      if (account?.id) {
        navigate(`/accounts/${account.id}/manage/invest`)
      }
      return
    }

    if (optionId === 'manage-invest') {
      setManageOpen(false)
      if (account?.id) {
        navigate(`/accounts/${account.id}/manage/manage-investments`)
      }
      return
    }

    if (optionId === 'rollover') {
      setManageOpen(false)
      if (account?.id) {
        navigate(`/accounts/${account.id}/manage/rollover-transfer`)
      }
      return
    }

    if (optionId === 'contribute') {
      setManageOpen(false)
      if (account?.id) {
        navigate(`/accounts/${account.id}/manage/contribute`)
      }
    }
  }

  if (!account) {
    return (
      <PageWrapper title="Account Not Found" subtitle="The account you requested was not found." showHeader={false}>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Account Not Found</h2>
          <p className="text-sm text-text-secondary">Please go back and select an available account.</p>
          <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
        </Card>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title={account.name} subtitle="Here&apos;s everything you need to manage your account." showHeader={false}>
      <section className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-card md:px-6 md:py-5">
        <div className="border-b border-border pb-4">
          <p className="text-[11px] text-text-secondary">
            Dashboard <span className="mx-1">{'>'}</span> <span className="font-semibold text-text-primary">{account.name}</span>
          </p>
        </div>

        <div className="border-b border-border py-4">
          <h1 className="text-[34px] font-semibold leading-none text-text-primary">{account.name}</h1>
          <p className="mt-2 text-sm text-text-secondary">Here&apos;s everything you need to manage your account.</p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <button type="button" className="rounded-xl bg-primary p-4 text-left text-text-inverse">
            <div className="mb-2 flex items-center justify-between">
              <PiggyBank className="h-4 w-4" />
            </div>
            <p className="text-base font-semibold">Fund</p>
          </button>

          <button
            type="button"
            onClick={() => handleManageOption('invest')}
            className="rounded-xl border border-border bg-error-light p-4 text-left text-error"
          >
            <div className="mb-2 flex items-center justify-between">
              {isCrypto ? <Coins className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
            </div>
            <p className="text-base font-semibold">{isCrypto ? 'Gemini' : 'Invest'}</p>
          </button>

          <button
            type="button"
            onClick={() => setManageOpen(true)}
            className="rounded-xl border border-border bg-error-light p-4 text-left text-error"
          >
            <div className="mb-2 flex items-center justify-between">
              <Landmark className="h-4 w-4" />
            </div>
            <p className="text-base font-semibold">Manage</p>
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-surface p-3 md:p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <TrendingUp className="h-4 w-4 text-text-secondary" />
            Investment
          </div>

          <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
            <div className="rounded-xl border border-border p-4">
              <div className={cn('mx-auto mb-3 grid h-44 w-44 place-items-center rounded-full', donutClass)}>
                <div className="grid h-28 w-28 place-items-center rounded-full bg-surface">
                  <div className="text-center">
                    <p className="text-[11px] text-text-secondary">Account Value</p>
                    <p className="text-2xl font-semibold text-text-primary">{isCrypto ? '$6,200' : '$24,204'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[740px] border-collapse">
                <thead>
                  <tr className="bg-slate-100">
                    {['ASSETS', 'UNREALIZED GAIN/(LOSS)', 'INVESTMENT', 'UNITS', 'TOKENS', 'ASSET VALUE', ''].map((header) => (
                      <th key={header} className="px-3 py-3 text-left text-[10px] font-semibold tracking-wide text-text-secondary">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assets.map((row) => (
                    <tr key={row.name} className="border-t border-border">
                      <td className="px-3 py-3 text-xs text-text-primary">{row.name}</td>
                      <td className={cn('px-3 py-3 text-xs font-semibold', row.gainPositive ? 'text-success' : 'text-error')}>
                        {row.gain}
                      </td>
                      <td className="px-3 py-3 text-xs text-text-primary">{row.investment}</td>
                      <td className="px-3 py-3 text-xs text-text-primary">{row.units}</td>
                      <td className="px-3 py-3 text-xs text-text-primary">{row.tokens}</td>
                      <td className="px-3 py-3 text-xs text-text-primary">{row.value}</td>
                      <td className="px-3 py-3">
                        <Button variant="secondary" size="sm" className="h-7 px-3 text-xs" onClick={() => setManageOpen(true)}>
                          Manage
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={manageOpen}
        onOpenChange={setManageOpen}
        title="Manage Account"
        description="Choose an account action to continue."
      >
        <div className="space-y-3">
          {manageOptions.map((option) => {
            const Icon = option.icon
            return (
              <div key={option.id} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-error-light text-error">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-primary">{option.title}</p>
                  <p className="text-xs text-text-secondary">{option.description}</p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => handleManageOption(option.id)}>
                  Choose
                </Button>
              </div>
            )
          })}
        </div>
      </Modal>
    </PageWrapper>
  )
}
