import type {
  FlowStep,
  RothConversionOtherAsset,
  RothIraOnboardingValues,
  SoloParticipant,
  TraditionalBeneficiary,
  TraditionalInterestedPartyIndividual,
} from './RothIraOnboardingFlow.types'

interface StepTitlesArgs {
  step: FlowStep
  defaultStepTitleByStep: Record<FlowStep, string>
  isCoverdellAccount: boolean
  isHsaAccount: boolean
  isInheritedIraAccount: boolean
  isBackdoorRothStrategyAccount: boolean
  isRetireCustodyAccount: boolean
  isRothConversionOtherAccount: boolean
  isSolo401kIntakeAccount: boolean
  isRothConversionAccount: boolean
  isRothIraKidsAccount: boolean
  hsaInfoStep: FlowStep
  inheritedEstablishingStep: FlowStep
  backdoorAccountSetupStep: FlowStep
  ownerInfoStep: FlowStep
  ownerContactStep: FlowStep
  interestedPartyStep: FlowStep
  paymentStep: FlowStep
  rothConversionAuthorizationStep: FlowStep
  rothConversionWithholdingStep: FlowStep
  rothConversionOtherAuthorizationStep: FlowStep
  soloEmployerInformationStep: FlowStep
  soloIntakeOptionsStep: FlowStep
  soloParticipantsStep: FlowStep
  fundingStep: FlowStep
  retirePlanInformationStep: FlowStep
  retireThirdPartyContractStep: FlowStep
  statementsStep: FlowStep
}

export const getRothIraCurrentStepTitle = ({
  step,
  defaultStepTitleByStep,
  isCoverdellAccount,
  isHsaAccount,
  isInheritedIraAccount,
  isBackdoorRothStrategyAccount,
  isRetireCustodyAccount,
  isRothConversionOtherAccount,
  isSolo401kIntakeAccount,
  isRothConversionAccount,
  isRothIraKidsAccount,
  hsaInfoStep,
  inheritedEstablishingStep,
  backdoorAccountSetupStep,
  ownerInfoStep,
  ownerContactStep,
  interestedPartyStep,
  paymentStep,
  rothConversionAuthorizationStep,
  rothConversionWithholdingStep,
  rothConversionOtherAuthorizationStep,
  soloEmployerInformationStep,
  soloIntakeOptionsStep,
  soloParticipantsStep,
  fundingStep,
  retirePlanInformationStep,
  retireThirdPartyContractStep,
  statementsStep,
}: StepTitlesArgs): string => {
  if (isCoverdellAccount) {
    if (step === 4) {
      return 'Individual Establishing Account'
    }
    if (step === 5) {
      return 'Contact Info'
    }
    if (step === 6) {
      return 'Successor Info'
    }
    if (step === 7) {
      return 'Statements & Tax Forms'
    }
    if (step === 8) {
      return 'Add Beneficiary'
    }
    if (step === 9) {
      return 'Add Interested Party'
    }
    if (step === 10) {
      return 'Payment & Agreement'
    }
    if (step === 11) {
      return 'Funding Option'
    }
    return defaultStepTitleByStep[step]
  }

  if (isHsaAccount) {
    if (step === hsaInfoStep) {
      return 'HSA Account Information'
    }
    if (step === 5) {
      return 'Statements and Tax Forms'
    }
    if (step === 6) {
      return 'Add Beneficiary'
    }
    if (step === 7) {
      return 'Add Interested Party'
    }
    if (step === 8) {
      return 'Payment & Agreement'
    }
    if (step === 9) {
      return 'Funding Option'
    }
    return defaultStepTitleByStep[step]
  }

  if (isSolo401kIntakeAccount) {
    if (step === soloIntakeOptionsStep) {
      return 'Intake Options'
    }
    if (step === soloParticipantsStep) {
      return 'Add Participants Information'
    }
    if (step === soloEmployerInformationStep) {
      return 'Add Employer Information'
    }
    return defaultStepTitleByStep[step]
  }

  if (isRetireCustodyAccount) {
    if (step === retirePlanInformationStep) {
      return 'Plan Information'
    }
    if (step === ownerInfoStep) {
      return 'Owner Information'
    }
    if (step === ownerContactStep) {
      return 'Owner Contact Information'
    }
    if (step === statementsStep) {
      return 'Statements & Tax Forms'
    }
    if (step === retireThirdPartyContractStep) {
      return 'Third Party Contract'
    }
    if (step === interestedPartyStep) {
      return 'Add Interested Party'
    }
    if (step === paymentStep) {
      return 'Payment & Agreement'
    }
    return defaultStepTitleByStep[step]
  }

  if (isRothConversionOtherAccount) {
    if (step === rothConversionOtherAuthorizationStep) {
      return 'Roth Conversion Authorization'
    }
    return defaultStepTitleByStep[step]
  }

  if (isBackdoorRothStrategyAccount) {
    if (step === ownerContactStep) {
      return 'Owner Contact Information'
    }
    if (step === statementsStep) {
      return 'Statements & Tax Forms'
    }
    if (step === backdoorAccountSetupStep) {
      return 'Account Establishment & Contributions'
    }
    if (step === fundingStep) {
      return 'Funding Option'
    }
    return defaultStepTitleByStep[step]
  }

  if (isRothConversionAccount) {
    if (step === ownerContactStep) {
      return 'Owner Contact Information'
    }
    if (step === statementsStep) {
      return 'Statements & Tax Forms'
    }
    if (step === rothConversionAuthorizationStep) {
      return 'Roth Conversion Authorization'
    }
    if (step === rothConversionWithholdingStep) {
      return 'Withholding Election for Roth Conversion'
    }
    return defaultStepTitleByStep[step]
  }

  if (isInheritedIraAccount) {
    if (step === inheritedEstablishingStep) {
      return 'Individual Establishing Account'
    }
    if (step === ownerContactStep) {
      return 'Contact Info'
    }
    if (step === statementsStep) {
      return 'Statements & Tax Forms'
    }
    return defaultStepTitleByStep[step]
  }

  if (!isRothIraKidsAccount) {
    return defaultStepTitleByStep[step]
  }
  if (step === 3) {
    return 'Owner Contact Information'
  }
  if (step === 4) {
    return 'Individual Establishing Account'
  }
  if (step === 5) {
    return 'Contact Info'
  }
  if (step === 6) {
    return 'Statements & Tax Forms'
  }
  return defaultStepTitleByStep[step]
}

