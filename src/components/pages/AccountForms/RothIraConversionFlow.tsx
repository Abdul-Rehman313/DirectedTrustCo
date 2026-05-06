import { ArrowLeft, Check, FileText, Sprout } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3 | 4 | 5
type ConversionType = 'full' | 'partial'
type DeliveryMethod = 'journal' | 'wire'

interface RothIraConversionValues {
  sourceAccount: string
  destinationAccount: string
  conversionType?: ConversionType
  conversionAmount: string
  conversionDate: string
  federalWithholding: string
  stateWithholding: string
  deliveryMethod?: DeliveryMethod
  specialInstructions: string
  acceptedDisclosures: boolean
  signed: boolean
}

interface RothIraConversionFlowProps {
  onBackToForms: () => void
}

const inputClass =
  'h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted'

const stepBadgeClass = 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-primary'

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
    <span className="text-base font-medium leading-none text-text-primary">{label}</span>
  </li>
)

const disclosureText = `A Roth IRA conversion is a taxable event. You may owe federal and state income taxes
on the amount converted that has not been previously taxed. By submitting this request, you acknowledge that:

1. You understand the tax implications of this conversion.
2. You are responsible for consulting your tax advisor.
3. Directed Connect does not provide tax or legal advice.
4. This request is processed based on instructions provided by you.
5. Processing timelines and market values may affect final converted amounts.`

