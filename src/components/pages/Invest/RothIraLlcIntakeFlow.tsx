import { ArrowLeft, Check, FileText, FileUser } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3 | 4
type FundingSource = 'cash' | 'transfer' | 'rollover'

interface RothIraLlcIntakeValues {
  investorName: string
  directedIraAccountNumber: string
  llcLegalName: string
  llcTaxId: string
  contactPhone: string
  contactEmail: string
  fundingSource?: FundingSource
  fundingAmount: string
  bankName: string
  bankAccountNickname: string
  acknowledgedDisclosures: boolean
  signed: boolean
}

interface RothIraLlcIntakeFlowProps {
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

export const RothIraLlcIntakeFlow = ({ onBackToInvest }: RothIraLlcIntakeFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<RothIraLlcIntakeValues>({
    investorName: '',
    directedIraAccountNumber: '',
    llcLegalName: '',
    llcTaxId: '',
    contactPhone: '',
    contactEmail: '',
    fundingAmount: '',
    bankName: '',
    bankAccountNickname: '',
    acknowledgedDisclosures: false,
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 4) {
      return values.signed
    }

    if (step === 3) {
      return Boolean(
        values.fundingSource &&
          values.fundingAmount.trim() &&
          values.bankName.trim() &&
          values.bankAccountNickname.trim() &&
          values.acknowledgedDisclosures,
      )
    }

    return Boolean(
      values.investorName.trim() &&
        values.directedIraAccountNumber.trim() &&
        values.llcLegalName.trim() &&
        values.llcTaxId.trim() &&
        values.contactPhone.trim() &&
        values.contactEmail.trim(),
    )
  }, [step, values])

  const setField = <K extends keyof RothIraLlcIntakeValues>(key: K, value: RothIraLlcIntakeValues[K]) => {
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
            <StepItem index={2} label="Intake Details" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Funding Instructions" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
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
                {step === 2 ? 'Intake Details' : step === 3 ? 'Funding Instructions' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                <FileUser className="h-3.5 w-3.5" />
                Roth IRA/LLC in-take
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
                    <span className="mb-2 block text-xs text-text-secondary">Investor Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter investor name"
                      value={values.investorName}
                      onChange={(event) => setField('investorName', event.target.value)}
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

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">LLC Legal Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter LLC legal name"
                      value={values.llcLegalName}
                      onChange={(event) => setField('llcLegalName', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">LLC Tax ID (EIN)*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter EIN"
                      value={values.llcTaxId}
                      onChange={(event) => setField('llcTaxId', event.target.value)}
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Contact Phone*</span>
                    <input
                      className={inputClass}
                      placeholder="(000) 000-0000"
                      value={values.contactPhone}
                      onChange={(event) => setField('contactPhone', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Contact Email*</span>
                    <input
                      className={inputClass}
                      placeholder="name@example.com"
                      value={values.contactEmail}
                      onChange={(event) => setField('contactEmail', event.target.value)}
                    />
                  </label>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Funding Source*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['cash', 'Cash contribution'],
                      ['transfer', 'Transfer from another IRA'],
                      ['rollover', 'Rollover from employer plan'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.fundingSource === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.fundingSource === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.fundingSource === value}
                          onChange={() => setField('fundingSource', value as FundingSource)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Funding Amount*</span>
                    <input
                      className={inputClass}
                      placeholder="$0.00"
                      value={values.fundingAmount}
                      onChange={(event) => setField('fundingAmount', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Bank Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter bank name"
                      value={values.bankName}
                      onChange={(event) => setField('bankName', event.target.value)}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Bank Account Nickname*</span>
                  <input
                    className={inputClass}
                    placeholder="Enter account nickname"
                    value={values.bankAccountNickname}
                    onChange={(event) => setField('bankAccountNickname', event.target.value)}
                  />
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                  <span
                    className={cn(
                      'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                      values.acknowledgedDisclosures ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                    )}
                  >
                    {values.acknowledgedDisclosures ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  I acknowledge that funding details are accurate and authorized for processing.
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={values.acknowledgedDisclosures}
                    onChange={(event) => setField('acknowledgedDisclosures', event.target.checked)}
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
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Roth IRA/LLC Intake</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign to submit your Roth IRA/LLC intake request.</p>
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
