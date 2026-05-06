import { ArrowLeft, Check, FileSignature, HandCoins, Upload } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { cn } from '../../../utils/cn'
import { Button } from '../../ui'

type FlowStep = 2 | 3 | 4
type TransactionType = 'asset-sale' | 'note-payoff' | 'partial-payoff'
type DispositionMethod = 'return-to-ira-cash' | 'reinvest-proceeds' | 'wire-to-custodian'

interface SaleOfAssetsNotePayoffValues {
  assetName: string
  transactionType?: TransactionType
  closingDate: string
  grossProceeds: string
  payoffAmount: string
  feesPaid: string
  netProceeds: string
  settlementStatementFileName: string
  dispositionMethod?: DispositionMethod
  counterpartyName: string
  counterpartyEmail: string
  counterpartyPhone: string
  specialInstructions: string
  confirmsArmsLengthTransaction: boolean
  confirmsNoPersonalBenefit: boolean
  signed: boolean
}

interface SaleOfAssetsNotePayoffFlowProps {
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

const transactionOptions: { id: TransactionType; label: string }[] = [
  { id: 'asset-sale', label: 'Asset Sale' },
  { id: 'note-payoff', label: 'Note Payoff' },
  { id: 'partial-payoff', label: 'Partial Payoff' },
]

const dispositionOptions: { id: DispositionMethod; label: string }[] = [
  { id: 'return-to-ira-cash', label: 'Return proceeds to IRA cash account' },
  { id: 'reinvest-proceeds', label: 'Reinvest proceeds in selected investment' },
  { id: 'wire-to-custodian', label: 'Wire to custodian account' },
]

export const SaleOfAssetsNotePayoffFlow = ({ onBackToManageInvestments }: SaleOfAssetsNotePayoffFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<SaleOfAssetsNotePayoffValues>({
    assetName: '',
    closingDate: '',
    grossProceeds: '',
    payoffAmount: '',
    feesPaid: '',
    netProceeds: '',
    settlementStatementFileName: '',
    counterpartyName: '',
    counterpartyEmail: '',
    counterpartyPhone: '',
    specialInstructions: '',
    confirmsArmsLengthTransaction: false,
    confirmsNoPersonalBenefit: false,
    signed: false,
  })
  const settlementDocInputRef = useRef<HTMLInputElement | null>(null)

  const canContinue = useMemo(() => {
    if (step === 4) {
      return values.signed
    }
    if (step === 3) {
      return Boolean(
        values.dispositionMethod &&
          values.counterpartyName.trim() &&
          values.counterpartyEmail.trim() &&
          values.counterpartyPhone.trim() &&
          values.confirmsArmsLengthTransaction &&
          values.confirmsNoPersonalBenefit,
      )
    }
    return Boolean(
      values.assetName.trim() &&
        values.transactionType &&
        values.closingDate &&
        values.grossProceeds &&
        values.payoffAmount &&
        values.feesPaid &&
        values.netProceeds &&
        values.settlementStatementFileName,
    )
  }, [step, values])

  const setField = <K extends keyof SaleOfAssetsNotePayoffValues>(key: K, value: SaleOfAssetsNotePayoffValues[K]) => {
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
            <StepItem index={2} label="Sale / Payoff Details" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Disposition Instructions" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
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
                {step === 2 ? 'Sale / Payoff Details' : step === 3 ? 'Disposition Instructions' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(formTypeBadgeClass, 'hidden md:inline-flex')}>
                <HandCoins className="h-3.5 w-3.5" />
                Sale of Assets/Note Payoff
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
                <h3 className="text-2xl font-semibold text-text-primary">Sale / Payoff Details</h3>
                <span className={formTypeBadgeClass}>
                  <HandCoins className="h-4 w-4" />
                  Sale of Assets/Note Payoff
                </span>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Asset Name<span className="text-error">*</span>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="Enter asset name"
                      value={values.assetName}
                      onChange={(event) => setField('assetName', event.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Closing Date<span className="text-error">*</span>
                    </span>
                    <input
                      type="date"
                      className={inputClass}
                      value={values.closingDate}
                      onChange={(event) => setField('closingDate', event.target.value)}
                    />
                  </label>
                </div>

                <div className="space-y-3">
                  <p className="text-base text-text-secondary">
                    Transaction Type<span className="text-error">*</span>
                  </p>
                  {transactionOptions.map((option) => (
                    <label key={option.id} className="flex cursor-pointer items-start gap-3">
                      <span
                        className={cn(
                          'mt-0.5 grid h-7 w-7 place-items-center rounded-full border',
                          values.transactionType === option.id ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-3.5 w-3.5 rounded-full', values.transactionType === option.id ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      <span className="text-base text-text-primary">{option.label}</span>
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.transactionType === option.id}
                        onChange={() => setField('transactionType', option.id)}
                      />
                    </label>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Gross Proceeds $<span className="text-error">*</span>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="0.00"
                      value={values.grossProceeds}
                      onChange={(event) => setField('grossProceeds', event.target.value.replace(/[^\d.]/g, '').slice(0, 14))}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Payoff Amount $<span className="text-error">*</span>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="0.00"
                      value={values.payoffAmount}
                      onChange={(event) => setField('payoffAmount', event.target.value.replace(/[^\d.]/g, '').slice(0, 14))}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Fees Paid $<span className="text-error">*</span>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="0.00"
                      value={values.feesPaid}
                      onChange={(event) => setField('feesPaid', event.target.value.replace(/[^\d.]/g, '').slice(0, 14))}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Net Proceeds $<span className="text-error">*</span>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="0.00"
                      value={values.netProceeds}
                      onChange={(event) => setField('netProceeds', event.target.value.replace(/[^\d.-]/g, '').slice(0, 14))}
                    />
                  </label>
                </div>

                <div className="space-y-2 border-y border-border py-4">
                  <p className="text-base text-text-secondary">
                    Settlement Statement / Payoff Letter<span className="text-error">*</span>
                  </p>
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Upload className="h-5 w-5 text-text-secondary" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">
                          {values.settlementStatementFileName || 'Choose a file or Drag and Drop'}
                        </p>
                        <p className="text-sm text-text-secondary">pdf, docx, jpg max 10MB.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => settlementDocInputRef.current?.click()}
                      className="h-11 rounded-full bg-slate-100 px-5 text-sm font-medium text-text-primary"
                    >
                      Browse File
                    </button>
                    <input
                      ref={settlementDocInputRef}
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(event) => {
                        const selectedFile = event.target.files?.[0]
                        if (selectedFile) {
                          setField('settlementStatementFileName', selectedFile.name)
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Disposition Instructions</h3>
                <span className={formTypeBadgeClass}>
                  <HandCoins className="h-4 w-4" />
                  Sale of Assets/Note Payoff
                </span>

                <div className="space-y-3">
                  <p className="text-base text-text-secondary">
                    Proceeds Disposition<span className="text-error">*</span>
                  </p>
                  {dispositionOptions.map((option) => (
                    <label key={option.id} className="flex cursor-pointer items-start gap-3">
                      <span
                        className={cn(
                          'mt-0.5 grid h-7 w-7 place-items-center rounded-full border',
                          values.dispositionMethod === option.id ? 'border-error bg-error' : 'border-border',
                        )}
                      >
                        <span className={cn('h-3.5 w-3.5 rounded-full', values.dispositionMethod === option.id ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      <span className="text-base text-text-primary">{option.label}</span>
                      <input
                        type="radio"
                        className="sr-only"
                        checked={values.dispositionMethod === option.id}
                        onChange={() => setField('dispositionMethod', option.id)}
                      />
                    </label>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Counterparty Name<span className="text-error">*</span>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="Enter name"
                      value={values.counterpartyName}
                      onChange={(event) => setField('counterpartyName', event.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Counterparty Email<span className="text-error">*</span>
                    </span>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="name@example.com"
                      value={values.counterpartyEmail}
                      onChange={(event) => setField('counterpartyEmail', event.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Counterparty Phone<span className="text-error">*</span>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="(000) 000-0000"
                      value={values.counterpartyPhone}
                      onChange={(event) => setField('counterpartyPhone', event.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">Special Instructions (Optional)</span>
                    <input
                      className={inputClass}
                      placeholder="Add instructions"
                      value={values.specialInstructions}
                      onChange={(event) => setField('specialInstructions', event.target.value)}
                    />
                  </label>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  {[
                    ['confirmsArmsLengthTransaction', 'I confirm this is an arm’s-length transaction.'],
                    ['confirmsNoPersonalBenefit', 'I confirm no personal use or benefit was received from this transaction.'],
                  ].map(([key, label]) => (
                    <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                      <span
                        className={cn(
                          'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                          values[key as keyof SaleOfAssetsNotePayoffValues] ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                        )}
                      >
                        {values[key as keyof SaleOfAssetsNotePayoffValues] ? <Check className="h-3.5 w-3.5" /> : null}
                      </span>
                      {label}
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={Boolean(values[key as keyof SaleOfAssetsNotePayoffValues])}
                        onChange={(event) => setField(key as keyof SaleOfAssetsNotePayoffValues, event.target.checked)}
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
                  <HandCoins className="h-4 w-4" />
                  Sale of Assets/Note Payoff
                </span>

                <div className="rounded-2xl border border-border p-6 md:p-10">
                  <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileSignature className="h-5 w-5" />
                    </div>
                    <h4 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Sale/Payoff Request</h4>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign to submit this sale/payoff request.</p>
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
