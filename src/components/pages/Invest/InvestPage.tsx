import { Suspense, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { accounts } from '../../../data/mockData'
import type { Account } from '../../../types/account.types'
import { cn } from '../../../utils/cn'
import { PageWrapper } from '../../layout'
import { Button, Card } from '../../ui'
import {
  investFlowComponents,
  investOptions,
  type InvestFlowProps,
  type InvestOption,
} from './investCatalog'
import type { ComponentType, LazyExoticComponent } from 'react'

type InvestFlowComponent = LazyExoticComponent<ComponentType<InvestFlowProps>>

interface InvestPageProps {
  accountsData?: Account[]
  options?: readonly InvestOption[]
  flowComponents?: Record<string, InvestFlowComponent>
}

export const InvestPage = ({
  accountsData = accounts,
  options = investOptions,
  flowComponents = investFlowComponents as Record<string, InvestFlowComponent>,
}: InvestPageProps) => {
  const navigate = useNavigate()
  const { accountId, investmentType } = useParams()

  const account = useMemo(() => accountsData.find((entry) => entry.id === accountId), [accountId, accountsData])
  const selectedOption = useMemo(() => options.find((option) => option.id === investmentType), [investmentType, options])
  const activeOptionId = selectedOption?.id ?? options[0]?.id
  const activeInvestFlow = investmentType ? flowComponents[investmentType] : undefined

  if (!accountId || !account) {
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

  if (investmentType && !selectedOption) {
    return (
      <PageWrapper title="Invest Option Not Found" subtitle="The requested investment option is not available." showHeader={false}>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Option Not Found</h2>
          <p className="text-sm text-text-secondary">Please choose one of the available investment options.</p>
          <Button onClick={() => navigate(`/accounts/${accountId}/manage/invest`)}>Back to Invest</Button>
        </Card>
      </PageWrapper>
    )
  }

  if (investmentType && selectedOption && activeInvestFlow) {
    const ActiveInvestFlow = activeInvestFlow
    return (
      <PageWrapper title={selectedOption.title} subtitle="Complete steps to submit this invest request." showHeader={false}>
        <Suspense
          fallback={
            <section className="rounded-2xl border border-border bg-surface p-6 text-sm text-text-secondary shadow-card">
              Loading form...
            </section>
          }
        >
          <ActiveInvestFlow onBackToInvest={() => navigate(`/accounts/${accountId}/manage/invest`)} />
        </Suspense>
      </PageWrapper>
    )
  }

  if (investmentType && selectedOption && !activeInvestFlow) {
    return (
      <PageWrapper title={selectedOption.title} subtitle="This workflow screen is being prepared." showHeader={false}>
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <h1 className="text-2xl font-semibold text-text-primary">{selectedOption.title}</h1>
          <p className="mt-2 text-sm text-text-secondary">{selectedOption.description}</p>
          <div className="mt-5">
            <Button variant="secondary" onClick={() => navigate(`/accounts/${accountId}/manage/invest`)}>
              Back to Invest
            </Button>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Invest" subtitle="Explore available investment options." showHeader={false}>
      <section className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-card md:px-6 md:py-5">
        <div className="border-b border-border pb-4">
          <p className="text-[11px] text-text-secondary">
            Dashboard <span className="mx-1">{'>'}</span> Manage Account <span className="mx-1">{'>'}</span>{' '}
            <span className="font-semibold text-text-primary">Invest</span>
          </p>
        </div>

        <div className="border-b border-border py-4">
          <h1 className="text-[34px] font-semibold leading-none text-text-primary">Invest</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Explore available investment options and start growing your savings with tailored strategies.
          </p>
          <p className="mt-2 text-xs font-medium text-text-secondary">
            {account.name} ({account.accountNumber})
          </p>
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon
            const isSelected = option.id === activeOptionId

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => navigate(`/accounts/${accountId}/manage/invest/${option.id}`)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-colors duration-200 ease-fintech',
                  isSelected ? 'border-primary bg-error-light/30' : 'border-border bg-surface hover:bg-slate-50',
                )}
              >
                <Icon className={cn('mb-4 h-4 w-4', isSelected ? 'text-primary' : 'text-text-primary')} />
                <p className="text-[16px] font-semibold leading-none text-text-primary">{option.title}</p>
                <p className="mt-2 text-xs text-text-secondary">{option.description}</p>
              </button>
            )
          })}
        </div>

        <p className="mt-5 text-xs text-text-secondary">
          * Investment values indicated here are as reported by the account owner or investment provider. Directed IRA does not
          verify or investigate the accuracy of investment values reported herein.
        </p>
      </section>
    </PageWrapper>
  )
}
