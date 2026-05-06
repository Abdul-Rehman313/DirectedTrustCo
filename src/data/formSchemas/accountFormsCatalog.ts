import type { FormSchema } from '../../types/form.types'
import { buildFormSchema } from './shared'

export interface AccountFormCatalogEntry {
  id: string
  title: string
  description: string
  icon: 'user' | 'card' | 'document' | 'invest' | 'account' | 'beneficiary' | 'distribution' | 'attorney' | 'transfer'
  schema: FormSchema
}

const createAccountForm = (id: string, title: string, description: string): FormSchema =>
  buildFormSchema(`account-form-${id}`, title, description)

export const accountFormsCatalog: AccountFormCatalogEntry[] = [
  {
    id: 'add-update-interested-party',
    title: 'Add/Update Interested Party',
    description: 'Add or change a person who can view or receive info about your account.',
    icon: 'user',
    schema: createAccountForm(
      'add-update-interested-party',
      'Add/Update Interested Party',
      'Manage authorized interested parties on your account.',
    ),
  },
  {
    id: 'credit-card-authorization',
    title: 'Credit Card Authorization Form',
    description: 'Authorize a credit card to pay account-related fees.',
    icon: 'card',
    schema: createAccountForm(
      'credit-card-authorization',
      'Credit Card Authorization Form',
      'Authorize a card for account-related fee payments.',
    ),
  },
  {
    id: 'document-signature-authorization',
    title: 'Document Signature Authorization',
    description: 'Allow someone else to sign documents on your behalf.',
    icon: 'document',
    schema: createAccountForm(
      'document-signature-authorization',
      'Document Signature Authorization',
      'Assign signature authority for account documents.',
    ),
  },
  {
    id: 'roth-ira-conversion',
    title: 'Roth IRA Conversion',
    description: 'Convert funds from a Traditional IRA to a Roth IRA.',
    icon: 'invest',
    schema: createAccountForm(
      'roth-ira-conversion',
      'Roth IRA Conversion',
      'Submit a Roth conversion request.',
    ),
  },
  {
    id: 'update-account-information',
    title: 'Update Account Information',
    description: 'Edit your personal or contact details for the account.',
    icon: 'account',
    schema: createAccountForm(
      'update-account-information',
      'Update Account Information',
      'Update key account and profile information.',
    ),
  },
  {
    id: 'beneficiary-designation-update',
    title: 'Beneficiary Designation Update',
    description: 'Choose or update who receives your assets when you pass away.',
    icon: 'beneficiary',
    schema: createAccountForm(
      'beneficiary-designation-update',
      'Beneficiary Designation Update',
      'Review and update beneficiary designations.',
    ),
  },
  {
    id: 'distribution-request-assets-cash',
    title: 'Distribution Request - Asset(s) and Cash',
    description: 'Request a withdrawal of cash or other assets from your account.',
    icon: 'distribution',
    schema: createAccountForm(
      'distribution-request-assets-cash',
      'Distribution Request - Asset(s) and Cash',
      'Request distributions from available account assets.',
    ),
  },
  {
    id: 'limited-power-of-attorney',
    title: 'Limited Power of Attorney',
    description: 'Give someone permission to manage parts of your account.',
    icon: 'attorney',
    schema: createAccountForm(
      'limited-power-of-attorney',
      'Limited Power of Attorney',
      'Grant limited POA permissions on this account.',
    ),
  },
  {
    id: 'transfer-request-tradestation',
    title: 'Transfer Request-To and From TradeStation Brokerage Account',
    description: 'Move funds between your account and a TradeStation account.',
    icon: 'transfer',
    schema: createAccountForm(
      'transfer-request-tradestation',
      'Transfer Request-To and From TradeStation Brokerage Account',
      'Initiate transfers between Directed Connect and TradeStation accounts.',
    ),
  },
]
