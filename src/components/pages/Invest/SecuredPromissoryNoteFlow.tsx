import { ArrowLeft, Check, FileText, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3 | 4
type BorrowerType = 'individual' | 'business'
type PaymentFrequency = 'monthly' | 'quarterly' | 'maturity'
type CollateralType = 'real-estate' | 'vehicle' | 'business-assets' | 'other'

interface SecuredPromissoryNoteValues {
  borrowerType?: BorrowerType
  borrowerName: string
  principalAmount: string
  interestRate: string
  originationDate: string
  maturityDate: string
  paymentFrequency?: PaymentFrequency
  collateralType?: CollateralType
  collateralDescription: string
  lienPosition: string
  collateralValue: string
  borrowerContactName: string
  borrowerContactEmail: string
  borrowerContactPhone: string
  confirmsCollateralDocumentation: boolean
  confirmsArmsLengthTransaction: boolean
  confirmsNoDisqualifiedPersons: boolean
  confirmsReviewedTerms: boolean
  signed: boolean
}

interface SecuredPromissoryNoteFlowProps {
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

export const SecuredPromissoryNoteFlow = ({ onBackToInvest }: SecuredPromissoryNoteFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<SecuredPromissoryNoteValues>({
    borrowerName: '',
    principalAmount: '',
    interestRate: '',
    originationDate: '',
    maturityDate: '',
    collateralDescription: '',
    lienPosition: '',
    collateralValue: '',
    borrowerContactName: '',
    borrowerContactEmail: '',
    borrowerContactPhone: '',
    confirmsCollateralDocumentation: false,
    confirmsArmsLengthTransaction: false,
    confirmsNoDisqualifiedPersons: false,
    confirmsReviewedTerms: false,
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 4) {
      return values.signed
    }

    if (step === 3) {
      return Boolean(
        values.borrowerContactName.trim() &&
          values.borrowerContactEmail.trim() &&
          values.borrowerContactPhone.trim() &&
          values.confirmsCollateralDocumentation &&
          values.confirmsArmsLengthTransaction &&
          values.confirmsNoDisqualifiedPersons &&
          values.confirmsReviewedTerms,
      )
    }

    return Boolean(
      values.borrowerType &&
        values.borrowerName.trim() &&
        values.principalAmount.trim() &&
        values.interestRate.trim() &&
        values.originationDate &&
        values.maturityDate &&
        values.paymentFrequency &&
        values.collateralType &&
        values.collateralDescription.trim() &&
        values.lienPosition.trim() &&
        values.collateralValue.trim(),
    )
  }, [step, values])

  const setField = <K extends keyof SecuredPromissoryNoteValues>(key: K, value: SecuredPromissoryNoteValues[K]) => {
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
            <StepItem index={2} label="Note & Collateral Details" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Borrower & Compliance" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
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
                {step === 2 ? 'Note & Collateral Details' : step === 3 ? 'Borrower & Compliance' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                <ShieldCheck className="h-3.5 w-3.5" />
                Secured Promissory Note
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
                  <p className="text-sm font-medium text-text-primary">Borrower Type*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['individual', 'Individual borrower'],
                      ['business', 'Business borrower'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.borrowerType === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.borrowerType === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.borrowerType === value}
                          onChange={() => setField('borrowerType', value as BorrowerType)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Borrower Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter borrower name"
                      value={values.borrowerName}
                      onChange={(event) => setField('borrowerName', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Principal Amount*</span>
                    <input
                      className={inputClass}
                      placeholder="$0.00"
                      value={values.principalAmount}
                      onChange={(event) => setField('principalAmount', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Interest Rate (%)*</span>
                    <input
                      className={inputClass}
                      placeholder="0.00"
                      value={values.interestRate}
                      onChange={(event) => setField('interestRate', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Payment Frequency*</span>
                    <select
                      className={inputClass}
                      value={values.paymentFrequency ?? ''}
                      onChange={(event) => setField('paymentFrequency', event.target.value as PaymentFrequency)}
                    >
                      <option value="">Select frequency</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="maturity">Interest at maturity</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Origination Date*</span>
                    <input
                      type="date"
                      className={inputClass}
                      value={values.originationDate}
                      onChange={(event) => setField('originationDate', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Maturity Date*</span>
                    <input
                      type="date"
                      className={inputClass}
                      value={values.maturityDate}
                      onChange={(event) => setField('maturityDate', event.target.value)}
                    />
                  </label>
                </div>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Collateral Type*</p>
                  <div className="mt-3 space-y-3">
                    {[
                      ['real-estate', 'Real estate'],
                      ['vehicle', 'Vehicle / equipment'],
                      ['business-assets', 'Business assets'],
                      ['other', 'Other collateral'],
                    ].map(([value, label]) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.collateralType === value ? 'border-error bg-error' : 'border-border',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.collateralType === value ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        {label}
                        <input
                          type="radio"
                          className="sr-only"
                          checked={values.collateralType === value}
                          onChange={() => setField('collateralType', value as CollateralType)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-xs text-text-secondary">Collateral Description*</span>
                    <input
                      className={inputClass}
                      placeholder="Describe collateral"
                      value={values.collateralDescription}
                      onChange={(event) => setField('collateralDescription', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Lien Position*</span>
                    <input
                      className={inputClass}
                      placeholder="1st lien, 2nd lien, etc."
                      value={values.lienPosition}
                      onChange={(event) => setField('lienPosition', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Estimated Collateral Value*</span>
                    <input
                      className={inputClass}
                      placeholder="$0.00"
                      value={values.collateralValue}
                      onChange={(event) => setField('collateralValue', event.target.value)}
                    />
                  </label>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Borrower Contact Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter contact name"
                      value={values.borrowerContactName}
                      onChange={(event) => setField('borrowerContactName', event.target.value)}
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Borrower Contact Email*</span>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="name@example.com"
                      value={values.borrowerContactEmail}
                      onChange={(event) => setField('borrowerContactEmail', event.target.value)}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Borrower Contact Phone*</span>
                  <input
                    className={inputClass}
                    placeholder="(000) 000-0000"
                    value={values.borrowerContactPhone}
                    onChange={(event) => setField('borrowerContactPhone', event.target.value)}
                  />
                </label>

                {[
                  ['confirmsCollateralDocumentation', 'I confirm collateral documents (UCC, deed of trust, etc.) are completed.'],
                  ['confirmsArmsLengthTransaction', 'I confirm this is an arm’s-length transaction.'],
                  ['confirmsNoDisqualifiedPersons', 'I confirm no disqualified persons are involved.'],
                  ['confirmsReviewedTerms', 'I reviewed all note and security agreement terms.'],
                ].map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                    <span
                      className={cn(
                        'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                        values[key as keyof SecuredPromissoryNoteValues] ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                      )}
                    >
                      {values[key as keyof SecuredPromissoryNoteValues] ? <Check className="h-3.5 w-3.5" /> : null}
                    </span>
                    {label}
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={Boolean(values[key as keyof SecuredPromissoryNoteValues])}
                      onChange={(event) => setField(key as keyof SecuredPromissoryNoteValues, event.target.checked)}
                    />
                  </label>
                ))}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <div className="rounded-2xl border border-border p-5">
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Secured Note Request</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign to submit your secured promissory note request.</p>
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

