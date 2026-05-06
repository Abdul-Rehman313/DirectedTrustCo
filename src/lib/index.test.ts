import { describe, expect, it } from 'vitest'
import * as lib from './index'

describe('Library Exports', () => {
  it('re-exports key modules for consumers', () => {
    expect(lib).toHaveProperty('Button')
    expect(lib).toHaveProperty('PageWrapper')
    expect(lib).toHaveProperty('useFormBuilder')
    expect(lib).toHaveProperty('useMultiStepForm')
    expect(lib).toHaveProperty('cn')
    expect(lib).toHaveProperty('buildStepValidationSchema')
  })
})