export const RothIraConversionFlow = ({ onBackToForms }: RothIraConversionFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<RothIraConversionValues>({
    sourceAccount: 'Traditional IRA',
    destinationAccount: 'Roth IRA',
    conversionAmount: '',
    conversionDate: '',
    federalWithholding: '0',
    stateWithholding: '0',
    specialInstructions: '',
    acceptedDisclosures: false,
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 2) {
      if (!values.conversionType) {
        return false
      }
      if (!values.conversionDate.trim()) {
        return false
      }
      if (values.conversionType === 'partial' && !values.conversionAmount.trim()) {
        return false
      }
      return true
    }

    if (step === 3) {
      return Boolean(values.deliveryMethod)
    }

    if (step === 4) {
      return values.acceptedDisclosures
    }

    return values.signed
  }, [step, values])

  const setField = <K extends keyof RothIraConversionValues>(key: K, value: RothIraConversionValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const back = (): void => {
    if (step === 2) {
      onBackToForms()
      return
    }

    setStep((previous) => (previous - 1) as FlowStep)
  }

  const next = (): void => {
    if (!canContinue) {
      return
    }

    if (step === 5) {
      onBackToForms()
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
            <StepItem index={2} label="Conversion Details" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Tax Instructions" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
            <StepItem index={4} label="Disclosures" status={step === 4 ? 'active' : step > 4 ? 'completed' : 'pending'} />
            <StepItem index={5} label="Document Sign" status={step === 5 ? 'active' : 'pending'} />
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
                {step === 2
                  ? 'Conversion Details'
                  : step === 3
                    ? 'Tax Instructions'
                    : step === 4
                      ? 'Disclosures'
                      : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(stepBadgeClass, 'hidden md:inline-flex')}>
                <Sprout className="h-3.5 w-3.5" />
                Roth IRA Conversion
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
                STEP{' '}
                <span className="mx-1 rounded-full bg-text-primary px-2 py-0.5 font-semibold text-text-inverse">{step}</span> OF{' '}
                <span className="rounded-full border border-border px-2 py-0.5 text-text-primary">5</span>
              </p>
              <button type="button" className="text-xs text-text-secondary underline">
                Details
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6 md:px-6">
            {step === 2 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <h3 className="text-xl font-semibold text-text-primary md:hidden">Conversion Details</h3>
                <span className={cn(stepBadgeClass, 'md:hidden')}>
                  <Sprout className="h-3.5 w-3.5" />
                  Roth IRA Conversion
                </span>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">From Account*</span>
                    <input className={inputClass} value={values.sourceAccount} disabled />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">To Account*</span>
                    <input className={inputClass} value={values.destinationAccount} disabled />
                  </label>
                </div>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Conversion Type*</p>
                  <div className="mt-3 space-y-3">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <span
                        className={cn(
                          'grid h-5 w-5 place-items-center rounded-full border',
                          values.conversionType === 'full' ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.conversionType === 'full' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      Full conversion (convert entire balance)
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.conversionType === 'full'}
                        onChange={() => setField('conversionType', 'full')}
                      />
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <span
                        className={cn(
                          'grid h-5 w-5 place-items-center rounded-full border',
                          values.conversionType === 'partial' ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span
                          className={cn('h-2.5 w-2.5 rounded-full', values.conversionType === 'partial' ? 'bg-surface' : 'bg-transparent')}
                        />
                      </span>
                      Partial conversion (specify amount)
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.conversionType === 'partial'}
                        onChange={() => setField('conversionType', 'partial')}
                      />
                    </label>
                  </div>
                </div>

                {values.conversionType === 'partial' ? (
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Conversion Amount*</span>
                    <input
                      className={inputClass}
                      placeholder="$0.00"
                      value={values.conversionAmount}
                      onChange={(event) => setField('conversionAmount', event.target.value)}
                    />
                  </label>
                ) : null}

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Requested Conversion Date*</span>
                  <input
                    className={inputClass}
                    type="date"
                    value={values.conversionDate}
                    onChange={(event) => setField('conversionDate', event.target.value)}
                  />
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <h3 className="text-xl font-semibold text-text-primary md:hidden">Tax Instructions</h3>
                <span className={cn(stepBadgeClass, 'md:hidden')}>
                  <Sprout className="h-3.5 w-3.5" />
                  Roth IRA Conversion
                </span>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Federal Tax Withholding %</span>
                    <input
                      className={inputClass}
                      value={values.federalWithholding}
                      onChange={(event) => setField('federalWithholding', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">State Tax Withholding %</span>
                    <input
                      className={inputClass}
                      value={values.stateWithholding}
                      onChange={(event) => setField('stateWithholding', event.target.value)}
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Delivery Method*</p>
                  <div className="mt-3 space-y-3">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <span
                        className={cn(
                          'grid h-5 w-5 place-items-center rounded-full border',
                          values.deliveryMethod === 'journal' ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.deliveryMethod === 'journal' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      Journal conversion within Directed Connect
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.deliveryMethod === 'journal'}
                        onChange={() => setField('deliveryMethod', 'journal')}
                      />
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <span
                        className={cn(
                          'grid h-5 w-5 place-items-center rounded-full border',
                          values.deliveryMethod === 'wire' ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.deliveryMethod === 'wire' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      Wire to receiving custodian
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.deliveryMethod === 'wire'}
                        onChange={() => setField('deliveryMethod', 'wire')}
                      />
                    </label>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Special Instructions (Optional)</span>
                  <textarea
                    className="min-h-[120px] w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted"
                    placeholder="Enter any additional processing instructions"
                    value={values.specialInstructions}
                    onChange={(event) => setField('specialInstructions', event.target.value)}
                  />
                </label>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <h3 className="text-xl font-semibold text-text-primary md:hidden">Disclosures</h3>
                <span className={cn(stepBadgeClass, 'md:hidden')}>
                  <Sprout className="h-3.5 w-3.5" />
                  Roth IRA Conversion
                </span>

                <div className="rounded-2xl border border-border p-4">
                  <h4 className="text-base font-semibold text-text-primary">Roth IRA Conversion Disclosure</h4>
                  <div className="mt-3 max-h-[260px] overflow-y-auto rounded-xl border border-border bg-background p-3 text-sm text-text-secondary">
                    {disclosureText.split('\n').map((line) => (
                      <p key={line} className="mb-2 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                  <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-text-primary">
                    <span
                      className={cn(
                        'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                        values.acceptedDisclosures ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                      )}
                    >
                      {values.acceptedDisclosures ? <Check className="h-3.5 w-3.5" /> : null}
                    </span>
                    I have read and agree to the Roth IRA conversion disclosures.
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={values.acceptedDisclosures}
                      onChange={(event) => setField('acceptedDisclosures', event.target.checked)}
                    />
                  </label>
                </div>
              </div>
            ) : null}

            {step === 5 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <h3 className="text-xl font-semibold text-text-primary md:hidden">Document Sign</h3>
                <span className={cn(stepBadgeClass, 'md:hidden')}>
                  <Sprout className="h-3.5 w-3.5" />
                  Roth IRA Conversion
                </span>

                <div className="rounded-2xl border border-border p-5">
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign & Submit Roth Conversion</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign your conversion request to continue.</p>
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
