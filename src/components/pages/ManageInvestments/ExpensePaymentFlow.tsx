import { ArrowLeft, Check, ChevronDown, FileSignature, ReceiptText, Upload } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { cn } from '../../../utils/cn'
import { Button } from '../../ui'

type FlowStep = 2 | 3 | 4 | 5
type ExpenseCategory = 'property-tax' | 'insurance' | 'maintenance' | 'management-fee' | 'other'
type PaymentMethod = 'check' | 'electronic-funds-transfer' | 'wire'
type DeliveryMethod = 'regular-mail' | 'priority-mail' | 'overnight-mail'
type ProcessingOption = 'next-day' | 'same-day' | 'standard'

interface ExpensePaymentValues {
  payeeName: string
  expenseCategory?: ExpenseCategory
  amountToBePaid: string
  dueDate: string
  memo: string
  invoiceFileName: string
  paymentMethod?: PaymentMethod
  makeCheckPayableTo: string
  addressCheckTo: string
  usePoBox: boolean
  mailingAddress: string
  bankName: string
  routingNumber: string
  accountNumber: string
  deliveryMethod?: DeliveryMethod
  processingOption?: ProcessingOption
  signed: boolean
}

interface ExpensePaymentFlowProps {
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

const FileUploadField = ({
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
      <p className="text-base text-text-secondary">
        {label}
        <span className="text-error">*</span>
      </p>
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          <Upload className="h-5 w-5 text-text-secondary" />
          <div>
            <p className="text-sm font-semibold text-text-primary">{fileName || 'Choose a file or Drag and Drop'}</p>
            <p className="text-sm text-text-secondary">pdf, docx, jpg max 10MB.</p>
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

const expenseCategories: { id: ExpenseCategory; label: string }[] = [
  { id: 'property-tax', label: 'Property Tax' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'management-fee', label: 'Management Fee' },
  { id: 'other', label: 'Other' },
]

const paymentMethods: { id: PaymentMethod; label: string }[] = [
  { id: 'check', label: 'Check' },
  { id: 'electronic-funds-transfer', label: 'Electronic Funds Transfer' },
  { id: 'wire', label: 'Wire' },
]

const deliveryOptions: { id: DeliveryMethod; label: string }[] = [
  { id: 'regular-mail', label: 'Regular Mail (7-10 business days)' },
  { id: 'priority-mail', label: 'Priority Mail (2-3 business days) - $15.000' },
  { id: 'overnight-mail', label: 'Overnight Mail - $35.00' },
]

const processingOptions: { id: ProcessingOption; label: string; description: string }[] = [
  { id: 'next-day', label: 'Next-Day Processing ($150)', description: 'Must be received by 2 PM MST' },
  { id: 'same-day', label: 'Same-Day Processing ($250)', description: 'Must be received by 10 AM MST' },
  { id: 'standard', label: 'Standard Processing', description: 'Within three business days' },
]

export const ExpensePaymentFlow = ({ onBackToManageInvestments }: ExpensePaymentFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<ExpensePaymentValues>({
    payeeName: '',
    amountToBePaid: '',
    dueDate: '',
    memo: '',
    invoiceFileName: '',
    paymentMethod: 'check',
    makeCheckPayableTo: '',
    addressCheckTo: '',
    usePoBox: true,
    mailingAddress: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    deliveryMethod: 'regular-mail',
    processingOption: 'next-day',
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 5) {
      return values.signed
    }

    if (step === 4) {
      return Boolean(values.processingOption)
    }

    if (step === 3) {
      if (!values.paymentMethod) {
        return false
      }
      if (values.paymentMethod === 'check') {
        return Boolean(values.makeCheckPayableTo.trim() && values.addressCheckTo.trim() && values.mailingAddress.trim() && values.deliveryMethod)
      }
      return Boolean(values.bankName.trim() && values.routingNumber.trim() && values.accountNumber.trim())
    }

    return Boolean(
      values.payeeName.trim() &&
        values.expenseCategory &&
        values.amountToBePaid &&
        Number(values.amountToBePaid) > 0 &&
        values.dueDate &&
        values.invoiceFileName,
    )
  }, [step, values])

  const setField = <K extends keyof ExpensePaymentValues>(key: K, value: ExpensePaymentValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const back = (): void => {
    if (step === 2) {
      onBackToManageInvestments()
      return
    }
    setStep((previous) => (previous - 1) as FlowStep)
  }

  const next = (): void => {
    if (!canContinue) {
      return
    }
    if (step === 5) {
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
            <StepItem index={2} label="Expense Information" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Payment Method" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
            <StepItem index={4} label="Expedited Processing" status={step === 4 ? 'active' : step > 4 ? 'completed' : 'pending'} />
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
                  ? 'Expense Information'
                  : step === 3
                    ? 'Payment Method'
                    : step === 4
                      ? 'Expedited Processing'
                      : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(formTypeBadgeClass, 'hidden md:inline-flex')}>
                <ReceiptText className="h-3.5 w-3.5" />
                Expense Payment
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
                <span className="inline-grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-sm">5</span>
              </p>
              <button type="button" className="text-base text-text-secondary underline">
                Details
              </button>
            </div>

            {step === 2 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Expense Information</h3>
                <span className={formTypeBadgeClass}>
                  <ReceiptText className="h-4 w-4" />
                  Expense Payment
                </span>

                <p className="text-base text-text-secondary">
                  Provide the expense details below so Directed IRA can process a payment from your account.
                </p>

                <label className="block">
                  <span className="mb-2 block text-base text-text-secondary">
                    Payee Name<span className="text-error">*</span>
                  </span>
                  <input
                    className={inputClass}
                    placeholder="Enter payee name"
                    value={values.payeeName}
                    onChange={(event) => setField('payeeName', event.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-base text-text-secondary">
                    Expense Category<span className="text-error">*</span>
                  </span>
                  <div className="relative">
                    <select
                      className={cn(inputClass, 'appearance-none pr-10')}
                      value={values.expenseCategory ?? ''}
                      onChange={(event) => setField('expenseCategory', event.target.value as ExpenseCategory)}
                    >
                      <option value="">Select expense category</option>
                      {expenseCategories.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                  </div>
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Amount to Be Paid $<span className="text-error">*</span>
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
                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Due Date<span className="text-error">*</span>
                    </span>
                    <input
                      type="date"
                      className={inputClass}
                      value={values.dueDate}
                      onChange={(event) => setField('dueDate', event.target.value)}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-base text-text-secondary">Memo / Reference</span>
                  <input
                    className={inputClass}
                    placeholder="Optional memo"
                    value={values.memo}
                    onChange={(event) => setField('memo', event.target.value)}
                  />
                </label>

                <FileUploadField label="Invoice / Supporting Document" fileName={values.invoiceFileName} onFileSelect={(name) => setField('invoiceFileName', name)} />
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Payment Method</h3>
                <span className={formTypeBadgeClass}>
                  <ReceiptText className="h-4 w-4" />
                  Expense Payment
                </span>

                <div className="space-y-3 border-b border-border pb-4">
                  <p className="text-base text-text-secondary">
                    Please select an option below<span className="text-error">*</span>
                  </p>
                  {paymentMethods.map((option) => (
                    <label key={option.id} className="flex cursor-pointer items-start gap-3">
                      <span
                        className={cn(
                          'mt-0.5 grid h-7 w-7 place-items-center rounded-full border',
                          values.paymentMethod === option.id ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-3.5 w-3.5 rounded-full', values.paymentMethod === option.id ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      <span className="text-base text-text-primary">{option.label}</span>
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.paymentMethod === option.id}
                        onChange={() => setField('paymentMethod', option.id)}
                      />
                    </label>
                  ))}
                </div>

                {values.paymentMethod === 'check' ? (
                  <>
                    <label className="block">
                      <span className="mb-2 block text-base text-text-secondary">
                        Make Check Payable To<span className="text-error">*</span>
                      </span>
                      <input
                        className={inputClass}
                        placeholder="Enter check payable to"
                        value={values.makeCheckPayableTo}
                        onChange={(event) => setField('makeCheckPayableTo', event.target.value)}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-base text-text-secondary">
                        Address Check To<span className="text-error">*</span>
                      </span>
                      <input
                        className={inputClass}
                        placeholder="Address check to"
                        value={values.addressCheckTo}
                        onChange={(event) => setField('addressCheckTo', event.target.value)}
                      />
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 text-base text-text-secondary">
                      <span
                        className={cn(
                          'grid h-6 w-6 place-items-center rounded-md border',
                          values.usePoBox ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                        )}
                      >
                        {values.usePoBox ? <Check className="h-4 w-4" /> : null}
                      </span>
                      Use PO BOX
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={values.usePoBox}
                        onChange={(event) => setField('usePoBox', event.target.checked)}
                      />
                    </label>

                    <label className="block border-b border-border pb-4">
                      <span className="mb-2 block text-base text-text-secondary">
                        Mailing Address<span className="text-error">*</span>
                      </span>
                      <div className="relative">
                        <input
                          className={cn(inputClass, 'pr-10')}
                          placeholder="Search address"
                          value={values.mailingAddress}
                          onChange={(event) => setField('mailingAddress', event.target.value)}
                        />
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
                      </div>
                    </label>

                    <div className="space-y-3">
                      <p className="text-base text-text-secondary">
                        Delivery<span className="text-error">*</span>
                      </p>
                      {deliveryOptions.map((option) => (
                        <label key={option.id} className="flex cursor-pointer items-start gap-3">
                          <span
                            className={cn(
                              'mt-0.5 grid h-7 w-7 place-items-center rounded-full border',
                              values.deliveryMethod === option.id ? 'border-error bg-error' : 'border-border',
                            )}
                          >
                            <span className={cn('h-3.5 w-3.5 rounded-full', values.deliveryMethod === option.id ? 'bg-surface' : 'bg-transparent')} />
                          </span>
                          <span className="text-base text-text-primary">{option.label}</span>
                          <input
                            type="radio"
                            className="sr-only"
                            checked={values.deliveryMethod === option.id}
                            onChange={() => setField('deliveryMethod', option.id)}
                          />
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-base text-text-secondary">
                        Bank Name<span className="text-error">*</span>
                      </span>
                      <input
                        className={inputClass}
                        placeholder="Enter bank name"
                        value={values.bankName}
                        onChange={(event) => setField('bankName', event.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-base text-text-secondary">
                        Routing Number<span className="text-error">*</span>
                      </span>
                      <input
                        className={inputClass}
                        placeholder="Routing number"
                        value={values.routingNumber}
                        onChange={(event) => setField('routingNumber', event.target.value.replace(/\D/g, '').slice(0, 9))}
                      />
                    </label>
                    <label className="block md:col-span-2">
                      <span className="mb-2 block text-base text-text-secondary">
                        Account Number<span className="text-error">*</span>
                      </span>
                      <input
                        className={inputClass}
                        placeholder="Account number"
                        value={values.accountNumber}
                        onChange={(event) => setField('accountNumber', event.target.value.replace(/\D/g, '').slice(0, 17))}
                      />
                    </label>
                  </div>
                )}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Expedited Processing</h3>
                <span className={formTypeBadgeClass}>
                  <ReceiptText className="h-4 w-4" />
                  Expense Payment
                </span>

                <p className="text-base text-text-secondary">
                  Please select your preferred processing below for this request. Please note processing cannot begin until the
                  account has sufficient funds and all required documentation is received and determined to be in good order.
                </p>

                <div className="space-y-5">
                  {processingOptions.map((option) => (
                    <label key={option.id} className="flex cursor-pointer items-start gap-3">
                      <span
                        className={cn(
                          'mt-0.5 grid h-7 w-7 place-items-center rounded-full border',
                          values.processingOption === option.id ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-3.5 w-3.5 rounded-full', values.processingOption === option.id ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      <span>
                        <span className="block text-base font-semibold text-text-primary">{option.label}</span>
                        <span className="block text-base text-text-secondary">{option.description}</span>
                      </span>
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.processingOption === option.id}
                        onChange={() => setField('processingOption', option.id)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 5 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Document Sign</h3>
                <span className={formTypeBadgeClass}>
                  <ReceiptText className="h-4 w-4" />
                  Expense Payment
                </span>

                <div className="rounded-2xl border border-border p-6 md:p-10">
                  <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileSignature className="h-5 w-5" />
                    </div>
                    <h4 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign & Pay to Establish your Account</h4>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign your application document to move forward.</p>
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
              onClick={back}
              className="h-11 flex-1 rounded-full border border-border bg-surface px-6 text-sm font-medium text-text-primary hover:bg-slate-50 md:max-w-[140px]"
            >
              Back
            </button>
            <button
              type="button"
              onClick={next}
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
