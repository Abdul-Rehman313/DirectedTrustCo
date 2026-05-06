import type { Meta, StoryObj } from '@storybook/react'
import { DynamicFormBuilder } from '../components/forms'
import { selfDirectedSchemas } from '../data/formSchemas'

const meta: Meta<typeof DynamicFormBuilder> = {
  title: 'Forms / AccountCreation / SelfDirected',
  component: DynamicFormBuilder,
  args: {
    onSubmit: async () => undefined,
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormBuilder>

export const RothIRA: Story = { args: { schema: selfDirectedSchemas[0] } }
export const TraditionalIRA: Story = { args: { schema: selfDirectedSchemas[1] } }
export const SepIRA: Story = { args: { schema: selfDirectedSchemas[2] } }
export const HSA: Story = { args: { schema: selfDirectedSchemas[3] } }
export const CoverdellEducationSavings: Story = { args: { schema: selfDirectedSchemas[4] } }
export const InheritedTraditionalIRA: Story = { args: { schema: selfDirectedSchemas[5] } }
export const InheritedRothIRA: Story = { args: { schema: selfDirectedSchemas[6] } }
export const RothIRAKids: Story = { args: { schema: selfDirectedSchemas[7] } }
export const RothConversion: Story = { args: { schema: selfDirectedSchemas[8] } }
export const Solo401kIntake: Story = { args: { schema: selfDirectedSchemas[9] } }
export const BackdoorRothStrategy: Story = { args: { schema: selfDirectedSchemas[10] } }
export const IndividualCustody: Story = { args: { schema: selfDirectedSchemas[11] } }
export const RetireCustody: Story = { args: { schema: selfDirectedSchemas[12] } }
export const RothConversionCrypto: Story = { args: { schema: selfDirectedSchemas[13] } }
export const Solo401kApp: Story = { args: { schema: selfDirectedSchemas[14] } }
export const TrustEstateCustody: Story = { args: { schema: selfDirectedSchemas[15] } }
