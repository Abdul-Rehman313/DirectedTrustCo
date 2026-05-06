import { ArrowLeft, Check, FileText, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3
type Relationship = 'spouse' | 'child' | 'parent' | 'other'

interface BeneficiaryDesignationUpdateValues {
  primaryName: string
  relationship?: Relationship
  dateOfBirth: string
  ssn: string
  percentage: string
  contingentName: string
  contingentRelationship?: Relationship
  contingentPercentage: string
  acceptedTerms: boolean
  signed: boolean
}

interface BeneficiaryDesignationUpdateFlowProps {
  onBackToForms: () => void
}

const inputClass =
  'h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted'

const badgeClass = 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-primary'

const relationshipOptions: { label: string; value: Relationship }[] = [
  { label: 'Spouse', value: 'spouse' },
  { label: 'Child', value: 'child' },
  { label: 'Parent', value: 'parent' },
  { label: 'Other', value: 'other' },
]

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

export const BeneficiaryDesignationUpdateFlow = ({ onBackToForms }: BeneficiaryDesignationUpdateFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<BeneficiaryDesignationUpdateValues>({
    primaryName: '',
    dateOfBirth: '',
    ssn: '',
    percentage: '',
    contingentName: '',
    contingentPercentage: '',
    acceptedTerms: false,
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 3) {
      return values.signed
    }

    return Boolean(
      values.primaryName.trim() &&
        values.relationship &&
        values.dateOfBirth &&
        values.ssn.trim() &&
        values.percentage.trim() &&
        values.acceptedTerms,
    )
  }, [step, values])

  const setField = <K extends keyof BeneficiaryDesignationUpdateValues>(
    key: K,
    value: BeneficiaryDesignationUpdateValues[K],
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
            <StepItem index={2} label="Beneficiary Designation" status={step === 2 ? 'active' : 'completed'} />
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
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
                {step === 2 ? 'Beneficiary Designation' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                <Users className="h-3.5 w-3.5" />
                Beneficiary Designation Update
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
                <h3 className="text-xl font-semibold text-text-primary md:hidden">Beneficiary Designation</h3>
                <span className={cn(badgeClass, 'md:hidden')}>
                  <Users className="h-3.5 w-3.5" />
                  Beneficiary Designation Update
                </span>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm text-text-secondary">
                    Add or update who receives your account assets. Primary beneficiary is required.
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Primary Beneficiary Name*</span>
                      <input
                        className={inputClass}
                        placeholder="Full name"
                        value={values.primaryName}
                        onChange={(event) => setField('primaryName', event.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Relationship*</span>
                      <select
                        className={inputClass}
                        value={values.relationship ?? ''}
                        onChange={(event) => setField('relationship', event.target.value as Relationship)}
                      >
                        <option value="">Select relationship</option>
                        {relationshipOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Date of Birth*</span>
                      <input
                        className={inputClass}
                        type="date"
                        value={values.dateOfBirth}
                        onChange={(event) => setField('dateOfBirth', event.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">SSN*</span>
                      <input
                        className={inputClass}
                        placeholder="###-##-####"
                        value={values.ssn}
                        onChange={(event) => setField('ssn', event.target.value)}
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-xs text-text-secondary">Allocation Percentage*</span>
                      <input
                        className={inputClass}
                        placeholder="100"
                        value={values.percentage}
                        onChange={(event) => setField('percentage', event.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-medium text-text-primary">Contingent Beneficiary (Optional)</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Contingent Name</span>
                      <input
                        className={inputClass}
                        placeholder="Full name"
                        value={values.contingentName}
                        onChange={(event) => setField('contingentName', event.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary">Relationship</span>
                      <select
                        className={inputClass}
                        value={values.contingentRelationship ?? ''}
                        onChange={(event) => setField('contingentRelationship', event.target.value as Relationship)}
                      >
                        <option value="">Select relationship</option>
                        {relationshipOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-xs text-text-secondary">Allocation Percentage</span>
                      <input
                        className={inputClass}
                        placeholder="0"
                        value={values.contingentPercentage}
                        onChange={(event) => setField('contingentPercentage', event.target.value)}
                      />
                    </label>
                  </div>
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
                  I confirm beneficiary details are accurate and understand this update overrides prior designations.
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
                  <Users className="h-3.5 w-3.5" />
                  Beneficiary Designation Update
                </span>

                <div className="rounded-2xl border border-border p-5">
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Beneficiary Update</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign to submit beneficiary changes.</p>
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
