import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '../components/ui'

const meta: Meta<typeof Checkbox> = {
  title: 'Design System / Atoms / Checkbox',
  component: Checkbox,
  args: {
    label: 'I agree to terms',
    description: 'Required to continue',
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}
export const Hover: Story = {}
export const Active: Story = { args: { checked: true } }
export const Disabled: Story = { args: { checked: false, description: 'Disabled example' } }
export const Loading: Story = { args: { description: 'Saving preference...' } }
export const ErrorState: Story = { args: { description: 'You must accept this agreement' } }
export const MobileViewport: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } }
export const DesktopViewport: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } }
