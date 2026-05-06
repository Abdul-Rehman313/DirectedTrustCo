import { AlertTriangle, ArrowLeft, Check, FileSignature, RefreshCcw, Upload } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { cn } from '../../../utils/cn'
import { Button } from '../../ui'

type FlowStep = 2 | 3 | 4
type ProcessingOption = 'next-day' | 'same-day' | 'standard'

interface ExpensePayment990TValues {
  form8868FileName: string
  irsWorksheetFileName: string
  amountToBePaid: string
  processingOption?: ProcessingOption
  signed: boolean
}

interface ExpensePayment990TFlowProps {
  onBackToManageInvestments: () => void
}

const inputClass =
  'h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted'

const formTypeBadgeClass = 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-primary'

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

const fileSubtitle = 'pdf, docx, jpg max 10MB.'

const PaymentFileUpload = ({
  label,
  fileName,
  onFileSelect,
}: {
  label: string
  fileName: string
  onFileSelect: (nextName: string) => void
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <div className="space-y-2">
      <p className="text-sm text-text-secondary">
        {label}
        <span className="text-error">*</span>
      </p>
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          <Upload className="h-5 w-5 text-text-secondary" />
          <div>
            <p className="text-sm font-semibold text-text-primary">{fileName || 'Choose a file or Drag and Drop'}</p>
            <p className="text-sm text-text-secondary">{fileSubtitle}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="h-11 rounded-full bg-slate-100 px-5 text-sm font-medium text-text-primary"
        >
          Browse File
        </button>
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0]
            if (selectedFile) {
              onFileSelect(selectedFile.name)
            }
          }}
        />
      </div>
    </div>
  )
}

