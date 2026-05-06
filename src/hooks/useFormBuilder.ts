import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { z } from 'zod'
import type { FormSchema } from '../types/form.types'
import { buildStepValidationSchema } from '../utils/formValidation'

export const useFormBuilder = (schema: FormSchema, currentStepIndex: number, defaultValues: Record<string, unknown>) => {
  const currentStep = schema.steps[currentStepIndex]

  const validationSchema = useMemo(() => {
    if (!currentStep) {
      return z.object({})
    }
    return buildStepValidationSchema(currentStep)
  }, [currentStep])
  const resolver = useMemo(
    () => zodResolver(validationSchema) as unknown as Resolver<Record<string, unknown>>,
    [validationSchema],
  )

  return useForm<Record<string, unknown>>({
    resolver,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues,
  })
}
