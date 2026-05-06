import { AlertCircle, ArrowLeft, ChevronDown, FileSignature, Leaf, Mars, Pencil, ReceiptText, Trash2, TriangleAlert, Upload, User, Users, Venus } from 'lucide-react'
import { useMemo, useState, type ChangeEvent } from 'react'
import { cn } from '@/utils/cn'
import { Checkbox } from '@/components/ui'
import {
  backdoorRothSteps,
  coverdellSteps,
  createEmptySoloParticipant,
  defaultStepTitleByStep,
  defaultSteps,
  hsaSteps,
  inheritedTraditionalSteps,
  otherAccountSteps,
  retireCustodySteps,
  rothConversionOtherSteps,
  rothConversionSteps,
  rothIraKidsSteps,
  selectClass,
  sectionHeadingClass,
  solo401kIntakeSteps,
  stepBadgeClass,
} from './RothIraOnboardingFlow.constants'
import {
  createInitialRothConversionOtherAssets,
  createInitialRothIraValues,
  createInitialSoloParticipants,
  createInitialTraditionalBeneficiaries,
  createInitialTraditionalInterestedParty,
} from './RothIraOnboardingFlow.initial-state'
import { getRothIraCanContinue, getRothIraCurrentStepTitle } from './RothIraOnboardingFlow.logic'
import {
  HelpVideoCard,
  LabeledInput,
  LabeledSelect,
  OverlayStatusModal,
  PlainInput,
  RadioItem,
  SignAndPayPanel,
  StepItem,
  UploadPhotoIdModal,
} from './RothIraOnboardingFlow.shared'
import type {
  CitizenshipOption,
  FinalReviewStage,
  FlowStep,
  RothConversionOtherAsset,
  RothIraOnboardingFlowProps,
  RothIraOnboardingValues,
  SoloParticipant,
  TraditionalBeneficiary,
  TraditionalInterestedPartyIndividual,
} from './RothIraOnboardingFlow.types'
export const RothIraOnboardingFlow = ({
  onBackToAccountTypes,
  onComplete,
  accountLabel = 'Roth IRA',
  badgeIcon: BadgeIcon = Leaf,
  accountTypeId = 'roth-ira',
}: RothIraOnboardingFlowProps) => {
  const isTraditionalIra = true
  const isRetireCustodyAccount = accountTypeId === 'retire-custody'
  const isRothConversionOtherAccount = accountTypeId === 'roth-conversion-other'
  const isOtherAccountWithoutFunding =
    accountTypeId === 'individual-custody' ||
    accountTypeId === 'retire-custody' ||
    accountTypeId === 'roth-conversion-other' ||
    accountTypeId === 'solo-401k-app' ||
    accountTypeId === 'trust-or-estate-custody'
  const isInheritedIraAccount = accountTypeId === 'inherited-traditional-ira' || accountTypeId === 'inherited-roth-ira'
  const inheritedAccountDisplayName = accountTypeId === 'inherited-roth-ira' ? 'Inherited Roth IRA' : 'Inherited Traditional IRA'
  const isRothConversionAccount = accountTypeId === 'roth-conversion-strategy'
  const isBackdoorRothStrategyAccount = accountTypeId === 'backdoor-roth-ira-strategy'
  const isSolo401kIntakeAccount = accountTypeId === 'solo-401k-intake'
  const isHsaAccount = accountTypeId === 'health-savings-account'
  const isCoverdellAccount = accountTypeId === 'coverdell-education-savings-account'
  const isSepIra = accountTypeId === 'sep-ira'
  const isRothIraKidsAccount = accountTypeId === 'roth-ira-kids-account' || accountTypeId === 'roth-ira-kids'
  const sidebarSteps = isRothIraKidsAccount
    ? rothIraKidsSteps
    : isCoverdellAccount
      ? coverdellSteps
      : isSolo401kIntakeAccount
        ? solo401kIntakeSteps
      : isRothConversionOtherAccount
        ? rothConversionOtherSteps
      : isRetireCustodyAccount
        ? retireCustodySteps
      : isOtherAccountWithoutFunding
        ? otherAccountSteps
      : isBackdoorRothStrategyAccount
        ? backdoorRothSteps
      : isRothConversionAccount
        ? rothConversionSteps
      : isInheritedIraAccount
        ? inheritedTraditionalSteps
      : isHsaAccount
        ? hsaSteps
        : defaultSteps
  const totalSteps = isRothIraKidsAccount
    ? 10
    : isCoverdellAccount
      ? 11
      : isSolo401kIntakeAccount
        ? 4
      : isRothConversionAccount
        ? 10
      : isRothConversionOtherAccount
        ? 8
      : isRetireCustodyAccount
        ? 8
      : isOtherAccountWithoutFunding
        ? 7
      : isBackdoorRothStrategyAccount
        ? 9
      : isInheritedIraAccount
        ? 9
      : isHsaAccount
        ? 9
        : 8
  const ownerInfoStep: FlowStep = isRetireCustodyAccount ? 3 : 2
  const retirePlanInformationStep: FlowStep = 2
  const retireThirdPartyContractStep: FlowStep = 6
  const inheritedEstablishingStep: FlowStep = 3
  const ownerContactStep: FlowStep = isInheritedIraAccount || isRetireCustodyAccount ? 4 : 3
  const individualEstablishingStep: FlowStep = 4
  const hsaInfoStep: FlowStep = 4
  const contactInfoStep: FlowStep = 5
  const successorStep: FlowStep = 6
  const rothConversionAuthorizationStep: FlowStep = 8
  const rothConversionWithholdingStep: FlowStep = 9
  const rothConversionOtherAuthorizationStep: FlowStep = 8
  const backdoorAccountSetupStep: FlowStep = 8
  const soloIntakeOptionsStep: FlowStep = 2
  const soloParticipantsStep: FlowStep = 3
  const soloEmployerInformationStep: FlowStep = 4
  const statementsStep: FlowStep = isRothIraKidsAccount
    ? 6
    : isCoverdellAccount
      ? 7
    : isSolo401kIntakeAccount
      ? 11
    : isRetireCustodyAccount
      ? 5
    : isRothConversionAccount
      ? 4
      : isBackdoorRothStrategyAccount
        ? 4
      : isInheritedIraAccount
        ? 5
      : isHsaAccount
        ? 5
        : 4
  const beneficiaryStep: FlowStep = isRothIraKidsAccount
    ? 7
    : isCoverdellAccount
      ? 8
    : isRothConversionAccount
      ? 5
    : isRetireCustodyAccount
      ? 11
    : isBackdoorRothStrategyAccount
      ? 5
      : isInheritedIraAccount
        ? 6
      : isHsaAccount
        ? 6
        : 5
  const interestedPartyStep: FlowStep = isRothIraKidsAccount
    ? 8
    : isCoverdellAccount
      ? 9
    : isRothConversionAccount
      ? 6
    : isRetireCustodyAccount
      ? 7
    : isBackdoorRothStrategyAccount
      ? 6
      : isInheritedIraAccount
        ? 7
      : isHsaAccount
        ? 7
        : 6
  const paymentStep: FlowStep = isRothIraKidsAccount
    ? 9
    : isCoverdellAccount
      ? 10
    : isRothConversionAccount
      ? 7
    : isRetireCustodyAccount
      ? 8
    : isBackdoorRothStrategyAccount
      ? 7
      : isInheritedIraAccount
        ? 8
      : isHsaAccount
        ? 8
        : 7
  const fundingStep: FlowStep = isRothIraKidsAccount
    ? 10
    : isCoverdellAccount
      ? 11
      : isRothConversionAccount
        ? 10
      : isBackdoorRothStrategyAccount
        ? 9
      : isInheritedIraAccount
        ? 9
      : isHsaAccount
        ? 9
        : 8
  const accountTypePillLabel = accountTypeId === 'traditional-ira' ? 'Traditional' : accountLabel
  const [step, setStep] = useState<FlowStep>(2)
  const [showDocusignModal, setShowDocusignModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [finalReviewStage, setFinalReviewStage] = useState<FinalReviewStage>('none')
  const [showUploadPhotoIdModal, setShowUploadPhotoIdModal] = useState(false)
  const [uploadedPhotoIdName, setUploadedPhotoIdName] = useState('')
  const [uploadedPhotoIdSize, setUploadedPhotoIdSize] = useState('')
  const [values, setValues] = useState<RothIraOnboardingValues>(() => createInitialRothIraValues({ isTraditionalIra }))
  const [traditionalBeneficiaries, setTraditionalBeneficiaries] = useState<TraditionalBeneficiary[]>(
    createInitialTraditionalBeneficiaries,
  )
  const [showInterestedPartyIndividual, setShowInterestedPartyIndividual] = useState(false)
  const [traditionalInterestedParty, setTraditionalInterestedParty] = useState<TraditionalInterestedPartyIndividual>(
    createInitialTraditionalInterestedParty,
  )
  const [soloParticipants, setSoloParticipants] = useState<SoloParticipant[]>(createInitialSoloParticipants)
  const [rothConversionOtherAssets, setRothConversionOtherAssets] = useState<RothConversionOtherAsset[]>(
    createInitialRothConversionOtherAssets,
  )

  const setField = <K extends keyof RothIraOnboardingValues>(key: K, value: RothIraOnboardingValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }))
  }

  const setTraditionalBeneficiaryField = <K extends keyof TraditionalBeneficiary>(
    beneficiaryId: number,
    key: K,
    value: TraditionalBeneficiary[K],
  ) => {
    setTraditionalBeneficiaries((previous) =>
      previous.map((beneficiary) => (beneficiary.id === beneficiaryId ? { ...beneficiary, [key]: value } : beneficiary)),
    )
  }

  const addTraditionalBeneficiary = (): void => {
    setTraditionalBeneficiaries((previous) => {
      const nextId = previous.reduce((maxId, beneficiary) => Math.max(maxId, beneficiary.id), 0) + 1
      return [
        ...previous,
        {
          id: nextId,
          designation: 'contingent',
          beneficiaryName: '',
          relation: 'child',
          birthMonth: '',
          birthDay: '',
          birthYear: '',
          sharePercentage: '',
        },
      ]
    })
  }

  const removeTraditionalBeneficiary = (beneficiaryId: number): void => {
    setTraditionalBeneficiaries((previous) => previous.filter((beneficiary) => beneficiary.id !== beneficiaryId))
  }

  const setTraditionalInterestedPartyField = <K extends keyof TraditionalInterestedPartyIndividual>(
    key: K,
    value: TraditionalInterestedPartyIndividual[K],
  ) => {
    setTraditionalInterestedParty((previous) => ({ ...previous, [key]: value }))
  }

  const resetTraditionalInterestedParty = (): void => {
    setTraditionalInterestedParty(createInitialTraditionalInterestedParty())
    setShowInterestedPartyIndividual(false)
  }

  const setSoloParticipantField = <K extends keyof SoloParticipant>(participantId: number, key: K, value: SoloParticipant[K]) => {
    setSoloParticipants((previous) =>
      previous.map((participant) => (participant.id === participantId ? { ...participant, [key]: value } : participant)),
    )
  }

  const addSoloParticipant = (): void => {
    setSoloParticipants((previous) => {
      const nextId = previous.reduce((maxId, participant) => Math.max(maxId, participant.id), 0) + 1
      return [...previous, createEmptySoloParticipant(nextId)]
    })
  }

  const removeSoloParticipant = (participantId: number): void => {
    setSoloParticipants((previous) => previous.filter((participant) => participant.id !== participantId))
  }

  const setRothConversionOtherAssetField = <K extends keyof RothConversionOtherAsset>(
    assetId: number,
    key: K,
    value: RothConversionOtherAsset[K],
  ): void => {
    setRothConversionOtherAssets((previous) => previous.map((asset) => (asset.id === assetId ? { ...asset, [key]: value } : asset)))
  }

  const addRothConversionOtherAsset = (): void => {
    setRothConversionOtherAssets((previous) => {
      const nextId = previous.reduce((maxId, asset) => Math.max(maxId, asset.id), 0) + 1
      return [...previous, { id: nextId, assetName: '', amount: '' }]
    })
  }

  const removeRothConversionOtherAsset = (assetId: number): void => {
    setRothConversionOtherAssets((previous) => previous.filter((asset) => asset.id !== assetId))
  }

  const hasUploadedPhotoId = Boolean(uploadedPhotoIdName)
  const backdoorTotalContribution = useMemo(() => {
    const amountOne = Number(values.backdoorContributionAmountOne.replace(/[^0-9.]/g, ''))
    const amountTwo = Number(values.backdoorContributionAmountTwo.replace(/[^0-9.]/g, ''))
    const total = (Number.isFinite(amountOne) ? amountOne : 0) + (Number.isFinite(amountTwo) ? amountTwo : 0)
    return total.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
  }, [values.backdoorContributionAmountOne, values.backdoorContributionAmountTwo])

  const currentStepTitle = useMemo(
    () =>
      getRothIraCurrentStepTitle({
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
      }),
    [
      step,
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
    ],
  )

  const handlePhotoIdFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const sizeInMb = file.size / (1024 * 1024)
    setUploadedPhotoIdName(file.name)
    setUploadedPhotoIdSize(`${sizeInMb.toFixed(1)} MB`)
  }

  const canContinue = useMemo(
    () =>
      getRothIraCanContinue({
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
      }),
    [
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
    ],
  )

  const goBack = (): void => {
    if (finalReviewStage === 'pending-tasks') {
      setFinalReviewStage('review')
      return
    }
    if (finalReviewStage === 'review') {
      setFinalReviewStage('none')
      return
    }
    if (step === 2) {
      onBackToAccountTypes()
      return
    }
    setStep((previous) => (previous - 1) as FlowStep)
  }

  const goNext = (): void => {
    if (finalReviewStage === 'review') {
      setFinalReviewStage('pending-tasks')
      return
    }
    if (finalReviewStage === 'pending-tasks') {
      if (values.signed) {
        onComplete()
      }
      return
    }
    if (!canContinue) {
      return
    }
    if (isSolo401kIntakeAccount && step === soloEmployerInformationStep) {
      setFinalReviewStage('review')
      return
    }
    if (isRothConversionOtherAccount && step === rothConversionOtherAuthorizationStep) {
      setFinalReviewStage('review')
      return
    }
    if (isOtherAccountWithoutFunding && !isRothConversionOtherAccount && step === paymentStep) {
      setFinalReviewStage('review')
      return
    }
    if (step === fundingStep) {
      setFinalReviewStage('review')
      return
    }
    setStep((previous) => (previous + 1) as FlowStep)
  }

  const showDocusignPreview = (): void => {
    setField('signed', true)
    setShowDocusignModal(true)
    window.setTimeout(() => setShowDocusignModal(false), 900)
  }

  const showCheckoutPreview = (): void => {
    setField('paymentCompleted', true)
    setShowCheckoutModal(true)
    window.setTimeout(() => setShowCheckoutModal(false), 900)
  }

  return (
    <>
      <section className="min-h-[calc(100vh-3rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        <div className="flex min-h-[calc(100vh-3rem)]">
          <aside
            className={cn(
              'hidden w-[360px] flex-col border-r border-border px-5 py-6 lg:flex xl:w-[380px]',
              finalReviewStage !== 'none' ? 'lg:hidden' : '',
            )}
          >
            <ol className="relative space-y-5">
              <span className="pointer-events-none absolute left-[13px] top-3 block h-[calc(100%-24px)] w-px bg-border" aria-hidden />
              {sidebarSteps.map((stepItem) => {
                const status: 'completed' | 'active' | 'pending' =
                  step > stepItem.index ? 'completed' : step === stepItem.index ? 'active' : 'pending'
                return <StepItem key={stepItem.label} index={stepItem.index} label={stepItem.label} status={status} />
              })}
            </ol>
            <div className="mt-auto">
              <HelpVideoCard label={accountLabel} />
            </div>
          </aside>

          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={goBack}
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-text-primary"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
                  {finalReviewStage === 'none' ? currentStepTitle : 'Review Fees and Sign Application'}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className={cn(stepBadgeClass, 'hidden md:inline-flex')}>
                  <span className="h-2 w-2 rounded-full bg-text-primary" />
                  {accountTypePillLabel}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (isTraditionalIra && finalReviewStage === 'none' && canContinue) {
                      goNext()
                    }
                  }}
                  disabled={!(isTraditionalIra && finalReviewStage === 'none' && canContinue)}
                  className={cn(
                    'h-9 rounded-full px-4 text-sm font-medium',
                    isTraditionalIra && finalReviewStage === 'none' && canContinue
                      ? 'bg-primary text-text-inverse'
                      : 'bg-slate-100 text-text-muted disabled:cursor-not-allowed',
                  )}
                >
                  Continue
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-6 md:px-6">
              <div className={cn('mb-3 mt-3 items-center justify-between rounded-2xl border border-border px-4 py-3 lg:hidden', finalReviewStage === 'none' ? 'flex' : 'hidden')}>
                <p className="text-lg font-semibold text-text-primary">
                  STEP <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-text-primary text-sm text-text-inverse">{step}</span>{' '}
                  <span className="text-text-muted">OF</span>{' '}
                  <span className="inline-grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-sm">{totalSteps}</span>
                </p>
                <button type="button" className="text-base text-text-secondary underline">
                  Details
                </button>
              </div>

              {finalReviewStage === 'review' ? (
                <div className="space-y-5 pt-1">
                  <p className="inline-flex items-start gap-2 text-sm text-text-secondary">
                    <ReceiptText className="mt-0.5 h-4 w-4 text-error" />
                    Look over your account fees and complete your application with a digital signature.
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-border">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3 text-sm">
                      <span className="text-text-secondary">Account Type</span>
                      <span className="font-medium text-text-primary">{accountTypePillLabel}</span>
                    </div>
                    <div className="space-y-3 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">One Time Charges</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Online Application Fee</span>
                        <span className="font-medium text-text-primary">$50.00</span>
                      </div>
                      <div className="border-t border-border pt-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Annual Renewal Charges</p>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span className="text-text-secondary">Annual Account Fee</span>
                          <span className="font-medium text-text-primary">$495.00</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-border pt-3 text-base">
                        <span className="font-semibold text-text-primary">Total Due Today</span>
                        <span className="font-semibold text-text-primary">$50.00</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary">
                    Please review your fees above{' '}
                    <button type="button" className="font-medium text-error underline underline-offset-2">
                      View the Fee Schedule
                    </button>
                  </p>

                  <div className="flex items-center justify-between border-t border-border pt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setFinalReviewStage('none')
                        setStep(2)
                      }}
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-text-primary hover:bg-slate-50"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit Application
                    </button>
                    <button
                      type="button"
                      onClick={() => setFinalReviewStage('pending-tasks')}
                      className="h-11 rounded-full bg-primary px-6 text-sm font-semibold text-text-inverse hover:bg-primary-hover"
                    >
                      Confirm & Continue
                    </button>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'pending-tasks' ? (
                <div className="space-y-5 pt-1">
                  <p className="inline-flex items-start gap-2 text-sm text-text-secondary">
                    <ReceiptText className="mt-0.5 h-4 w-4 text-error" />
                    Look over your account fees and complete your application with a digital signature.
                  </p>

                  <div className="overflow-hidden rounded-2xl border border-border">
                    <div className="flex items-center justify-between border-b border-border px-4 py-3 text-sm">
                      <span className="text-text-secondary">Account Type</span>
                      <span className="font-medium text-text-primary">{accountTypePillLabel}</span>
                    </div>
                    <div className="space-y-3 px-4 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">One Time Charges</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Online Application Fee</span>
                        <span className="font-medium text-text-primary">$50.00</span>
                      </div>
                      <div className="border-t border-border pt-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Annual Renewal Charges</p>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span className="text-text-secondary">Annual Account Fee</span>
                          <span className="font-medium text-text-primary">$495.00</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-border pt-3 text-base">
                        <span className="font-semibold text-text-primary">Total Due Today</span>
                        <span className="font-semibold text-text-primary">$50.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    <p className="inline-flex items-center gap-2 text-sm font-medium text-text-primary">
                      <AlertCircle className="h-4 w-4 text-warning" />
                      Pending Task
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="relative rounded-xl border border-border p-4 text-center">
                        <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-slate-100 text-[10px] text-text-secondary">
                          1
                        </span>
                        <div className="mx-auto mb-3 grid h-9 w-9 place-items-center rounded-full bg-error-light text-error">
                          <Upload className="h-4 w-4" />
                        </div>
                        <p className="text-lg font-semibold text-text-primary">Upload a Photo ID</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          Verify your identity by uploading a valid government-issued photo ID.
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowUploadPhotoIdModal(true)}
                          className="mt-4 h-9 rounded-full bg-primary px-5 text-sm font-semibold text-text-inverse hover:bg-primary-hover"
                        >
                          {hasUploadedPhotoId ? 'Uploaded' : 'Upload ID'}
                        </button>
                      </div>

                      <div className="relative rounded-xl border border-border p-4 text-center">
                        <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-slate-100 text-[10px] text-text-secondary">
                          2
                        </span>
                        <div className="mx-auto mb-3 grid h-9 w-9 place-items-center rounded-full bg-error-light text-error">
                          <FileSignature className="h-4 w-4" />
                        </div>
                        <p className="text-lg font-semibold text-text-primary">Sign & Pay to Establish your Account</p>
                        <p className="mt-1 text-sm text-text-secondary">
                          Digitally sign your application document to move forward.
                        </p>
                        <button
                          type="button"
                          onClick={showDocusignPreview}
                          disabled={!hasUploadedPhotoId}
                          className={cn(
                            'mt-4 h-9 rounded-full px-5 text-sm font-semibold',
                            hasUploadedPhotoId
                              ? 'bg-primary text-text-inverse hover:bg-primary-hover'
                              : 'cursor-not-allowed bg-slate-100 text-text-muted',
                          )}
                        >
                          Sign Document
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isRetireCustodyAccount && step === retirePlanInformationStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>Plan Information</h3>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Plan Type<span className="text-error">*</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {([
                        { value: '401k', label: '401(k) Plan' },
                        { value: 'defined-benefit', label: 'Defined Benefit Plan' },
                        { value: 'other', label: 'Other' },
                      ] as const).map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setField('retirePlanType', option.value)}
                          className={cn(
                            'h-9 rounded-full border px-3 text-sm',
                            values.retirePlanType === option.value
                              ? 'border-text-primary bg-surface text-text-primary'
                              : 'border-border bg-slate-50 text-text-secondary',
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Type of Funds (Check all that apply)<span className="text-error">*</span>
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Checkbox checked={values.retireFundTraditional} onCheckedChange={(checked) => setField('retireFundTraditional', checked)} label="Traditional" />
                      <Checkbox checked={values.retireFundRoth} onCheckedChange={(checked) => setField('retireFundRoth', checked)} label="Roth" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Plan Name<span className="text-error">*</span>
                    </p>
                    <div className="relative">
                      <PlainInput value={values.retirePlanName} onChange={(value) => setField('retirePlanName', value)} placeholder="Enter plan name..." />
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1.1fr_1fr]">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Tax ID<span className="text-error">*</span>
                      </p>
                      <PlainInput value={values.retireTaxId} onChange={(value) => setField('retireTaxId', value)} placeholder="Enter Tax ID..." />
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Date of Birth<span className="text-error">*</span>
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="relative">
                          <select value={values.retireBirthMonth} onChange={(event) => setField('retireBirthMonth', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                            <option value="">Month</option>
                            {Array.from({ length: 12 }).map((_, index) => (
                              <option key={`retire-month-${index + 1}`} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select value={values.retireBirthDay} onChange={(event) => setField('retireBirthDay', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                            <option value="">Day</option>
                            {Array.from({ length: 31 }).map((_, index) => (
                              <option key={`retire-day-${index + 1}`} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select value={values.retireBirthYear} onChange={(event) => setField('retireBirthYear', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                            <option value="">Year</option>
                            {Array.from({ length: 90 }).map((_, index) => {
                              const year = String(new Date().getFullYear() - 18 - index)
                              return (
                                <option key={`retire-year-${year}`} value={year}>
                                  {year}
                                </option>
                              )
                            })}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Mailing address<span className="text-error">*</span>
                    </p>
                    <div className="relative">
                      <PlainInput
                        value={values.retireMailingAddress}
                        onChange={(value) => setField('retireMailingAddress', value)}
                        placeholder="Search address..."
                      />
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isRetireCustodyAccount && step === retireThirdPartyContractStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>Third Party Contract</h3>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-text-primary">Plan a Third Party Administrator (TPA) Contact Information</p>
                    <p className="text-xs text-text-secondary">
                      I authorize my Plan or Third Party Administrator listed below to receive and provide information regarding my account.
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      TPA Company<span className="text-error">*</span>
                    </p>
                    <PlainInput
                      value={values.retireTpaCompanyName}
                      onChange={(value) => setField('retireTpaCompanyName', value)}
                      placeholder="Enter TPA Company..."
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Contact Name<span className="text-error">*</span>
                    </p>
                    <PlainInput
                      value={values.retireTpaContactName}
                      onChange={(value) => setField('retireTpaContactName', value)}
                      placeholder="Enter contact name..."
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Primary Phone<span className="text-error">*</span>
                    </p>
                    <div className="flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-2">
                      {(['cell', 'home', 'business'] as const).map((type) => (
                        <button
                          key={`retire-tpa-${type}`}
                          type="button"
                          onClick={() => setField('retireTpaPrimaryPhoneType', type)}
                          className={cn(
                            'h-8 rounded-full px-3 text-xs',
                            values.retireTpaPrimaryPhoneType === type
                              ? 'border border-border bg-slate-50 font-medium text-text-primary'
                              : 'text-text-muted',
                          )}
                        >
                          {type === 'cell' ? 'Cell' : type === 'home' ? 'Home' : 'Business'}
                        </button>
                      ))}
                      <input
                        type="tel"
                        className="h-full flex-1 bg-transparent px-1 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                        value={values.retireTpaPrimaryPhoneNumber}
                        onChange={(event) => setField('retireTpaPrimaryPhoneNumber', event.target.value)}
                        placeholder="(0) - 000 - 000"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Email<span className="text-error">*</span>
                    </p>
                    <PlainInput
                      type="email"
                      value={values.retireTpaEmail}
                      onChange={(value) => setField('retireTpaEmail', value)}
                      placeholder="Enter TPA email..."
                    />
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && step === ownerInfoStep && !isSolo401kIntakeAccount ? (
                <div className={cn('space-y-4', isTraditionalIra ? 'pt-1' : 'rounded-2xl border border-border p-4')}>
                  <h3 className={sectionHeadingClass}>Owner Information</h3>
                  {!isTraditionalIra ? (
                    <span className={stepBadgeClass}>
                      <BadgeIcon className="h-4 w-4" />
                      {accountLabel}
                    </span>
                  ) : null}

                  {isTraditionalIra ? (
                    isInheritedIraAccount ? (
                      <>
                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            Legal Name<span className="text-error">*</span>
                          </p>
                          <div className="grid gap-3 md:grid-cols-3">
                            <PlainInput value={values.firstName} onChange={(value) => setField('firstName', value)} placeholder="First name.." />
                            <PlainInput value={values.middleName} onChange={(value) => setField('middleName', value)} placeholder="Middle name.." />
                            <PlainInput value={values.lastName} onChange={(value) => setField('lastName', value)} placeholder="Last name.." />
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            Social Security #<span className="text-error">*</span>
                          </p>
                          <PlainInput value={values.ssn} onChange={(value) => setField('ssn', value)} placeholder="SSN number..." />
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Date of Birth<span className="text-error">*</span>
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="relative">
                                <select value={values.birthMonth} onChange={(event) => setField('birthMonth', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                                  <option value="">Month</option>
                                  {Array.from({ length: 12 }).map((_, index) => (
                                    <option key={index + 1} value={String(index + 1)}>
                                      {String(index + 1)}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                              </div>
                              <div className="relative">
                                <select value={values.birthDay} onChange={(event) => setField('birthDay', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                                  <option value="">Day</option>
                                  {Array.from({ length: 31 }).map((_, index) => (
                                    <option key={index + 1} value={String(index + 1)}>
                                      {String(index + 1)}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                              </div>
                              <div className="relative">
                                <select value={values.birthYear} onChange={(event) => setField('birthYear', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                                  <option value="">Year</option>
                                  {Array.from({ length: 90 }).map((_, index) => {
                                    const year = String(new Date().getFullYear() - 18 - index)
                                    return (
                                      <option key={year} value={year}>
                                        {year}
                                      </option>
                                    )
                                  })}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Date of Death<span className="text-error">*</span>
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="relative">
                                <select
                                  value={values.ownerDeathMonth}
                                  onChange={(event) => setField('ownerDeathMonth', event.target.value)}
                                  className={cn(selectClass, 'h-11 px-3 text-sm')}
                                >
                                  <option value="">Month</option>
                                  {Array.from({ length: 12 }).map((_, index) => (
                                    <option key={`death-month-${index + 1}`} value={String(index + 1)}>
                                      {String(index + 1)}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                              </div>
                              <div className="relative">
                                <select value={values.ownerDeathDay} onChange={(event) => setField('ownerDeathDay', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                                  <option value="">Day</option>
                                  {Array.from({ length: 31 }).map((_, index) => (
                                    <option key={`death-day-${index + 1}`} value={String(index + 1)}>
                                      {String(index + 1)}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                              </div>
                              <div className="relative">
                                <select
                                  value={values.ownerDeathYear}
                                  onChange={(event) => setField('ownerDeathYear', event.target.value)}
                                  className={cn(selectClass, 'h-11 px-3 text-sm')}
                                >
                                  <option value="">Year</option>
                                  {Array.from({ length: 90 }).map((_, index) => {
                                    const year = String(new Date().getFullYear() - index)
                                    return (
                                      <option key={`death-year-${year}`} value={year}>
                                        {year}
                                      </option>
                                    )
                                  })}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-[11px] text-text-muted">
                            If applicable, name of referring organization, individual or promotion code
                          </p>
                          <div className="grid gap-3 md:grid-cols-3">
                            <PlainInput
                              value={values.referralSource}
                              onChange={(value) => setField('referralSource', value)}
                              placeholder="Referral Org. or Individual..."
                            />
                            <PlainInput value={values.promoCode} onChange={(value) => setField('promoCode', value)} placeholder="Promo code..." />
                            <PlainInput
                              value={values.salesRepresentative}
                              onChange={(value) => setField('salesRepresentative', value)}
                              placeholder="Sales rep..."
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            Legal Name<span className="text-error">*</span>
                          </p>
                          <div className="grid gap-3 md:grid-cols-3">
                            <PlainInput value={values.firstName} onChange={(value) => setField('firstName', value)} placeholder="First name.." />
                            <PlainInput value={values.middleName} onChange={(value) => setField('middleName', value)} placeholder="Middle name.." />
                            <PlainInput value={values.lastName} onChange={(value) => setField('lastName', value)} placeholder="Last name.." />
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            Email Address<span className="text-error">*</span>
                          </p>
                          <PlainInput
                            type="email"
                            value={values.email}
                            onChange={(value) => setField('email', value)}
                            placeholder="Enter email address..."
                          />
                        </div>

                        <div>
                          <p className="mb-2 text-[11px] text-text-muted">
                            * if applicable, name of referring organization, individual or promotion code
                          </p>
                          <div className="grid gap-3 md:grid-cols-3">
                            <PlainInput
                              value={values.referralSource}
                              onChange={(value) => setField('referralSource', value)}
                              placeholder="Referral Org. or Individual..."
                            />
                            <PlainInput value={values.promoCode} onChange={(value) => setField('promoCode', value)} placeholder="Promo code..." />
                            <PlainInput
                              value={values.salesRepresentative}
                              onChange={(value) => setField('salesRepresentative', value)}
                              placeholder="Sales rep..."
                            />
                          </div>
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <p className="text-base text-text-secondary">
                        Enter owner information exactly as it appears on government records.
                      </p>

                      <div className="grid gap-4 md:grid-cols-3">
                        <LabeledInput
                          label="First Name"
                          required
                          value={values.firstName}
                          onChange={(value) => setField('firstName', value)}
                          placeholder="First name"
                        />
                        <LabeledInput
                          label="Middle Name"
                          value={values.middleName}
                          onChange={(value) => setField('middleName', value)}
                          placeholder="Middle name"
                        />
                        <LabeledInput
                          label="Last Name"
                          required
                          value={values.lastName}
                          onChange={(value) => setField('lastName', value)}
                          placeholder="Last name"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <LabeledInput
                          label="Date of Birth"
                          required
                          type="date"
                          value={values.dateOfBirth}
                          onChange={(value) => setField('dateOfBirth', value)}
                          placeholder="Date of birth"
                        />
                        <LabeledInput
                          label="Social Security Number"
                          required
                          value={values.ssn}
                          onChange={(value) => setField('ssn', value)}
                          placeholder="###-##-####"
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <LabeledSelect
                          label="Citizenship Status"
                          required
                          value={values.citizenship}
                          onChange={(value) => setField('citizenship', value as CitizenshipOption)}
                          options={[
                            { value: 'us-citizen', label: 'US Citizen' },
                            { value: 'permanent-resident', label: 'Permanent Resident' },
                            { value: 'non-resident', label: 'Non-Resident' },
                          ]}
                        />
                        <LabeledSelect
                          label="Marital Status"
                          required
                          value={values.maritalStatus}
                          onChange={(value) => setField('maritalStatus', value)}
                          options={[
                            { value: 'single', label: 'Single' },
                            { value: 'married', label: 'Married' },
                            { value: 'divorced', label: 'Divorced' },
                            { value: 'widowed', label: 'Widowed' },
                          ]}
                        />
                        <LabeledSelect
                          label="Employment Status"
                          required
                          value={values.employmentStatus}
                          onChange={(value) => setField('employmentStatus', value)}
                          options={[
                            { value: 'employed', label: 'Employed' },
                            { value: 'self-employed', label: 'Self-Employed' },
                            { value: 'retired', label: 'Retired' },
                            { value: 'unemployed', label: 'Unemployed' },
                          ]}
                        />
                      </div>
                    </>
                  )}

                </div>
              ) : null}

              {finalReviewStage === 'none' && isSolo401kIntakeAccount && step === soloIntakeOptionsStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>Intake Options</h3>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-text-primary">
                      Plan Set-up Option - 1 Time Fee<span className="text-error">*</span>
                    </p>
                    <p className="inline-flex items-start gap-2 text-xs text-text-secondary">
                      <ReceiptText className="mt-0.5 h-3.5 w-3.5 text-error" />
                      All accounts are required to maintain a credit/debit card at all times. Regardless of the payment type selected below,
                      any fees due today will be charged to the credit/debit card provided.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-sm text-text-primary">
                      Our plan establishment comes with IRS Approved Documents and an EIN for your new 401k plan. This service does not
                      include tax, legal, or financial advise as to plan qualification, contribution strategies, or investing. You will
                      need an accountant, attorney or advisor to assist you with these questions.
                    </p>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setField('soloPlanSetupOption', 'new-plan')}
                        className="flex w-full items-start gap-2 text-left"
                      >
                        <span
                          className={cn(
                            'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                            values.soloPlanSetupOption === 'new-plan' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.soloPlanSetupOption === 'new-plan' ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        <span>
                          <span className="block text-xl font-medium text-text-primary">$595.00</span>
                          <span className="block text-sm text-text-secondary">New Plan Establishment</span>
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setField('soloPlanSetupOption', 'restatement')}
                        className="flex w-full items-start gap-2 text-left"
                      >
                        <span
                          className={cn(
                            'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                            values.soloPlanSetupOption === 'restatement' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn('h-2.5 w-2.5 rounded-full', values.soloPlanSetupOption === 'restatement' ? 'bg-surface' : 'bg-transparent')}
                          />
                        </span>
                        <span>
                          <span className="block text-xl font-medium text-text-primary">$595.00</span>
                          <span className="block text-sm text-text-secondary">Restatement</span>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="mb-3 text-sm font-medium text-text-primary">Trust Checking Account Option</p>
                    <Checkbox
                      checked={values.soloTrustCheckingAuthorization}
                      onCheckedChange={(checked) => setField('soloTrustCheckingAuthorization', checked)}
                      label="I authorize Directed Trust Company to share my Solo 401(k) Plan Information with Titan Bank, N.A. to facilitate the process of opening a new Solo 401(k) Trust Checking Account application."
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] text-text-muted">
                      If applicable, name of referring organization, individual or promotion code
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <PlainInput value={values.referralSource} onChange={(value) => setField('referralSource', value)} placeholder="Referral Org. or Individual..." />
                      <PlainInput value={values.promoCode} onChange={(value) => setField('promoCode', value)} placeholder="Promo code..." />
                      <PlainInput value={values.salesRepresentative} onChange={(value) => setField('salesRepresentative', value)} placeholder="Sales rep..." />
                    </div>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isSolo401kIntakeAccount && step === soloParticipantsStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>Add Participants Information</h3>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Will participant 1 be a Trustee?<span className="text-error">*</span>
                    </p>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setField('soloParticipantTrustee', 'yes')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-4 w-4 place-items-center rounded-full border',
                            values.soloParticipantTrustee === 'yes' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span className={cn('h-1.5 w-1.5 rounded-full', values.soloParticipantTrustee === 'yes' ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('soloParticipantTrustee', 'no')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-4 w-4 place-items-center rounded-full border',
                            values.soloParticipantTrustee === 'no' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span className={cn('h-1.5 w-1.5 rounded-full', values.soloParticipantTrustee === 'no' ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        No
                      </button>
                    </div>
                  </div>

                  {values.soloParticipantTrustee === 'yes' ? (
                    <>
                      {soloParticipants.map((participant, participantIndex) => (
                        <div key={participant.id} className="space-y-4 border-t border-border pt-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-text-primary">Participant {participantIndex + 1}</p>
                            {participantIndex > 0 ? (
                              <button
                                type="button"
                                onClick={() => removeSoloParticipant(participant.id)}
                                className="inline-flex items-center gap-1 text-xs font-medium text-error"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Remove
                              </button>
                            ) : null}
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Legal Name<span className="text-error">*</span>
                            </p>
                            <div className="grid gap-3 md:grid-cols-3">
                              <PlainInput value={participant.firstName} onChange={(value) => setSoloParticipantField(participant.id, 'firstName', value)} placeholder="First name.." />
                              <PlainInput value={participant.middleName} onChange={(value) => setSoloParticipantField(participant.id, 'middleName', value)} placeholder="Middle name.." />
                              <PlainInput value={participant.lastName} onChange={(value) => setSoloParticipantField(participant.id, 'lastName', value)} placeholder="Last name.." />
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Physical/Residential Address<span className="text-error">*</span>
                            </p>
                            <div className="relative">
                              <PlainInput value={participant.address} onChange={(value) => setSoloParticipantField(participant.id, 'address', value)} placeholder="Search address..." />
                              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-2">
                            <div>
                              <p className="mb-2 text-xs font-medium text-text-secondary">Primary Phone</p>
                              <PlainInput
                                value={participant.primaryPhone}
                                onChange={(value) => setSoloParticipantField(participant.id, 'primaryPhone', value)}
                                placeholder="(0) - 000 - 000"
                              />
                            </div>
                            <div>
                              <p className="mb-2 text-xs font-medium text-text-secondary">Secondary Phone</p>
                              <PlainInput
                                value={participant.secondaryPhone}
                                onChange={(value) => setSoloParticipantField(participant.id, 'secondaryPhone', value)}
                                placeholder="(0) - 000 - 000"
                              />
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Email<span className="text-error">*</span>
                            </p>
                            <PlainInput
                              type="email"
                              value={participant.email}
                              onChange={(value) => setSoloParticipantField(participant.id, 'email', value)}
                              placeholder="Enter your email"
                            />
                          </div>

                          <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
                            <div>
                              <p className="mb-2 text-xs font-medium text-text-secondary">
                                Social Security #<span className="text-error">*</span>
                              </p>
                              <PlainInput value={participant.ssn} onChange={(value) => setSoloParticipantField(participant.id, 'ssn', value)} placeholder="SSN number..." />
                            </div>
                            <div>
                              <p className="mb-2 text-xs font-medium text-text-secondary">
                                Date of Birth<span className="text-error">*</span>
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="relative">
                                  <select value={participant.birthMonth} onChange={(event) => setSoloParticipantField(participant.id, 'birthMonth', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                                    <option value="">Month</option>
                                    {Array.from({ length: 12 }).map((_, index) => (
                                      <option key={`solo-participant-month-${participant.id}-${index + 1}`} value={String(index + 1)}>
                                        {String(index + 1)}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                                </div>
                                <div className="relative">
                                  <select value={participant.birthDay} onChange={(event) => setSoloParticipantField(participant.id, 'birthDay', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                                    <option value="">Day</option>
                                    {Array.from({ length: 31 }).map((_, index) => (
                                      <option key={`solo-participant-day-${participant.id}-${index + 1}`} value={String(index + 1)}>
                                        {String(index + 1)}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                                </div>
                                <div className="relative">
                                  <select value={participant.birthYear} onChange={(event) => setSoloParticipantField(participant.id, 'birthYear', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                                    <option value="">Year</option>
                                    {Array.from({ length: 90 }).map((_, index) => {
                                      const year = String(new Date().getFullYear() - 18 - index)
                                      return (
                                        <option key={`solo-participant-year-${participant.id}-${year}`} value={year}>
                                          {year}
                                        </option>
                                      )
                                    })}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 rounded-xl border border-border p-4">
                            <p className="text-xs text-text-secondary">
                              Our Solo 401(k) Plans allow for Traditional and Roth components. Please advise which components this participant will establish<span className="text-error">*</span>
                            </p>
                            <Checkbox
                              checked={participant.traditionalAccount}
                              onCheckedChange={(checked) => setSoloParticipantField(participant.id, 'traditionalAccount', checked)}
                              label="Traditional Account"
                            />
                            <Checkbox
                              checked={participant.rothAccount}
                              onCheckedChange={(checked) => setSoloParticipantField(participant.id, 'rothAccount', checked)}
                              label="Roth Account"
                            />
                            <Checkbox
                              checked={participant.afterTaxAccount}
                              onCheckedChange={(checked) => setSoloParticipantField(participant.id, 'afterTaxAccount', checked)}
                              label="After-Tax Account"
                            />
                          </div>
                        </div>
                      ))}

                      <button type="button" onClick={addSoloParticipant} className="inline-flex items-center gap-1 text-xs font-medium text-error">
                        <span>+</span>
                        Add Participant
                      </button>
                    </>
                  ) : null}
                </div>
              ) : null}

              {finalReviewStage === 'none' && isSolo401kIntakeAccount && step === soloEmployerInformationStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>Add Employer Information</h3>

                  <p className="inline-flex items-start gap-2 text-xs text-text-secondary">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 text-error" />
                    The Company adopting the Solo 401(k) plan must be an established, and operational business.
                  </p>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Adopting Company Name<span className="text-error">*</span>
                      </p>
                      <PlainInput value={values.soloEmployerCompanyName} onChange={(value) => setField('soloEmployerCompanyName', value)} placeholder="Company name" />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        EIN<span className="text-error">*</span>
                      </p>
                      <PlainInput value={values.soloEmployerEin} onChange={(value) => setField('soloEmployerEin', value)} placeholder="EIN" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Type of Entity<span className="text-error">*</span>
                    </p>
                    <div className="space-y-2">
                      {([
                        { value: 's-corp', label: 'S-Corporation' },
                        { value: 'llc-s-election', label: 'LLC (with S-Election)' },
                        { value: 'llc', label: 'LLC' },
                        { value: 'sole-proprietorship', label: 'Sole Proprietorship' },
                        { value: 'c-corp', label: 'C-Corporation' },
                      ] as const).map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setField('soloEmployerEntityType', option.value)}
                          className="flex items-center gap-2 text-sm text-text-primary"
                        >
                          <span
                            className={cn(
                              'grid h-4 w-4 place-items-center rounded-full border',
                              values.soloEmployerEntityType === option.value ? 'border-error bg-error' : 'border-border bg-surface',
                            )}
                          >
                            <span
                              className={cn(
                                'h-1.5 w-1.5 rounded-full',
                                values.soloEmployerEntityType === option.value ? 'bg-surface' : 'bg-transparent',
                              )}
                            />
                          </span>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Company Address<span className="text-error">*</span>
                    </p>
                    <div className="relative">
                      <PlainInput value={values.soloEmployerAddress} onChange={(value) => setField('soloEmployerAddress', value)} placeholder="Search address..." />
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Company Phone<span className="text-error">*</span>
                      </p>
                      <PlainInput value={values.soloEmployerPhone} onChange={(value) => setField('soloEmployerPhone', value)} placeholder="Enter company phone" />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Established Entity State<span className="text-error">*</span>
                      </p>
                      <div className="relative">
                        <PlainInput value={values.soloEmployerEstablishedState} onChange={(value) => setField('soloEmployerEstablishedState', value)} placeholder="State when entity was established" />
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Company Line of Business<span className="text-error">*</span>
                    </p>
                    <div className="relative">
                      <PlainInput value={values.soloEmployerLineOfBusiness} onChange={(value) => setField('soloEmployerLineOfBusiness', value)} placeholder="Line of business" />
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Who are owner/business partner of the Company?<span className="text-error">*</span>
                    </p>
                    <div className="relative">
                      <PlainInput value={values.soloEmployerOwnerPartner} onChange={(value) => setField('soloEmployerOwnerPartner', value)} placeholder="Company owner/partner" />
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Number of employees, other than company owner/business partners?<span className="text-error">*</span>
                    </p>
                    <div className="relative">
                      <PlainInput value={values.soloEmployerEmployeeCount} onChange={(value) => setField('soloEmployerEmployeeCount', value)} placeholder="Company employees" />
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Do owner/business partners have ownership in any other company?<span className="text-error">*</span>
                    </p>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setField('soloEmployerHasOwnershipOtherCompany', 'yes')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-4 w-4 place-items-center rounded-full border',
                            values.soloEmployerHasOwnershipOtherCompany === 'yes' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              values.soloEmployerHasOwnershipOtherCompany === 'yes' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('soloEmployerHasOwnershipOtherCompany', 'no')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-4 w-4 place-items-center rounded-full border',
                            values.soloEmployerHasOwnershipOtherCompany === 'no' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              values.soloEmployerHasOwnershipOtherCompany === 'no' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        No
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isInheritedIraAccount && step === inheritedEstablishingStep ? (
                <div className="space-y-4 pt-1">
                  <h3 className={sectionHeadingClass}>Individual Establishing Account</h3>

                  <div className="space-y-3 rounded-xl border border-border p-4">
                    <p className="text-xs font-medium text-text-secondary">
                      Type of Account<span className="text-error">*</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setField('inheritedSetupType', 'new')}
                      className="flex items-start gap-2 text-left text-sm text-text-primary"
                    >
                      <span
                        className={cn(
                          'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                          values.inheritedSetupType === 'new' ? 'border-error bg-error' : 'border-border bg-surface',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.inheritedSetupType === 'new' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      {`Establish a brand-new ${inheritedAccountDisplayName}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setField('inheritedSetupType', 'transfer')}
                      className="flex items-start gap-2 text-left text-sm text-text-primary"
                    >
                      <span
                        className={cn(
                          'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                          values.inheritedSetupType === 'transfer' ? 'border-error bg-error' : 'border-border bg-surface',
                        )}
                      >
                        <span
                          className={cn('h-2.5 w-2.5 rounded-full', values.inheritedSetupType === 'transfer' ? 'bg-surface' : 'bg-transparent')}
                        />
                      </span>
                      {`Transfer from an existing ${inheritedAccountDisplayName}`}
                    </button>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Legal Name<span className="text-error">*</span>
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <PlainInput value={values.inheritedFirstName} onChange={(value) => setField('inheritedFirstName', value)} placeholder="First name.." />
                      <PlainInput value={values.inheritedMiddleName} onChange={(value) => setField('inheritedMiddleName', value)} placeholder="Middle name.." />
                      <PlainInput value={values.inheritedLastName} onChange={(value) => setField('inheritedLastName', value)} placeholder="Last name.." />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1.3fr_1fr]">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Social Security #<span className="text-error">*</span>
                      </p>
                      <PlainInput value={values.inheritedSsn} onChange={(value) => setField('inheritedSsn', value)} placeholder="SSN number..." />
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Date of Birth<span className="text-error">*</span>
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="relative">
                          <select
                            value={values.inheritedBirthMonth}
                            onChange={(event) => setField('inheritedBirthMonth', event.target.value)}
                            className={cn(selectClass, 'h-11 px-3 text-sm')}
                          >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }).map((_, index) => (
                              <option key={`inherited-month-${index + 1}`} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select
                            value={values.inheritedBirthDay}
                            onChange={(event) => setField('inheritedBirthDay', event.target.value)}
                            className={cn(selectClass, 'h-11 px-3 text-sm')}
                          >
                            <option value="">Day</option>
                            {Array.from({ length: 31 }).map((_, index) => (
                              <option key={`inherited-day-${index + 1}`} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select
                            value={values.inheritedBirthYear}
                            onChange={(event) => setField('inheritedBirthYear', event.target.value)}
                            className={cn(selectClass, 'h-11 px-3 text-sm')}
                          >
                            <option value="">Year</option>
                            {Array.from({ length: 90 }).map((_, index) => {
                              const year = String(new Date().getFullYear() - 18 - index)
                              return (
                                <option key={`inherited-year-${year}`} value={year}>
                                  {year}
                                </option>
                              )
                            })}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Gender<span className="text-error">*</span>
                      </p>
                      <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
                        <button
                          type="button"
                          onClick={() => setField('inheritedGender', 'male')}
                          className={cn(
                            'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                            values.inheritedGender === 'male' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                          )}
                        >
                          <Mars className="h-3.5 w-3.5" />
                          Male
                        </button>
                        <button
                          type="button"
                          onClick={() => setField('inheritedGender', 'female')}
                          className={cn(
                            'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                            values.inheritedGender === 'female' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                          )}
                        >
                          <Venus className="h-3.5 w-3.5" />
                          Female
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Citizenship<span className="text-error">*</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setField('inheritedCitizenship', 'us')}
                          className={cn(
                            'inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs',
                            values.inheritedCitizenship === 'us'
                              ? 'border-text-primary bg-surface text-text-primary'
                              : 'border-border bg-slate-50 text-text-secondary',
                          )}
                        >
                          United States
                        </button>
                        <button
                          type="button"
                          onClick={() => setField('inheritedCitizenship', 'other')}
                          className={cn(
                            'inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs',
                            values.inheritedCitizenship === 'other'
                              ? 'border-text-primary bg-surface text-text-primary'
                              : 'border-border bg-slate-50 text-text-secondary',
                          )}
                        >
                          Other
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Relation to Deceased Owner<span className="text-error">*</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {([
                        { value: 'spouse', label: 'Spouse', icon: User },
                        { value: 'non-spouse', label: 'Non Spouse', icon: Users },
                        { value: 'trust', label: 'Trust', icon: ReceiptText },
                      ] as const).map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setField('inheritedRelationToDeceasedOwner', option.value)}
                          className={cn(
                            'inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs',
                            values.inheritedRelationToDeceasedOwner === option.value
                              ? 'border-text-primary bg-surface text-text-primary'
                              : 'border-border bg-slate-50 text-text-secondary',
                          )}
                        >
                          <option.icon className="h-3.5 w-3.5" />
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <button type="button" onClick={() => setStep(beneficiaryStep)} className="inline-flex items-center gap-1 text-sm font-medium text-error">
                      <span>+</span>
                      Add Beneficiaries
                    </button>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && step === ownerContactStep && !isSolo401kIntakeAccount ? (
                <div className={cn('space-y-4', isTraditionalIra ? 'pt-1' : 'rounded-2xl border border-border p-4')}>
                  <h3 className={sectionHeadingClass}>
                    {isRothIraKidsAccount
                      ? 'Owner Contact Information'
                      : isRothConversionAccount
                        ? 'Owner Contact Information'
                        : isRetireCustodyAccount
                          ? 'Owner Contact Information'
                        : isBackdoorRothStrategyAccount
                          ? 'Owner Contact Information'
                        : isInheritedIraAccount
                          ? 'Contact Info'
                          : 'Contact Information'}
                  </h3>
                  {!isTraditionalIra ? (
                    <span className={stepBadgeClass}>
                      <BadgeIcon className="h-4 w-4" />
                      {accountLabel}
                    </span>
                  ) : null}

                  {isTraditionalIra ? (
                    <>
                      <div>
                        <p className="mb-2 text-xs font-medium text-text-secondary">
                          Physical/Residential Address<span className="text-error">*</span>
                        </p>
                        <div className="relative">
                          <PlainInput
                            value={values.physicalResidentialAddress}
                            onChange={(value) => setField('physicalResidentialAddress', value)}
                            placeholder="Search address..."
                          />
                          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-medium text-text-secondary">
                          Primary Phone<span className="text-error">*</span>
                        </p>
                        <div className="flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-2">
                          {(['cell', 'home', 'business'] as const).map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setField('primaryPhoneType', type)}
                              className={cn(
                                'h-8 rounded-full px-3 text-xs',
                                values.primaryPhoneType === type
                                  ? 'border border-border bg-slate-50 font-medium text-text-primary'
                                  : 'text-text-muted',
                              )}
                            >
                              {type === 'cell' ? 'Cell' : type === 'home' ? 'Home' : 'Business'}
                            </button>
                          ))}
                          <input
                            type="tel"
                            className="h-full flex-1 bg-transparent px-1 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                            value={values.primaryPhoneNumber}
                            onChange={(event) => setField('primaryPhoneNumber', event.target.value)}
                            placeholder="(0) - 000 - 000"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setField('showSecondaryPhone', !values.showSecondaryPhone)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-error"
                      >
                        <span>{values.showSecondaryPhone ? '-' : '+'}</span>
                        {values.showSecondaryPhone ? 'Hide Secondary Phone' : 'Add Secondary Phone'}
                      </button>

                      {values.showSecondaryPhone ? (
                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">Secondary Phone</p>
                          <div className="flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-2">
                            {(['cell', 'home', 'business'] as const).map((type) => (
                              <button
                                key={`secondary-${type}`}
                                type="button"
                                onClick={() => setField('secondaryPhoneType', type)}
                                className={cn(
                                  'h-8 rounded-full px-3 text-xs',
                                  values.secondaryPhoneType === type
                                    ? 'border border-border bg-slate-50 font-medium text-text-primary'
                                    : 'text-text-muted',
                                )}
                              >
                                {type === 'cell' ? 'Cell' : type === 'home' ? 'Home' : 'Business'}
                              </button>
                            ))}
                            <input
                              type="tel"
                              className="h-full flex-1 bg-transparent px-1 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                              value={values.secondaryPhoneNumber}
                              onChange={(event) => setField('secondaryPhoneNumber', event.target.value)}
                              placeholder="(0) - 000 - 000"
                            />
                          </div>
                        </div>
                      ) : null}

                      <div className="grid gap-3 md:grid-cols-[1.2fr_1.2fr]">
                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            Social Security #<span className="text-error">*</span>
                          </p>
                          <PlainInput value={values.ssn} onChange={(value) => setField('ssn', value)} placeholder="SSN number..." />
                        </div>

                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            Date of Birth<span className="text-error">*</span>
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="relative">
                              <select
                                value={values.birthMonth}
                                onChange={(event) => setField('birthMonth', event.target.value)}
                                className={cn(selectClass, 'h-11 px-3 text-sm')}
                              >
                                <option value="">Month</option>
                                {Array.from({ length: 12 }).map((_, index) => (
                                  <option key={index + 1} value={String(index + 1)}>
                                    {String(index + 1)}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                            </div>
                            <div className="relative">
                              <select
                                value={values.birthDay}
                                onChange={(event) => setField('birthDay', event.target.value)}
                                className={cn(selectClass, 'h-11 px-3 text-sm')}
                              >
                                <option value="">Day</option>
                                {Array.from({ length: 31 }).map((_, index) => (
                                  <option key={index + 1} value={String(index + 1)}>
                                    {String(index + 1)}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                            </div>
                            <div className="relative">
                              <select
                                value={values.birthYear}
                                onChange={(event) => setField('birthYear', event.target.value)}
                                className={cn(selectClass, 'h-11 px-3 text-sm')}
                              >
                                <option value="">Year</option>
                                {Array.from({ length: 90 }).map((_, index) => {
                                  const year = String(new Date().getFullYear() - 18 - index)
                                  return (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  )
                                })}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-medium text-text-secondary">
                          Gender<span className="text-error">*</span>
                        </p>
                        <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
                          <button
                            type="button"
                            onClick={() => setField('gender', 'male')}
                            className={cn(
                              'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                              values.gender === 'male' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                            )}
                          >
                            <Mars className="h-3.5 w-3.5" />
                            Male
                          </button>
                          <button
                            type="button"
                            onClick={() => setField('gender', 'female')}
                            className={cn(
                              'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                              values.gender === 'female' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                            )}
                          >
                            <Venus className="h-3.5 w-3.5" />
                            Female
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-border pt-3">
                        <button
                          type="button"
                          onClick={() => setField('showAlternativeMailingAddress', !values.showAlternativeMailingAddress)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-error"
                        >
                          <span>{values.showAlternativeMailingAddress ? '-' : '+'}</span>
                          {values.showAlternativeMailingAddress ? 'Hide Alternative Mailing Address' : 'Add Alternative Mailing Address'}
                        </button>
                      </div>

                      {values.showAlternativeMailingAddress ? (
                        <div className="space-y-3">
                          <p className="text-xs font-medium text-text-secondary">Alternative Mailing Address</p>
                          <div className="relative">
                            <PlainInput
                              value={values.alternativeMailingStreet}
                              onChange={(value) => setField('alternativeMailingStreet', value)}
                              placeholder="Search address..."
                            />
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                          </div>
                          <div className="grid gap-3 md:grid-cols-3">
                            <PlainInput
                              value={values.alternativeMailingCity}
                              onChange={(value) => setField('alternativeMailingCity', value)}
                              placeholder="City"
                            />
                            <PlainInput
                              value={values.alternativeMailingState}
                              onChange={(value) => setField('alternativeMailingState', value)}
                              placeholder="State"
                            />
                            <PlainInput
                              value={values.alternativeMailingZip}
                              onChange={(value) => setField('alternativeMailingZip', value)}
                              placeholder="ZIP"
                            />
                          </div>
                          <PlainInput
                            value={values.alternativeMailingAddress2}
                            onChange={(value) => setField('alternativeMailingAddress2', value)}
                            placeholder="Address line 2..."
                          />
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      <LabeledInput
                        label="Email Address"
                        required
                        type="email"
                        value={values.email}
                        onChange={(value) => setField('email', value)}
                        placeholder="name@email.com"
                      />
                      <LabeledInput
                        label="Phone Number"
                        required
                        type="tel"
                        value={values.phone}
                        onChange={(value) => setField('phone', value)}
                        placeholder="(000) 000-0000"
                      />
                    </div>
                  )}

                  {!isTraditionalIra ? (
                    <>
                      <div className="border-t border-border pt-4">
                        <h4 className="mb-4 text-base font-semibold text-text-primary">Mailing Address</h4>
                        <div className="space-y-4">
                          <LabeledInput
                            label="Street Address"
                            required
                            value={values.mailingStreet}
                            onChange={(value) => setField('mailingStreet', value)}
                            placeholder="Street address"
                          />
                          <LabeledInput
                            label="Address Line 2"
                            value={values.mailingAddress2}
                            onChange={(value) => setField('mailingAddress2', value)}
                            placeholder="Apartment, suite, etc."
                          />
                          <div className="grid gap-4 md:grid-cols-3">
                            <LabeledInput
                              label="City"
                              required
                              value={values.mailingCity}
                              onChange={(value) => setField('mailingCity', value)}
                              placeholder="City"
                            />
                            <LabeledInput
                              label="State"
                              required
                              value={values.mailingState}
                              onChange={(value) => setField('mailingState', value)}
                              placeholder="State"
                            />
                            <LabeledInput
                              label="ZIP Code"
                              required
                              value={values.mailingZip}
                              onChange={(value) => setField('mailingZip', value)}
                              placeholder="ZIP"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-1">
                        <Checkbox
                          checked={values.sameAsPhysicalAddress}
                          onCheckedChange={(checked) => setField('sameAsPhysicalAddress', checked)}
                          label="Physical address is the same as mailing address"
                        />
                      </div>
                    </>
                  ) : null}

                </div>
              ) : null}

              {finalReviewStage === 'none' && isRothIraKidsAccount && step === individualEstablishingStep ? (
                <div className="space-y-4 pt-1">
                  <h3 className={sectionHeadingClass}>Individual Establishing Account</h3>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Legal Name<span className="text-error">*</span>
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <PlainInput value={values.kidFirstName} onChange={(value) => setField('kidFirstName', value)} placeholder="First name.." />
                      <PlainInput value={values.kidMiddleName} onChange={(value) => setField('kidMiddleName', value)} placeholder="Middle name.." />
                      <PlainInput value={values.kidLastName} onChange={(value) => setField('kidLastName', value)} placeholder="Last name.." />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1.3fr_1fr]">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Social Security #<span className="text-error">*</span>
                      </p>
                      <PlainInput value={values.kidSsn} onChange={(value) => setField('kidSsn', value)} placeholder="SSN number..." />
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Date of Birth<span className="text-error">*</span>
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="relative">
                          <select
                            value={values.kidBirthMonth}
                            onChange={(event) => setField('kidBirthMonth', event.target.value)}
                            className={cn(selectClass, 'h-11 px-3 text-sm')}
                          >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }).map((_, index) => (
                              <option key={index + 1} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select
                            value={values.kidBirthDay}
                            onChange={(event) => setField('kidBirthDay', event.target.value)}
                            className={cn(selectClass, 'h-11 px-3 text-sm')}
                          >
                            <option value="">Day</option>
                            {Array.from({ length: 31 }).map((_, index) => (
                              <option key={index + 1} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select
                            value={values.kidBirthYear}
                            onChange={(event) => setField('kidBirthYear', event.target.value)}
                            className={cn(selectClass, 'h-11 px-3 text-sm')}
                          >
                            <option value="">Year</option>
                            {Array.from({ length: 30 }).map((_, index) => {
                              const year = String(new Date().getFullYear() - 1 - index)
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              )
                            })}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Gender<span className="text-error">*</span>
                      </p>
                      <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
                        <button
                          type="button"
                          onClick={() => setField('kidGender', 'male')}
                          className={cn(
                            'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                            values.kidGender === 'male' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                          )}
                        >
                          <Mars className="h-3.5 w-3.5" />
                          Male
                        </button>
                        <button
                          type="button"
                          onClick={() => setField('kidGender', 'female')}
                          className={cn(
                            'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                            values.kidGender === 'female' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                          )}
                        >
                          <Venus className="h-3.5 w-3.5" />
                          Female
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Citizenship<span className="text-error">*</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setField('kidCitizenship', 'us')}
                          className={cn(
                            'inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs',
                            values.kidCitizenship === 'us'
                              ? 'border-text-primary bg-surface text-text-primary'
                              : 'border-border bg-slate-50 text-text-secondary',
                          )}
                        >
                          United States
                        </button>
                        <button
                          type="button"
                          onClick={() => setField('kidCitizenship', 'other')}
                          className={cn(
                            'inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs',
                            values.kidCitizenship === 'other'
                              ? 'border-text-primary bg-surface text-text-primary'
                              : 'border-border bg-slate-50 text-text-secondary',
                          )}
                        >
                          Other
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isRothIraKidsAccount && step === contactInfoStep ? (
                <div className="space-y-4 pt-1">
                  <h3 className={sectionHeadingClass}>Contact Info</h3>

                  <Checkbox
                    checked={values.kidContactSameAsParent}
                    onCheckedChange={(checked) => setField('kidContactSameAsParent', checked)}
                    label="Same as Parent / Guardian's Name"
                  />

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Physical/Residential Address<span className="text-error">*</span>
                    </p>
                    <div className="relative">
                      <PlainInput
                        value={values.kidPhysicalResidentialAddress}
                        onChange={(value) => setField('kidPhysicalResidentialAddress', value)}
                        placeholder="Search address.."
                      />
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isCoverdellAccount && step === individualEstablishingStep ? (
                <div className="space-y-4 pt-1">
                  <h3 className={sectionHeadingClass}>Individual Establishing Account</h3>

                  <div className="space-y-3 rounded-xl border border-border p-4">
                    <p className="text-xs text-text-secondary">Please select one</p>
                    <button
                      type="button"
                      onClick={() => setField('coverdellEsaType', 'new')}
                      className="flex items-start gap-2 text-left text-sm text-text-primary"
                    >
                      <span
                        className={cn(
                          'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                          values.coverdellEsaType === 'new' ? 'border-error bg-error' : 'border-border bg-surface',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.coverdellEsaType === 'new' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      This is a new Coverdell ESA for a Designated Beneficiary that is under age 18.
                    </button>
                    <button
                      type="button"
                      onClick={() => setField('coverdellEsaType', 'transfer')}
                      className="flex items-start gap-2 text-left text-sm text-text-primary"
                    >
                      <span
                        className={cn(
                          'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                          values.coverdellEsaType === 'transfer' ? 'border-error bg-error' : 'border-border bg-surface',
                        )}
                      >
                        <span
                          className={cn('h-2.5 w-2.5 rounded-full', values.coverdellEsaType === 'transfer' ? 'bg-surface' : 'bg-transparent')}
                        />
                      </span>
                      This is transfer from Existing Coverdell ESA that was established when the designated beneficiary was under age of 18.
                    </button>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Legal Name<span className="text-error">*</span>
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <PlainInput
                        value={values.coverdellFirstName}
                        onChange={(value) => setField('coverdellFirstName', value)}
                        placeholder="First name.."
                      />
                      <PlainInput
                        value={values.coverdellMiddleName}
                        onChange={(value) => setField('coverdellMiddleName', value)}
                        placeholder="Middle name.."
                      />
                      <PlainInput value={values.coverdellLastName} onChange={(value) => setField('coverdellLastName', value)} placeholder="Last name.." />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1.3fr_1fr]">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Social Security #<span className="text-error">*</span>
                      </p>
                      <PlainInput value={values.coverdellSsn} onChange={(value) => setField('coverdellSsn', value)} placeholder="SSN number..." />
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Date of Birth<span className="text-error">*</span>
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="relative">
                          <select
                            value={values.coverdellBirthMonth}
                            onChange={(event) => setField('coverdellBirthMonth', event.target.value)}
                            className={cn(selectClass, 'h-11 px-3 text-sm')}
                          >
                            <option value="">Month</option>
                            {Array.from({ length: 12 }).map((_, index) => (
                              <option key={index + 1} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select
                            value={values.coverdellBirthDay}
                            onChange={(event) => setField('coverdellBirthDay', event.target.value)}
                            className={cn(selectClass, 'h-11 px-3 text-sm')}
                          >
                            <option value="">Day</option>
                            {Array.from({ length: 31 }).map((_, index) => (
                              <option key={index + 1} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select
                            value={values.coverdellBirthYear}
                            onChange={(event) => setField('coverdellBirthYear', event.target.value)}
                            className={cn(selectClass, 'h-11 px-3 text-sm')}
                          >
                            <option value="">Year</option>
                            {Array.from({ length: 30 }).map((_, index) => {
                              const year = String(new Date().getFullYear() - 1 - index)
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              )
                            })}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Gender<span className="text-error">*</span>
                      </p>
                      <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
                        <button
                          type="button"
                          onClick={() => setField('coverdellGender', 'male')}
                          className={cn(
                            'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                            values.coverdellGender === 'male' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                          )}
                        >
                          <Mars className="h-3.5 w-3.5" />
                          Male
                        </button>
                        <button
                          type="button"
                          onClick={() => setField('coverdellGender', 'female')}
                          className={cn(
                            'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                            values.coverdellGender === 'female' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                          )}
                        >
                          <Venus className="h-3.5 w-3.5" />
                          Female
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Citizenship<span className="text-error">*</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setField('coverdellCitizenship', 'us')}
                          className={cn(
                            'inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs',
                            values.coverdellCitizenship === 'us'
                              ? 'border-text-primary bg-surface text-text-primary'
                              : 'border-border bg-slate-50 text-text-secondary',
                          )}
                        >
                          United States
                        </button>
                        <button
                          type="button"
                          onClick={() => setField('coverdellCitizenship', 'other')}
                          className={cn(
                            'inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs',
                            values.coverdellCitizenship === 'other'
                              ? 'border-text-primary bg-surface text-text-primary'
                              : 'border-border bg-slate-50 text-text-secondary',
                          )}
                        >
                          Other
                        </button>
                      </div>
                    </div>
                  </div>

                  <button type="button" onClick={() => setStep(beneficiaryStep)} className="inline-flex items-center gap-1 text-sm font-medium text-error">
                    <span>+</span>
                    Add Beneficiaries
                  </button>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isCoverdellAccount && step === contactInfoStep ? (
                <div className="space-y-4 pt-1">
                  <h3 className={sectionHeadingClass}>Contact Info</h3>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Physical/Residential Address<span className="text-error">*</span>
                    </p>
                    <div className="relative">
                      <PlainInput
                        value={values.physicalResidentialAddress}
                        onChange={(value) => setField('physicalResidentialAddress', value)}
                        placeholder="Search address..."
                      />
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Primary Phone<span className="text-error">*</span>
                    </p>
                    <div className="flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-2">
                      {(['cell', 'home', 'business'] as const).map((type) => (
                        <button
                          key={`coverdell-${type}`}
                          type="button"
                          onClick={() => setField('primaryPhoneType', type)}
                          className={cn(
                            'h-8 rounded-full px-3 text-xs',
                            values.primaryPhoneType === type ? 'border border-border bg-slate-50 font-medium text-text-primary' : 'text-text-muted',
                          )}
                        >
                          {type === 'cell' ? 'Cell' : type === 'home' ? 'Home' : 'Business'}
                        </button>
                      ))}
                      <input
                        type="tel"
                        className="h-full flex-1 bg-transparent px-1 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                        value={values.primaryPhoneNumber}
                        onChange={(event) => setField('primaryPhoneNumber', event.target.value)}
                        placeholder="(0) - 000 - 000"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setField('showSecondaryPhone', !values.showSecondaryPhone)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-error"
                  >
                    <span>{values.showSecondaryPhone ? '-' : '+'}</span>
                    {values.showSecondaryPhone ? 'Hide Secondary Phone' : 'Add Secondary Phone'}
                  </button>

                  {values.showSecondaryPhone ? (
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">Secondary Phone</p>
                      <div className="flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-2">
                        {(['cell', 'home', 'business'] as const).map((type) => (
                          <button
                            key={`coverdell-secondary-${type}`}
                            type="button"
                            onClick={() => setField('secondaryPhoneType', type)}
                            className={cn(
                              'h-8 rounded-full px-3 text-xs',
                              values.secondaryPhoneType === type ? 'border border-border bg-slate-50 font-medium text-text-primary' : 'text-text-muted',
                            )}
                          >
                            {type === 'cell' ? 'Cell' : type === 'home' ? 'Home' : 'Business'}
                          </button>
                        ))}
                        <input
                          type="tel"
                          className="h-full flex-1 bg-transparent px-1 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                          value={values.secondaryPhoneNumber}
                          onChange={(event) => setField('secondaryPhoneNumber', event.target.value)}
                          placeholder="(0) - 000 - 000"
                        />
                      </div>
                    </div>
                  ) : null}

                  <div className="grid gap-3 md:grid-cols-[1.2fr_1.2fr]">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Social Security #<span className="text-error">*</span>
                      </p>
                      <PlainInput value={values.ssn} onChange={(value) => setField('ssn', value)} placeholder="SSN number..." />
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Date of Birth<span className="text-error">*</span>
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="relative">
                          <select value={values.birthMonth} onChange={(event) => setField('birthMonth', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                            <option value="">Month</option>
                            {Array.from({ length: 12 }).map((_, index) => (
                              <option key={index + 1} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select value={values.birthDay} onChange={(event) => setField('birthDay', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                            <option value="">Day</option>
                            {Array.from({ length: 31 }).map((_, index) => (
                              <option key={index + 1} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select value={values.birthYear} onChange={(event) => setField('birthYear', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                            <option value="">Year</option>
                            {Array.from({ length: 90 }).map((_, index) => {
                              const year = String(new Date().getFullYear() - 18 - index)
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              )
                            })}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Gender<span className="text-error">*</span>
                    </p>
                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
                      <button
                        type="button"
                        onClick={() => setField('gender', 'male')}
                        className={cn(
                          'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                          values.gender === 'male' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                        )}
                      >
                        <Mars className="h-3.5 w-3.5" />
                        Male
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('gender', 'female')}
                        className={cn(
                          'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs',
                          values.gender === 'female' ? 'border border-border bg-surface text-text-primary' : 'text-text-secondary',
                        )}
                      >
                        <Venus className="h-3.5 w-3.5" />
                        Female
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Email<span className="text-error">*</span>
                    </p>
                    <PlainInput type="email" value={values.email} onChange={(value) => setField('email', value)} placeholder="Enter your email" />
                  </div>

                  <div className="border-t border-border pt-3">
                    <button
                      type="button"
                      onClick={() => setField('showAlternativeMailingAddress', !values.showAlternativeMailingAddress)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-error"
                    >
                      <span>{values.showAlternativeMailingAddress ? '-' : '+'}</span>
                      {values.showAlternativeMailingAddress ? 'Hide Alternative Mailing Address' : 'Add Alternative Mailing Address'}
                    </button>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isCoverdellAccount && step === successorStep ? (
                <div className="space-y-4 pt-1">
                  <h3 className={sectionHeadingClass}>Successor Info</h3>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Legal Name<span className="text-error">*</span>
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                      <PlainInput value={values.successorFirstName} onChange={(value) => setField('successorFirstName', value)} placeholder="First name.." />
                      <PlainInput value={values.successorMiddleName} onChange={(value) => setField('successorMiddleName', value)} placeholder="Middle name.." />
                      <PlainInput value={values.successorLastName} onChange={(value) => setField('successorLastName', value)} placeholder="Last name.." />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1.3fr_1fr]">
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Social Security #<span className="text-error">*</span>
                      </p>
                      <PlainInput value={values.successorSsn} onChange={(value) => setField('successorSsn', value)} placeholder="SSN number..." />
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium text-text-secondary">
                        Date of Birth<span className="text-error">*</span>
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="relative">
                          <select value={values.successorBirthMonth} onChange={(event) => setField('successorBirthMonth', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                            <option value="">Month</option>
                            {Array.from({ length: 12 }).map((_, index) => (
                              <option key={index + 1} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select value={values.successorBirthDay} onChange={(event) => setField('successorBirthDay', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                            <option value="">Day</option>
                            {Array.from({ length: 31 }).map((_, index) => (
                              <option key={index + 1} value={String(index + 1)}>
                                {String(index + 1)}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                        <div className="relative">
                          <select value={values.successorBirthYear} onChange={(event) => setField('successorBirthYear', event.target.value)} className={cn(selectClass, 'h-11 px-3 text-sm')}>
                            <option value="">Year</option>
                            {Array.from({ length: 90 }).map((_, index) => {
                              const year = String(new Date().getFullYear() - 18 - index)
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              )
                            })}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Checkbox
                    checked={values.successorSameAsResponsible}
                    onCheckedChange={(checked) => setField('successorSameAsResponsible', checked)}
                    label="The relationship's contact information is the same as that of the Responsible Individual"
                  />

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Relationship<span className="text-error">*</span>
                    </p>
                    <PlainInput
                      value={values.successorRelationship}
                      onChange={(value) => setField('successorRelationship', value)}
                      placeholder="Relationship..."
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Phone Number<span className="text-error">*</span>
                    </p>
                    <PlainInput value={values.successorPhone} onChange={(value) => setField('successorPhone', value)} placeholder="(0) - 000 - 000" />
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Physical/Residential Address<span className="text-error">*</span>
                    </p>
                    <div className="relative">
                      <PlainInput value={values.successorAddress} onChange={(value) => setField('successorAddress', value)} placeholder="Search address..." />
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    </div>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isHsaAccount && step === hsaInfoStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>HSA Account Information</h3>

                  <div>
                    <p className="mb-2 text-xs font-medium text-text-secondary">
                      Coverage<span className="text-error">*</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setField('hsaCoverage', 'individual')}
                        className={cn(
                          'inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs',
                          values.hsaCoverage === 'individual'
                            ? 'border-text-primary bg-surface text-text-primary'
                            : 'border-border bg-slate-50 text-text-secondary',
                        )}
                      >
                        <User className="h-3.5 w-3.5" />
                        Individual/Self-Coverage
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('hsaCoverage', 'family')}
                        className={cn(
                          'inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs',
                          values.hsaCoverage === 'family'
                            ? 'border-text-primary bg-surface text-text-primary'
                            : 'border-border bg-slate-50 text-text-secondary',
                        )}
                      >
                        <Users className="h-3.5 w-3.5" />
                        Family Coverage
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    <p className="text-xs font-medium text-text-secondary">
                      Insurance Type<span className="text-error">*</span>
                    </p>

                    <button
                      type="button"
                      onClick={() => setField('hsaInsuranceType', 'active-hdhp')}
                      className="flex items-start gap-2 text-left text-sm text-text-primary"
                    >
                      <span
                        className={cn(
                          'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                          values.hsaInsuranceType === 'active-hdhp' ? 'border-error bg-error' : 'border-border bg-surface',
                        )}
                      >
                        <span className={cn('h-2.5 w-2.5 rounded-full', values.hsaInsuranceType === 'active-hdhp' ? 'bg-surface' : 'bg-transparent')} />
                      </span>
                      I have an Active qualifying high deductible health insurance plan (HDHP).
                    </button>

                    <button
                      type="button"
                      onClick={() => setField('hsaInsuranceType', 'rollover-no-hdhp')}
                      className="flex items-start gap-2 text-left text-sm text-text-primary"
                    >
                      <span
                        className={cn(
                          'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                          values.hsaInsuranceType === 'rollover-no-hdhp' ? 'border-error bg-error' : 'border-border bg-surface',
                        )}
                      >
                        <span
                          className={cn(
                            'h-2.5 w-2.5 rounded-full',
                            values.hsaInsuranceType === 'rollover-no-hdhp' ? 'bg-surface' : 'bg-transparent',
                          )}
                        />
                      </span>
                      I am rolling over an old account to be self-directed and no longer have a HDHP.
                    </button>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && step === statementsStep ? (
                <div className={cn('space-y-4', isTraditionalIra ? 'pt-1' : 'rounded-2xl border border-border p-4')}>
                  <h3 className={sectionHeadingClass}>{isRothIraKidsAccount || isCoverdellAccount ? 'Statements & Tax Forms' : 'Statements and Tax Forms'}</h3>
                  {!isTraditionalIra ? (
                    <>
                      <span className={stepBadgeClass}>
                        <BadgeIcon className="h-4 w-4" />
                        {accountLabel}
                      </span>

                      <div className="space-y-5">
                        <div>
                          <p className="mb-3 text-base font-medium text-text-secondary">
                            Account Statement Delivery<span className="text-error">*</span>
                          </p>
                          <div className="space-y-4">
                            <RadioItem
                              checked={values.statementDelivery === 'electronic'}
                              label="Electronic Delivery"
                              description="Receive statements by email and document center only."
                              onSelect={() => setField('statementDelivery', 'electronic')}
                            />
                            <RadioItem
                              checked={values.statementDelivery === 'paper'}
                              label="Paper Delivery"
                              description="Receive mailed statement copies (additional fees may apply)."
                              onSelect={() => setField('statementDelivery', 'paper')}
                            />
                          </div>
                        </div>

                        <div className="border-t border-border pt-4">
                          <p className="mb-3 text-base font-medium text-text-secondary">
                            Tax Form Delivery<span className="text-error">*</span>
                          </p>
                          <div className="space-y-4">
                            <RadioItem
                              checked={values.taxFormDelivery === 'electronic'}
                              label="Electronic Tax Forms"
                              onSelect={() => setField('taxFormDelivery', 'electronic')}
                            />
                            <RadioItem
                              checked={values.taxFormDelivery === 'paper'}
                              label="Paper Tax Forms"
                              onSelect={() => setField('taxFormDelivery', 'paper')}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 border-t border-border pt-4">
                        <Checkbox
                          checked={values.electronicConsent}
                          onCheckedChange={(checked) => setField('electronicConsent', checked)}
                          label="I consent to electronic disclosures and communication."
                        />
                        <Checkbox
                          checked={values.w9Consent}
                          onCheckedChange={(checked) => setField('w9Consent', checked)}
                          label="I certify my tax information is accurate for W-9 reporting."
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="inline-flex items-start gap-2 text-xs text-text-secondary">
                        <ReceiptText className="mt-0.5 h-3.5 w-3.5 text-error" />
                        All statements and tax forms will be sent to the email address provided with your application.
                      </p>

                      <div className="rounded-xl border border-border p-4">
                        <p className="mb-3 text-sm text-text-secondary">
                          Would you like to also receive paper versions of your statements and tax forms for an additional $20 annual fee?
                        </p>

                        <div className="space-y-3">
                          <button
                            type="button"
                            onClick={() => setField('statementDelivery', 'electronic')}
                            className="flex items-center gap-2 text-sm text-text-primary"
                          >
                            <span
                              className={cn(
                                'grid h-5 w-5 place-items-center rounded-full border',
                                values.statementDelivery === 'electronic' ? 'border-error bg-error' : 'border-border bg-surface',
                              )}
                            >
                              <span
                                className={cn(
                                  'h-2.5 w-2.5 rounded-full',
                                  values.statementDelivery === 'electronic' ? 'bg-surface' : 'bg-transparent',
                                )}
                              />
                            </span>
                            No thanks, electronic statements and tax forms are just fine
                          </button>

                          <button
                            type="button"
                            onClick={() => setField('statementDelivery', 'paper')}
                            className="flex items-center gap-2 text-sm text-text-primary"
                          >
                            <span
                              className={cn(
                                'grid h-5 w-5 place-items-center rounded-full border',
                                values.statementDelivery === 'paper' ? 'border-error bg-error' : 'border-border bg-surface',
                              )}
                            >
                              <span
                                className={cn(
                                  'h-2.5 w-2.5 rounded-full',
                                  values.statementDelivery === 'paper' ? 'bg-surface' : 'bg-transparent',
                                )}
                              />
                            </span>
                            Yes!
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-text-secondary">
                        *Directed IRA will still communicate important information about your account via email.
                      </p>
                    </>
                  )}

                </div>
              ) : null}

              {finalReviewStage === 'none' && step === beneficiaryStep ? (
                <div className={cn('space-y-4', isTraditionalIra ? 'pt-1' : 'rounded-2xl border border-border p-4')}>
                  <h3 className={sectionHeadingClass}>Add Beneficiary</h3>
                  {!isTraditionalIra ? (
                    <span className={stepBadgeClass}>
                      <BadgeIcon className="h-4 w-4" />
                      {accountLabel}
                    </span>
                  ) : null}

                  {isTraditionalIra ? (
                    <>
                      <div className="space-y-3 text-sm text-text-secondary">
                        <p className="flex items-start gap-2">
                          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                          I hereby designate the person(s) named herein as primary and/or contingent beneficiary(ies) to receive my
                          interest in this account according to the terms of the Custodial Account Agreement.
                        </p>
                        <p>
                          I understand that should I improperly name a beneficiary, my account will be distributed to my surviving
                          spouse, if there is one, in accordance with Directed Trust Company policy.
                        </p>
                        <p>
                          If I live in a state with community property statutes and do not designate my spouse as the sole Primary
                          Beneficiary, I represent and warrant that my spouse has consented to such designation.
                        </p>
                      </div>

                      {traditionalBeneficiaries.map((beneficiary, beneficiaryIndex) => (
                        <div key={beneficiary.id} className="space-y-4 border-t border-border pt-4">
                          {beneficiaryIndex > 0 ? (
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => removeTraditionalBeneficiary(beneficiary.id)}
                                className="inline-flex items-center gap-1 text-xs font-medium text-error"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Remove Beneficiary
                              </button>
                            </div>
                          ) : null}
                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">Designation</p>
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => setTraditionalBeneficiaryField(beneficiary.id, 'designation', 'primary')}
                                className={cn(
                                  'h-9 rounded-full border px-3 text-sm',
                                  beneficiary.designation === 'primary'
                                    ? 'border-text-primary text-text-primary'
                                    : 'border-border bg-slate-50 text-text-secondary',
                                )}
                              >
                                Primary
                              </button>
                              <button
                                type="button"
                                onClick={() => setTraditionalBeneficiaryField(beneficiary.id, 'designation', 'contingent')}
                                className={cn(
                                  'h-9 rounded-full border px-3 text-sm',
                                  beneficiary.designation === 'contingent'
                                    ? 'border-text-primary text-text-primary'
                                    : 'border-border bg-slate-50 text-text-secondary',
                                )}
                              >
                                Contingent
                              </button>
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Beneficiary Name<span className="text-error">*</span>
                            </p>
                            <PlainInput
                              value={beneficiary.beneficiaryName}
                              onChange={(value) => setTraditionalBeneficiaryField(beneficiary.id, 'beneficiaryName', value)}
                              placeholder="Enter beneficiary name..."
                            />
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Relation<span className="text-error">*</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {(['spouse', 'child', 'trust', 'other'] as const).map((relationOption) => (
                                <button
                                  key={`${beneficiary.id}-${relationOption}`}
                                  type="button"
                                  onClick={() => setTraditionalBeneficiaryField(beneficiary.id, 'relation', relationOption)}
                                  className={cn(
                                    'h-9 rounded-full border px-3 text-sm capitalize',
                                    beneficiary.relation === relationOption
                                      ? 'border-text-primary text-text-primary'
                                      : 'border-border bg-slate-50 text-text-secondary',
                                  )}
                                >
                                  {relationOption}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-[1.3fr_1fr]">
                            <div>
                              <p className="mb-2 text-xs font-medium text-text-secondary">
                                Date of Birth<span className="text-error">*</span>
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="relative">
                                  <select
                                    value={beneficiary.birthMonth}
                                    onChange={(event) => setTraditionalBeneficiaryField(beneficiary.id, 'birthMonth', event.target.value)}
                                    className={cn(selectClass, 'h-11 px-3 text-sm')}
                                  >
                                    <option value="">Month</option>
                                    {Array.from({ length: 12 }).map((_, monthIndex) => (
                                      <option key={monthIndex + 1} value={String(monthIndex + 1)}>
                                        {String(monthIndex + 1)}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                                </div>
                                <div className="relative">
                                  <select
                                    value={beneficiary.birthDay}
                                    onChange={(event) => setTraditionalBeneficiaryField(beneficiary.id, 'birthDay', event.target.value)}
                                    className={cn(selectClass, 'h-11 px-3 text-sm')}
                                  >
                                    <option value="">Day</option>
                                    {Array.from({ length: 31 }).map((_, dayIndex) => (
                                      <option key={dayIndex + 1} value={String(dayIndex + 1)}>
                                        {String(dayIndex + 1)}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                                </div>
                                <div className="relative">
                                  <select
                                    value={beneficiary.birthYear}
                                    onChange={(event) => setTraditionalBeneficiaryField(beneficiary.id, 'birthYear', event.target.value)}
                                    className={cn(selectClass, 'h-11 px-3 text-sm')}
                                  >
                                    <option value="">Year</option>
                                    {Array.from({ length: 90 }).map((_, yearIndex) => {
                                      const year = String(new Date().getFullYear() - 18 - yearIndex)
                                      return (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      )
                                    })}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="mb-2 text-xs font-medium text-text-secondary">
                                Share Percentage<span className="text-error">*</span>
                              </p>
                              <PlainInput
                                value={beneficiary.sharePercentage}
                                onChange={(value) =>
                                  setTraditionalBeneficiaryField(beneficiary.id, 'sharePercentage', value.replace(/[^\d]/g, '').slice(0, 3))
                                }
                                placeholder="100"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <button type="button" onClick={addTraditionalBeneficiary} className="inline-flex items-center gap-1 text-sm font-medium text-error">
                        <span>+</span>
                        Add Beneficiaries
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-base text-text-secondary">Provide primary beneficiary details for your {accountLabel} account.</p>

                      <div className="grid gap-4 md:grid-cols-2">
                        <LabeledInput
                          label="Primary Beneficiary Name"
                          required
                          value={values.primaryBeneficiaryName}
                          onChange={(value) => setField('primaryBeneficiaryName', value)}
                          placeholder="Full name"
                        />
                        <LabeledInput
                          label="Relationship"
                          required
                          value={values.primaryBeneficiaryRelationship}
                          onChange={(value) => setField('primaryBeneficiaryRelationship', value)}
                          placeholder="Relationship"
                        />
                        <LabeledInput
                          label="Beneficiary Date of Birth"
                          required
                          type="date"
                          value={values.primaryBeneficiaryDob}
                          onChange={(value) => setField('primaryBeneficiaryDob', value)}
                          placeholder="Date of birth"
                        />
                        <LabeledInput
                          label="Beneficiary SSN"
                          required
                          value={values.primaryBeneficiarySsn}
                          onChange={(value) => setField('primaryBeneficiarySsn', value)}
                          placeholder="###-##-####"
                        />
                      </div>

                      <LabeledInput
                        label="Allocation Percentage"
                        required
                        value={values.primaryBeneficiaryPercent}
                        onChange={(value) => setField('primaryBeneficiaryPercent', value.replace(/[^\d]/g, '').slice(0, 3))}
                        placeholder="100"
                      />

                      <Checkbox
                        checked={values.addContingentBeneficiary}
                        onCheckedChange={(checked) => setField('addContingentBeneficiary', checked)}
                        label="Add contingent beneficiary"
                      />
                    </>
                  )}

                </div>
              ) : null}

              {finalReviewStage === 'none' && step === interestedPartyStep ? (
                <div className={cn('space-y-4', isTraditionalIra ? 'pt-1' : 'rounded-2xl border border-border p-4')}>
                  <h3 className={sectionHeadingClass}>Add Interested Party</h3>
                  {!isTraditionalIra ? (
                    <span className={stepBadgeClass}>
                      <BadgeIcon className="h-4 w-4" />
                      {accountLabel}
                    </span>
                  ) : null}

                  {isTraditionalIra ? (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-text-primary">Interested Party Access</p>
                        <p className="inline-flex items-center gap-2 text-xs text-text-secondary">
                          <TriangleAlert className="h-3.5 w-3.5 text-error" />
                          View your account information
                        </p>
                        <p className="inline-flex items-center gap-2 text-xs text-text-secondary">
                          <TriangleAlert className="h-3.5 w-3.5 text-error" />
                          Make account inquiries
                        </p>
                        <p className="inline-flex items-center gap-2 text-xs text-text-secondary">
                          <TriangleAlert className="h-3.5 w-3.5 text-error" />
                          Copied on all email communication from Directed IRA
                        </p>
                      </div>

                      {!showInterestedPartyIndividual ? (
                        <div className="border-t border-border pt-4">
                          <button
                            type="button"
                            onClick={() => setShowInterestedPartyIndividual(true)}
                            className="inline-flex items-center gap-1 text-sm font-medium text-error"
                          >
                            <span>+</span>
                            Add Individual
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4 border-t border-border pt-4">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={resetTraditionalInterestedParty}
                              className="inline-flex items-center gap-1 text-xs font-medium text-error"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Remove Individual
                            </button>
                          </div>
                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Legal Name<span className="text-error">*</span>
                            </p>
                            <div className="grid gap-3 md:grid-cols-3">
                              <PlainInput
                                value={traditionalInterestedParty.firstName}
                                onChange={(value) => setTraditionalInterestedPartyField('firstName', value)}
                                placeholder="First name.."
                              />
                              <PlainInput
                                value={traditionalInterestedParty.middleName}
                                onChange={(value) => setTraditionalInterestedPartyField('middleName', value)}
                                placeholder="Middle name.."
                              />
                              <PlainInput
                                value={traditionalInterestedParty.lastName}
                                onChange={(value) => setTraditionalInterestedPartyField('lastName', value)}
                                placeholder="Last name.."
                              />
                            </div>
                          </div>

                          <div className="grid gap-3 md:grid-cols-[1.2fr_1fr]">
                            <div>
                              <p className="mb-2 text-xs font-medium text-text-secondary">
                                Tax ID or SSN<span className="text-error">*</span>
                              </p>
                              <PlainInput
                                value={traditionalInterestedParty.taxIdOrSsn}
                                onChange={(value) => setTraditionalInterestedPartyField('taxIdOrSsn', value)}
                                placeholder="Tax ID.."
                              />
                            </div>

                            <div>
                              <p className="mb-2 text-xs font-medium text-text-secondary">
                                Date of Birth<span className="text-error">*</span>
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="relative">
                                  <select
                                    value={traditionalInterestedParty.birthMonth}
                                    onChange={(event) => setTraditionalInterestedPartyField('birthMonth', event.target.value)}
                                    className={cn(selectClass, 'h-11 px-3 text-sm')}
                                  >
                                    <option value="">Month</option>
                                    {Array.from({ length: 12 }).map((_, monthIndex) => (
                                      <option key={monthIndex + 1} value={String(monthIndex + 1)}>
                                        {String(monthIndex + 1)}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                                </div>
                                <div className="relative">
                                  <select
                                    value={traditionalInterestedParty.birthDay}
                                    onChange={(event) => setTraditionalInterestedPartyField('birthDay', event.target.value)}
                                    className={cn(selectClass, 'h-11 px-3 text-sm')}
                                  >
                                    <option value="">Day</option>
                                    {Array.from({ length: 31 }).map((_, dayIndex) => (
                                      <option key={dayIndex + 1} value={String(dayIndex + 1)}>
                                        {String(dayIndex + 1)}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                                </div>
                                <div className="relative">
                                  <select
                                    value={traditionalInterestedParty.birthYear}
                                    onChange={(event) => setTraditionalInterestedPartyField('birthYear', event.target.value)}
                                    className={cn(selectClass, 'h-11 px-3 text-sm')}
                                  >
                                    <option value="">Year</option>
                                    {Array.from({ length: 90 }).map((_, yearIndex) => {
                                      const year = String(new Date().getFullYear() - 18 - yearIndex)
                                      return (
                                        <option key={year} value={year}>
                                          {year}
                                        </option>
                                      )
                                    })}
                                  </select>
                                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Relationship<span className="text-error">*</span>
                            </p>
                            <PlainInput
                              value={traditionalInterestedParty.relationship}
                              onChange={(value) => setTraditionalInterestedPartyField('relationship', value)}
                              placeholder="Relationship.."
                            />
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Physical/Residential Address<span className="text-error">*</span>
                            </p>
                            <div className="relative">
                              <PlainInput
                                value={traditionalInterestedParty.physicalResidentialAddress}
                                onChange={(value) => setTraditionalInterestedPartyField('physicalResidentialAddress', value)}
                                placeholder="Search address.."
                              />
                              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Primary Phone<span className="text-error">*</span>
                            </p>
                            <div className="flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-2">
                              {(['cell', 'home', 'business'] as const).map((type) => (
                                <button
                                  key={`interested-${type}`}
                                  type="button"
                                  onClick={() => setTraditionalInterestedPartyField('primaryPhoneType', type)}
                                  className={cn(
                                    'h-8 rounded-full px-3 text-xs',
                                    traditionalInterestedParty.primaryPhoneType === type
                                      ? 'border border-border bg-slate-50 font-medium text-text-primary'
                                      : 'text-text-muted',
                                  )}
                                >
                                  {type === 'cell' ? 'Cell' : type === 'home' ? 'Home' : 'Business'}
                                </button>
                              ))}
                              <input
                                type="tel"
                                className="h-full flex-1 bg-transparent px-1 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                                value={traditionalInterestedParty.primaryPhoneNumber}
                                onChange={(event) => setTraditionalInterestedPartyField('primaryPhoneNumber', event.target.value)}
                                placeholder="(0) - 000 - 000"
                              />
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Email Address<span className="text-error">*</span>
                            </p>
                            <PlainInput
                              type="email"
                              value={traditionalInterestedParty.emailAddress}
                              onChange={(value) => setTraditionalInterestedPartyField('emailAddress', value)}
                              placeholder="Enter email address..."
                            />
                          </div>
                        </div>
                      )}

                      {isOtherAccountWithoutFunding ? (
                        <div className="space-y-4 border-t border-border pt-4">
                          <div className="space-y-2">
                            <p className="inline-flex items-center gap-2 text-sm font-medium text-text-primary">
                              <ReceiptText className="h-3.5 w-3.5 text-error" />
                              Company
                            </p>
                            <p className="text-xs leading-relaxed text-text-secondary">
                              IMPORTANT: Only the individual listed on the Company/Organization Interested Party Addendum form are authorized to receive
                              information regarding your account. This addendum is completed by the manager/authorized signer of the company you listed and
                              is required in order to proceed with this request.
                            </p>
                          </div>

                          <Checkbox
                            checked={values.interestedPartyCompanyAuthorized}
                            onCheckedChange={(checked) => setField('interestedPartyCompanyAuthorized', checked)}
                            label="I authorize solely the named company below and its staff, with any changes requiring account owner approval through a new form."
                          />

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Company Name<span className="text-error">*</span>
                            </p>
                            <PlainInput
                              value={values.interestedPartyCompanyName}
                              onChange={(value) => setField('interestedPartyCompanyName', value)}
                              placeholder="Enter company name..."
                            />
                          </div>

                          <div>
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Company Email<span className="text-error">*</span>
                            </p>
                            <PlainInput
                              type="email"
                              value={values.interestedPartyCompanyEmail}
                              onChange={(value) => setField('interestedPartyCompanyEmail', value)}
                              placeholder="Enter company email..."
                            />
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <p className="text-base text-text-secondary">
                        Add any advisor, attorney, accountant, or authorized contact that should be copied on account communication.
                      </p>

                      <div className="space-y-3">
                        <RadioItem
                          checked={!values.hasInterestedParty}
                          label="No interested party"
                          onSelect={() => setField('hasInterestedParty', false)}
                        />
                        <RadioItem
                          checked={values.hasInterestedParty}
                          label="Yes, add interested party"
                          onSelect={() => setField('hasInterestedParty', true)}
                        />
                      </div>

                      {values.hasInterestedParty ? (
                        <div className="space-y-4 border-t border-border pt-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <LabeledInput
                              label="Interested Party Name"
                              required
                              value={values.interestedPartyName}
                              onChange={(value) => setField('interestedPartyName', value)}
                              placeholder="Full name"
                            />
                            <LabeledInput
                              label="Relationship"
                              required
                              value={values.interestedPartyRelationship}
                              onChange={(value) => setField('interestedPartyRelationship', value)}
                              placeholder="Relationship"
                            />
                            <LabeledInput
                              label="Email Address"
                              required
                              type="email"
                              value={values.interestedPartyEmail}
                              onChange={(value) => setField('interestedPartyEmail', value)}
                              placeholder="name@email.com"
                            />
                            <LabeledInput
                              label="Phone Number"
                              required
                              type="tel"
                              value={values.interestedPartyPhone}
                              onChange={(value) => setField('interestedPartyPhone', value)}
                              placeholder="(000) 000-0000"
                            />
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}

                </div>
              ) : null}

              {finalReviewStage === 'none' && step === paymentStep ? (
                <div className={cn('space-y-5', isTraditionalIra ? 'pt-1' : 'rounded-2xl border border-border p-4')}>
                  <h3 className={sectionHeadingClass}>Payment & Agreement</h3>
                  {!isTraditionalIra ? (
                    <span className={stepBadgeClass}>
                      <BadgeIcon className="h-4 w-4" />
                      {accountLabel}
                    </span>
                  ) : null}

                  {isTraditionalIra ? (
                    <>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-text-primary">Payments</p>
                        <p className="inline-flex items-start gap-2 text-xs text-text-secondary">
                          <ReceiptText className="mt-0.5 h-3.5 w-3.5 text-error" />
                          All accounts are required to maintain a credit/debit card at all times. Any fees due today will be charged to
                          the credit/debit card provided.
                        </p>
                      </div>

                      {!isBackdoorRothStrategyAccount && !isOtherAccountWithoutFunding ? (
                        <div className="rounded-xl border border-border p-4">
                          <p className="mb-3 text-xs text-text-secondary">How do you want Account Fees Paid?</p>
                          <div className="space-y-3">
                            <button
                              type="button"
                              onClick={() => setField('paymentMethod', 'card')}
                              className="flex w-full items-start gap-2 text-left"
                            >
                              <span
                                className={cn(
                                  'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                                  values.paymentMethod === 'card' ? 'border-error bg-error' : 'border-border bg-surface',
                                )}
                              >
                                <span className={cn('h-2.5 w-2.5 rounded-full', values.paymentMethod === 'card' ? 'bg-surface' : 'bg-transparent')} />
                              </span>
                              <span>
                                <span className="block text-sm font-medium text-text-primary">Use Credit/Debit Card for Fees</span>
                                <span className="block text-xs text-text-secondary">
                                  Charge all account fees to credit/debit card. No minimum cash balance requirement with a valid card on file.
                                </span>
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setField('paymentMethod', 'ach')}
                              className="flex w-full items-start gap-2 text-left"
                            >
                              <span
                                className={cn(
                                  'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                                  values.paymentMethod === 'ach' ? 'border-error bg-error' : 'border-border bg-surface',
                                )}
                              >
                                <span className={cn('h-2.5 w-2.5 rounded-full', values.paymentMethod === 'ach' ? 'bg-surface' : 'bg-transparent')} />
                              </span>
                              <span>
                                <span className="block text-sm font-medium text-text-primary">Deduct Fees From Account</span>
                                <span className="block text-xs text-text-secondary">
                                  Ongoing fees will be deducted from the cash available in your account. A $50 minimum cash balance must be
                                  maintained.
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : null}

                      {isSepIra ? (
                        <div className="space-y-4 rounded-xl border border-border p-4">
                          <p className="text-sm font-medium text-text-primary">Eligibility Requirements</p>
                          <p className="inline-flex items-start gap-2 text-xs text-text-secondary">
                            <AlertCircle className="mt-0.5 h-3.5 w-3.5 text-error" />
                            The employer agrees to provide discretionary contributions in each calendar year to the individual retirement
                            account or individual retirement annuity of all employees who are at least 21 years old and have performed
                            service for the employer in at least 3 years of the immediately preceding 5 years.
                          </p>

                          <div className="border-t border-border pt-3">
                            <p className="mb-2 text-xs font-medium text-text-secondary">
                              Beneficiary Name<span className="text-error">*</span>
                            </p>
                            <PlainInput
                              value={values.sepBeneficiaryName}
                              onChange={(value) => setField('sepBeneficiaryName', value)}
                              placeholder="Enter beneficiary name..."
                            />
                          </div>

                          <div className="border-t border-border pt-3">
                            <p className="mb-2 text-xs text-text-secondary">Includes employees covered under a collective bargaining agreement?</p>
                            <div className="space-y-2">
                              <button
                                type="button"
                                onClick={() => setField('sepCollectiveBargainingCovered', 'yes')}
                                className="flex items-center gap-2 text-sm text-text-primary"
                              >
                                <span
                                  className={cn(
                                    'grid h-4 w-4 place-items-center rounded-full border',
                                    values.sepCollectiveBargainingCovered === 'yes' ? 'border-error bg-error' : 'border-border bg-surface',
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'h-1.5 w-1.5 rounded-full',
                                      values.sepCollectiveBargainingCovered === 'yes' ? 'bg-surface' : 'bg-transparent',
                                    )}
                                  />
                                </span>
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setField('sepCollectiveBargainingCovered', 'no')}
                                className="flex items-center gap-2 text-sm text-text-primary"
                              >
                                <span
                                  className={cn(
                                    'grid h-4 w-4 place-items-center rounded-full border',
                                    values.sepCollectiveBargainingCovered === 'no' ? 'border-error bg-error' : 'border-border bg-surface',
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'h-1.5 w-1.5 rounded-full',
                                      values.sepCollectiveBargainingCovered === 'no' ? 'bg-surface' : 'bg-transparent',
                                    )}
                                  />
                                </span>
                                No
                              </button>
                            </div>
                          </div>

                          <div className="border-t border-border pt-3">
                            <p className="mb-2 text-xs text-text-secondary">Includes certain nonresident aliens?</p>
                            <div className="space-y-2">
                              <button
                                type="button"
                                onClick={() => setField('sepNonresidentAliens', 'yes')}
                                className="flex items-center gap-2 text-sm text-text-primary"
                              >
                                <span
                                  className={cn(
                                    'grid h-4 w-4 place-items-center rounded-full border',
                                    values.sepNonresidentAliens === 'yes' ? 'border-error bg-error' : 'border-border bg-surface',
                                  )}
                                >
                                  <span
                                    className={cn('h-1.5 w-1.5 rounded-full', values.sepNonresidentAliens === 'yes' ? 'bg-surface' : 'bg-transparent')}
                                  />
                                </span>
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setField('sepNonresidentAliens', 'no')}
                                className="flex items-center gap-2 text-sm text-text-primary"
                              >
                                <span
                                  className={cn(
                                    'grid h-4 w-4 place-items-center rounded-full border',
                                    values.sepNonresidentAliens === 'no' ? 'border-error bg-error' : 'border-border bg-surface',
                                  )}
                                >
                                  <span
                                    className={cn('h-1.5 w-1.5 rounded-full', values.sepNonresidentAliens === 'no' ? 'bg-surface' : 'bg-transparent')}
                                  />
                                </span>
                                No
                              </button>
                            </div>
                          </div>

                          <div className="border-t border-border pt-3">
                            <p className="mb-2 text-xs text-text-secondary">
                              Include employees whose total compensation during the year is less than $750?
                            </p>
                            <div className="space-y-2">
                              <button
                                type="button"
                                onClick={() => setField('sepCompensationUnder750', 'yes')}
                                className="flex items-center gap-2 text-sm text-text-primary"
                              >
                                <span
                                  className={cn(
                                    'grid h-4 w-4 place-items-center rounded-full border',
                                    values.sepCompensationUnder750 === 'yes' ? 'border-error bg-error' : 'border-border bg-surface',
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'h-1.5 w-1.5 rounded-full',
                                      values.sepCompensationUnder750 === 'yes' ? 'bg-surface' : 'bg-transparent',
                                    )}
                                  />
                                </span>
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() => setField('sepCompensationUnder750', 'no')}
                                className="flex items-center gap-2 text-sm text-text-primary"
                              >
                                <span
                                  className={cn(
                                    'grid h-4 w-4 place-items-center rounded-full border',
                                    values.sepCompensationUnder750 === 'no' ? 'border-error bg-error' : 'border-border bg-surface',
                                  )}
                                >
                                  <span
                                    className={cn(
                                      'h-1.5 w-1.5 rounded-full',
                                      values.sepCompensationUnder750 === 'no' ? 'bg-surface' : 'bg-transparent',
                                    )}
                                  />
                                </span>
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="space-y-2 border-t border-border pt-4">
                        <p className="text-sm font-medium text-text-primary">Acknowledgements</p>
                        <Checkbox
                          checked={values.acceptAgreement}
                          onCheckedChange={(checked) => setField('acceptAgreement', checked)}
                          label="Please acknowledge by checking below that you have reviewed the account agreement and fee schedule prior to continuing."
                        />
                        <button type="button" className="text-xs font-medium text-error underline-offset-2 hover:underline">
                          View Agreement and Fee Schedule
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-base text-text-secondary">
                        Select payment method for setup fees and confirm required account agreements.
                      </p>

                      <div className="space-y-4 border-y border-border py-4">
                        <p className="text-base font-medium text-text-secondary">
                          Payment Method<span className="text-error">*</span>
                        </p>

                        <div className="space-y-4">
                          <RadioItem
                            checked={values.paymentMethod === 'card'}
                            label="Credit / Debit Card"
                            description="Pay onboarding and setup fees using card."
                            onSelect={() => setField('paymentMethod', 'card')}
                          />
                          <RadioItem
                            checked={values.paymentMethod === 'ach'}
                            label="ACH"
                            description="Pay by bank transfer using secure checkout."
                            onSelect={() => setField('paymentMethod', 'ach')}
                          />
                        </div>

                        {values.paymentMethod === 'card' ? (
                          <div className="space-y-4 pt-2">
                            <LabeledInput
                              label="Name On Card"
                              required
                              value={values.nameOnCard}
                              onChange={(value) => setField('nameOnCard', value)}
                              placeholder="Card holder name"
                            />
                            <div className="grid gap-4 md:grid-cols-3">
                              <LabeledInput
                                label="Card Number"
                                required
                                value={values.cardNumber}
                                onChange={(value) => setField('cardNumber', value.replace(/[^\d]/g, '').slice(0, 16))}
                                placeholder="1234 5678 9012 3456"
                              />
                              <LabeledInput
                                label="Expiry"
                                required
                                value={values.cardExpiry}
                                onChange={(value) => setField('cardExpiry', value)}
                                placeholder="MM/YY"
                              />
                              <LabeledInput
                                label="CVC"
                                required
                                value={values.cardCvc}
                                onChange={(value) => setField('cardCvc', value.replace(/[^\d]/g, '').slice(0, 4))}
                                placeholder="123"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-secondary">
                            ACH payment will be collected securely at the final checkout step.
                          </div>
                        )}
                      </div>

                      <Checkbox
                        checked={values.acceptAgreement}
                        onCheckedChange={(checked) => setField('acceptAgreement', checked)}
                        label="I agree to the account terms, disclosures, and fee schedule."
                      />
                    </>
                  )}

                </div>
              ) : null}

              {finalReviewStage === 'none' && isRothConversionAccount && step === rothConversionAuthorizationStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>Roth Conversion Authorization</h3>

                  <p className="inline-flex items-start gap-2 text-xs text-text-secondary">
                    <ReceiptText className="mt-0.5 h-3.5 w-3.5 text-error" />
                    Roth Conversions require both a Traditional and Roth IRA accounts at Directed Trust Company
                  </p>

                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-sm text-text-secondary">
                      Do you have an existing account with Directed Trust Company (Directed IRA) that you would like to use for the Roth Conversion?
                    </p>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setField('rothConversionHasExistingAccount', 'yes')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionHasExistingAccount === 'yes' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionHasExistingAccount === 'yes' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('rothConversionHasExistingAccount', 'no')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionHasExistingAccount === 'no' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionHasExistingAccount === 'no' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        No
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-sm text-text-secondary">Please select one:</p>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setField('rothConversionType', 'full')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionType === 'full' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span className={cn('h-2.5 w-2.5 rounded-full', values.rothConversionType === 'full' ? 'bg-surface' : 'bg-transparent')} />
                        </span>
                        Full Conversion (Convert Entire Traditional to Roth and Close Traditional)
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('rothConversionType', 'partial')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionType === 'partial' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn('h-2.5 w-2.5 rounded-full', values.rothConversionType === 'partial' ? 'bg-surface' : 'bg-transparent')}
                          />
                        </span>
                        Partial Conversion and Keep Traditional Open
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isRothConversionAccount && step === rothConversionWithholdingStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>Withholding Election for Roth Conversion</h3>

                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-sm text-text-secondary">Please select:</p>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setField('rothConversionWithholding', 'withhold')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionWithholding === 'withhold' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionWithholding === 'withhold' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Withhold Federal Income Tax
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('rothConversionWithholding', 'no-withhold')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionWithholding === 'no-withhold' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionWithholding === 'no-withhold' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Do not Withhold Federal Income Tax
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isBackdoorRothStrategyAccount && step === backdoorAccountSetupStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>Account Establishment & Contributions</h3>

                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-sm text-text-secondary">I instruct Directed IRA to:</p>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setField('backdoorEstablishmentOption', 'new-backdoor')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.backdoorEstablishmentOption === 'new-backdoor' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.backdoorEstablishmentOption === 'new-backdoor' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Establish a brand new Backdoor Traditional IRA and Roth IRA.
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('backdoorEstablishmentOption', 'traditional-only')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.backdoorEstablishmentOption === 'traditional-only' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.backdoorEstablishmentOption === 'traditional-only' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Establish a Backdoor Traditional IRA only. I already have a Directed IRA Roth Account Established.
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="mb-4 text-sm font-medium text-text-primary">Contribution to Traditional IRA for Backdoor Roth</p>
                    <div className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            IRA Contribution for<span className="text-error">*</span>
                          </p>
                          <PlainInput
                            value={values.backdoorContributionYearOne}
                            onChange={(value) => setField('backdoorContributionYearOne', value.replace(/[^\d]/g, '').slice(0, 4))}
                            placeholder="2026"
                          />
                        </div>
                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            Amount<span className="text-error">*</span>
                          </p>
                          <div className="flex h-11 items-center rounded-full border border-border bg-surface px-4">
                            <span className="text-sm text-text-primary">$</span>
                            <input
                              type="text"
                              className="h-full flex-1 bg-transparent px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                              value={values.backdoorContributionAmountOne}
                              onChange={(event) => setField('backdoorContributionAmountOne', event.target.value.replace(/[^\d.]/g, '').slice(0, 12))}
                              placeholder="Enter amount"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            IRA Contribution for<span className="text-error">*</span>
                          </p>
                          <PlainInput
                            value={values.backdoorContributionYearTwo}
                            onChange={(value) => setField('backdoorContributionYearTwo', value.replace(/[^\d]/g, '').slice(0, 4))}
                            placeholder="2025"
                          />
                        </div>
                        <div>
                          <p className="mb-2 text-xs font-medium text-text-secondary">
                            Amount<span className="text-error">*</span>
                          </p>
                          <div className="flex h-11 items-center rounded-full border border-border bg-surface px-4">
                            <span className="text-sm text-text-primary">$</span>
                            <input
                              type="text"
                              className="h-full flex-1 bg-transparent px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                              value={values.backdoorContributionAmountTwo}
                              onChange={(event) => setField('backdoorContributionAmountTwo', event.target.value.replace(/[^\d.]/g, '').slice(0, 12))}
                              placeholder="Enter amount"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="mt-5 text-sm text-text-secondary">
                      Total Contribution: <span className="font-semibold text-text-primary">{backdoorTotalContribution}</span>
                    </p>
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && isRothConversionOtherAccount && step === rothConversionOtherAuthorizationStep ? (
                <div className="space-y-5 pt-1">
                  <h3 className={sectionHeadingClass}>Roth Conversion Authorization</h3>

                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-2 text-sm text-text-secondary">
                      Roth Conversions require both a Traditional and Roth IRA accounts at Directed Trust Company.
                    </p>
                    <p className="mb-3 text-sm text-text-secondary">
                      Do you have an existing account with Directed Trust Company (Directed IRA) that you would like to use for the Roth Conversion?
                    </p>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setField('rothConversionOtherHasExistingAccount', 'yes')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionOtherHasExistingAccount === 'yes' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionOtherHasExistingAccount === 'yes' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('rothConversionOtherHasExistingAccount', 'no')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionOtherHasExistingAccount === 'no' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionOtherHasExistingAccount === 'no' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        No
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-sm text-text-secondary">I instruct Directed IRA to:</p>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setField('rothConversionOtherInstruction', 'traditional-only')}
                        className="flex items-start gap-2 text-left text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionOtherInstruction === 'traditional-only' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionOtherInstruction === 'traditional-only' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        <span>
                          Establish a Traditional IRA only. I already have a Directed IRA Roth Account established:
                          {values.rothConversionOtherInstruction === 'traditional-only' ? (
                            <span className="mt-2 block">
                              <PlainInput
                                value={values.rothConversionOtherRothAch}
                                onChange={(value) => setField('rothConversionOtherRothAch', value)}
                                placeholder="Enter Roth ACH"
                              />
                            </span>
                          ) : null}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setField('rothConversionOtherInstruction', 'roth-only')}
                        className="flex items-start gap-2 text-left text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'mt-0.5 grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionOtherInstruction === 'roth-only' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionOtherInstruction === 'roth-only' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Establish a Roth IRA only. I already have a Directed IRA Traditional Account established:
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border p-4">
                    <p className="mb-3 text-sm text-text-secondary">Please select one:</p>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setField('rothConversionOtherType', 'full')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionOtherType === 'full' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionOtherType === 'full' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Full Conversion (Convert Entire Traditional to Roth and Close Traditional)
                      </button>
                      <button
                        type="button"
                        onClick={() => setField('rothConversionOtherType', 'partial')}
                        className="flex items-center gap-2 text-sm text-text-primary"
                      >
                        <span
                          className={cn(
                            'grid h-5 w-5 place-items-center rounded-full border',
                            values.rothConversionOtherType === 'partial' ? 'border-error bg-error' : 'border-border bg-surface',
                          )}
                        >
                          <span
                            className={cn(
                              'h-2.5 w-2.5 rounded-full',
                              values.rothConversionOtherType === 'partial' ? 'bg-surface' : 'bg-transparent',
                            )}
                          />
                        </span>
                        Partial Conversion and Keep Traditional Open
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-xl border border-border p-4">
                    <p className="text-sm text-text-secondary">
                      Please select at least one<span className="text-error">*</span>
                    </p>

                    <Checkbox
                      checked={values.rothConversionOtherCashSelected}
                      onCheckedChange={(checked) => setField('rothConversionOtherCashSelected', checked)}
                      label="Cash Conversion Amount"
                    />

                    {values.rothConversionOtherCashSelected ? (
                      <div className="flex h-11 items-center rounded-full border border-border bg-surface px-4">
                        <span className="text-sm text-text-primary">$</span>
                        <input
                          type="text"
                          className="h-full flex-1 bg-transparent px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                          value={values.rothConversionOtherCashAmount}
                          onChange={(event) => setField('rothConversionOtherCashAmount', event.target.value.replace(/[^\d.]/g, '').slice(0, 12))}
                          placeholder="Enter amount"
                        />
                      </div>
                    ) : null}

                    <Checkbox
                      checked={values.rothConversionOtherNonCashSelected}
                      onCheckedChange={(checked) => {
                        setField('rothConversionOtherNonCashSelected', checked)
                        if (!checked) {
                          setRothConversionOtherAssets([{ id: 1, assetName: '', amount: '' }])
                        }
                      }}
                      label="Convert the following Non-Cash Assets"
                    />

                    {values.rothConversionOtherNonCashSelected ? (
                      <div className="space-y-3 border-t border-border pt-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Asset Conversion</p>
                        {rothConversionOtherAssets.map((asset, assetIndex) => (
                          <div key={asset.id} className="space-y-2">
                            <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_auto]">
                              <PlainInput
                                value={asset.assetName}
                                onChange={(value) => setRothConversionOtherAssetField(asset.id, 'assetName', value)}
                                placeholder="Enter asset name..."
                              />
                              <div className="flex h-11 items-center rounded-full border border-border bg-surface px-4">
                                <span className="text-sm text-text-primary">$</span>
                                <input
                                  type="text"
                                  className="h-full flex-1 bg-transparent px-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
                                  value={asset.amount}
                                  onChange={(event) =>
                                    setRothConversionOtherAssetField(asset.id, 'amount', event.target.value.replace(/[^\d.]/g, '').slice(0, 12))
                                  }
                                  placeholder="Enter amount"
                                />
                              </div>
                              {assetIndex > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => removeRothConversionOtherAsset(asset.id)}
                                  className="inline-flex h-11 items-center gap-1 rounded-full border border-error px-3 text-xs font-medium text-error"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Remove
                                </button>
                              ) : null}
                            </div>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={addRothConversionOtherAsset}
                          className="inline-flex items-center gap-1 text-xs font-medium text-error"
                        >
                          <span>+</span>
                          Add Asset
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {finalReviewStage === 'none' && step === fundingStep && !isOtherAccountWithoutFunding ? (
                <div className={cn('space-y-5', isTraditionalIra ? 'pt-1' : 'rounded-2xl border border-border p-4')}>
                  <h3 className={sectionHeadingClass}>Funding Option</h3>
                  {!isTraditionalIra ? (
                    <span className={stepBadgeClass}>
                      <BadgeIcon className="h-4 w-4" />
                      {accountLabel}
                    </span>
                  ) : null}

                  {isTraditionalIra ? (
                    <>
                      <p className="inline-flex items-start gap-2 text-xs text-text-secondary">
                        <ReceiptText className="mt-0.5 h-3.5 w-3.5 text-error" />
                        Choose how you'd like to add funds to your account, whether transferring existing savings, rolling over an employer
                        plan, or making a new contribution.
                      </p>

                      <div className="rounded-xl border border-border">
                        {([
                          {
                            key: 'transfer',
                            title: 'Transfer your Existing IRA',
                            subtitle: 'Move funds from your current IRA provider',
                          },
                          {
                            key: 'rollover',
                            title: 'Roll Over your 401(k) or other Employer Plan',
                            subtitle: 'Bring your retirement funds from a previous employer',
                          },
                          {
                            key: 'new-contribution',
                            title: 'Make a Contribution',
                            subtitle: 'Directly fund your account with new contributions',
                          },
                        ] as const).map((option, index, allOptions) => (
                          <button
                            key={option.key}
                            type="button"
                            onClick={() => setField('fundingOption', option.key)}
                            className={cn(
                              'flex w-full items-center justify-between gap-3 px-4 py-3 text-left',
                              index !== allOptions.length - 1 ? 'border-b border-border' : '',
                            )}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-error-light text-error">
                                <span className="h-2 w-2 rounded-full bg-error" />
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium text-text-primary">{option.title}</span>
                                <span className="block truncate text-xs text-text-secondary">{option.subtitle}</span>
                              </span>
                            </span>
                            <span
                              className={cn(
                                'grid h-5 w-5 shrink-0 place-items-center rounded-full border',
                                values.fundingOption === option.key ? 'border-error bg-error' : 'border-border bg-surface',
                              )}
                            >
                              <span
                                className={cn(
                                  'h-2.5 w-2.5 rounded-full',
                                  values.fundingOption === option.key ? 'bg-surface' : 'bg-transparent',
                                )}
                              />
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-base text-text-secondary">
                        Choose how you want to fund your account. You can start with one method and add others later.
                      </p>

                      <div className="space-y-4 border-y border-border py-4">
                        <p className="text-base font-medium text-text-secondary">
                          Preferred Funding Method<span className="text-error">*</span>
                        </p>

                        <div className="space-y-4">
                          <RadioItem
                            checked={values.fundingOption === 'new-contribution'}
                            label="New Contribution"
                            onSelect={() => setField('fundingOption', 'new-contribution')}
                          />
                          <RadioItem
                            checked={values.fundingOption === 'transfer'}
                            label="Transfer from Existing Custodian"
                            onSelect={() => setField('fundingOption', 'transfer')}
                          />
                          <RadioItem
                            checked={values.fundingOption === 'rollover'}
                            label="Rollover from Employer Plan"
                            onSelect={() => setField('fundingOption', 'rollover')}
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <LabeledInput
                            label="Estimated Funding Amount"
                            required
                            value={values.fundingAmount}
                            onChange={(value) => setField('fundingAmount', value.replace(/[^\d.]/g, '').slice(0, 12))}
                            placeholder="$ Amount"
                          />
                          <LabeledInput
                            label="Expected Funding Timeline"
                            required
                            value={values.fundingTimeline}
                            onChange={(value) => setField('fundingTimeline', value)}
                            placeholder="e.g. within 30 days"
                          />
                        </div>
                      </div>

                      <SignAndPayPanel
                        signed={values.signed}
                        paymentCompleted={values.paymentCompleted}
                        accountLabel={accountLabel}
                        onSign={showDocusignPreview}
                        onPayment={showCheckoutPreview}
                      />
                    </>
                  )}

                </div>
              ) : null}
            </div>

            {finalReviewStage === 'none' ? (
              <div className="flex items-center gap-3 border-t border-border px-4 py-4 md:justify-end md:px-6">
                <button
                  type="button"
                  onClick={goBack}
                  className="h-11 flex-1 rounded-full border border-border bg-surface px-6 text-sm font-medium text-text-primary hover:bg-slate-50 md:max-w-[140px]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canContinue}
                  className={cn(
                    'h-11 flex-1 rounded-full px-7 text-sm font-semibold text-text-inverse transition-colors md:max-w-[180px]',
                    canContinue ? 'bg-primary hover:bg-primary-hover' : 'cursor-not-allowed bg-slate-200 text-text-muted',
                  )}
                >
                  Continue
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <UploadPhotoIdModal
        open={showUploadPhotoIdModal}
        uploadedPhotoIdName={uploadedPhotoIdName}
        uploadedPhotoIdSize={uploadedPhotoIdSize}
        onClose={() => setShowUploadPhotoIdModal(false)}
        onSelectFile={handlePhotoIdFileSelect}
        onRemoveFile={() => {
          setUploadedPhotoIdName('')
          setUploadedPhotoIdSize('')
        }}
      />

      <OverlayStatusModal open={showDocusignModal} message="Open Docusign Popup" />
      <OverlayStatusModal open={showCheckoutModal} message="Open Stripe Checkout Portal" />
    </>
  )
}