export const ExpensePayment990TFlow = ({ onBackToManageInvestments }: ExpensePayment990TFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<ExpensePayment990TValues>({
    form8868FileName: '',
    irsWorksheetFileName: '',
    amountToBePaid: '',
    processingOption: 'next-day',
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 4) {
      return values.signed
    }
    if (step === 3) {
      return Boolean(values.processingOption)
    }
    return Boolean(values.form8868FileName && values.irsWorksheetFileName && Number(values.amountToBePaid) > 0)
  }, [step, values])

  const setField = <K extends keyof ExpensePayment990TValues>(key: K, value: ExpensePayment990TValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const goBack = (): void => {
    if (step === 2) {
      onBackToManageInvestments()
      return
    }
    setStep((previous) => (previous - 1) as FlowStep)
  }

  const goNext = (): void => {
    if (!canContinue) {
      return
    }
    if (step === 4) {
      onBackToManageInvestments()
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
            <StepItem index={2} label="Payment Information" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Expedited Processing" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
            <StepItem index={4} label="Document Sign" status={step === 4 ? 'active' : 'pending'} />
          </ol>
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goBack}
                className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-text-primary"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
                {step === 2 ? 'Payment Information' : step === 3 ? 'Expedited Processing' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(formTypeBadgeClass, 'hidden md:inline-flex')}>
                <RefreshCcw className="h-3.5 w-3.5" />
                990-T Expense Payment
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
            <div className="mb-3 flex items-center justify-between rounded-2xl border border-border px-4 py-3 lg:hidden">
              <p className="text-lg font-semibold text-text-primary">
                STEP <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-text-primary text-sm text-text-inverse">{step}</span>{' '}
                <span className="text-text-muted">OF</span>{' '}
                <span className="inline-grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-sm">4</span>
              </p>
              <button type="button" className="text-base text-text-secondary underline">
                Details
              </button>
            </div>

            {step === 2 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Payment Information</h3>
                <span className={formTypeBadgeClass}>
                  <RefreshCcw className="h-4 w-4" />
                  990-T Expense Payment
                </span>

                <div className="border-t border-border pt-4">
                  <h4 className="text-xl font-semibold text-text-primary">Important Information</h4>
                  <div className="mt-3 flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-error" />
                    <div className="space-y-3 text-text-secondary">
                      <p className="text-base underline">
                        Please click here to review the 990-T Expense Payment Request Instructions.
                      </p>
                      <p className="text-base">
                        This form is to be completed by an Account Owner to instruct Directed Trust Company to process any payment
                        due to the IRS on form 990-T, or form 8868 if filing an extension. You must complete this form and submit it
                        to Directed Trust Company along with your 990-T tax return and the IRS Same Day Taxpayer Worksheet. If you
                        are filing an extension, you must complete this form and submit it to Directed Trust Company along with form
                        8868 and the IRS Same Day Taxpayer Worksheet.
                      </p>
                      <p className="text-base">
                        Directed Trust Company reserves the right to request additional supporting documents for any request.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-y border-border py-4">
                  <PaymentFileUpload
                    label="Form 8868"
                    fileName={values.form8868FileName}
                    onFileSelect={(name) => setField('form8868FileName', name)}
                  />
                  <PaymentFileUpload
                    label="IRS Worksheet"
                    fileName={values.irsWorksheetFileName}
                    onFileSelect={(name) => setField('irsWorksheetFileName', name)}
                  />
                </div>

                <p className="text-base italic text-text-secondary">
                  *IMPORTANT: Any amount due to the IRS on form 990-T, or form 8868 if filing an extension, must be paid from your
                  Directed IRA Account. Payments must be made in accordance with the IRS&apos;s Same-Day Taxpayer Worksheet. Please
                  complete the Same-Day Taxpayer Worksheet.
                </p>

                <label className="block">
                  <span className="mb-2 block text-base text-text-secondary">
                    Amount to Be Paid $
                    <span className="text-error">*</span>
                  </span>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-text-primary">$</span>
                    <input
                      className={cn(inputClass, 'pl-10')}
                      placeholder="Amount"
                      value={values.amountToBePaid}
                      onChange={(event) => setField('amountToBePaid', event.target.value.replace(/[^\d.]/g, '').slice(0, 12))}
                    />
                  </div>
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Expedited Processing</h3>
                <span className={formTypeBadgeClass}>
                  <RefreshCcw className="h-4 w-4" />
                  990-T Expense Payment
                </span>

                <p className="text-base text-text-secondary">
                  Please select your preferred processing below for this request. Please note processing cannot begin until the
                  account has sufficient funds and all required documentation is received and determined to be in good order.
                </p>

                <div className="space-y-5">
                  {[
                    ['next-day', 'Next-Day Processing ($150)', 'Must be received by 2 PM MST'],
                    ['same-day', 'Same-Day Processing ($250)', 'Must be received by 10 AM MST'],
                    ['standard', 'Standard Processing', 'Within three business days'],
                  ].map(([value, label, description]) => (
                    <label key={value} className="flex cursor-pointer items-start gap-3">
                      <span
                        className={cn(
                          'mt-0.5 grid h-7 w-7 place-items-center rounded-full border',
                          values.processingOption === value ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span
                          className={cn(
                            'h-3.5 w-3.5 rounded-full',
                            values.processingOption === value ? 'bg-surface' : 'bg-transparent',
                          )}
                        />
                      </span>
                      <span>
                        <span className="block text-base font-semibold text-text-primary">{label}</span>
                        <span className="block text-base text-text-secondary">{description}</span>
                      </span>
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.processingOption === value}
                        onChange={() => setField('processingOption', value as ProcessingOption)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Document Sign</h3>
                <span className={formTypeBadgeClass}>
                  <RefreshCcw className="h-4 w-4" />
                  990-T Expense Payment
                </span>

                <div className="rounded-2xl border border-border p-6 md:p-10">
                  <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileSignature className="h-5 w-5" />
                    </div>
                    <h4 className="text-2xl font-semibold text-text-primary md:text-3xl">
                      Sign & Pay to Establish your Account
                    </h4>
                    <p className="mt-2 text-base text-text-secondary">
                      Digitally sign your application document to move forward.
                    </p>
                    <Button className="mt-5 rounded-full px-6" onClick={() => setField('signed', true)}>
                      {values.signed ? 'Signed' : 'Sign Document'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-3 border-t border-border px-4 py-4 md:justify-end md:px-6">
            <button
              type="button"
              onClick={goBack}
              className="h-11 flex-1 rounded-full border border-border bg-surface px-6 text-sm font-medium text-text-primary hover:bg-slate-50 md:max-w-[140px]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              className={cn(
                'h-11 flex-1 rounded-full px-7 text-sm font-semibold text-text-inverse transition-colors md:max-w-[160px]',
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
