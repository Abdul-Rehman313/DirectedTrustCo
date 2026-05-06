import { z } from 'zod'
import type { FormFieldSchema, FormSchema, FormStepSchema } from '../../types/form.types'
export { buildStepValidationSchema } from '../../utils/formValidation'

const normalizeString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

const requiredText = (label: string) =>
  z.preprocess(
    normalizeString,
    z.string().min(1, `${label} is required`),
  )

const requiredEmail = (label: string) =>
  z.preprocess(
    normalizeString,
    z
      .string()
      .min(1, `${label} is required`)
      .email('Enter a valid email address'),
  )

const requiredPhone = (label: string) =>
  z.preprocess(
    normalizeString,
    z
      .string()
      .min(1, `${label} is required`)
      .regex(/^\+?[0-9\s()-]{10,20}$/, 'Enter a valid phone number'),
  )

const requiredSSN = (label: string) =>
  z.preprocess(
    normalizeString,
    z
      .string()
      .min(1, `${label} is required`)
      .regex(/^\d{3}-\d{2}-\d{4}$/, 'Enter SSN as ###-##-####'),
  )

const requiredCurrency = (label: string) =>
  z.preprocess(
    normalizeString,
    z.string().min(1, `${label} is required`),
  )

const requiredAddress = (label: string) =>
  z.preprocess(
    (value) => {
      if (typeof value !== 'object' || value === null) {
        return false
      }

      const address = value as Record<string, unknown>
      return (
        normalizeString(address.street).length > 0 &&
        normalizeString(address.city).length > 0 &&
        normalizeString(address.state).length > 0 &&
        normalizeString(address.zip).length > 0
      )
    },
    z.boolean().refine((isComplete) => isComplete, `${label} is required`),
  )

export const personalInformationFields = (): FormFieldSchema[] => [
  { id: 'firstName', type: 'text', label: 'First Name', required: true, validation: requiredText('First Name') },
  { id: 'middleName', type: 'text', label: 'Middle Name', placeholder: 'Optional' },
  { id: 'lastName', type: 'text', label: 'Last Name', required: true, validation: requiredText('Last Name') },
  { id: 'dateOfBirth', type: 'date', label: 'Date of Birth', required: true, validation: requiredText('Date of Birth') },
  {
    id: 'ssn',
    type: 'ssn',
    label: 'Social Security Number',
    required: true,
    validation: requiredSSN('Social Security Number'),
    helpText: 'Format: ###-##-####',
  },
  {
    id: 'citizenshipStatus',
    type: 'select',
    label: 'Citizenship Status',
    required: true,
    validation: requiredText('Citizenship Status'),
    options: [
      { label: 'US Citizen', value: 'us-citizen' },
      { label: 'US Permanent Resident', value: 'permanent-resident' },
      { label: 'Non-Resident', value: 'non-resident' },
    ],
  },
  { id: 'email', type: 'email', label: 'Email', required: true, validation: requiredEmail('Email') },
  { id: 'phone', type: 'phone', label: 'Phone Number', required: true, validation: requiredPhone('Phone Number') },
  {
    id: 'mailingAddress',
    type: 'address',
    label: 'Mailing Address',
    required: true,
    validation: requiredAddress('Mailing Address'),
    helpText: 'Street, city, state, and ZIP code',
  },
]

export const accountDetailsFields = (accountType: string): FormFieldSchema[] => [
  {
    id: 'accountType',
    type: 'info',
    label: 'Account Type',
    helpText: accountType,
  },
  {
    id: 'investmentObjective',
    type: 'radio',
    label: 'Investment Objective',
    required: true,
    validation: requiredText('Investment Objective'),
    options: [
      { label: 'Capital Appreciation', value: 'capital-appreciation' },
      { label: 'Income Generation', value: 'income-generation' },
      { label: 'Preservation of Capital', value: 'preservation-capital' },
    ],
  },
  {
    id: 'riskTolerance',
    type: 'select',
    label: 'Risk Tolerance',
    required: true,
    validation: requiredText('Risk Tolerance'),
    options: [
      { label: 'Conservative', value: 'conservative' },
      { label: 'Moderate', value: 'moderate' },
      { label: 'Aggressive', value: 'aggressive' },
    ],
  },
  {
    id: 'fundingSource',
    type: 'checkbox-group',
    label: 'Funding Source',
    required: true,
    validation: z.preprocess(
      (value) => (Array.isArray(value) ? value : []),
      z.array(z.string()).min(1, 'Funding Source is required'),
    ),
    options: [
      { label: 'New Contribution', value: 'new-contribution' },
      { label: 'Transfer', value: 'transfer' },
      { label: 'Rollover', value: 'rollover' },
      { label: 'Conversion', value: 'conversion' },
    ],
  },
]

