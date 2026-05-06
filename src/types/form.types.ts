import type { ZodTypeAny } from 'zod'

export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'date'
  | 'number'
  | 'select'
  | 'multi-select'
  | 'radio'
  | 'checkbox-group'
  | 'checkbox'
  | 'file'
  | 'textarea'
  | 'signature'
  | 'address'
  | 'ssn'
  | 'currency'
  | 'switch'
  | 'info'

export interface FieldOption {
  label: string
  value: string
  hint?: string
}

export interface ConditionalRule {
  fieldId: string
  equals: string | boolean | number
}

export interface FormFieldSchema {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  helpText?: string
  required?: boolean
  options?: FieldOption[]
  validation?: ZodTypeAny
  conditional?: ConditionalRule
  accept?: string
  maxSizeMb?: number
}

export interface FormStepSchema {
  id: string
  title: string
  description?: string
  fields: FormFieldSchema[]
}

export interface FormSchema {
  id: string
  title: string
  description: string
  steps: FormStepSchema[]
}

export type FormValues = Record<string, unknown>
