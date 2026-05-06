import { UploadCloud, XCircle } from 'lucide-react'
import { type ReactElement } from 'react'
import type { ControllerRenderProps, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { FieldType, FormFieldSchema } from '@/types/form.types'
import { cn } from '@/utils/cn'
import { Checkbox, Input, RadioGroup, Select, Switch } from '@/components/ui'
import { SignaturePadField } from './SignaturePadField'

export interface FormRendererContext {
  fieldSchema: FormFieldSchema
  field: ControllerRenderProps<Record<string, unknown>, string>
  errorValue?: string
  commonFieldProps: {
    'aria-label': string
    'aria-required'?: boolean
    'aria-describedby'?: string
    'aria-errormessage'?: string
  }
  setValue: UseFormSetValue<Record<string, unknown>>
  watch: UseFormWatch<Record<string, unknown>>
  fileError?: string
  setFileError: (next?: string) => void
}

type FieldRenderer = (context: FormRendererContext) => ReactElement

export const inlineInputErrorTypes = new Set<FieldType>(['text', 'email', 'date', 'phone', 'number', 'ssn', 'currency'])

export const toError = (value: unknown): string | undefined => {
  if (typeof value === 'object' && value !== null && 'message' in value) {
    const message = (value as { message?: unknown }).message
    return typeof message === 'string' ? message : undefined
  }
  return undefined
}

const matchesAcceptedFileType = (file: File, accept?: string): boolean => {
  if (!accept) {
    return true
  }

  const normalizedFileName = file.name.toLowerCase()
  const normalizedMimeType = file.type.toLowerCase()
  const acceptedRules = accept
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)

  if (acceptedRules.length === 0) {
    return true
  }

  return acceptedRules.some((rule) => {
    if (rule.startsWith('.')) {
      return normalizedFileName.endsWith(rule)
    }
    if (rule.endsWith('/*')) {
      return normalizedMimeType.startsWith(rule.slice(0, -1))
    }
    return normalizedMimeType === rule
  })
}

const createSimpleInputRenderer = (inputType: 'text' | 'email' | 'date' | 'tel' | 'number'): FieldRenderer => {
  return ({ fieldSchema, field, errorValue, commonFieldProps }) => (
    <Input
      {...commonFieldProps}
      id={fieldSchema.id}
      type={inputType}
      placeholder={fieldSchema.placeholder}
      value={String(field.value ?? '')}
      onChange={field.onChange}
      error={errorValue}
    />
  )
}

const ssnRenderer: FieldRenderer = ({ fieldSchema, field, errorValue, commonFieldProps }) => (
  <Input
    {...commonFieldProps}
    id={fieldSchema.id}
    type="text"
    placeholder="###-##-####"
    value={String(field.value ?? '')}
    onChange={(event) => {
      const raw = event.target.value.replace(/[^\d]/g, '').slice(0, 9)
      const masked = raw
        .replace(/^(\d{3})(\d)/, '$1-$2')
        .replace(/^(\d{3}-\d{2})(\d)/, '$1-$2')
      field.onChange(masked)
    }}
    error={errorValue}
  />
)

const currencyRenderer: FieldRenderer = ({ fieldSchema, field, errorValue, commonFieldProps }) => (
  <Input
    {...commonFieldProps}
    id={fieldSchema.id}
    type="text"
    placeholder="$0.00"
    value={String(field.value ?? '')}
    onChange={(event) => {
      const amount = event.target.value.replace(/[^\d.]/g, '')
      field.onChange(amount ? `$${amount}` : '')
    }}
    error={errorValue}
  />
)

const textareaRenderer: FieldRenderer = ({ fieldSchema, field, errorValue, commonFieldProps }) => (
  <textarea
    {...commonFieldProps}
    id={fieldSchema.id}
    className={cn(
      'min-h-28 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted',
      errorValue && 'border-error',
    )}
    placeholder={fieldSchema.placeholder}
    value={String(field.value ?? '')}
    onChange={field.onChange}
  />
)

const selectRenderer: FieldRenderer = ({ fieldSchema, field }) => (
  <Select
    value={typeof field.value === 'string' ? field.value : undefined}
    onValueChange={field.onChange}
    placeholder={fieldSchema.placeholder ?? 'Select option'}
    options={fieldSchema.options ?? []}
  />
)

const groupedOptionsRenderer: FieldRenderer = ({ fieldSchema, field }) => (
  <div className="space-y-2">
    {(fieldSchema.options ?? []).map((option) => {
      const current = Array.isArray(field.value) ? field.value.map(String) : []
      const checked = current.includes(option.value)
      return (
        <Checkbox
          key={option.value}
          label={option.label}
          description={option.hint}
          checked={checked}
          onCheckedChange={(nextChecked) => {
            const values = nextChecked ? [...current, option.value] : current.filter((entry) => entry !== option.value)
            field.onChange(values)
          }}
        />
      )
    })}
  </div>
)

const radioRenderer: FieldRenderer = ({ fieldSchema, field }) => (
  <RadioGroup
    name={fieldSchema.id}
    options={(fieldSchema.options ?? []).map((option) => ({
      label: option.label,
      value: option.value,
      hint: option.hint,
    }))}
    value={typeof field.value === 'string' ? field.value : undefined}
    onValueChange={field.onChange}
  />
)

const checkboxRenderer: FieldRenderer = ({ fieldSchema, field }) => (
  <Checkbox
    label={fieldSchema.label}
    description={fieldSchema.helpText}
    checked={Boolean(field.value)}
    onCheckedChange={field.onChange}
  />
)