export const beneficiaryFields = (): FormFieldSchema[] => [
  {
    id: 'primaryBeneficiaryName',
    type: 'text',
    label: 'Primary Beneficiary Name',
    required: true,
    validation: requiredText('Primary Beneficiary Name'),
  },
  {
    id: 'primaryBeneficiaryRelationship',
    type: 'select',
    label: 'Relationship',
    required: true,
    validation: requiredText('Relationship'),
    options: [
      { label: 'Spouse', value: 'spouse' },
      { label: 'Child', value: 'child' },
      { label: 'Parent', value: 'parent' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'primaryBeneficiaryDob',
    type: 'date',
    label: 'Beneficiary Date of Birth',
    required: true,
    validation: requiredText('Beneficiary Date of Birth'),
  },
  {
    id: 'primaryBeneficiarySsn',
    type: 'ssn',
    label: 'Beneficiary SSN',
    required: true,
    validation: requiredSSN('Beneficiary SSN'),
  },
  {
    id: 'primaryBeneficiaryPercentage',
    type: 'number',
    label: 'Allocation Percentage',
    required: true,
    validation: requiredText('Allocation Percentage'),
  },
  {
    id: 'hasContingentBeneficiary',
    type: 'checkbox',
    label: 'Add contingent beneficiary',
  },
]

export const identityVerificationFields = (): FormFieldSchema[] => [
  {
    id: 'governmentIdFront',
    type: 'file',
    label: 'Government ID (Front)',
    required: true,
    accept: '.jpg,.jpeg,.png,.pdf',
    maxSizeMb: 8,
    validation: requiredText('Government ID front image'),
  },
  {
    id: 'governmentIdBack',
    type: 'file',
    label: 'Government ID (Back)',
    required: true,
    accept: '.jpg,.jpeg,.png,.pdf',
    maxSizeMb: 8,
    validation: requiredText('Government ID back image'),
  },
  {
    id: 'selfieCheck',
    type: 'file',
    label: 'Selfie / Liveness Check',
    required: true,
    accept: '.jpg,.jpeg,.png',
    maxSizeMb: 8,
    validation: requiredText('Selfie upload'),
  },
]

export const agreementFields = (): FormFieldSchema[] => [
  {
    id: 'terms',
    type: 'info',
    label: 'Agreements',
    helpText:
      'I acknowledge all account terms, fee schedule, privacy policy, and disclosures required to open this account.',
  },
  {
    id: 'acceptTerms',
    type: 'checkbox',
    label: 'I agree to the terms and conditions',
    required: true,
    validation: z.preprocess(
      (value) => Boolean(value),
      z.boolean().refine((value) => value, 'I agree to the terms and conditions is required'),
    ),
  },
  { id: 'signature', type: 'signature', label: 'Signature', required: true, validation: requiredText('Signature') },
  { id: 'signedDate', type: 'date', label: 'Date', required: true, validation: requiredText('Signed date') },
]

export const reviewFields = (): FormFieldSchema[] => [
  {
    id: 'review',
    type: 'info',
    label: 'Review & Submit',
    helpText: 'Please verify all entered data before final submission.',
  },
]

export const buildDefaultSteps = (accountType: string): FormStepSchema[] => [
  {
    id: 'personal-information',
    title: 'Personal Information',
    description: 'Tell us about yourself so we can verify your identity.',
    fields: personalInformationFields(),
  },
  {
    id: 'account-details',
    title: 'Account Details',
    description: 'Set account preferences and funding details.',
    fields: accountDetailsFields(accountType),
  },
  {
    id: 'beneficiaries',
    title: 'Beneficiaries',
    description: 'Define primary and contingent beneficiary information.',
    fields: beneficiaryFields(),
  },
  {
    id: 'identity-verification',
    title: 'Identity Verification',
    description: 'Upload identity documents and complete liveness checks.',
    fields: identityVerificationFields(),
  },
  {
    id: 'agreements-signatures',
    title: 'Agreements & Signatures',
    description: 'Review terms and electronically sign this application.',
    fields: agreementFields(),
  },
  {
    id: 'review-submit',
    title: 'Review & Submit',
    description: 'Confirm your entries and submit your application.',
    fields: reviewFields(),
  },
]

export const buildFormSchema = (id: string, title: string, description: string, steps?: FormStepSchema[]): FormSchema => ({
  id,
  title,
  description,
  steps: steps ?? buildDefaultSteps(title),
})

export const requiredAmountField = (id: string, label: string): FormFieldSchema => ({
  id,
  type: 'currency',
  label,
  required: true,
  validation: requiredCurrency(label),
})
