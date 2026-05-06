import { ArrowLeft, Check, FileText, Link2, PencilLine } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { accounts } from '../../../data/mockData'
import { cn } from '../../../utils/cn'
import { PageWrapper } from '../../layout'
import { Button, Card } from '../../ui'

type ContributeType = 'plaid' | 'manual'
type FlowStep = 2 | 3
type ContributionKind = 'regular' | 'prior-year' | 'rollover' | 'other'
type ManualDepositMethod = 'check' | 'wire'

interface ContributeFlowValues {
  amount: string
  contributionYear: string
  contributionKind?: ContributionKind
  bankNickname: string
  accountHolderName: string
  manualMethod?: ManualDepositMethod
  institutionName: string
  referenceNumber: string
  notes: string
  acceptedTerms: boolean
  signed: boolean
}

interface ContributeFlowProps {
  type: ContributeType
  onBackToSelection: () => void
  onFinish: () => void
}

const optionCards = [
  {
    id: 'plaid',
    title: 'Fund the Contribution via Plaid',
    description: 'Third-party electronic ACH service provided through Directed Trust Company.',
    icon: Link2,
  },
  {
    id: 'manual',
    title: 'Fund the Contribution via Manual',
    description: 'Fund manually through check/wire or other ACH instructions.',
    icon: PencilLine,
  },
] as const

const inputClass =
  'h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted'

const badgeClass = 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-primary'

const StepItem = ({
  index,
  label,
  status,
}: {
  index: number
  label: string
  status: 'completed' | 'active' | 'pending'
}) => (
  <li className="flex items-center gap-3">
    {status === 'completed' ? (
      <span className="grid h-7 w-7 place-items-center rounded-full bg-slate-200 text-text-primary">
        <Check className="h-4 w-4" />
      </span>
    ) : (
      <span
        className={cn(
          'grid h-7 w-7 place-items-center rounded-full text-xs',
          status === 'active'
            ? 'bg-text-primary font-semibold text-text-inverse'
            : 'border border-border bg-surface text-text-primary',
        )}
      >
        {index}
      </span>
    )}
    <span className="text-base font-medium text-text-primary">{label}</span>
  </li>
)

