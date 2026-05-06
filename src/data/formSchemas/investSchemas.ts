import type { FormSchema } from '../../types/form.types'
import { buildFormSchema } from './shared'

const investForms = [
  'Alternative Asset Purchase',
  'Private Placement Investment',
  'Real Estate Investment',
  'Roth IRA/LLC',
  'Roth IRA/LLC in-take',
]

const normalize = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export const investSchemas: FormSchema[] = investForms.map((formName) =>
  buildFormSchema(
    `invest-${normalize(formName)}`,
    formName,
    `${formName} intake for Directed Connect Invest workflows.`,
  ),
)
