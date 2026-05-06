import type { FormSchema } from '../../types/form.types'
import { buildFormSchema } from './shared'

export const selfDirectedAccountTypes = [
  'Self-Directed - Roth IRA',
  'Self-Directed - Traditional IRA',
  'Self-Directed - SEP IRA',
  'Self-Directed - Health Savings Account (HSA)',
  'Self-Directed - Coverdell Education Savings Account',
  'Self-Directed - Inherited Traditional IRA',
  'Self-Directed - Inherited Roth IRA',
  'Self-Directed - Roth IRA Kids Account',
  'Self-Directed - Roth Conversion',
  'Self-Directed - Solo 401(k) Intake',
  'Self-Directed - Backdoor Roth IRA Strategy',
  'Self-Directed - Individual Custody',
  'Self-Directed - Retire Custody',
  'Self-Directed - Roth Conversion - Crypto',
  'Self-Directed - Solo 401(k) App',
  'Self-Directed - Trust or Estate Custody',
] as const

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const selfDirectedSchemas: FormSchema[] = selfDirectedAccountTypes.map((accountType) =>
  buildFormSchema(
    slugify(accountType),
    accountType,
    `${accountType} onboarding flow for Directed Connect with personal info, account setup, beneficiaries, verification, agreements, and submission.`,
  ),
)
