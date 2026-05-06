import type { Meta, StoryObj } from '@storybook/react'
import { DynamicFormBuilder } from '../components/forms'
import { contributionsSchemas } from '../data/formSchemas'

const meta: Meta<typeof DynamicFormBuilder> = {
  title: 'Forms / Contributions',
  component: DynamicFormBuilder,
  args: {
    onSubmit: async () => undefined,
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormBuilder>

export const Default: Story = { args: { schema: contributionsSchemas[0] } }
export const Loading: Story = { args: { schema: contributionsSchemas[0] } }
export const ErrorState: Story = { args: { schema: contributionsSchemas[0] } }
