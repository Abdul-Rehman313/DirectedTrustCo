import { describe, expect, it } from 'vitest'
import { accountFormsCatalog } from './accountFormsCatalog'
import { accountsSchemas } from './accountsSchemas'
import { contributionsSchemas } from './contributionsSchemas'
import { investSchemas } from './investSchemas'
import { manageSchemas } from './manageSchemas'
import { rolloverSchemas } from './rolloverSchemas'
import { selfDirectedSchemas } from './selfDirectedSchemas'
import { buildDefaultSteps, buildFormSchema } from './shared'

const allSchemaGroups = [
  accountsSchemas,
  contributionsSchemas,
  investSchemas,
  manageSchemas,
  rolloverSchemas,
  selfDirectedSchemas,
]

describe('Form Schema Data', () => {
  it('contains non-empty schema collections', () => {
    allSchemaGroups.forEach((group) => expect(group.length).toBeGreaterThan(0))
    expect(accountFormsCatalog.length).toBeGreaterThan(0)
  })

  it('ensures schema ids are unique across exported groups', () => {
    const ids = allSchemaGroups.flat().map((schema) => schema.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('ensures every schema has steps and fields', () => {
    allSchemaGroups.flat().forEach((schema) => {
      expect(schema.steps.length).toBeGreaterThan(0)
      schema.steps.forEach((step) => expect(step.fields.length).toBeGreaterThan(0))
    })
  })

  it('ensures account forms catalog entries are internally consistent', () => {
    accountFormsCatalog.forEach((entry) => {
      expect(entry.id).toBeTruthy()
      expect(entry.title).toBeTruthy()
      expect(entry.schema.steps.length).toBeGreaterThan(0)
    })
  })

  it('buildDefaultSteps and buildFormSchema produce structured output', () => {
    const steps = buildDefaultSteps('Self-Directed - Roth IRA')
    const schema = buildFormSchema('new-id', 'My Form', 'Description', steps)

    expect(steps.length).toBeGreaterThan(0)
    expect(schema.id).toBe('new-id')
    expect(schema.title).toBe('My Form')
    expect(schema.steps).toHaveLength(steps.length)
  })
})
