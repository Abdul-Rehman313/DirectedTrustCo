import { z } from 'zod'
import type { FormStepSchema } from '../types/form.types'

export const buildStepValidationSchema = (step: FormStepSchema): z.ZodObject<Record<string, z.ZodTypeAny>> => {
  const shape: Record<string, z.ZodTypeAny> = {}
  step.fields.forEach((field) => {
    if (field.validation) {
      shape[field.id] = field.validation
    }
  })
  return z.object(shape)
}

