import type { FormSchema } from '../../types/form.types'
import {
  agreementFields,
  beneficiaryFields,
  buildFormSchema,
  personalInformationFields,
  requiredAmountField,
  reviewFields,
} from './shared'

export const contributionsSchemas: FormSchema[] = [
  buildFormSchema('contribution-new', 'Contribution Request', 'Directed Connect contribution request workflow.', [
    {
      id: 'personal-information',
      title: 'Personal Information',
      description: 'Verify the account owner details.',
      fields: personalInformationFields(),
    },
    {
      id: 'contribution-details',
      title: 'Contribution Details',
      description: 'Define contribution amount, year, and payment method.',
      fields: [
        requiredAmountField('contributionAmount', 'Contribution Amount'),
        {
          id: 'contributionYear',
          type: 'select',
          label: 'Contribution Year',
          required: true,
          options: [
            { label: '2024', value: '2024' },
            { label: '2025', value: '2025' },
            { label: '2026', value: '2026' },
          ],
        },
        {
          id: 'paymentMethod',
          type: 'radio',
          label: 'Payment Method',
          required: true,
          options: [
            { label: 'ACH Transfer', value: 'ach' },
            { label: 'Wire', value: 'wire' },
            { label: 'Check', value: 'check' },
          ],
        },
      ],
    },
    {
      id: 'beneficiaries',
      title: 'Beneficiaries',
      description: 'Confirm beneficiary information.',
      fields: beneficiaryFields(),
    },
    {
      id: 'agreements-signatures',
      title: 'Agreements & Signatures',
      description: 'Accept and sign.',
      fields: agreementFields(),
    },
    {
      id: 'review-submit',
      title: 'Review & Submit',
      description: 'Confirm and submit.',
      fields: reviewFields(),
    },
  ]),
]
