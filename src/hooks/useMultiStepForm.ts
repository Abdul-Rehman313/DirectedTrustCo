import { useState } from 'react'
import type { FormSchema, FormValues } from '../types/form.types'

interface UseMultiStepFormResult {
  currentStepIndex: number
  totalSteps: number
  isFirstStep: boolean
  isLastStep: boolean
  currentStepId: string
  goNext: () => void
  goBack: () => void
  goTo: (index: number) => void
  formData: FormValues
  updateFormData: (next: FormValues) => void
  isSubmitting: boolean
  setIsSubmitting: (next: boolean) => void
}

export const useMultiStepForm = (schema: FormSchema): UseMultiStepFormResult => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<FormValues>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = schema.steps.length
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === totalSteps - 1
  const currentStepId = schema.steps[currentStepIndex]?.id ?? ''

  const goNext = (): void => {
    setCurrentStepIndex((previous) => (previous >= totalSteps - 1 ? previous : previous + 1))
  }

  const goBack = (): void => {
    setCurrentStepIndex((previous) => (previous <= 0 ? previous : previous - 1))
  }

  const goTo = (index: number): void => {
    if (index >= 0 && index < totalSteps) {
      setCurrentStepIndex(index)
    }
  }

  const updateFormData = (next: FormValues): void => {
    setFormData((previous) => ({ ...previous, ...next }))
  }

  return {
    currentStepIndex,
    totalSteps,
    isFirstStep,
    isLastStep,
    currentStepId,
    goNext,
    goBack,
    goTo,
    formData,
    updateFormData,
    isSubmitting,
    setIsSubmitting,
  }
}
