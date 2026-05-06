import type { Meta, StoryObj } from '@storybook/react'
import { DynamicFormBuilder } from '../components/forms'
import { accountsSchemas } from '../data/formSchemas'

const meta: Meta<typeof DynamicFormBuilder> = {
  title: 'Forms / Accounts',
  component: DynamicFormBuilder,
  args: {
    onSubmit: async () => undefined,
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormBuilder>

export const Default: Story = { args: { schema: accountsSchemas[0] } }
export const Loading: Story = { args: { schema: accountsSchemas[1] } }
export const ErrorState: Story = { args: { schema: accountsSchemas[2] } }
