import { act, renderHook } from '@testing-library/react'
import { z } from 'zod'
import { describe, expect, it } from 'vitest'
import { useFormBuilder } from './useFormBuilder'
import { useMultiStepForm } from './useMultiStepForm'
import type { FormSchema } from '../types/form.types'

const schema: FormSchema = {
  id: 'test-schema',
  title: 'Test',
  description: 'Test description',
  steps: [
    { id: 'step-1', title: 'Step 1', fields: [{ id: 'name', type: 'text', label: 'Name', validation: z.string().min(1) }] },
    { id: 'step-2', title: 'Step 2', fields: [{ id: 'age', type: 'text', label: 'Age' }] },
  ],
}

describe('Hooks', () => {
  it('useMultiStepForm navigates between steps with boundaries', () => {
    const { result } = renderHook(() => useMultiStepForm(schema))

    expect(result.current.currentStepIndex).toBe(0)
    expect(result.current.isFirstStep).toBe(true)
    expect(result.current.isLastStep).toBe(false)

    act(() => result.current.goNext())
    expect(result.current.currentStepIndex).toBe(1)
    expect(result.current.isLastStep).toBe(true)

    act(() => result.current.goNext())
    expect(result.current.currentStepIndex).toBe(1)

    act(() => result.current.goBack())
    expect(result.current.currentStepIndex).toBe(0)

    act(() => result.current.goTo(99))
    expect(result.current.currentStepIndex).toBe(0)

    act(() => result.current.updateFormData({ name: 'Jordan' }))
    expect(result.current.formData).toEqual({ name: 'Jordan' })
  })

  it('useFormBuilder initializes form with provided default values', () => {
    const { result } = renderHook(() => useFormBuilder(schema, 0, { name: 'Jordan' }))
    expect(result.current.getValues()).toMatchObject({ name: 'Jordan' })
  })

  it('useFormBuilder safely handles out-of-range step index', async () => {
    const { result } = renderHook(() => useFormBuilder(schema, 100, { anything: 'value' }))
    const valid = await result.current.trigger()

    expect(valid).toBe(true)
    expect(result.current.getValues()).toMatchObject({ anything: 'value' })
  })
})
