import { ArrowLeft, ArrowRightLeft, BriefcaseBusiness, Check, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { accounts } from '../../../data/mockData'
import { cn } from '../../../utils/cn'
import { PageWrapper } from '../../layout'
import { Button, Card } from '../../ui'

type RolloverType = 'existing-ira' | 'employer-plan'
type FlowStep = 2 | 3
type RolloverMethod = 'direct' | 'indirect'
type TransferMode = 'full' | 'partial'
type EmployerPlanType = '401k' | '403b' | '457' | 'other'

interface RolloverFormValues {
  rolloverMethod?: RolloverMethod
  transferMode?: TransferMode
  sourceInstitution: string
  sourceAccountNumber: string
  amount: string
  reason: string
  acceptTerms: boolean
  employerName: string
  planType?: EmployerPlanType
  planAdministrator: string
  signed: boolean
}

interface RolloverTransferFlowProps {
  type: RolloverType
  onBackToSelection: () => void
  onFinish: () => void
}

const optionCards = [
  {
    id: 'existing-ira',
    title: 'Transfer from Existing IRA',
    description: 'Move funds from another IRA into your current account.',
    icon: ArrowRightLeft,
  },
  {
    id: 'employer-plan',
    title: 'Employer Plan Rollover',
    description: 'Roll over funds from a 401(k) or other employer plan into your IRA.',
    icon: BriefcaseBusiness,
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

const RolloverTransferFlow = ({ type, onBackToSelection, onFinish }: RolloverTransferFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<RolloverFormValues>({
    sourceInstitution: '',
    sourceAccountNumber: '',
    amount: '',
    reason: '',
    acceptTerms: false,
    employerName: '',
    planAdministrator: '',
    signed: false,
  })

  const flowTitle = type === 'existing-ira' ? 'Transfer from Existing IRA' : 'Employer Plan Rollover'

  const canContinue = useMemo(() => {
    if (step === 3) {
      return values.signed
    }

    const commonValid =
      Boolean(values.rolloverMethod) &&
      Boolean(values.transferMode) &&
      values.sourceInstitution.trim().length > 0 &&
      values.sourceAccountNumber.trim().length > 0 &&
      values.reason.trim().length > 0 &&
      values.acceptTerms

    if (!commonValid) {
      return false
    }

    if (values.transferMode === 'partial' && values.amount.trim().length === 0) {
      return false
    }

    if (type === 'employer-plan') {
      return Boolean(values.planType && values.employerName.trim() && values.planAdministrator.trim())
    }

    return true
  }, [step, type, values])

  const setField = <K extends keyof RolloverFormValues>(key: K, value: RolloverFormValues[K]) => {
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
            <StepItem index={2} label={flowTitle} status={step === 2 ? 'active' : 'completed'} />
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
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">{step === 2 ? flowTitle : 'Document Sign'}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                <ArrowRightLeft className="h-3.5 w-3.5" />
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
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Rollover Method*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['direct', 'Direct Rollover'],
                      ['indirect', 'Indirect Rollover'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rolloverMethod === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.rolloverMethod === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.rolloverMethod === value}
                          onChange={() => setField('rolloverMethod', value as RolloverMethod)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Transfer Mode*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['full', 'Full transfer'],
                      ['partial', 'Partial transfer'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.transferMode === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.transferMode === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.transferMode === value}
                          onChange={() => setField('transferMode', value as TransferMode)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {values.transferMode === 'partial' ? (
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Transfer Amount*</span>
                    <input
                      className={inputClass}
                      placeholder="$0.00"
                      value={values.amount}
                      onChange={(event) => setField('amount', event.target.value)}
                    />
                  </label>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Source Institution*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter institution name"
                      value={values.sourceInstitution}
                      onChange={(event) => setField('sourceInstitution', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Source Account Number*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter account number"
                      value={values.sourceAccountNumber}
                      onChange={(event) => setField('sourceAccountNumber', event.target.value)}
                    />
                  </label>
                </div>

                {type === 'employer-plan' ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Employer Name*</span>
                      <input
                        className={inputClass}
                        placeholder="Enter employer name"
                        value={values.employerName}
                        onChange={(event) => setField('employerName', event.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Plan Type*</span>
                      <select
                        className={inputClass}
                        value={values.planType ?? ''}
                        onChange={(event) => setField('planType', event.target.value as EmployerPlanType)}
                      >
                        <option value="">Select plan type</option>
                        <option value="401k">401(k)</option>
                        <option value="403b">403(b)</option>
                        <option value="457">457</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-xs text-text-secondary">Plan Administrator*</span>
                      <input
                        className={inputClass}
                        placeholder="Enter administrator details"
                        value={values.planAdministrator}
                        onChange={(event) => setField('planAdministrator', event.target.value)}
                      />
                    </label>
                  </div>
                ) : null}

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Reason*</span>
                  <input
                    className={inputClass}
                    placeholder="Enter reason for rollover"
                    value={values.reason}
                    onChange={(event) => setField('reason', event.target.value)}
                  />
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                  <span
                    className={cn(
                      'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                      values.acceptTerms ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                    )}
                  >
                    {values.acceptTerms ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  I confirm the rollover/transfer details are accurate and authorized.
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={values.acceptTerms}
                    onChange={(event) => setField('acceptTerms', event.target.checked)}
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
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Rollover/Transfer Request</h3>
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

export const RolloverTransferPage = () => {
  const navigate = useNavigate()
  const { accountId, rolloverType } = useParams()

  const account = useMemo(() => accounts.find((entry) => entry.id === accountId), [accountId])
  const selectedType = rolloverType === 'existing-ira' || rolloverType === 'employer-plan' ? rolloverType : undefined

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
    navigate(`/accounts/${accountId}/manage/rollover-transfer`)
  }

  const finishFlow = (): void => {
    navigate(`/accounts/${accountId}`)
  }

  if (rolloverType && !selectedType) {
    return (
      <PageWrapper title="Rollover/Transfer Not Found" subtitle="The requested flow is not available." showHeader={false}>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-text-primary">Flow Not Found</h2>
          <p className="text-sm text-text-secondary">Please choose one of the available rollover/transfer options.</p>
          <Button onClick={backToSelection}>Back to Rollover/Transfer</Button>
        </Card>
      </PageWrapper>
    )
  }

  if (selectedType) {
    return (
      <PageWrapper title="Rollover/Transfer" subtitle="Complete steps to submit your rollover request." showHeader={false}>
        <RolloverTransferFlow type={selectedType} onBackToSelection={backToSelection} onFinish={finishFlow} />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Rollover/Transfer" subtitle="Move funds into your account." showHeader={false}>
      <section className="rounded-2xl border border-border bg-surface px-4 py-4 shadow-card md:px-6 md:py-5">
        <div className="border-b border-border pb-4">
          <p className="text-[11px] text-text-secondary">
            Dashboard <span className="mx-1">{'>'}</span> Manage Account <span className="mx-1">{'>'}</span>{' '}
            <span className="font-semibold text-text-primary">Rollover/Transfer</span>
          </p>
        </div>

        <div className="border-b border-border py-4">
          <h1 className="text-[34px] font-semibold leading-none text-text-primary">Rollover/Transfer</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Move funds from an existing retirement account or financial institution into your current account.
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {optionCards.map((option, index) => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => navigate(`/accounts/${accountId}/manage/rollover-transfer/${option.id}`)}
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

