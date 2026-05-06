import type { ComponentType } from 'react'

export type FlowStep = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
export type FundingOption = 'new-contribution' | 'transfer' | 'rollover'
export type FeePaymentMethod = 'card' | 'ach'
export type DeliveryOption = 'electronic' | 'paper'
export type CitizenshipOption = 'us-citizen' | 'permanent-resident' | 'non-resident'
export type PhoneType = 'cell' | 'home' | 'business'
export type GenderOption = 'male' | 'female' | ''
export type YesNoOption = 'yes' | 'no' | ''
export type FinalReviewStage = 'none' | 'review' | 'pending-tasks'
export type HsaCoverageOption = 'individual' | 'family' | ''
export type HsaInsuranceOption = 'active-hdhp' | 'rollover-no-hdhp' | ''
export type InheritedAccountSetupType = 'new' | 'transfer' | ''
export type InheritedRelationOption = 'spouse' | 'non-spouse' | 'trust' | ''
export type RothConversionType = 'full' | 'partial' | ''
export type RothConversionWithholdingOption = 'withhold' | 'no-withhold' | ''
export type SoloPlanSetupOption = 'new-plan' | 'restatement' | ''
export type SoloEntityTypeOption = 's-corp' | 'llc-s-election' | 'llc' | 'sole-proprietorship' | 'c-corp' | ''
export type BackdoorEstablishmentOption = 'new-backdoor' | 'traditional-only' | ''
export type PlanTypeOption = '401k' | 'defined-benefit' | 'other' | ''
export type RothConversionOtherInstructionOption = 'traditional-only' | 'roth-only' | ''