interface CanContinueArgs {
  step: FlowStep
  values: RothIraOnboardingValues
  traditionalBeneficiaries: TraditionalBeneficiary[]
  traditionalInterestedParty: TraditionalInterestedPartyIndividual
  rothConversionOtherAssets: RothConversionOtherAsset[]
  soloParticipants: SoloParticipant[]
  showInterestedPartyIndividual: boolean
  beneficiaryStep: FlowStep
  contactInfoStep: FlowStep
  fundingStep: FlowStep
  backdoorAccountSetupStep: FlowStep
  retirePlanInformationStep: FlowStep
  retireThirdPartyContractStep: FlowStep
  hsaInfoStep: FlowStep
  inheritedEstablishingStep: FlowStep
  individualEstablishingStep: FlowStep
  interestedPartyStep: FlowStep
  ownerContactStep: FlowStep
  ownerInfoStep: FlowStep
  paymentStep: FlowStep
  rothConversionAuthorizationStep: FlowStep
  rothConversionWithholdingStep: FlowStep
  rothConversionOtherAuthorizationStep: FlowStep
  statementsStep: FlowStep
  successorStep: FlowStep
  soloEmployerInformationStep: FlowStep
  soloIntakeOptionsStep: FlowStep
  soloParticipantsStep: FlowStep
  isBackdoorRothStrategyAccount: boolean
  isCoverdellAccount: boolean
  isHsaAccount: boolean
  isInheritedIraAccount: boolean
  isOtherAccountWithoutFunding: boolean
  isRetireCustodyAccount: boolean
  isRothConversionOtherAccount: boolean
  isRothIraKidsAccount: boolean
  isSepIra: boolean
  isTraditionalIra: boolean
  isRothConversionAccount: boolean
  isSolo401kIntakeAccount: boolean
}

