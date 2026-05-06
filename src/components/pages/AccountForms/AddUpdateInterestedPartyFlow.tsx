import { ArrowLeft, Check, Lightbulb, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 1 | 2 | 3
type ElectionOption = 'designate' | 'replace' | 'remove' | 'other'
type PartyType = 'individual' | 'company'
type Gender = 'male' | 'female'
type PhoneType = 'cell' | 'home' | 'business'

interface InterestedPartyFormValues {
  election?: ElectionOption
  otherIpName: string
  removeIpName: string
  partyType: PartyType
  firstName: string
  middleName: string
  lastName: string
  ssn: string
  birthMonth: string
  birthDay: string
  birthYear: string
  email: string
  gender?: Gender
  address: string
  phoneType: PhoneType
  phone: string
  wantsPaperStatements: boolean
}

const monthOptions = [
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

const dayOptions = Array.from({ length: 31 }, (_, index) => `${index + 1}`)
const yearOptions = Array.from({ length: 90 }, (_, index) => `${new Date().getFullYear() - index}`)

const initialValues: InterestedPartyFormValues = {
  otherIpName: '',
  removeIpName: '',
  partyType: 'individual',
  firstName: '',
  middleName: '',
  lastName: '',
  ssn: '',
  birthMonth: '',
  birthDay: '',
  birthYear: '',
  email: '',
  address: '',
  phoneType: 'cell',
  phone: '',
  wantsPaperStatements: true,
}

interface AddUpdateInterestedPartyFlowProps {
  onBackToForms: () => void
}

const baseInputClass =
  'h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-primary'

const baseSelectClass = `${baseInputClass} pr-8`

const FlowStepItem = ({
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
          'grid h-7 w-7 place-items-center rounded-full text-sm',
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

const ElectionRow = ({
  checked,
  label,
  onSelect,
  trailingInput,
}: {
  checked: boolean
  label: string
  onSelect: () => void
  trailingInput?: ReactNode
}) => (
  <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-text-primary">
    <span className="flex items-center gap-3">
      <span
        className={cn(
          'grid h-5 w-5 place-items-center rounded-full border',
          checked ? 'border-error bg-error' : 'border-border bg-surface',
        )}
      >
        <span className={cn('h-2.5 w-2.5 rounded-full', checked ? 'bg-surface' : 'bg-transparent')} />
      </span>
      <span>{label}</span>
    </span>
    {trailingInput}
    <input type="radio" className="sr-only" checked={checked} onChange={onSelect} />
  </label>
)

export const AddUpdateInterestedPartyFlow = ({ onBackToForms }: AddUpdateInterestedPartyFlowProps) => {
  const [step, setStep] = useState<FlowStep>(1)
  const [values, setValues] = useState<InterestedPartyFormValues>(initialValues)

  const requiresDetailedForm = values.election === 'designate' || values.election === 'replace'

  const isStepOneValid = useMemo(() => {
    if (!values.election) {
      return false
    }

    if (values.election === 'other') {
      return values.otherIpName.trim().length > 0
    }

    if (values.election === 'remove') {
      return values.removeIpName.trim().length > 0
    }

    if (!requiresDetailedForm) {
      return false
    }

    const hasRequiredText =
      values.firstName.trim().length > 0 &&
      values.lastName.trim().length > 0 &&
      values.ssn.trim().length > 0 &&
      values.birthMonth.trim().length > 0 &&
      values.birthDay.trim().length > 0 &&
      values.birthYear.trim().length > 0 &&
      values.email.trim().length > 0 &&
      values.address.trim().length > 0 &&
      values.phone.trim().length > 0

    return hasRequiredText && Boolean(values.gender)
  }, [requiresDetailedForm, values])

  const canContinue = step === 1 ? isStepOneValid : true

  const setField = <K extends keyof InterestedPartyFormValues>(key: K, value: InterestedPartyFormValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const handleBack = (): void => {
    if (step === 1) {
      onBackToForms()
      return
    }
    setStep((previous) => (previous - 1) as FlowStep)
  }

  const handleContinue = (): void => {
    if (!canContinue) {
      return
    }

    if (step === 3) {
      onBackToForms()
      return
    }

    setStep((previous) => (previous + 1) as FlowStep)
  }

  const stepTitle = step === 1 ? 'Interested Party Information' : step === 2 ? 'Paper Statements' : 'Document Sign'

  return (
    <section className="min-h-[calc(100vh-3rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      <div className="flex min-h-[calc(100vh-3rem)]">
        <aside className="w-[360px] border-r border-border px-5 py-6">
          <ol className="space-y-5">
            <FlowStepItem index={1} label="Account Type" status="completed" />
            <FlowStepItem index={2} label="Interested Party Information" status={step > 1 ? 'completed' : 'active'} />
            <FlowStepItem index={3} label="Paper Statements" status={step > 2 ? 'completed' : step === 2 ? 'active' : 'pending'} />
            <FlowStepItem index={4} label="Document Sign" status={step === 3 ? 'active' : 'pending'} />
          </ol>
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-text-primary"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-2xl font-semibold leading-none text-text-primary">{stepTitle}</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1 text-xs text-text-primary">
                <Users className="h-3.5 w-3.5" />
                Add/Update Interested Party
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

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {step === 1 ? (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">Elections</h3>
                  <p className="mt-2 flex items-start gap-2 text-sm leading-snug text-text-secondary">
                    <Lightbulb className="mt-1 h-4 w-4 shrink-0 text-error" />
                    Please complete the information below if authorizing an Interested Party to discuss your account via
                    phone, email or fax. Please note that this individual will have limited access to your account information and
                    does not have authority to make investment decisions direction of investments or changes to your account.
                  </p>
                </div>

                <div className="space-y-5 rounded-2xl border border-border p-5">
                  <p className="text-base leading-snug text-text-secondary">
                    The email address provided for the Interested Party will be carbon copied on all emails sent from Directed IRA
                    regarding your account. The Interested Party will be authorized to receive all account information and to
                    receive online access
                  </p>

                  <ElectionRow
                    checked={values.election === 'designate'}
                    onSelect={() => setField('election', 'designate')}
                    label="I would like to designate an individual as a new Interested Party to my account. Existing Interested Party(ies) listed will remain authorized on Account."
                  />
                  <ElectionRow
                    checked={values.election === 'replace'}
                    onSelect={() => setField('election', 'replace')}
                    label="I wish to remove any existing Interested Party authorized on my account and replace with the new Interested Party listed below."
                  />
                  <ElectionRow
                    checked={values.election === 'remove'}
                    onSelect={() => setField('election', 'remove')}
                    label="I wish to remove the Interested Party. No new Interested Party will be authorized at this time."
                    trailingInput={
                      values.election === 'remove' ? (
                        <input
                          value={values.removeIpName}
                          onChange={(event) => setField('removeIpName', event.target.value)}
                          placeholder="Remove IP Name"
                          className={cn(baseInputClass, 'h-11 max-w-[260px] text-sm')}
                        />
                      ) : undefined
                    }
                  />
                  <ElectionRow
                    checked={values.election === 'other'}
                    onSelect={() => setField('election', 'other')}
                    label="Other"
                    trailingInput={
                      values.election === 'other' ? (
                        <input
                          value={values.otherIpName}
                          onChange={(event) => setField('otherIpName', event.target.value)}
                          placeholder="Other IP Name"
                          className={cn(baseInputClass, 'h-11 max-w-[260px] text-sm')}
                        />
                      ) : undefined
                    }
                  />
                </div>

                {requiresDetailedForm ? (
                  <div className="space-y-4 border-t border-border pt-5">
                    <div>
                      <p className="text-xs text-text-secondary">Please Select an Option</p>
                      <div className="mt-2 inline-flex rounded-full bg-slate-100 p-1">
                        <button
                          type="button"
                          onClick={() => setField('partyType', 'individual')}
                          className={cn(
                            'h-8 rounded-full px-4 text-sm',
                            values.partyType === 'individual'
                              ? 'bg-surface font-semibold text-text-primary shadow-sm'
                              : 'text-text-secondary',
                          )}
                        >
                          Individual
                        </button>
                        <button
                          type="button"
                          onClick={() => setField('partyType', 'company')}
                          className={cn(
                            'h-8 rounded-full px-4 text-sm',
                            values.partyType === 'company'
                              ? 'bg-surface font-semibold text-text-primary shadow-sm'
                              : 'text-text-secondary',
                          )}
                        >
                          Company
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-text-secondary">Legal Name*</label>
                      <div className="grid gap-3 xl:grid-cols-3">
                        <input
                          className={baseInputClass}
                          placeholder="First name.."
                          value={values.firstName}
                          onChange={(event) => setField('firstName', event.target.value)}
                        />
                        <input
                          className={baseInputClass}
                          placeholder="Middle name.."
                          value={values.middleName}
                          onChange={(event) => setField('middleName', event.target.value)}
                        />
                        <input
                          className={baseInputClass}
                          placeholder="Last name.."
                          value={values.lastName}
                          onChange={(event) => setField('lastName', event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 xl:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs text-text-secondary">Social Security #*</label>
                        <input
                          className={baseInputClass}
                          placeholder="SSN number..."
                          value={values.ssn}
                          onChange={(event) => setField('ssn', event.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-text-secondary">Date of Birth*</label>
                        <div className="grid gap-2 xl:grid-cols-3">
                          <select
                            className={baseSelectClass}
                            value={values.birthMonth}
                            onChange={(event) => setField('birthMonth', event.target.value)}
                          >
                            <option value="">Month</option>
                            {monthOptions.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            className={baseSelectClass}
                            value={values.birthDay}
                            onChange={(event) => setField('birthDay', event.target.value)}
                          >
                            <option value="">Day</option>
                            {dayOptions.map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                          <select
                            className={baseSelectClass}
                            value={values.birthYear}
                            onChange={(event) => setField('birthYear', event.target.value)}
                          >
                            <option value="">Year</option>
                            {yearOptions.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 xl:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs text-text-secondary">Email Address*</label>
                        <input
                          className={baseInputClass}
                          placeholder="Enter email address..."
                          value={values.email}
                          onChange={(event) => setField('email', event.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-text-secondary">Gender*</label>
                        <div className="inline-flex rounded-full bg-slate-100 p-1">
                          <button
                            type="button"
                            onClick={() => setField('gender', 'male')}
                            className={cn(
                              'h-8 rounded-full px-4 text-sm',
                              values.gender === 'male'
                                ? 'bg-surface font-semibold text-text-primary shadow-sm'
                                : 'text-text-secondary',
                            )}
                          >
                            Male
                          </button>
                          <button
                            type="button"
                            onClick={() => setField('gender', 'female')}
                            className={cn(
                              'h-8 rounded-full px-4 text-sm',
                              values.gender === 'female'
                                ? 'bg-surface font-semibold text-text-primary shadow-sm'
                                : 'text-text-secondary',
                            )}
                          >
                            Female
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-text-secondary">Physical/Residential Address*</label>
                      <input
                        className={baseInputClass}
                        placeholder="Search address.."
                        value={values.address}
                        onChange={(event) => setField('address', event.target.value)}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs text-text-secondary">Primary Phone*</label>
                      <div className="flex flex-wrap items-center gap-3 rounded-full border border-border bg-surface px-2 py-1">
                        <div className="inline-flex rounded-full bg-slate-100 p-1">
                          {(['cell', 'home', 'business'] as PhoneType[]).map((phoneType) => (
                            <button
                              key={phoneType}
                              type="button"
                              onClick={() => setField('phoneType', phoneType)}
                              className={cn(
                                'h-7 rounded-full px-3 text-xs capitalize',
                                values.phoneType === phoneType
                                  ? 'bg-surface font-semibold text-text-primary shadow-sm'
                                  : 'text-text-secondary',
                              )}
                            >
                              {phoneType}
                            </button>
                          ))}
                        </div>
                        <input
                          className="h-9 flex-1 border-0 bg-transparent px-2 text-sm text-text-primary placeholder:text-text-muted focus-visible:ring-0"
                          placeholder="(0) - 000 - 000"
                          value={values.phone}
                          onChange={(event) => setField('phone', event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-text-primary">Paper Statements (Optional)</h3>
                <div className="rounded-2xl border border-border p-5">
                  <p className="text-base text-text-secondary">
                    I understand that the Interested Party will not receive copies of my account statements electronically.
                  </p>
                  <label className="mt-4 flex cursor-pointer items-start gap-3 text-base leading-snug text-text-secondary">
                    <span
                      className={cn(
                        'mt-1 grid h-6 w-6 place-items-center rounded-md border',
                        values.wantsPaperStatements ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                      )}
                    >
                      {values.wantsPaperStatements ? <Check className="h-4 w-4" /> : null}
                    </span>
                    Please check box ONLY if you would like the new Interested Party to receive paper versions of your Directed IRA
                    statement and tax forms to the mailing address provided. Please be aware that there is a $20 annual fee for
                    Paper Statements.
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={values.wantsPaperStatements}
                      onChange={(event) => setField('wantsPaperStatements', event.target.checked)}
                    />
                  </label>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="rounded-2xl border border-border p-5">
                <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                  <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-3xl font-semibold text-text-primary">Sign & Pay to Establish your Account</h3>
                  <p className="mt-2 text-base text-text-secondary">
                    Digitally sign your application document to move forward.
                  </p>
                  <Button className="mt-5 rounded-full px-6">Sign Document</Button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
            <button
              type="button"
              onClick={handleBack}
              className="h-11 rounded-full border border-border bg-surface px-6 text-sm font-medium text-text-primary hover:bg-slate-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleContinue}
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
