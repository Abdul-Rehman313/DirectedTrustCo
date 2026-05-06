import { Suspense, useMemo, type ComponentType, type LazyExoticComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { accounts } from '../../../data/mockData'
import type { Account } from '../../../types/account.types'
import { cn } from '../../../utils/cn'
import { PageWrapper } from '../../layout'
import { Button, Card } from '../../ui'
import {
  manageInvestmentFlowComponents,
  manageInvestmentOptions,
  type ManageInvestmentFlowProps,
  type ManageInvestmentOption,
} from './manageInvestmentsCatalog'

type ManageInvestmentFlowComponent = LazyExoticComponent<ComponentType<ManageInvestmentFlowProps>>

interface ManageInvestmentsPageProps {
  accountsData?: Account[]
  options?: readonly ManageInvestmentOption[]
  flowComponents?: Partial<Record<string, ManageInvestmentFlowComponent>>
}

export const ManageInvestmentsPage = ({
  accountsData = accounts,
  options = manageInvestmentOptions,
  flowComponents = manageInvestmentFlowComponents as Partial<Record<string, ManageInvestmentFlowComponent>>,
}: ManageInvestmentsPageProps) => {
  const navigate = useNavigate()
  const { accountId, manageInvestmentType } = useParams()

  const account = useMemo(() => accountsData.find((entry) => entry.id === accountId), [accountId, accountsData])
  const selectedOption = useMemo(
    () => options.find((option) => option.id === manageInvestmentType) ?? null,
    [manageInvestmentType, options],
  )
  const activeOptionId = selectedOption?.id ?? options[0]?.id
  const activeFlow = manageInvestmentType ? flowComponents[manageInvestmentType] : undefined

  const goToListing = (): void => {
    if (!accountId) {
      return
    }
    navigate(`/accounts/${accountId}/manage/manage-investments`)
  }

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

  if (manageInvestmentType && !selectedOption) {
    return (
      <PageWrapper
        title="Manage Investment Option Not Found"
        subtitle="The requested manage investment option is not available."
        showHeader={false}
      >
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Option Not Found</h2>
          <p className="text-sm text-text-secondary">Please choose one of the available manage investment forms.</p>
          <Button onClick={goToListing}>Back To Manage Investments</Button>
        </Card>
      </PageWrapper>
    )
  }

  if (manageInvestmentType && selectedOption && activeFlow) {
    const ActiveFlow = activeFlow
    return (
      <PageWrapper title={selectedOption.title} subtitle="Complete steps to submit this request." showHeader={false}>
        <Suspense
          fallback={
            <section className="rounded-2xl border border-border bg-surface p-6 text-sm text-text-secondary shadow-card">
              Loading form...
            </section>
          }
        >
          <ActiveFlow onBackToManageInvestments={goToListing} />
        </Suspense>
      </PageWrapper>
    )
  }

  if (manageInvestmentType && selectedOption && !activeFlow) {
    return (
      <PageWrapper title={selectedOption.title} subtitle="This workflow screen is being prepared." showHeader={false}>
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
          <h1 className="text-2xl font-semibold text-text-primary">{selectedOption.title}</h1>
          <p className="mt-2 text-sm text-text-secondary">{selectedOption.description}</p>
          <div className="mt-5">
            <Button variant="secondary" onClick={goToListing}>
              Back To Manage Investments
            </Button>
          </div>
        </section>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Manage Investments" subtitle="Access forms to manage existing investments." showHeader={false}>
      <section className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-card md:px-6 md:py-5">
        <div className="border-b border-border pb-4">
          <p className="text-[11px] text-text-secondary">
            Dashboard <span className="mx-1">{'>'}</span> Manage Account <span className="mx-1">{'>'}</span>{' '}
            <span className="font-semibold text-text-primary">Manage Investments</span>
          </p>
        </div>

        <div className="border-b border-border py-4">
          <h1 className="text-[30px] font-semibold leading-none text-text-primary">Manage Investments</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Access forms for valuation updates, expense payments, income deposits, and asset payoff requests.
          </p>
          <p className="mt-2 text-xs font-medium text-text-secondary">
            {account.name} ({account.accountNumber})
          </p>
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {options.map((option) => {
            const Icon = option.icon
            const isSelected = option.id === activeOptionId
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => navigate(`/accounts/${accountId}/manage/manage-investments/${option.id}`)}
                className={cn(
                  'rounded-2xl border p-4 text-left transition-colors duration-200 ease-fintech',
                  isSelected ? 'border-primary bg-error-light/30' : 'border-border bg-surface hover:bg-slate-50',
                )}
              >
                <Icon className={cn('mb-5 h-5 w-5', isSelected ? 'text-primary' : 'text-text-primary')} />
                <p className="text-[16px] font-semibold leading-[1.05] text-text-primary">{option.title}</p>
                <p className="mt-2 text-sm text-text-secondary">{option.description}</p>
              </button>
            )
          })}
        </div>
      </section>
    </PageWrapper>
  )
}
