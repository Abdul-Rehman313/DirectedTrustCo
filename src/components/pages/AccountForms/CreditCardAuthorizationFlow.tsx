import { ArrowLeft, Check, CreditCard, FileText } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3 | 4
type CardType = 'visa' | 'mastercard' | 'amex' | 'discover'

interface CreditCardFormValues {
  cardType?: CardType
  cardholderName: string
  cardNumber: string
  expirationMonth: string
  expirationYear: string
  cvv: string
  billingZip: string
  email: string
  authorizeFees: boolean
  confirmCardOwnership: boolean
  signed: boolean
}

interface CreditCardAuthorizationFlowProps {
  onBackToForms: () => void
}

const months = Array.from({ length: 12 }, (_, index) => `${index + 1}`.padStart(2, '0'))
const years = Array.from({ length: 12 }, (_, index) => `${new Date().getFullYear() + index}`)

const cardTypeOptions: { value: CardType; label: string }[] = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
  { value: 'amex', label: 'American Express' },
  { value: 'discover', label: 'Discover' },
]

const initialValues: CreditCardFormValues = {
  cardholderName: '',
  cardNumber: '',
  expirationMonth: '',
  expirationYear: '',
  cvv: '',
  billingZip: '',
  email: '',
  authorizeFees: false,
  confirmCardOwnership: false,
  signed: false,
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

const normalizeCardNumber = (value: string): string =>
  value
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim()

const normalizeCvv = (value: string): string => value.replace(/\D/g, '').slice(0, 4)
const normalizeZip = (value: string): string => value.replace(/\D/g, '').slice(0, 10)

export const CreditCardAuthorizationFlow = ({ onBackToForms }: CreditCardAuthorizationFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<CreditCardFormValues>(initialValues)

  const canContinue = useMemo(() => {
    if (step === 4) {
      return values.signed
    }

    if (step === 3) {
      return Boolean(
        values.cardholderName.trim() &&
          values.cardNumber.replace(/\s/g, '').length >= 15 &&
          values.expirationMonth &&
          values.expirationYear &&
          values.cvv.length >= 3 &&
          values.billingZip.trim().length >= 5 &&
          values.email.trim() &&
          values.email.includes('@') &&
          values.authorizeFees &&
          values.confirmCardOwnership,
      )
    }

    return Boolean(values.cardType)
  }, [step, values])

  const setField = <K extends keyof CreditCardFormValues>(key: K, value: CreditCardFormValues[K]) => {
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
    if (step === 4) {
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
            <StepItem index={2} label="Card Type" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Credit Card Authorization" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
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
                {step === 2 ? 'Card Type' : step === 3 ? 'Credit Card Authorization' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                <CreditCard className="h-3.5 w-3.5" />
                Credit Card Authorization Form
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
                <div className="rounded-2xl border border-border p-4 md:max-w-lg">
                  <p className="text-sm font-semibold text-text-primary">Select Card Type*</p>
                  <p className="mt-2 text-sm text-text-secondary">Choose the credit card brand you want to authorize.</p>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-xs text-text-secondary">Card Type*</span>
                    <select
                      className={inputClass}
                      value={values.cardType ?? ''}
                      onChange={(event) => setField('cardType', event.target.value as CardType)}
                    >
                      <option value="">Select card type</option>
                      {cardTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="rounded-2xl border border-border p-4">
                  <h4 className="text-sm font-semibold text-text-primary">Credit Card Information</h4>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Cardholder Name*</span>
                      <input
                        className={inputClass}
                        placeholder="Enter full legal name"
                        value={values.cardholderName}
                        onChange={(event) => setField('cardholderName', event.target.value)}
                      />
                    </label>

                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-xs text-text-secondary">Card Number*</span>
                      <input
                        className={inputClass}
                        placeholder="0000 0000 0000 0000"
                        value={values.cardNumber}
                        onChange={(event) => setField('cardNumber', normalizeCardNumber(event.target.value))}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Expiration Month*</span>
                      <select
                        className={inputClass}
                        value={values.expirationMonth}
                        onChange={(event) => setField('expirationMonth', event.target.value)}
                      >
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Expiration Year*</span>
                      <select
                        className={inputClass}
                        value={values.expirationYear}
                        onChange={(event) => setField('expirationYear', event.target.value)}
                      >
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">CVV*</span>
                      <input
                        className={inputClass}
                        placeholder="CVV"
                        value={values.cvv}
                        onChange={(event) => setField('cvv', normalizeCvv(event.target.value))}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Billing ZIP*</span>
                      <input
                        className={inputClass}
                        placeholder="ZIP code"
                        value={values.billingZip}
                        onChange={(event) => setField('billingZip', normalizeZip(event.target.value))}
                      />
                    </label>

                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-xs text-text-secondary">Email Address*</span>
                      <input
                        className={inputClass}
                        placeholder="name@example.com"
                        value={values.email}
                        onChange={(event) => setField('email', event.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                  <span
                    className={cn(
                      'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                      values.authorizeFees ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                    )}
                  >
                    {values.authorizeFees ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  I authorize Directed Trust Company to charge this credit card for account-related fees.
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={values.authorizeFees}
                    onChange={(event) => setField('authorizeFees', event.target.checked)}
                  />
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                  <span
                    className={cn(
                      'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                      values.confirmCardOwnership ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                    )}
                  >
                    {values.confirmCardOwnership ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  I confirm I am an authorized user of this credit card and the details entered are accurate.
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={values.confirmCardOwnership}
                    onChange={(event) => setField('confirmCardOwnership', event.target.checked)}
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
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Credit Card Authorization</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign to finalize your credit card authorization form.</p>
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

