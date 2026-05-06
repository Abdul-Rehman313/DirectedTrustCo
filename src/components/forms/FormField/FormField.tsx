import { useId, useState } from 'react'
import { Controller, type Control, type ControllerRenderProps, type FieldErrors, type UseFormSetValue, type UseFormWatch } from 'react-hook-form'
import { Badge } from '@/components/ui'
import type { FormFieldSchema } from '@/types/form.types'
import { fieldRegistry, inlineInputErrorTypes, toError } from './formFieldRenderers'

interface FormFieldProps {
  fieldSchema: FormFieldSchema
  control: Control<Record<string, unknown>>
  errors: FieldErrors<Record<string, unknown>>
  setValue: UseFormSetValue<Record<string, unknown>>
  watch: UseFormWatch<Record<string, unknown>>
}

export const FormField = ({ fieldSchema, control, errors, setValue, watch }: FormFieldProps) => {
  const hintId = useId()
  const [fileError, setFileError] = useState<string>()
  const errorValue = toError(errors[fieldSchema.id])
  const commonFieldProps = {
    'aria-label': fieldSchema.label,
    'aria-required': fieldSchema.required,
    'aria-describedby': fieldSchema.helpText ? hintId : undefined,
    'aria-errormessage': errorValue ? `${fieldSchema.id}-error` : undefined,
  }

  if (fieldSchema.type === 'info') {
    return fieldRegistry.info({
      fieldSchema,
      field: {} as ControllerRenderProps<Record<string, unknown>, string>,
      commonFieldProps,
      setValue,
      watch,
      setFileError,
    })
  }

  if (fieldSchema.conditional) {
    const triggerValue = watch(fieldSchema.conditional.fieldId)
    if (triggerValue !== fieldSchema.conditional.equals) {
      return null
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <label className="text-sm font-medium text-text-primary" htmlFor={fieldSchema.id}>
          {fieldSchema.label}
        </label>
        {fieldSchema.required ? <Badge variant="info">Required</Badge> : null}
      </div>

      <Controller
        control={control}
        name={fieldSchema.id}
        render={({ field }) => {
          const renderer = fieldRegistry[fieldSchema.type] ?? fieldRegistry.text
          return renderer({
            fieldSchema,
            field,
            errorValue,
            commonFieldProps,
            setValue,
            watch,
            fileError,
            setFileError,
          })
        }}
      />

      {fieldSchema.helpText ? (
        <p id={hintId} className="text-xs text-text-secondary">
          {fieldSchema.helpText}
        </p>
      ) : null}
      {errorValue && !inlineInputErrorTypes.has(fieldSchema.type) ? (
        <p id={`${fieldSchema.id}-error`} className="text-xs text-error" role="alert">
          {errorValue}
        </p>
      ) : null}
    </div>
  )
}
