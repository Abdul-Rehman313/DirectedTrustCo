import { ArrowLeft, Check, FileText, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3

interface UpdateAccountInformationValues {
  firstName: string
  middleName: string
  lastName: string
  birthMonth: string
  birthDay: string
  birthYear: string
  email: string
  phone: string
  physicalAddress: string
  mailingAddress: string
  sameAsPhysical: boolean
  signed: boolean
}

interface UpdateAccountInformationFlowProps {
  onBackToForms: () => void
}

const inputClass =
  'h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted'

const badgeClass = 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-primary'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const days = Array.from({ length: 31 }, (_, index) => `${index + 1}`)
const years = Array.from({ length: 90 }, (_, index) => `${new Date().getFullYear() - index}`)

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

export const UpdateAccountInformationFlow = ({ onBackToForms }: UpdateAccountInformationFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<UpdateAccountInformationValues>({
    firstName: '',
    middleName: '',
    lastName: '',
    birthMonth: '',
    birthDay: '',
    birthYear: '',
    email: '',
    phone: '',
    physicalAddress: '',
    mailingAddress: '',
    sameAsPhysical: false,
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 3) {
      return values.signed
    }

    return Boolean(
      values.firstName.trim() &&
        values.lastName.trim() &&
        values.birthMonth &&
        values.birthDay &&
        values.birthYear &&
        values.email.trim() &&
        values.phone.trim() &&
        values.physicalAddress.trim() &&
        (values.sameAsPhysical || values.mailingAddress.trim()),
    )
  }, [step, values])

  const setField = <K extends keyof UpdateAccountInformationValues>(key: K, value: UpdateAccountInformationValues[K]) => {
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
            <StepItem index={2} label="Account Contact Information" status={step === 2 ? 'active' : 'completed'} />
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
                {step === 2 ? 'Account Contact Information' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(badgeClass, 'hidden md:inline-flex')}>
                <UserRound className="h-3.5 w-3.5" />
                Update Account Information
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
                <h3 className="text-xl font-semibold text-text-primary md:hidden">Account Contact Information</h3>
                <span className={cn(badgeClass, 'md:hidden')}>
                  <UserRound className="h-3.5 w-3.5" />
                  Update Account Information
                </span>

                <div>
                  <label className="mb-2 block text-xs text-text-secondary">Legal Name*</label>
                  <div className="grid gap-3 md:grid-cols-3">
                    <input
                      className={inputClass}
                      placeholder="First name"
                      value={values.firstName}
                      onChange={(event) => setField('firstName', event.target.value)}
                    />
                    <input
                      className={inputClass}
                      placeholder="Middle name"
                      value={values.middleName}
                      onChange={(event) => setField('middleName', event.target.value)}
                    />
                    <input
                      className={inputClass}
                      placeholder="Last name"
                      value={values.lastName}
                      onChange={(event) => setField('lastName', event.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs text-text-secondary">Date of Birth*</label>
                    <div className="grid gap-2 md:grid-cols-3">
                      <select className={inputClass} value={values.birthMonth} onChange={(event) => setField('birthMonth', event.target.value)}>
                        <option value="">Month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select className={inputClass} value={values.birthDay} onChange={(event) => setField('birthDay', event.target.value)}>
                        <option value="">Day</option>
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                      <select className={inputClass} value={values.birthYear} onChange={(event) => setField('birthYear', event.target.value)}>
                        <option value="">Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Email Address*</span>
                    <input
                      className={inputClass}
                      placeholder="name@example.com"
                      value={values.email}
                      onChange={(event) => setField('email', event.target.value)}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Primary Phone*</span>
                  <input
                    className={inputClass}
                    placeholder="(000) 000-0000"
                    value={values.phone}
                    onChange={(event) => setField('phone', event.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs text-text-secondary">Physical/Residential Address*</span>
                  <input
                    className={inputClass}
                    placeholder="Search address"
                    value={values.physicalAddress}
                    onChange={(event) => setField('physicalAddress', event.target.value)}
                  />
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                  <span
                    className={cn(
                      'grid h-5 w-5 place-items-center rounded border',
                      values.sameAsPhysical ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                    )}
                  >
                    {values.sameAsPhysical ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  Mailing address is same as physical address
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={values.sameAsPhysical}
                    onChange={(event) => setField('sameAsPhysical', event.target.checked)}
                  />
                </label>

                {!values.sameAsPhysical ? (
                  <label className="block">
                    <span className="mb-2 block text-xs text-text-secondary">Mailing Address*</span>
                    <input
                      className={inputClass}
                      placeholder="Enter mailing address"
                      value={values.mailingAddress}
                      onChange={(event) => setField('mailingAddress', event.target.value)}
                    />
                  </label>
                ) : null}
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <h3 className="text-xl font-semibold text-text-primary md:hidden">Document Sign</h3>
                <span className={cn(badgeClass, 'md:hidden')}>
                  <UserRound className="h-3.5 w-3.5" />
                  Update Account Information
                </span>

                <div className="rounded-2xl border border-border p-5">
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign & Submit Account Update</h3>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign your update request to continue.</p>
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