export interface RothIraOnboardingValues {
  firstName: string
  middleName: string
  lastName: string
  dateOfBirth: string
  ssn: string
  citizenship: CitizenshipOption | ''
  maritalStatus: string
  employmentStatus: string
  email: string
  phone: string
  mailingStreet: string
  mailingAddress2: string
  mailingCity: string
  mailingState: string
  mailingZip: string
  sameAsPhysicalAddress: boolean
  statementDelivery: DeliveryOption | ''
  taxFormDelivery: DeliveryOption | ''
  electronicConsent: boolean
  w9Consent: boolean
  primaryBeneficiaryName: string
  primaryBeneficiaryRelationship: string
  primaryBeneficiaryDob: string
  primaryBeneficiarySsn: string
  primaryBeneficiaryPercent: string
  addContingentBeneficiary: boolean
  hasInterestedParty: boolean
  interestedPartyName: string
  interestedPartyRelationship: string
  interestedPartyEmail: string
  interestedPartyPhone: string
  paymentMethod: FeePaymentMethod | ''
  nameOnCard: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  acceptAgreement: boolean
  fundingOption: FundingOption | ''
  fundingAmount: string
  fundingTimeline: string
  signed: boolean
  paymentCompleted: boolean
  referralSource: string
  promoCode: string
  salesRepresentative: string
  physicalResidentialAddress: string
  primaryPhoneType: PhoneType
  primaryPhoneNumber: string
  birthMonth: string
  birthDay: string
  birthYear: string
  gender: GenderOption
  showSecondaryPhone: boolean
  secondaryPhoneType: PhoneType
  secondaryPhoneNumber: string
  showAlternativeMailingAddress: boolean
  alternativeMailingStreet: string
  alternativeMailingAddress2: string
  alternativeMailingCity: string
  alternativeMailingState: string
  alternativeMailingZip: string
  kidFirstName: string
  kidMiddleName: string
  kidLastName: string
  kidSsn: string
  kidBirthMonth: string
  kidBirthDay: string
  kidBirthYear: string
  kidGender: GenderOption
  kidCitizenship: 'us' | 'other' | ''
  kidContactSameAsParent: boolean
  kidPhysicalResidentialAddress: string
  sepBeneficiaryName: string
  sepCollectiveBargainingCovered: YesNoOption
  sepNonresidentAliens: YesNoOption
  sepCompensationUnder750: YesNoOption
  hsaCoverage: HsaCoverageOption
  hsaInsuranceType: HsaInsuranceOption
  coverdellEsaType: 'new' | 'transfer' | ''
  coverdellFirstName: string
  coverdellMiddleName: string
  coverdellLastName: string
  coverdellSsn: string
  coverdellBirthMonth: string
  coverdellBirthDay: string
  coverdellBirthYear: string
  coverdellGender: GenderOption
  coverdellCitizenship: 'us' | 'other' | ''
  successorFirstName: string
  successorMiddleName: string
  successorLastName: string
  successorSsn: string
  successorBirthMonth: string
  successorBirthDay: string
  successorBirthYear: string
  successorSameAsResponsible: boolean
  successorRelationship: string
  successorPhone: string
  successorAddress: string
  ownerDeathMonth: string
  ownerDeathDay: string
  ownerDeathYear: string
  inheritedSetupType: InheritedAccountSetupType
  inheritedFirstName: string
  inheritedMiddleName: string
  inheritedLastName: string
  inheritedSsn: string
  inheritedBirthMonth: string
  inheritedBirthDay: string
  inheritedBirthYear: string
  inheritedGender: GenderOption
  inheritedCitizenship: 'us' | 'other' | ''
  inheritedRelationToDeceasedOwner: InheritedRelationOption
  rothConversionHasExistingAccount: YesNoOption
  rothConversionType: RothConversionType
  rothConversionWithholding: RothConversionWithholdingOption
  soloPlanSetupOption: SoloPlanSetupOption
  soloTrustCheckingAuthorization: boolean
  soloParticipantTrustee: YesNoOption
  soloParticipantFirstName: string
  soloParticipantMiddleName: string
  soloParticipantLastName: string
  soloParticipantAddress: string
  soloParticipantPrimaryPhone: string
  soloParticipantSecondaryPhone: string
  soloParticipantEmail: string
  soloParticipantSsn: string
  soloParticipantBirthMonth: string
  soloParticipantBirthDay: string
  soloParticipantBirthYear: string
  soloParticipantTraditionalAccount: boolean
  soloParticipantRothAccount: boolean
  soloParticipantAfterTaxAccount: boolean
  soloEmployerCompanyName: string
  soloEmployerEin: string
  soloEmployerEntityType: SoloEntityTypeOption
  soloEmployerAddress: string
  soloEmployerPhone: string
  soloEmployerEstablishedState: string
  soloEmployerLineOfBusiness: string
  soloEmployerOwnerPartner: string
  soloEmployerEmployeeCount: string
  soloEmployerHasOwnershipOtherCompany: YesNoOption
  backdoorEstablishmentOption: BackdoorEstablishmentOption
  backdoorContributionYearOne: string
  backdoorContributionAmountOne: string
  backdoorContributionYearTwo: string
  backdoorContributionAmountTwo: string
  interestedPartyCompanyAuthorized: boolean
  interestedPartyCompanyName: string
  interestedPartyCompanyEmail: string
  retirePlanType: PlanTypeOption
  retireFundTraditional: boolean
  retireFundRoth: boolean
  retirePlanName: string
  retireTaxId: string
  retireBirthMonth: string
  retireBirthDay: string
  retireBirthYear: string
  retireMailingAddress: string
  retireTpaCompanyName: string
  retireTpaContactName: string
  retireTpaPrimaryPhoneType: PhoneType
  retireTpaPrimaryPhoneNumber: string
  retireTpaEmail: string
  rothConversionOtherHasExistingAccount: YesNoOption
  rothConversionOtherInstruction: RothConversionOtherInstructionOption
  rothConversionOtherRothAch: string
  rothConversionOtherType: RothConversionType
  rothConversionOtherCashSelected: boolean
  rothConversionOtherCashAmount: string
  rothConversionOtherNonCashSelected: boolean
}

export interface TraditionalBeneficiary {
  id: number
  designation: 'primary' | 'contingent'
  beneficiaryName: string
  relation: 'spouse' | 'child' | 'trust' | 'other' | ''
  birthMonth: string
  birthDay: string
  birthYear: string
  sharePercentage: string
}

export interface TraditionalInterestedPartyIndividual {
  firstName: string
  middleName: string
  lastName: string
  taxIdOrSsn: string
  birthMonth: string
  birthDay: string
  birthYear: string
  relationship: string
  physicalResidentialAddress: string
  primaryPhoneType: PhoneType
  primaryPhoneNumber: string
  emailAddress: string
}

export interface SoloParticipant {
  id: number
  firstName: string
  middleName: string
  lastName: string
  address: string
  primaryPhone: string
  secondaryPhone: string
  email: string
  ssn: string
  birthMonth: string
  birthDay: string
  birthYear: string
  traditionalAccount: boolean
  rothAccount: boolean
  afterTaxAccount: boolean
}

export interface RothConversionOtherAsset {
  id: number
  assetName: string
  amount: string
}

export interface RothIraOnboardingFlowProps {
  onBackToAccountTypes: () => void
  onComplete: () => void
  accountLabel?: string
  badgeIcon?: ComponentType<{ className?: string }>
  accountTypeId?: string
}
