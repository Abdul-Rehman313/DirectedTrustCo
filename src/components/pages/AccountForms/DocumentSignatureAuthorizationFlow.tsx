import { ArrowLeft, Check, FileImage } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../ui'
import { cn } from '../../../utils/cn'

type FlowStep = 2 | 3

interface DocumentSignatureAuthorizationValues {
  assetNameOne: string
  assetNameTwo: string
  documentOne: string
  documentTwo: string
  documentThree: string
  documentFour: string
  signed: boolean
}

interface DocumentSignatureAuthorizationFlowProps {
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

export const DocumentSignatureAuthorizationFlow = ({ onBackToForms }: DocumentSignatureAuthorizationFlowProps) => {
  const [step, setStep] = useState<FlowStep>(2)
  const [values, setValues] = useState<DocumentSignatureAuthorizationValues>({
    assetNameOne: '',
    assetNameTwo: '',
    documentOne: '',
    documentTwo: '',
    documentThree: '',
    documentFour: '',
    signed: false,
  })

  const canContinue = useMemo(() => {
    if (step === 3) {
      return values.signed
    }

    return Boolean(
      values.assetNameOne.trim() &&
        values.assetNameTwo.trim() &&
        values.documentOne.trim() &&
        values.documentTwo.trim() &&
        values.documentThree.trim() &&
        values.documentFour.trim(),
    )
  }, [
    step,
    values.assetNameOne,
    values.assetNameTwo,
    values.documentOne,
    values.documentTwo,
    values.documentThree,
    values.documentFour,
    values.signed,
  ])

  const setField = <K extends keyof DocumentSignatureAuthorizationValues>(
    key: K,
    value: DocumentSignatureAuthorizationValues[K],
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
            <StepItem index={2} label="Document to Process" status={step === 2 ? 'active' : 'completed'} />
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
                {step === 2 ? 'Document to Process' : 'Document Sign'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={cn(stepBadgeClass, 'hidden md:inline-flex')}>
                <FileImage className="h-3.5 w-3.5" />
                Document Signature Authorization
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
                <h3 className="text-2xl font-semibold text-text-primary md:hidden">Document to Process</h3>
                <span className={cn(stepBadgeClass, 'md:hidden')}>
                  <FileImage className="h-3.5 w-3.5" />
                  Document Signature Authorization
                </span>

                <div>
                  <p className="text-base leading-snug text-text-primary md:text-xl">
                    Please list the documents Directed Trust Company is required to sign on behalf of your account
                  </p>
                  <label className="mt-4 block">
                    <span className="mb-2 block text-xs text-text-secondary md:text-sm">Asset Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Name"
                      value={values.assetNameOne}
                      onChange={(event) => setField('assetNameOne', event.target.value)}
                    />
                  </label>
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-base leading-snug text-text-secondary md:text-xl">
                    Please list the title of each document you are instructing Directed Trust Company, in its passive capacity, to
                    sign on behalf of your account
                  </p>

                  <label className="mt-4 block">
                    <span className="mb-2 block text-xs text-text-secondary md:text-sm">Asset Name*</span>
                    <input
                      className={inputClass}
                      placeholder="Name"
                      value={values.assetNameTwo}
                      onChange={(event) => setField('assetNameTwo', event.target.value)}
                    />
                  </label>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary md:text-sm">Document 1*</span>
                      <input
                        className={inputClass}
                        placeholder="Enter document name"
                        value={values.documentOne}
                        onChange={(event) => setField('documentOne', event.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary md:text-sm">Document 2*</span>
                      <input
                        className={inputClass}
                        placeholder="Enter document name"
                        value={values.documentTwo}
                        onChange={(event) => setField('documentTwo', event.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary md:text-sm">Document 3*</span>
                      <input
                        className={inputClass}
                        placeholder="Enter document name"
                        value={values.documentThree}
                        onChange={(event) => setField('documentThree', event.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs text-text-secondary md:text-sm">Document 4*</span>
                      <input
                        className={inputClass}
                        placeholder="Enter document name"
                        value={values.documentFour}
                        onChange={(event) => setField('documentFour', event.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-4 rounded-2xl border border-border p-4 md:border-0 md:p-0">
                <h3 className="text-2xl font-semibold text-text-primary md:hidden">Document Sign</h3>
                <span className={cn(stepBadgeClass, 'md:hidden')}>
                  <FileImage className="h-3.5 w-3.5" />
                  Document Signature Authorization
                </span>

                <div className="rounded-2xl border border-border p-5">
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
                      <FileImage className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign & Pay to Establish your Account</h3>
                    <p className="mt-2 text-base text-text-secondary md:text-base">
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
