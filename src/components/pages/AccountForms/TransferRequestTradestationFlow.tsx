import { ArrowLeft, ArrowRightLeft, Check, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3
type TransferDirection = 'to-tradestation' | 'from-tradestation'
type TransferMode = 'full' | 'partial'

interface TransferRequestTradestationValues {
  direction?: TransferDirection
  transferMode?: TransferMode
  amount: string
  directedAccountNumber: string
  tradestationAccountNumber: string
  requestedDate: string
  reason: string
  acceptedTerms: boolean
  signed: boolean
}

interface TransferRequestTradestationFlowProps {
  onBackToForms: () => void
}

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

export const TransferRequestTradestationFlow = ({ onBackToForms }: TransferRequestTradestationFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<TransferRequestTradestationValues>({
    amount: '',
    directedAccountNumber: '',
    tradestationAccountNumber: '',
    requestedDate: '',
    reason: '',
    acceptedTerms: false,
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 3) {
      return values.signed
    }

    if (!values.direction || !values.transferMode || !values.directedAccountNumber.trim() || !values.tradestationAccountNumber.trim() || !values.requestedDate || !values.reason.trim() || !values.acceptedTerms) {
      return false
    }

    if (values.transferMode === 'partial') {
      return Boolean(values.amount.trim())
    }

    return true
  }, [step, values])

  const setField = <K extends keyof TransferRequestTradestationValues>(
    key: K,
    value: TransferRequestTradestationValues[K],
  ) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const back = (): void => {
    if (step === 2) {
      onBackToForms()
      return
    }
    setStep(2)
  }

  const next = (): void => {
    if (!canContinue) {
      return
    }
    if (step === 3) {
      onBackToForms()
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
            <StepItem index={2} label="Transfer Details" status={step === 2 ? 'active' : 'completed'} />
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
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">{step === 2 ? 'Transfer Details' : 'Document Sign'}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                <ArrowRightLeft className="h-3.5 w-3.5" />
                Transfer Request - To and From TradeStation Brokerage Account
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

          <div className="px-4 pb-3 md:hidden">
            <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 text-xs text-text-secondary">
              <p>
                STEP <span className="mx-1 rounded-full bg-text-primary px-2 py-0.5 font-semibold text-text-inverse">{step}</span> OF{' '}
                <span className="rounded-full border border-border px-2 py-0.5 text-text-primary">3</span>
              </p>
              <button type="button" className="text-xs text-text-secondary underline">
                Details
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6 md:px-6">
            {step === 2 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <h3 className="text-xl font-semibold text-text-primary md:hidden">Transfer Details</h3>
                <span className={cn(badgeClass, 'md:hidden')}>
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                  Transfer Request - TradeStation
                </span>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Transfer Direction*</p>
                  <div className="mt-3 space-y-3">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <span
                        className={cn(
                          'grid h-5 w-5 place-items-center rounded-full border',
                          values.direction === 'to-tradestation' ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.direction === 'to-tradestation' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      Directed Connect -{'>'} TradeStation
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.direction === 'to-tradestation'}
                        onChange={() => setField('direction', 'to-tradestation')}
                      />
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <span
                        className={cn(
                          'grid h-5 w-5 place-items-center rounded-full border',
                          values.direction === 'from-tradestation' ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.direction === 'from-tradestation' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      TradeStation -{'>'} Directed Connect
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.direction === 'from-tradestation'}
                        onChange={() => setField('direction', 'from-tradestation')}
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Transfer Mode*</p>
                  <div className="mt-3 space-y-3">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <span
                        className={cn(
                          'grid h-5 w-5 place-items-center rounded-full border',
                          values.transferMode === 'full' ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.transferMode === 'full' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      Full transfer
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.transferMode === 'full'}
                        onChange={() => setField('transferMode', 'full')}
                      />
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <span
                        className={cn(
                          'grid h-5 w-5 place-items-center rounded-full border',
                          values.transferMode === 'partial' ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.transferMode === 'partial' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      Partial transfer
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.transferMode === 'partial'}
                        onChange={() => setField('transferMode', 'partial')}
                      />
                    </label>
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
                    <span className="mb-2 block text-xs text-text-secondary">Directed Connect Account*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter account number"
                      value={values.directedAccountNumber}
                      onChange={(event) => setField('directedAccountNumber', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">TradeStation Account*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter account number"
                      value={values.tradestationAccountNumber}
                      onChange={(event) => setField('tradestationAccountNumber', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Requested Date*</span>
                    <input
                      className={inputClass}
                      type="date"
                      value={values.requestedDate}
                      onChange={(event) => setField('requestedDate', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Reason*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter reason"
                      value={values.reason}
                      onChange={(event) => setField('reason', event.target.value)}
                    />
                  </label>
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                  <span
                    className={cn(
                      'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                      values.acceptedTerms ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                    )}
                  >
                    {values.acceptedTerms ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  I confirm this transfer request is accurate and authorized.
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
                <h3 className="text-xl font-semibold text-text-primary md:hidden">Document Sign</h3>
                <span className={cn(badgeClass, 'md:hidden')}>
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                  Transfer Request - TradeStation
                </span>

                <div className="rounded-2xl border border-border p-5">
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Transfer Request</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign to submit transfer instructions.</p>
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
