import { cn } from '@/utils/cn'
import type { FlowStep, SoloParticipant } from './RothIraOnboardingFlow.types'

export const inputClass =
  'h-11 w-full rounded-full border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted'

export const selectClass = cn(inputClass, 'appearance-none pr-10')
export const sectionHeadingClass = 'text-xl font-semibold text-text-primary md:text-2xl'
export const stepBadgeClass = 'inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-primary'

export const createEmptySoloParticipant = (id: number): SoloParticipant => ({
  id,
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  primaryPhone: '',
  secondaryPhone: '',
  email: '',
  ssn: '',
  birthMonth: '',
  birthDay: '',
  birthYear: '',
  traditionalAccount: false,
  rothAccount: false,
  afterTaxAccount: false,
})

export const defaultSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Owner Information' },
  { index: 3, label: 'Contact Information' },
  { index: 4, label: 'Statements and Tax Forms' },
  { index: 5, label: 'Add Beneficiary' },
  { index: 6, label: 'Add Interested Party' },
  { index: 7, label: 'Payment & Agreement' },
  { index: 8, label: 'Funding Option' },
] as const

export const rothIraKidsSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Owner Information' },
  { index: 3, label: 'Owner Contact Information' },
  { index: 4, label: 'Individual Establishing Account' },
  { index: 5, label: 'Contact Info' },
  { index: 6, label: 'Statements & Tax Forms' },
  { index: 7, label: 'Add Beneficiary' },
  { index: 8, label: 'Add Interested Party' },
  { index: 9, label: 'Payment & Agreement' },
  { index: 10, label: 'Funding Option' },
] as const

export const hsaSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Owner Information' },
  { index: 3, label: 'Contact Information' },
  { index: 4, label: 'HSA Account Information' },
  { index: 5, label: 'Statements and Tax Forms' },
  { index: 6, label: 'Add Beneficiary' },
  { index: 7, label: 'Add Interested Party' },
  { index: 8, label: 'Payment & Agreement' },
  { index: 9, label: 'Funding Option' },
] as const

export const coverdellSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Owner Information' },
  { index: 3, label: 'Contact Information' },
  { index: 4, label: 'Individual Establishing Account' },
  { index: 5, label: 'Contact Info' },
  { index: 6, label: 'Successor Info' },
  { index: 7, label: 'Statements & Tax Forms' },
  { index: 8, label: 'Add Beneficiary' },
  { index: 9, label: 'Add Interested Party' },
  { index: 10, label: 'Payment & Agreement' },
  { index: 11, label: 'Funding Option' },
] as const

export const inheritedTraditionalSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Owner Information' },
  { index: 3, label: 'Individual Establishing Account' },
  { index: 4, label: 'Contact Info' },
  { index: 5, label: 'Statements & Tax Forms' },
  { index: 6, label: 'Add Beneficiary' },
  { index: 7, label: 'Add Interested Party' },
  { index: 8, label: 'Payment & Agreement' },
  { index: 9, label: 'Funding Option' },
] as const

export const rothConversionSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Owner Information' },
  { index: 3, label: 'Owner Contact Information' },
  { index: 4, label: 'Statements & Tax Forms' },
  { index: 5, label: 'Add Beneficiary' },
  { index: 6, label: 'Add Interested Party' },
  { index: 7, label: 'Payment & Agreement' },
  { index: 8, label: 'Roth Conversion Authorization' },
  { index: 9, label: 'Withholding for Roth Conversion' },
  { index: 10, label: 'Funding Option' },
] as const

export const backdoorRothSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Owner Information' },
  { index: 3, label: 'Owner Contact Information' },
  { index: 4, label: 'Statements & Tax Forms' },
  { index: 5, label: 'Add Beneficiary' },
  { index: 6, label: 'Add Interested Party' },
  { index: 7, label: 'Payment & Agreement' },
  { index: 8, label: 'Account Setup & Contribution' },
  { index: 9, label: 'Funding Option' },
] as const

export const otherAccountSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Owner Information' },
  { index: 3, label: 'Contact Information' },
  { index: 4, label: 'Statements and Tax Forms' },
  { index: 5, label: 'Add Beneficiary' },
  { index: 6, label: 'Add Interested Party' },
  { index: 7, label: 'Payment & Agreement' },
] as const

export const rothConversionOtherSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Owner Information' },
  { index: 3, label: 'Contact Information' },
  { index: 4, label: 'Statements and Tax Forms' },
  { index: 5, label: 'Add Beneficiary' },
  { index: 6, label: 'Add Interested Party' },
  { index: 7, label: 'Payment & Agreement' },
  { index: 8, label: 'Roth Conversion Authorization' },
] as const

export const retireCustodySteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Plan Information' },
  { index: 3, label: 'Owner Information' },
  { index: 4, label: 'Owner Contact Information' },
  { index: 5, label: 'Statements & Tax Forms' },
  { index: 6, label: 'Third Party Contract' },
  { index: 7, label: 'Add Interested Party' },
  { index: 8, label: 'Payment & Agreement' },
] as const

export const solo401kIntakeSteps = [
  { index: 1, label: 'Account Type' },
  { index: 2, label: 'Intake Options' },
  { index: 3, label: 'Add Participants Information' },
  { index: 4, label: 'Add Employer Information' },
] as const

export const defaultStepTitleByStep: Record<FlowStep, string> = {
  2: 'Owner Information',
  3: 'Contact Information',
  4: 'Statements and Tax Forms',
  5: 'Add Beneficiary',
  6: 'Add Interested Party',
  7: 'Payment & Agreement',
  8: 'Funding Option',
  9: 'Payment & Agreement',
  10: 'Funding Option',
  11: 'Funding Option',
}