const switchRenderer: FieldRenderer = ({ fieldSchema, field }) => (
  <Switch label={fieldSchema.label} checked={Boolean(field.value)} onCheckedChange={field.onChange} />
)

const fileRenderer: FieldRenderer = ({ fieldSchema, field, fileError, setFileError, setValue }) => (
  <div className="space-y-2">
    <label
      htmlFor={`${fieldSchema.id}-upload`}
      className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-slate-50 p-5 text-center transition-colors hover:bg-slate-100"
    >
      <UploadCloud className="mb-2 h-5 w-5 text-text-secondary" />
      <span className="text-sm font-medium text-text-primary">Click or drag to upload</span>
      <span className="mt-1 text-xs text-text-secondary">
        {fieldSchema.accept ?? 'PNG, JPG, PDF'} up to {fieldSchema.maxSizeMb ?? 10}MB
      </span>
    </label>
    <input
      id={`${fieldSchema.id}-upload`}
      type="file"
      accept={fieldSchema.accept}
      className="hidden"
      onChange={(event) => {
        const selected = event.target.files?.[0]
        if (!selected) {
          setFileError(undefined)
          return
        }

        if (!matchesAcceptedFileType(selected, fieldSchema.accept)) {
          setFileError(`Allowed file types: ${fieldSchema.accept ?? 'PNG, JPG, PDF'}`)
          setValue(fieldSchema.id, '', { shouldValidate: true })
          return
        }

        const sizeMb = selected.size / (1024 * 1024)
        if ((fieldSchema.maxSizeMb ?? 10) < sizeMb) {
          setFileError(`File must be ${fieldSchema.maxSizeMb ?? 10}MB or smaller`)
          setValue(fieldSchema.id, '', { shouldValidate: true })
          return
        }

        setFileError(undefined)
        setValue(fieldSchema.id, selected.name, { shouldValidate: true })
      }}
    />
    {fileError ? (
      <p className="inline-flex items-center gap-1 text-xs text-error" role="alert">
        <XCircle className="h-3.5 w-3.5" />
        {fileError}
      </p>
    ) : field.value ? (
      <p className="inline-flex items-center gap-1 text-xs text-success">
        <UploadCloud className="h-3.5 w-3.5" />
        {String(field.value)}
      </p>
    ) : (
      <p className="inline-flex items-center gap-1 text-xs text-text-secondary">
        <XCircle className="h-3.5 w-3.5" />
        No file selected
      </p>
    )}
  </div>
)

const signatureRenderer: FieldRenderer = ({ field }) => (
  <SignaturePadField value={typeof field.value === 'string' ? field.value : undefined} onChange={field.onChange} />
)

const addressRenderer: FieldRenderer = ({ fieldSchema, commonFieldProps, setValue, watch }) => {
  const unsafeSetValue = setValue as (name: string, value: unknown, options?: { shouldValidate?: boolean }) => void
  const unsafeWatch = watch as (name: string) => unknown

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <Input
        id={`${fieldSchema.id}.street`}
        placeholder="Street Address"
        value={String(unsafeWatch(`${fieldSchema.id}.street`) ?? '')}
        onChange={(event) => unsafeSetValue(`${fieldSchema.id}.street`, event.target.value, { shouldValidate: true })}
        {...commonFieldProps}
      />
      <Input
        id={`${fieldSchema.id}.city`}
        placeholder="City"
        value={String(unsafeWatch(`${fieldSchema.id}.city`) ?? '')}
        onChange={(event) => unsafeSetValue(`${fieldSchema.id}.city`, event.target.value, { shouldValidate: true })}
        {...commonFieldProps}
      />
      <Input
        id={`${fieldSchema.id}.state`}
        placeholder="State"
        value={String(unsafeWatch(`${fieldSchema.id}.state`) ?? '')}
        onChange={(event) => unsafeSetValue(`${fieldSchema.id}.state`, event.target.value, { shouldValidate: true })}
        {...commonFieldProps}
      />
      <Input
        id={`${fieldSchema.id}.zip`}
        placeholder="ZIP"
        value={String(unsafeWatch(`${fieldSchema.id}.zip`) ?? '')}
        onChange={(event) => unsafeSetValue(`${fieldSchema.id}.zip`, event.target.value, { shouldValidate: true })}
        {...commonFieldProps}
      />
    </div>
  )
}

const infoRenderer: FieldRenderer = ({ fieldSchema }) => (
  <div className="rounded-md border border-border bg-slate-50 p-3">
    <p className="text-sm font-semibold text-text-primary">{fieldSchema.label}</p>
    {fieldSchema.helpText ? <p className="mt-1 text-sm text-text-secondary">{fieldSchema.helpText}</p> : null}
  </div>
)

export const fieldRegistry: Record<FieldType, FieldRenderer> = {
  text: createSimpleInputRenderer('text'),
  email: createSimpleInputRenderer('email'),
  date: createSimpleInputRenderer('date'),
  phone: createSimpleInputRenderer('tel'),
  number: createSimpleInputRenderer('number'),
  ssn: ssnRenderer,
  currency: currencyRenderer,
  textarea: textareaRenderer,
  select: selectRenderer,
  'multi-select': groupedOptionsRenderer,
  'checkbox-group': groupedOptionsRenderer,
  radio: radioRenderer,
  checkbox: checkboxRenderer,
  switch: switchRenderer,
  file: fileRenderer,
  signature: signatureRenderer,
  address: addressRenderer,
  info: infoRenderer,
}
