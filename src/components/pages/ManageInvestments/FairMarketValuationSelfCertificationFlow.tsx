import { ArrowLeft, Check, FileSignature, Landmark, Upload } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { cn } from '../../../utils/cn'
import { Button } from '../../ui'

type FlowStep = 2 | 3 | 4
type ValuationMethod = 'owner-estimate' | 'prior-appraisal' | 'market-comparable' | 'financial-statement'

interface FairMarketValuationValues {
  assetName: string
  issuerOrPropertyName: string
  valuationDate: string
  fairMarketValue: string
  ownershipPercentage: string
  valuationMethod?: ValuationMethod
  supportingDocumentFileName: string
  additionalNotes: string
  certifiesAccurateValuation: boolean
  certifiesNoProhibitedTransaction: boolean
  acknowledgesReviewByDirectedIra: boolean
  understandsSupportingDocsMayBeRequested: boolean
  signed: boolean
}

interface FairMarketValuationSelfCertificationFlowProps {
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

const fileUploadBorderClass = 'flex items-center justify-between gap-3 rounded-2xl border border-dashed border-border bg-background px-4 py-3'

const valuationMethodOptions: { id: ValuationMethod; label: string }[] = [
  { id: 'owner-estimate', label: 'Owner Estimate' },
  { id: 'prior-appraisal', label: 'Prior Appraisal' },
  { id: 'market-comparable', label: 'Market Comparable Data' },
  { id: 'financial-statement', label: 'Financial Statement / Cap Table' },
]

export const FairMarketValuationSelfCertificationFlow = ({
  onBackToManageInvestments,
}: FairMarketValuationSelfCertificationFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<FairMarketValuationValues>({
    assetName: '',
    issuerOrPropertyName: '',
    valuationDate: '',
    fairMarketValue: '',
    ownershipPercentage: '',
    supportingDocumentFileName: '',
    additionalNotes: '',
    certifiesAccurateValuation: false,
    certifiesNoProhibitedTransaction: false,
    acknowledgesReviewByDirectedIra: false,
    understandsSupportingDocsMayBeRequested: false,
    signed: false,
  })
  const supportingDocInputRef = useRef<HTMLInputElement | null>(null)

  const canContinue = useMemo(() => {
    if (step === 4) {
      return values.signed
    }

    if (step === 3) {
      return Boolean(
        values.certifiesAccurateValuation &&
          values.certifiesNoProhibitedTransaction &&
          values.acknowledgesReviewByDirectedIra &&
          values.understandsSupportingDocsMayBeRequested,
      )
    }

    return Boolean(
      values.assetName.trim() &&
        values.issuerOrPropertyName.trim() &&
        values.valuationDate &&
        values.fairMarketValue &&
        Number(values.fairMarketValue) > 0 &&
        values.ownershipPercentage.trim() &&
        values.valuationMethod &&
        values.supportingDocumentFileName,
    )
  }, [step, values])

  const setField = <K extends keyof FairMarketValuationValues>(key: K, value: FairMarketValuationValues[K]) => {
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
            <StepItem index={2} label="Valuation Details" status={step === 2 ? 'active' : 'completed'} />
            <StepItem index={3} label="Self Certification" status={step === 3 ? 'active' : step > 3 ? 'completed' : 'pending'} />
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
                {step === 2 ? 'Valuation Details' : step === 3 ? 'Self Certification' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(formTypeBadgeClass, 'hidden md:inline-flex')}>
                <Landmark className="h-3.5 w-3.5" />
                Fair Market Valuation - Self Certification
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
                <h3 className="text-2xl font-semibold text-text-primary">Valuation Details</h3>
                <span className={formTypeBadgeClass}>
                  <Landmark className="h-4 w-4" />
                  Fair Market Valuation - Self Certification
                </span>

                <p className="text-base text-text-secondary">
                  Submit updated fair market value details for your investment. This valuation will be used for account reporting.
                </p>

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
                      Issuer / Property Name<span className="text-error">*</span>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="Enter issuer or property name"
                      value={values.issuerOrPropertyName}
                      onChange={(event) => setField('issuerOrPropertyName', event.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Valuation Date<span className="text-error">*</span>
                    </span>
                    <input
                      type="date"
                      className={inputClass}
                      value={values.valuationDate}
                      onChange={(event) => setField('valuationDate', event.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Fair Market Value $<span className="text-error">*</span>
                    </span>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-text-primary">$</span>
                      <input
                        className={cn(inputClass, 'pl-10')}
                        placeholder="Amount"
                        value={values.fairMarketValue}
                        onChange={(event) => setField('fairMarketValue', event.target.value.replace(/[^\d.]/g, '').slice(0, 14))}
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Ownership Percentage<span className="text-error">*</span>
                    </span>
                    <input
                      className={inputClass}
                      placeholder="e.g. 100%"
                      value={values.ownershipPercentage}
                      onChange={(event) => setField('ownershipPercentage', event.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-base text-text-secondary">
                      Valuation Method<span className="text-error">*</span>
                    </span>
                    <select
                      className={inputClass}
                      value={values.valuationMethod ?? ''}
                      onChange={(event) => setField('valuationMethod', event.target.value as ValuationMethod)}
                    >
                      <option value="">Select valuation method</option>
                      {valuationMethodOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="space-y-2 border-y border-border py-4">
                  <p className="text-base text-text-secondary">
                    Supporting Document<span className="text-error">*</span>
                  </p>
                  <div className={fileUploadBorderClass}>
                    <div className="flex items-center gap-3">
                      <Upload className="h-5 w-5 text-text-secondary" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">
                          {values.supportingDocumentFileName || 'Choose a file or Drag and Drop'}
                        </p>
                        <p className="text-sm text-text-secondary">{fileSubtitle}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => supportingDocInputRef.current?.click()}
                      className="h-11 rounded-full bg-slate-100 px-5 text-sm font-medium text-text-primary"
                    >
                      Browse File
                    </button>
                    <input
                      ref={supportingDocInputRef}
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(event) => {
                        const selectedFile = event.target.files?.[0]
                        if (selectedFile) {
                          setField('supportingDocumentFileName', selectedFile.name)
                        }
                      }}
                    />
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 block text-base text-text-secondary">Additional Notes (Optional)</span>
                  <input
                    className={inputClass}
                    placeholder="Add notes for review"
                    value={values.additionalNotes}
                    onChange={(event) => setField('additionalNotes', event.target.value)}
                  />
                </label>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Self Certification</h3>
                <span className={formTypeBadgeClass}>
                  <Landmark className="h-4 w-4" />
                  Fair Market Valuation - Self Certification
                </span>

                <p className="text-base text-text-secondary">
                  Review and confirm the statements below before continuing to document signing.
                </p>

                {[
                  ['certifiesAccurateValuation', 'I certify the valuation information provided is true and accurate to the best of my knowledge.'],
                  ['certifiesNoProhibitedTransaction', 'I certify this investment remains compliant and does not involve prohibited transactions.'],
                  ['acknowledgesReviewByDirectedIra', 'I understand Directed IRA may review this information and request clarification.'],
                  [
                    'understandsSupportingDocsMayBeRequested',
                    'I understand additional supporting documents may be requested to complete annual reporting.',
                  ],
                ].map(([key, label]) => (
                  <label key={key} className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 text-sm text-text-primary">
                    <span
                      className={cn(
                        'mt-0.5 grid h-5 w-5 place-items-center rounded border',
                        values[key as keyof FairMarketValuationValues] ? 'border-error bg-error text-text-inverse' : 'border-border bg-surface',
                      )}
                    >
                      {values[key as keyof FairMarketValuationValues] ? <Check className="h-3.5 w-3.5" /> : null}
                    </span>
                    {label}
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={Boolean(values[key as keyof FairMarketValuationValues])}
                      onChange={(event) => setField(key as keyof FairMarketValuationValues, event.target.checked)}
                    />
                  </label>
                ))}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4">
                <h3 className="text-2xl font-semibold text-text-primary">Document Sign</h3>
                <span className={formTypeBadgeClass}>
                  <Landmark className="h-4 w-4" />
                  Fair Market Valuation - Self Certification
                </span>

                <div className="rounded-2xl border border-border p-6 md:p-10">
                  <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileSignature className="h-5 w-5" />
                    </div>
                    <h4 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign Self Certification Form</h4>
                    <p className="mt-2 text-base text-text-secondary">Digitally sign your certification document to submit this request.</p>
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
