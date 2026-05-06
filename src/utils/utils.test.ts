import { z } from 'zod'
import { describe, expect, it } from 'vitest'
import { cn } from './cn'
import { buildStepValidationSchema } from './formValidation'
import type { FormStepSchema } from '../types/form.types'

describe('Utilities', () => {
  it('cn merges conditional classes', () => {
    const output = cn('px-2', 'px-4', { hidden: false, block: true })
    expect(output).toContain('px-4')
    expect(output).toContain('block')
  })

  it('buildStepValidationSchema includes only fields with validation rules', () => {
    const step: FormStepSchema = {
      id: 'sample',
      title: 'Sample',
      fields: [
        { id: 'firstName', type: 'text', label: 'First Name', validation: z.string().min(1) },
        { id: 'notes', type: 'textarea', label: 'Notes' },
      ],
    }

    const schema = buildStepValidationSchema(step)
    const pass = schema.safeParse({ firstName: 'Jordan' })
    const fail = schema.safeParse({ firstName: '' })

    expect(pass.success).toBe(true)
    expect(fail.success).toBe(false)
    expect(schema.shape.firstName).toBeDefined()
    expect((schema.shape as Record<string, unknown>).notes).toBeUndefined()
  })
})