export const getRothIraCanContinue = ({
  step,
  values,
  traditionalBeneficiaries,
  traditionalInterestedParty,
  rothConversionOtherAssets,
  soloParticipants,
  showInterestedPartyIndividual,
  beneficiaryStep,
  contactInfoStep,
  fundingStep,
  backdoorAccountSetupStep,
  retirePlanInformationStep,
  retireThirdPartyContractStep,
  hsaInfoStep,
  inheritedEstablishingStep,
  individualEstablishingStep,
  interestedPartyStep,
  ownerContactStep,
  ownerInfoStep,
  paymentStep,
  rothConversionAuthorizationStep,
  rothConversionWithholdingStep,
  rothConversionOtherAuthorizationStep,
  statementsStep,
  successorStep,
  soloEmployerInformationStep,
  soloIntakeOptionsStep,
  soloParticipantsStep,
  isBackdoorRothStrategyAccount,
  isCoverdellAccount,
  isHsaAccount,
  isInheritedIraAccount,
  isOtherAccountWithoutFunding,
  isRetireCustodyAccount,
  isRothConversionOtherAccount,
  isRothIraKidsAccount,
  isSepIra,
  isTraditionalIra,
  isRothConversionAccount,
  isSolo401kIntakeAccount,
}: CanContinueArgs): boolean => {
  if (isSolo401kIntakeAccount && step === soloIntakeOptionsStep) {
    return Boolean(values.soloPlanSetupOption && values.soloTrustCheckingAuthorization)
  }

  if (isSolo401kIntakeAccount && step === soloParticipantsStep) {
    if (values.soloParticipantTrustee === 'no') {
      return true
    }
    return soloParticipants.every((participant) =>
      Boolean(
        participant.firstName.trim() &&
          participant.lastName.trim() &&
          participant.address.trim() &&
          participant.primaryPhone.trim() &&
          participant.email.trim() &&
          participant.ssn.trim() &&
          participant.birthMonth &&
          participant.birthDay &&
          participant.birthYear &&
          (participant.traditionalAccount || participant.rothAccount || participant.afterTaxAccount),
      ),
    )
  }

  if (isSolo401kIntakeAccount && step === soloEmployerInformationStep) {
    return Boolean(
      values.soloEmployerCompanyName.trim() &&
        values.soloEmployerEin.trim() &&
        values.soloEmployerEntityType &&
        values.soloEmployerAddress.trim() &&
        values.soloEmployerPhone.trim() &&
        values.soloEmployerEstablishedState.trim() &&
        values.soloEmployerLineOfBusiness.trim() &&
        values.soloEmployerOwnerPartner.trim() &&
        values.soloEmployerEmployeeCount.trim() &&
        values.soloEmployerHasOwnershipOtherCompany,
    )
  }

  if (isRetireCustodyAccount && step === retirePlanInformationStep) {
    return Boolean(
      values.retirePlanType &&
        (values.retireFundTraditional || values.retireFundRoth) &&
        values.retirePlanName.trim() &&
        values.retireTaxId.trim() &&
        values.retireBirthMonth &&
        values.retireBirthDay &&
        values.retireBirthYear &&
        values.retireMailingAddress.trim(),
    )
  }

  if (step === ownerInfoStep) {
    if (isTraditionalIra) {
      if (isInheritedIraAccount) {
        return Boolean(
          values.firstName.trim() &&
            values.lastName.trim() &&
            values.ssn.trim() &&
            values.birthMonth &&
            values.birthDay &&
            values.birthYear &&
            values.ownerDeathMonth &&
            values.ownerDeathDay &&
            values.ownerDeathYear,
        )
      }
      return Boolean(values.firstName.trim() && values.lastName.trim() && values.email.trim())
    }
    return Boolean(
      values.firstName.trim() &&
        values.lastName.trim() &&
        values.dateOfBirth &&
        values.ssn.trim() &&
        values.citizenship &&
        values.maritalStatus &&
        values.employmentStatus,
    )
  }

  if (isInheritedIraAccount && step === inheritedEstablishingStep) {
    return Boolean(
      values.inheritedSetupType &&
        values.inheritedFirstName.trim() &&
        values.inheritedLastName.trim() &&
        values.inheritedSsn.trim() &&
        values.inheritedBirthMonth &&
        values.inheritedBirthDay &&
        values.inheritedBirthYear &&
        values.inheritedGender &&
        values.inheritedCitizenship &&
        values.inheritedRelationToDeceasedOwner,
    )
  }

  if (step === ownerContactStep) {
    if (isTraditionalIra) {
      return Boolean(
        values.physicalResidentialAddress.trim() &&
          values.primaryPhoneNumber.trim() &&
          values.ssn.trim() &&
          values.birthMonth &&
          values.birthDay &&
          values.birthYear &&
          values.gender,
      )
    }
    return Boolean(
      values.email.trim() &&
        values.phone.trim() &&
        values.mailingStreet.trim() &&
        values.mailingCity.trim() &&
        values.mailingState.trim() &&
        values.mailingZip.trim(),
    )
  }

  if (isRothIraKidsAccount && step === individualEstablishingStep) {
    return Boolean(
      values.kidFirstName.trim() &&
        values.kidLastName.trim() &&
        values.kidSsn.trim() &&
        values.kidBirthMonth &&
        values.kidBirthDay &&
        values.kidBirthYear &&
        values.kidGender &&
        values.kidCitizenship,
    )
  }

  if (isRothIraKidsAccount && step === contactInfoStep) {
    return Boolean(values.kidPhysicalResidentialAddress.trim())
  }

  if (isCoverdellAccount && step === individualEstablishingStep) {
    return Boolean(
      values.coverdellEsaType &&
        values.coverdellFirstName.trim() &&
        values.coverdellLastName.trim() &&
        values.coverdellSsn.trim() &&
        values.coverdellBirthMonth &&
        values.coverdellBirthDay &&
        values.coverdellBirthYear &&
        values.coverdellGender &&
        values.coverdellCitizenship,
    )
  }

  if (isCoverdellAccount && step === contactInfoStep) {
    return Boolean(
      values.physicalResidentialAddress.trim() &&
        values.primaryPhoneNumber.trim() &&
        values.ssn.trim() &&
        values.birthMonth &&
        values.birthDay &&
        values.birthYear &&
        values.gender &&
        values.email.trim(),
    )
  }

  if (isCoverdellAccount && step === successorStep) {
    return Boolean(
      values.successorFirstName.trim() &&
        values.successorLastName.trim() &&
        values.successorSsn.trim() &&
        values.successorBirthMonth &&
        values.successorBirthDay &&
        values.successorBirthYear &&
        values.successorRelationship.trim() &&
        values.successorPhone.trim() &&
        values.successorAddress.trim(),
    )
  }

  if (isHsaAccount && step === hsaInfoStep) {
    return Boolean(values.hsaCoverage && values.hsaInsuranceType)
  }

  if (step === statementsStep) {
    if (isTraditionalIra) {
      return Boolean(values.statementDelivery)
    }
    return Boolean(values.statementDelivery && values.taxFormDelivery && values.electronicConsent)
  }

  if (step === beneficiaryStep) {
    if (isTraditionalIra) {
      return traditionalBeneficiaries.every((beneficiary) =>
        Boolean(
          beneficiary.beneficiaryName.trim() &&
            beneficiary.relation &&
            beneficiary.birthMonth &&
            beneficiary.birthDay &&
            beneficiary.birthYear &&
            beneficiary.sharePercentage.trim(),
        ),
      )
    }
    return Boolean(
      values.primaryBeneficiaryName.trim() &&
        values.primaryBeneficiaryRelationship.trim() &&
        values.primaryBeneficiaryDob &&
        values.primaryBeneficiarySsn.trim() &&
        values.primaryBeneficiaryPercent.trim(),
    )
  }

  if (step === interestedPartyStep) {
    if (isTraditionalIra) {
      if (isOtherAccountWithoutFunding) {
        const companySectionComplete = Boolean(
          values.interestedPartyCompanyAuthorized && values.interestedPartyCompanyName.trim() && values.interestedPartyCompanyEmail.trim(),
        )
        if (!showInterestedPartyIndividual) {
          return companySectionComplete
        }
        return Boolean(
          companySectionComplete &&
            traditionalInterestedParty.firstName.trim() &&
            traditionalInterestedParty.lastName.trim() &&
            traditionalInterestedParty.taxIdOrSsn.trim() &&
            traditionalInterestedParty.birthMonth &&
            traditionalInterestedParty.birthDay &&
            traditionalInterestedParty.birthYear &&
            traditionalInterestedParty.relationship.trim() &&
            traditionalInterestedParty.physicalResidentialAddress.trim() &&
            traditionalInterestedParty.primaryPhoneNumber.trim() &&
            traditionalInterestedParty.emailAddress.trim(),
        )
      }
      if (!showInterestedPartyIndividual) {
        return true
      }
      return Boolean(
        traditionalInterestedParty.firstName.trim() &&
          traditionalInterestedParty.lastName.trim() &&
          traditionalInterestedParty.taxIdOrSsn.trim() &&
          traditionalInterestedParty.birthMonth &&
          traditionalInterestedParty.birthDay &&
          traditionalInterestedParty.birthYear &&
          traditionalInterestedParty.relationship.trim() &&
          traditionalInterestedParty.physicalResidentialAddress.trim() &&
          traditionalInterestedParty.primaryPhoneNumber.trim() &&
          traditionalInterestedParty.emailAddress.trim(),
      )
    }
    if (!values.hasInterestedParty) {
      return true
    }
    return Boolean(
      values.interestedPartyName.trim() &&
        values.interestedPartyRelationship.trim() &&
        values.interestedPartyEmail.trim() &&
        values.interestedPartyPhone.trim(),
    )
  }

  if (isRetireCustodyAccount && step === retireThirdPartyContractStep) {
    return Boolean(
      values.retireTpaCompanyName.trim() &&
        values.retireTpaContactName.trim() &&
        values.retireTpaPrimaryPhoneNumber.trim() &&
        values.retireTpaEmail.trim(),
    )
  }

  if (isRothConversionOtherAccount && step === rothConversionOtherAuthorizationStep) {
    const hasAtLeastOneConversionSelection = values.rothConversionOtherCashSelected || values.rothConversionOtherNonCashSelected
    const cashValid = !values.rothConversionOtherCashSelected || Boolean(values.rothConversionOtherCashAmount.trim())
    const nonCashValid = values.rothConversionOtherNonCashSelected
      ? rothConversionOtherAssets.length > 0 && rothConversionOtherAssets.every((asset) => Boolean(asset.assetName.trim() && asset.amount.trim()))
      : true
    const instructionValid =
      values.rothConversionOtherInstruction === 'roth-only' || Boolean(values.rothConversionOtherRothAch.trim())

    return Boolean(
      values.rothConversionOtherHasExistingAccount &&
        values.rothConversionOtherInstruction &&
        instructionValid &&
        values.rothConversionOtherType &&
        hasAtLeastOneConversionSelection &&
        cashValid &&
        nonCashValid,
    )
  }

  if (isBackdoorRothStrategyAccount && step === backdoorAccountSetupStep) {
    return Boolean(
      values.backdoorEstablishmentOption &&
        values.backdoorContributionYearOne.trim() &&
        values.backdoorContributionAmountOne.trim() &&
        values.backdoorContributionYearTwo.trim() &&
        values.backdoorContributionAmountTwo.trim(),
    )
  }

  if (step === paymentStep) {
    if (isTraditionalIra) {
      if (isSepIra) {
        return Boolean(
          values.paymentMethod &&
            values.acceptAgreement &&
            values.sepBeneficiaryName.trim() &&
            values.sepCollectiveBargainingCovered &&
            values.sepNonresidentAliens &&
            values.sepCompensationUnder750,
        )
      }
      if (isBackdoorRothStrategyAccount) {
        return Boolean(values.acceptAgreement)
      }
      if (isOtherAccountWithoutFunding) {
        return Boolean(values.acceptAgreement)
      }
      return Boolean(values.paymentMethod && values.acceptAgreement)
    }
    const paymentMethodComplete =
      values.paymentMethod === 'ach'
        ? true
        : Boolean(values.nameOnCard.trim() && values.cardNumber.trim() && values.cardExpiry.trim() && values.cardCvc.trim())
    return Boolean(paymentMethodComplete && values.acceptAgreement)
  }

  if (isRothConversionAccount && step === rothConversionAuthorizationStep) {
    return Boolean(values.rothConversionHasExistingAccount && values.rothConversionType)
  }

  if (isRothConversionAccount && step === rothConversionWithholdingStep) {
    return Boolean(values.rothConversionWithholding)
  }

  if (step === fundingStep && isTraditionalIra) {
    return Boolean(values.fundingOption)
  }

  return Boolean(values.fundingOption && values.fundingAmount.trim() && values.signed && values.paymentCompleted)
}
