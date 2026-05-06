import type { FormSchema } from '../../types/form.types'
import { buildFormSchema } from './shared'

const manageForms = ['Contact Information Update', 'Beneficiary Update', 'Banking Instructions Update']

const normalize = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export const manageSchemas: FormSchema[] = manageForms.map((formName) =>
  buildFormSchema(
    `manage-${normalize(formName)}`,
    formName,
    `${formName} form for Directed Connect account management workflows.`,
  ),
)
