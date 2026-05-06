import type { Meta, StoryObj } from '@storybook/react'
import { DynamicFormBuilder } from '../components/forms'
import { manageSchemas } from '../data/formSchemas'

const meta: Meta<typeof DynamicFormBuilder> = {
  title: 'Forms / Manage',
  component: DynamicFormBuilder,
  args: {
    onSubmit: async () => undefined,
  },
}

export default meta
type Story = StoryObj<typeof DynamicFormBuilder>

export const Default: Story = { args: { schema: manageSchemas[0] } }
export const Loading: Story = { args: { schema: manageSchemas[1] } }
export const ErrorState: Story = { args: { schema: manageSchemas[2] } }
