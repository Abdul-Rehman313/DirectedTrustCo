import type { FormSchema } from '../../types/form.types'
import {
  agreementFields,
  buildFormSchema,
  personalInformationFields,
  requiredAmountField,
  reviewFields,
} from './shared'

export const rolloverSchemas: FormSchema[] = [
  buildFormSchema('rollover-request', 'Rollover Request', 'Directed Connect rollover workflow.', [
    {
      id: 'personal-information',
      title: 'Personal Information',
      description: 'Verify account owner information.',
      fields: personalInformationFields(),
    },
    {
      id: 'rollover-details',
      title: 'Rollover Details',
      description: 'Enter rollover source and transfer details.',
      fields: [
        {
          id: 'rolloverType',
          type: 'radio',
          label: 'Rollover Type',
          required: true,
          options: [
            { label: 'Direct Rollover', value: 'direct' },
            { label: 'Indirect Rollover', value: 'indirect' },
          ],
        },
        {
          id: 'originInstitution',
          type: 'text',
          label: 'Originating Institution',
          required: true,
        },
        {
          id: 'originAccountNumber',
          type: 'text',
          label: 'Originating Account Number',
          required: true,
        },
        requiredAmountField('rolloverAmount', 'Rollover Amount'),
      ],
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