const ContributeFlow = ({ type, onBackToSelection, onFinish }: ContributeFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<ContributeFlowValues>({
    amount: '',
    contributionYear: '',
    bankNickname: '',
    accountHolderName: '',
    institutionName: '',
    referenceNumber: '',
    notes: '',
    acceptedTerms: false,
    signed: false,
  })

  const flowTitle = type === 'plaid' ? 'Fund Contribution via Plaid' : 'Fund Contribution via Manual'

  const canContinue = useMemo(() => {
    if (step === 3) {
      return values.signed
    }

    const commonValid =
      values.amount.trim().length > 0 &&
      values.contributionYear.trim().length > 0 &&
      Boolean(values.contributionKind) &&
      values.acceptedTerms

    if (!commonValid) {
      return false
    }

    if (type === 'plaid') {
      return values.bankNickname.trim().length > 0 && values.accountHolderName.trim().length > 0
    }

    return Boolean(values.manualMethod && values.institutionName.trim().length > 0 && values.referenceNumber.trim().length > 0)
  }, [step, type, values])

  const setField = <K extends keyof ContributeFlowValues>(key: K, value: ContributeFlowValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const back = (): void => {
    if (step === 2) {
      onBackToSelection()
      return
    }
    setStep(2)
  }

  const next = (): void => {
    if (!canContinue) {
      return
    }

    if (step === 3) {
      onFinish()
      return
    }

    setStep(3)
  }

  return (
    <section className="min-h-[calc(100vh-3rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="flex min-h-[calc(100vh-3rem)]">
        <aside className="hidden w-[360px] border-r border-border px-5 py-6 lg:block">
          <ol className="space-y-5">
            <StepItem index={1} label="Account Type" status="completed" />
            <StepItem index={2} label="Deposit Information" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Document Sign" status={step === 3 ? 'active' : 'pending'} />
          </ol>
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={back}
                className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-text-primary"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">{step === 2 ? 'Deposit Information' : 'Document Sign'}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                {type === 'plaid' ? <Link2 className="h-3.5 w-3.5" /> : <PencilLine className="h-3.5 w-3.5" />}
                {flowTitle}
              </span>
              <button
                type="button"
                disabled
                className="h-9 rounded-full bg-slate-100 px-4 text-sm font-medium text-text-muted disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6 md:px-6">
            {step === 2 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Contribution Amount*</span>
                    <input
                      className={inputClass}
                      placeholder="$0.00"
                      value={values.amount}
                      onChange={(event) => setField('amount', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Contribution Year*</span>
                    <select
                      className={inputClass}
                      value={values.contributionYear}
                      onChange={(event) => setField('contributionYear', event.target.value)}
                    >
                      <option value="">Select year</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                  </label>
                </div>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Contribution Type*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['regular', 'Regular'],
                      ['prior-year', 'Prior Year'],
                      ['rollover', 'Rollover'],
                      ['other', 'Other'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.contributionKind === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.contributionKind === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.contributionKind === value}
                          onChange={() => setField('contributionKind', value as ContributionKind)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {type === 'plaid' ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Bank Account Nickname*</span>
                      <input
                        className={inputClass}
                        placeholder="Enter bank nickname"
                        value={values.bankNickname}
                        onChange={(event) => setField('bankNickname', event.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Account Holder Name*</span>
                      <input
                        className={inputClass}
                        placeholder="Enter account holder name"
                        value={values.accountHolderName}
                        onChange={(event) => setField('accountHolderName', event.target.value)}
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Manual Deposit Method*</span>
                      <div className="space-y-3 rounded-2xl border border-border p-4">
                        {[
                          ['check', 'Check'],
                          ['wire', 'Wire'],
                        ].map(([value, label]) => (
                          <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                            <span
                              className={cn(
                                'grid h-5 w-5 place-items-center rounded-full border',
                                values.manualMethod === value ? 'border-error bg-error' : 'border-border',
                              )}
                            >
                              <span className={cn('h-2.5 w-2.5 rounded-full', values.manualMethod === value ? 'bg-surface' : 'bg-transparent')} />
                            </span>
                            {label}
                            <input
                              type="radio"
                              className="sr-only"
                              checked={values.manualMethod === value}
                              onChange={() => setField('manualMethod', value as ManualDepositMethod)}
                            />
                          </label>
                        ))}
                      </div>
                    </label>

                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs text-text-secondary">Institution Name*</span>
                        <input
                          className={inputClass}
                          placeholder="Enter institution name"
                          value={values.institutionName}
                          onChange={(event) => setField('institutionName', event.target.value)}
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs text-text-secondary">Reference Number*</span>
                        <input
                          className={inputClass}
                          placeholder="Enter reference number"
                          value={values.referenceNumber}
                          onChange={(event) => setField('referenceNumber', event.target.value)}
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Additional Notes</span>
                      <textarea
                        className="min-h-[120px] w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted"
                        placeholder="Enter any processing notes"
                        value={values.notes}
                        onChange={(event) => setField('notes', event.target.value)}
                      />
                    </label>
                  </>
                )}

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                  <span
                    className={cn(
                      'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                      values.acceptedTerms ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                    )}
                  >
                    {values.acceptedTerms ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  I confirm the contribution details are accurate and authorized.
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={values.acceptedTerms}
                    onChange={(event) => setField('acceptedTerms', event.target.checked)}
                  />
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="rounded-2xl border border-border p-5">
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Contribution Request</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign your request to continue.</p>
                    <Button className="mt-5 rounded-full px-6" onClick={() => setField('signed', true)}>
                      {values.signed ? 'Signed' : 'Sign Document'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-border px-4 py-4 md:px-6">
            <button
              type="button"
              onClick={back}
              className="h-11 rounded-full border border-border bg-surface px-6 text-sm font-medium text-text-primary hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className={cn(
                'h-11 rounded-full px-7 text-sm font-semibold text-text-inverse transition-colors',
                canContinue ? 'bg-primary hover:bg-primary-hover' : 'cursor-not-allowed bg-slate-200 text-text-muted',
              )}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const ContributePage = () => {
  const navigate = useNavigate()
  const { accountId, contributionType } = useParams()

  const account = useMemo(() => accounts.find((entry) => entry.id === accountId), [accountId])
  const selectedType = contributionType === 'plaid' || contributionType === 'manual' ? contributionType : undefined

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

  const backToSelection = (): void => {
    navigate(`/accounts/${accountId}/manage/contribute`)
  }

  const finishFlow = (): void => {
    navigate(`/accounts/${accountId}`)
  }

  if (contributionType && !selectedType) {
    return (
      <PageWrapper title="Contribute Flow Not Found" subtitle="The requested contribution flow is not available." showHeader={false}>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Flow Not Found</h2>
          <p className="text-sm text-text-secondary">Please choose one of the available contribution options.</p>
          <Button onClick={backToSelection}>Back to Contribute</Button>
        </Card>
      </PageWrapper>
    )
  }

  if (selectedType) {
    return (
      <PageWrapper title="Contribute" subtitle="Complete steps to submit your contribution request." showHeader={false}>
        <ContributeFlow type={selectedType} onBackToSelection={backToSelection} onFinish={finishFlow} />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Contribute" subtitle="Make a contribution to your account." showHeader={false}>
      <section className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-card md:px-6 md:py-5">
        <div className="border-b border-border pb-4">
          <p className="text-[11px] text-text-secondary">
            Dashboard <span className="mx-1">{'>'}</span> Manage Account <span className="mx-1">{'>'}</span>{' '}
            <span className="font-semibold text-text-primary">Contribute</span>
          </p>
        </div>

        <div className="border-b border-border py-4">
          <h1 className="text-[34px] font-semibold leading-none text-text-primary">Contribute</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Make a new contribution to your account to stay on track with your financial goals.
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {optionCards.map((option, index) => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => navigate(`/accounts/${accountId}/manage/contribute/${option.id}`)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-colors duration-200 ease-fintech',
                  index === 0 ? 'border-primary bg-error-light/30' : 'border-border bg-surface hover:bg-slate-50',
                )}
              >
                <Icon className={cn('mb-4 h-4 w-4', index === 0 ? 'text-primary' : 'text-text-primary')} />
                <p className="text-[16px] font-semibold leading-none text-text-primary">{option.title}</p>
                <p className="mt-2 text-xs text-text-secondary">{option.description}</p>
              </button>
            )
          })}
        </div>
      </section>
    </PageWrapper>
  )
}

