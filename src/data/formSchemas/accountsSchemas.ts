import type { FormSchema } from '../../types/form.types'
import { buildFormSchema } from './shared'

const accountForms = ['Account Transfer Request', 'Account Closure Request', 'Account Maintenance Request']

const normalize = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export const accountsSchemas: FormSchema[] = accountForms.map((formName) =>
  buildFormSchema(
    `accounts-${normalize(formName)}`,
    formName,
    `${formName} workflow for Directed Connect account operations.`,
  ),
)
