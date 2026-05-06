import { Check, FileSignature, Trash2, Upload, X } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui'
import { inputClass, selectClass } from './RothIraOnboardingFlow.constants'

export const StepItem = ({
  index,
  label,
  status,
}: {
  index: number
  label: string
  status: 'completed' | 'active' | 'pending'
}) => (
  <li className="relative flex items-center gap-3">
    {status === 'completed' ? (
      <span className="relative z-10 grid h-7 w-7 place-items-center rounded-full bg-slate-200 text-text-primary">
        <Check className="h-4 w-4" />
      </span>
    ) : (
      <span
        className={cn(
          'relative z-10 grid h-7 w-7 place-items-center rounded-full text-xs',
          status === 'active'
            ? 'bg-text-primary font-semibold text-text-inverse'
            : 'border border-border bg-surface font-medium text-text-primary',
        )}
      >
        {index}
      </span>
    )}
    <span className="text-base font-medium text-text-primary">{label}</span>
  </li>
)

export const LabeledInput = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (nextValue: string) => void
  placeholder: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'date'
}) => (
  <label className="block">
    <span className="mb-2 block text-sm text-text-secondary md:text-base">
      {label}
      {required ? <span className="text-error">*</span> : null}
    </span>
    <input
      type={type}
      className={inputClass}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
)

export const PlainInput = ({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string
  onChange: (nextValue: string) => void
  placeholder: string
  type?: 'text' | 'email' | 'tel' | 'date'
}) => (
  <input
    type={type}
    className={inputClass}
    placeholder={placeholder}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
)

export const LabeledSelect = ({
  label,
  value,
  onChange,
  required,
  options,
}: {
  label: string
  value: string
  onChange: (nextValue: string) => void
  required?: boolean
  options: Array<{ value: string; label: string }>
}) => (
  <label className="block">
    <span className="mb-2 block text-sm text-text-secondary md:text-base">
      {label}
      {required ? <span className="text-error">*</span> : null}
    </span>
    <div className="relative">
      <select value={value} onChange={(event) => onChange(event.target.value)} className={selectClass}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-text-muted">v</span>
    </div>
  </label>
)

export const RadioItem = ({
  checked,
  label,
  description,
  onSelect,
}: {
  checked: boolean
  label: string
  description?: string
  onSelect: () => void
}) => (
  <button type="button" onClick={onSelect} className="flex w-full items-start gap-3 text-left">
    <span
      className={cn(
        'mt-0.5 grid h-6 w-6 place-items-center rounded-full border',
        checked ? 'border-error bg-error' : 'border-border bg-surface',
      )}
    >
      <span className={cn('h-3 w-3 rounded-full', checked ? 'bg-surface' : 'bg-transparent')} />
    </span>
    <span>
      <span className="block text-base font-semibold text-text-primary">{label}</span>
      {description ? <span className="block text-sm text-text-secondary">{description}</span> : null}
    </span>
  </button>
)

export const HelpVideoCard = ({ label }: { label: string }) => (
  <div className="w-full max-w-[240px] overflow-hidden rounded-xl border border-border bg-black">
    <div className="relative aspect-video bg-[linear-gradient(120deg,#12141a_0%,#2b2e36_65%,#3f4148_100%)]">
      <div className="absolute left-3 top-3 rounded bg-primary px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
        Directed IRA
      </div>
      <div className="absolute bottom-3 left-3">
        <p className="text-sm font-semibold leading-tight text-white">{label}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-primary shadow">
          <span className="ml-0.5 text-[11px]">{'>'}</span>
        </div>
      </div>
    </div>
  </div>
)

export const SignAndPayPanel = ({
  signed,
  paymentCompleted,
  accountLabel,
  onSign,
  onPayment,
}: {
  signed: boolean
  paymentCompleted: boolean
  accountLabel: string
  onSign: () => void
  onPayment: () => void
}) => (
  <div className="rounded-2xl border border-border p-6 md:p-10">
    <div className="flex min-h-[230px] flex-col items-center justify-center text-center">
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-error-light text-error">
        <FileSignature className="h-5 w-5" />
      </div>
      <h4 className="text-2xl font-semibold text-text-primary md:text-3xl">Sign & Pay to Establish your Account</h4>
      <p className="mt-2 text-base text-text-secondary">Complete document signing and payment to finalize your {accountLabel} account.</p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Button className="rounded-full px-6" onClick={onSign}>
          {signed ? 'Signed' : 'Sign Document'}
        </Button>
        <button
          type="button"
          onClick={onPayment}
          className={cn(
            'h-11 rounded-full border px-6 text-sm font-semibold',
            paymentCompleted ? 'border-success text-success' : 'border-border text-text-primary hover:bg-slate-50',
          )}
        >
          {paymentCompleted ? 'Payment Completed' : 'Pay Setup Fee'}
        </button>
      </div>
    </div>
  </div>
)

export const UploadPhotoIdModal = ({
  open,
  uploadedPhotoIdName,
  uploadedPhotoIdSize,
  onClose,
  onSelectFile,
  onRemoveFile,
}: {
  open: boolean
  uploadedPhotoIdName: string
  uploadedPhotoIdSize: string
  onClose: () => void
  onSelectFile: (event: ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: () => void
}) => {
  if (!open) {
    return null
  }

  const hasUploadedPhotoId = Boolean(uploadedPhotoIdName)

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4">
      <div className="w-full max-w-[560px] rounded-2xl border border-border bg-surface p-4 shadow-modal">
        <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
          <p className="text-base font-semibold text-text-primary">Upload a Photo ID</p>
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-full text-text-secondary hover:bg-slate-100"
            aria-label="Close upload dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-text-secondary">
          Please upload a clear photo of your government-issued identification. The photo must clearly show all edges and details of the
          document.
        </p>

        {!hasUploadedPhotoId ? (
          <div className="mt-3 rounded-xl border border-dashed border-border bg-background p-5 text-center">
            <div className="mx-auto mb-2 grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-text-secondary">
              <Upload className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium text-text-primary">Choose a file or Drag and Drop</p>
            <p className="mt-1 text-xs text-text-secondary">jpg, jpeg, png, tiff max 10MB.</p>
            <input id="photo-id-upload-input" type="file" accept="image/*,.pdf" className="hidden" onChange={onSelectFile} />
            <label
              htmlFor="photo-id-upload-input"
              className="mt-3 inline-flex h-9 cursor-pointer items-center rounded-full border border-border bg-surface px-4 text-sm font-medium text-text-primary hover:bg-slate-50"
            >
              Browse File
            </label>
          </div>
        ) : (
          <div className="mt-3 rounded-xl border border-border bg-background p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-20 rounded-md bg-slate-200" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{uploadedPhotoIdName}</p>
                  <p className="text-xs text-text-secondary">
                    {uploadedPhotoIdSize} • <span className="text-success">Uploaded</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onRemoveFile}
                className="grid h-8 w-8 place-items-center rounded-full text-text-secondary hover:bg-slate-200"
                aria-label="Remove uploaded photo ID"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const OverlayStatusModal = ({
  open,
  message,
}: {
  open: boolean
  message: string
}) => {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-4">
      <div className="w-full max-w-sm rounded-lg bg-surface p-8 text-center shadow-modal">
        <p className="text-sm font-medium text-text-primary">{message}</p>
      </div>
    </div>
  )
}
