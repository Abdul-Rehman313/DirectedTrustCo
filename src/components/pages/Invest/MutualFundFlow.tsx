import { ArrowLeft, Check, FileText, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3 | 4
type TransactionType = 'buy' | 'sell' | 'exchange'
type SettlementMethod = 'cash-balance' | 'ach' | 'wire'

interface MutualFundValues {
  transactionType?: TransactionType
  fundCompany: string
  fundName: string
  tickerSymbol: string
  transactionAmount: string
  requestedTradeDate: string
  directedIraAccountNumber: string
  settlementMethod?: SettlementMethod
  advisorName: string
  advisorEmail: string
  advisorPhone: string
  hasReviewedProspectus: boolean
  confirmsOrderAuthorization: boolean
  confirmsInvestmentSuitability: boolean
  notes: string
  signed: boolean
}

interface MutualFundFlowProps {
  onBackToInvest: () => void
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

export const MutualFundFlow = ({ onBackToInvest }: MutualFundFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<MutualFundValues>({
    fundCompany: '',
    fundName: '',
    tickerSymbol: '',
    transactionAmount: '',
    requestedTradeDate: '',
    directedIraAccountNumber: '',
    advisorName: '',
    advisorEmail: '',
    advisorPhone: '',
    hasReviewedProspectus: false,
    confirmsOrderAuthorization: false,
    confirmsInvestmentSuitability: false,
    notes: '',
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 4) {
      return values.signed
    }

    if (step === 3) {
      return Boolean(
        values.settlementMethod &&
          values.advisorName.trim() &&
          values.advisorEmail.trim() &&
          values.advisorPhone.trim() &&
          values.hasReviewedProspectus &&
          values.confirmsOrderAuthorization &&
          values.confirmsInvestmentSuitability,
      )
    }

    return Boolean(
      values.transactionType &&
        values.fundCompany.trim() &&
        values.fundName.trim() &&
        values.tickerSymbol.trim() &&
        values.transactionAmount.trim() &&
        values.requestedTradeDate &&
        values.directedIraAccountNumber.trim(),
    )
  }, [step, values])

  const setField = <K extends keyof MutualFundValues>(key: K, value: MutualFundValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const back = (): void => {
    if (step === 2) {
      onBackToInvest()
      return
    }
    setStep((previous) => (previous - 1) as FlowStep)
  }

  const next = (): void => {
    if (!canContinue) {
      return
    }

    if (step === 4) {
      onBackToInvest()
      return
    }

    setStep((previous) => (previous + 1) as FlowStep)
  }

  return (
    <section className="min-h-[calc(100vh-3rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="flex min-h-[calc(100vh-3rem)]">
        <aside className="hidden w-[360px] border-r border-border px-5 py-6 lg:block">
          <ol className="space-y-5">
            <StepItem index={1} label="Account Type" status="completed" />
            <StepItem index={2} label="Trade Details" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Settlement & Compliance" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
            <StepItem index={4} label="Document Sign" status={step === 4 ? 'active' : 'pending'} />
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
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
                {step === 2 ? 'Trade Details' : step === 3 ? 'Settlement & Compliance' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                <Users className="h-3.5 w-3.5" />
                Mutual Fund
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
                  <p className="text-sm font-medium text-text-primary">Transaction Type*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['buy', 'Buy'],
                      ['sell', 'Sell'],
                      ['exchange', 'Exchange'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.transactionType === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.transactionType === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.transactionType === value}
                          onChange={() => setField('transactionType', value as TransactionType)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Fund Company*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter fund company"
                      value={values.fundCompany}
                      onChange={(event) => setField('fundCompany', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Fund Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter fund name"
                      value={values.fundName}
                      onChange={(event) => setField('fundName', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Ticker Symbol*</span>
                    <input
                      className={inputClass}
                      placeholder="e.g. VTSAX"
                      value={values.tickerSymbol}
                      onChange={(event) => setField('tickerSymbol', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Transaction Amount*</span>
                    <input
                      className={inputClass}
                      placeholder="$0.00"
                      value={values.transactionAmount}
                      onChange={(event) => setField('transactionAmount', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Requested Trade Date*</span>
                    <input
                      type="date"
                      className={inputClass}
                      value={values.requestedTradeDate}
                      onChange={(event) => setField('requestedTradeDate', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Directed IRA Account Number*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter account number"
                      value={values.directedIraAccountNumber}
                      onChange={(event) => setField('directedIraAccountNumber', event.target.value)}
                    />
                  </label>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Settlement Method*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['cash-balance', 'Cash balance in account'],
                      ['ach', 'ACH funding'],
                      ['wire', 'Wire funding'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.settlementMethod === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.settlementMethod === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.settlementMethod === value}
                          onChange={() => setField('settlementMethod', value as SettlementMethod)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Advisor / Contact Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter contact name"
                      value={values.advisorName}
                      onChange={(event) => setField('advisorName', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Advisor / Contact Email*</span>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="name@example.com"
                      value={values.advisorEmail}
                      onChange={(event) => setField('advisorEmail', event.target.value)}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Advisor / Contact Phone*</span>
                  <input
                    className={inputClass}
                    placeholder="(000) 000-0000"
                    value={values.advisorPhone}
                    onChange={(event) => setField('advisorPhone', event.target.value)}
                  />
                </label>

                {[
                  ['hasReviewedProspectus', 'I reviewed and accepted the fund prospectus.'],
                  ['confirmsOrderAuthorization', 'I authorize Directed IRA to process this order.'],
                  ['confirmsInvestmentSuitability', 'I confirm this investment is suitable for my IRA strategy.'],
                ].map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                    <span
                      className={cn(
                        'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                        values[key as keyof MutualFundValues] ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                      )}
                    >
                      {values[key as keyof MutualFundValues] ? <Check className="h-3.5 w-3.5" /> : null}
                    </span>
                    {label}
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={Boolean(values[key as keyof MutualFundValues])}
                      onChange={(event) => setField(key as keyof MutualFundValues, event.target.checked)}
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Additional Notes (Optional)</span>
                  <input
                    className={inputClass}
                    placeholder="Provide any special instructions"
                    value={values.notes}
                    onChange={(event) => setField('notes', event.target.value)}
                  />
                </label>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="rounded-2xl border border-border p-5">
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Mutual Fund Request</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign to submit your mutual fund request.</p>
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

